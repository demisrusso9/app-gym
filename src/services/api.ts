import axios, { AxiosError, AxiosInstance } from 'axios'
import { AppError } from '@/utils/AppError'
import { storageGetAuthToken, storageSaveAuthToken } from '@/storage/userAuth'

type SignOut = () => void

type PromiseInterface = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: 'http://192.168.0.53:3333',
}) as APIInstanceProps

let failedQueue: PromiseInterface[] = []
let isRefreshing = false

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use((response => response), async (requestError) => {
    if (requestError.response.status === 401) {
      const errors = ['token.expired', 'token.invalid']

      if (errors.includes(requestError.response.data.message)) {
        const { refresh_token } = await storageGetAuthToken()

        if (!refresh_token) {
          signOut()
          return Promise.reject(requestError)
        }

        const originalRequestConfig = requestError.config

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              onSuccess: (token) => {
                originalRequestConfig.headers.Authorization = `Bearer ${token}`
                resolve(api(originalRequestConfig))
              },
              onFailure: (error) => {
                reject(error)
              }
            })
          })
        }

        isRefreshing = true

        return new Promise(async (resolve, reject) => {
          try {
            const { data } = await api.post('/sessions/refresh-token', { refresh_token })
            await storageSaveAuthToken({ token: data.token, refresh_token: data.refresh_token })

            if (originalRequestConfig.data) {
              originalRequestConfig.data = JSON.parse(originalRequestConfig.data)
            }

            originalRequestConfig.headers = { 'Authorization': `Bearer ${data.token}` };
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

            failedQueue.forEach(request => {
              request.onSuccess(data.token)
            })

            resolve(api(originalRequestConfig))
          } catch (error: any) {
            failedQueue.forEach(request => {
              request.onFailure(error)
            })

            signOut()
            reject(error)
          } finally {
            isRefreshing = false
            failedQueue = []
          }
        })
      }

      signOut()
    }

    if (requestError.response && requestError.response.data) {
      return Promise.reject(new AppError(requestError.response.data.message))
    } else {
      return Promise.reject(requestError)
    }
  })

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

export { api }