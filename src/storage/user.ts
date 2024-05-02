import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_COLLECTION } from "./config";
import { UserDTO } from "@/dtos/UserDTO";

export async function storageGetUser() {
  const storage = await AsyncStorage.getItem(USER_COLLECTION)

  return storage ? JSON.parse(storage) : null;
}

export async function storageSaveUser(user: UserDTO) {
  await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(user))
}

export async function storageRemoveUser() {
  await AsyncStorage.removeItem(USER_COLLECTION)
}