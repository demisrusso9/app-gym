import {
  Center,
  ScrollView,
  VStack,
  Skeleton,
  Text,
  Heading,
  useToast
} from 'native-base'
import { ScreenHeader } from '@/components/ScreenHeader'
import { UserPhoto } from '@/components/UserPhoto'
import { useState } from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

const PHOTO_SIZE = 33

export function Profile() {
  const [userPhoto, setUserPhoto] = useState(
    'https://github.com/demisrusso9.png'
  )
  const [photoIsloading, setPhotoIsloading] = useState(false)

  const toast = useToast()

  async function handleUserPhotoSelect() {
    setPhotoIsloading(true)

    try {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      })

      if (canceled) return

      if (assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(assets[0].uri)
        
        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 3)
          return toast.show({
            title: 'O tamanho da foto não pode ser maior que 3MB',
            placement: 'top',
            bgColor: 'red.500'
          })
      }

      setUserPhoto(assets[0].uri)
    } catch (error) {
      console.log({ error })
    } finally {
      setPhotoIsloading(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title='Perfil' />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 100 : 36
        }}
        bounces={false}
      >
        <Center mt={6} px={10}>
          {photoIsloading ? (
            <Skeleton
              h={PHOTO_SIZE}
              w={PHOTO_SIZE}
              rounded='full'
              startColor={'gray.400'}
              endColor={'gray.300'}
            />
          ) : (
            <UserPhoto
              size={PHOTO_SIZE}
              source={{ uri: userPhoto }}
              alt='Foto do usuário'
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color={'green.500'}
              fontSize={'md'}
              fontFamily={'heading'}
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input bg={'gray.600'} placeholder='Nome' />
          <Input bg={'gray.600'} placeholder='E-mail' isDisabled />

          <Heading
            color={'gray.200'}
            fontSize={'md'}
            mt={9}
            mb={2}
            alignSelf={'flex-start'}
          >
            Alterar senha
          </Heading>

          <Input bg={'gray.600'} secureTextEntry placeholder='Senha antiga' />
          <Input bg={'gray.600'} secureTextEntry placeholder='Nova senha' />
          <Input
            bg={'gray.600'}
            secureTextEntry
            placeholder='Confirme a nova senha'
          />

          <Button text='Atualizar' mt={4} />
        </Center>
      </ScrollView>
    </VStack>
  )
}
