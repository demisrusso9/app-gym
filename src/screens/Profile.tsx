import {
  Center,
  ScrollView,
  VStack,
  Skeleton,
  Text,
  Heading,
  useToast,
  KeyboardAvoidingView
} from 'native-base'
import { ScreenHeader } from '@/components/ScreenHeader'
import { UserPhoto } from '@/components/UserPhoto'
import { useState } from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

const PHOTO_SIZE = 33

interface ProfileProps {
  name: string
  old_password: string
  password: string
  confirm_password: string
}

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

  async function handleUpdate(data: ProfileProps) {
    console.log(JSON.stringify({ data }, null, 2))
  }

  const schema = z
    .object({
      name: z.string().optional(),
      old_password: z.string({ message: 'Informe sua senha antiga.' }),
      password: z
        .string({ message: 'Informe a senha.' })
        .min(6, 'Senha muito curta.'),
      confirm_password: z.string({ message: 'Confirme a senha.' })
    })
    .refine(data => data.password === data.confirm_password, {
      message: 'As senhas não coincidem',
      path: ['confirm_password']
    })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ProfileProps>({
    resolver: zodResolver(schema)
  })

  return (
    <VStack flex={1}>
      <ScreenHeader title='Perfil' />

      <KeyboardAvoidingView behavior='padding' flex={1}>
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

            <Controller
              name='name'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  bg={'gray.600'}
                  placeholder='Nome'
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Input bg={'gray.600'} placeholder='E-mail' isDisabled />

            <Heading
              color={'gray.200'}
              fontSize={'md'}
              mt={9}
              mb={2}
              alignSelf={'flex-start'}
              fontFamily={'heading'}
            >
              Alterar senha
            </Heading>

            <Controller
              name='old_password'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  bg={'gray.600'}
                  secureTextEntry
                  placeholder='Senha antiga'
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.old_password?.message}
                />
              )}
            />

            <Controller
              name='password'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  bg={'gray.600'}
                  secureTextEntry
                  placeholder='Nova senha'
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Controller
              name='confirm_password'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  bg={'gray.600'}
                  secureTextEntry
                  placeholder='Confirme a nova senha'
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.confirm_password?.message}
                />
              )}
            />

            <Button
              text='Atualizar'
              mt={4}
              onPress={handleSubmit(handleUpdate)}
            />
          </Center>
        </ScrollView>
      </KeyboardAvoidingView>
    </VStack>
  )
}
