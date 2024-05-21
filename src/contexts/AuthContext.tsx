import { UserDTO } from '@/dtos/UserDTO'
import { api } from '@/services/api'
import {
  storageSaveUser,
  storageGetUser,
  storageRemoveUser
} from '@/storage/user'
import {
  storageGetAuthToken,
  storageRemoveAuthToken,
  storageSaveAuthToken
} from '@/storage/userAuth'
import { ReactNode, createContext, useEffect, useState } from 'react'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  user: UserDTO
  createAccount: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateUserProfile: (userUpdated: UserDTO) => Promise<void>
  isLoadingUserStorage: boolean
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorage, setIsLoadingUserStorage] = useState(true)

  // Save the user's data in the state and updates the token
  function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(userData)
  }

  // Store the user's data and authentication token on their device
  async function storageUserAndTokenSave(userData: UserDTO, token: string) {
    try {
      setIsLoadingUserStorage(true)

      await storageSaveUser(userData)
      await storageSaveAuthToken(token)
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorage(false)
    }
  }

  async function createAccount(name: string, email: string, password: string) {
    try {
      await api.post('/users', { name, email, password })
      await signIn(email, password)
    } catch (error) {
      throw error
    }
  }

  async function signIn(email: string, password: string) {
    try {
      setIsLoadingUserStorage(true)

      const { data } = await api.post('/sessions', { email, password })

      if (data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token)
        userAndTokenUpdate(data.user, data.token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorage(false)
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorage(true)

      api.defaults.headers.common['Authorization'] = ''
      setUser({} as UserDTO)

      await storageRemoveUser()
      await storageRemoveAuthToken()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorage(false)
    }
  }

  async function isUserLogged() {
    try {
      const user = await storageGetUser()
      const token = await storageGetAuthToken()

      if (user && token) {
        userAndTokenUpdate(user, token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorage(false)
    }
  }

  async function updateUserProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated)
      await storageSaveUser(userUpdated)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    isUserLogged()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        createAccount,
        signIn,
        signOut,
        updateUserProfile,
        isLoadingUserStorage
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
