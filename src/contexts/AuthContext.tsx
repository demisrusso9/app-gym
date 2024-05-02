import { UserDTO } from '@/dtos/UserDTO'
import { api } from '@/services/api'
import {
  storageSaveUser,
  storageGetUser,
  storageRemoveUser
} from '@/storage/user'
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
  isLoadingUserStorage: boolean
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorage, setIsLoadingUserStorage] = useState(true)

  async function createAccount(name: string, email: string, password: string) {
    try {
      await api.post('/users', { name, email, password })
      await signIn(email, password)
    } catch (error) {
      console.log(JSON.stringify({ error }, null, 2));
      throw error
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })

      if (data.user) {
        setUser(data.user)
        storageSaveUser(data.user)
      }
    } catch (error) {
      throw error
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorage(true)

      setUser({} as UserDTO)

      await storageRemoveUser()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorage(false)
    }
  }

  async function isUserLogged() {
    try {
      const user = await storageGetUser()

      if (user) {
        setUser(user)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorage(false)
    }
  }

  useEffect(() => {
    isUserLogged()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, createAccount, signIn, signOut, isLoadingUserStorage }}
    >
      {children}
    </AuthContext.Provider>
  )
}
