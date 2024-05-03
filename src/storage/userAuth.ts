import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_AUTH_TOKEN_COLLECTION } from "./config";

export async function storageSaveAuthToken(token: string) {
  await AsyncStorage.setItem(USER_AUTH_TOKEN_COLLECTION, token)
}

export async function storageGetAuthToken() {
  const token = await AsyncStorage.getItem(USER_AUTH_TOKEN_COLLECTION)

  return token
}

export async function storageRemoveAuthToken() {
  await AsyncStorage.removeItem(USER_AUTH_TOKEN_COLLECTION)
}