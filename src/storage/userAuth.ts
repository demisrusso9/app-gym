import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_AUTH_TOKEN_COLLECTION } from "./config";

interface StorageAuthProps {
  token: string
  refresh_token: string
}

export async function storageSaveAuthToken({ token, refresh_token }: StorageAuthProps) {
  await AsyncStorage.setItem(USER_AUTH_TOKEN_COLLECTION, JSON.stringify({ token, refresh_token }))
}

export async function storageGetAuthToken() {
  const response = await AsyncStorage.getItem(USER_AUTH_TOKEN_COLLECTION)

  const { token, refresh_token }: StorageAuthProps = response ? JSON.parse(response) : {}
  

  return { token, refresh_token }
}

export async function storageRemoveAuthToken() {
  await AsyncStorage.removeItem(USER_AUTH_TOKEN_COLLECTION)
}