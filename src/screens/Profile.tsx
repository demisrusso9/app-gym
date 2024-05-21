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
import { useAuth } from '@/hooks/useAuth'
import { AppError } from '@/utils/AppError'
import { api } from '@/services/api'
import defaultUserPhoto from '@/assets/userPhotoDefault.png'

const PHOTO_SIZE = 33

interface ProfileProps {
  name: string
  email: string
  old_password: string
  password: string
  confirm_password: string
}

export function Profile() {
  const [loading, setLoading] = useState(false)

  const { user, updateUserProfile } = useAuth()
  const toast = useToast()

  const schema = z
    .object({
      name: z.string({ message: 'Informe o nome.' }),
      old_password: z
        .string({ message: 'Informe sua senha antiga.' })
        .optional(),
      password: z
        .string()
        .min(6, 'A senha deve ter pelo menos 6 dígitos.')
        .nullable()
        .optional()
        .or(z.literal('')),
      confirm_password: z.string().nullable().optional().or(z.literal(''))
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
    defaultValues: {
      name: user.name,
      email: user.email,
      old_password: '',
      password: '',
      confirm_password: ''
    },
    resolver: zodResolver(schema)
  })

  async function handleUserPhotoSelect() {
    try {
      setLoading(true)

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

      const fileExtension = assets[0].uri.split('.').pop()

      const photoFile = {
        name: `${user.name}.${fileExtension}`.toLowerCase(),
        uri: assets[0].uri,
        type: `${assets[0].type}/${fileExtension}`
      } as any

      const userPhotoUploadForm = new FormData()
      userPhotoUploadForm.append('avatar', photoFile)

      const userPhotoUpdated = await api.patch(
        '/users/avatar',
        userPhotoUploadForm,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      const userUpdated = user
      userUpdated.avatar = userPhotoUpdated.data.avatar

      await updateUserProfile(userUpdated)

      toast.show({
        title: 'Foto atualizada!',
        placement: 'top',
        bgColor: 'green.700'
      })
    } catch (error) {
      console.log({ error })
    } finally {
      setLoading(false)
    }
  }

  async function handleProfileUpdate(data: ProfileProps) {
    try {
      setLoading(true)

      const userUpdated = user
      userUpdated.name = data.name

      await api.put('/users', data)

      await updateUserProfile(userUpdated)

      toast.show({
        title: 'Perfil atualizado com sucesso!',
        placement: 'top',
        bgColor: 'green.700'
      })
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível atualizar o perfil'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setLoading(false)
    }
  }

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
            {loading ? (
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
                source={
                  user.avatar
                    ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                    : defaultUserPhoto
                }
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

            <Controller
              name='email'
              control={control}
              render={({ field: { value } }) => (
                <Input
                  bg={'gray.600'}
                  placeholder='E-mail'
                  value={value}
                  isDisabled={true}
                />
              )}
              disabled={true}
            />

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
              render={({ field: { onChange } }) => (
                <Input
                  bg={'gray.600'}
                  secureTextEntry
                  placeholder='Senha antiga'
                  onChangeText={onChange}
                  errorMessage={errors.old_password?.message}
                />
              )}
            />

            <Controller
              name='password'
              control={control}
              render={({ field: { onChange } }) => (
                <Input
                  bg={'gray.600'}
                  secureTextEntry
                  placeholder='Nova senha'
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Controller
              name='confirm_password'
              control={control}
              render={({ field: { onChange } }) => (
                <Input
                  bg={'gray.600'}
                  secureTextEntry
                  placeholder='Confirme a nova senha'
                  onChangeText={onChange}
                  errorMessage={errors.confirm_password?.message}
                />
              )}
            />

            <Button
              text='Atualizar'
              mt={4}
              onPress={handleSubmit(handleProfileUpdate)}
              isLoading={loading}
            />
          </Center>
        </ScrollView>
      </KeyboardAvoidingView>
    </VStack>
  )
}
