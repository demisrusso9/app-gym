import { useNavigation } from '@react-navigation/native'
import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  KeyboardAvoidingView,
  useToast
} from 'native-base'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import LogoSvg from '@/assets/logo.svg'
import BackgroundImg from '@/assets/background.png'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { api } from '@/services/api'
import { AppError } from '@/utils/AppError'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'

interface SignUpFormProps {
  name: string
  email: string
  password: string
  confirm_password: string
}

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const { createAccount } = useAuth()

  const schema = z
    .object({
      name: z.string({ message: 'Informe o nome.' }),
      email: z
        .string({ message: 'Informe o e-mail.' })
        .email({ message: 'E-mail inválido.' }),
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
  } = useForm<SignUpFormProps>({
    resolver: zodResolver(schema)
  })
  const navigation = useNavigation()

  const toast = useToast()

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleSignUp({ name, email, password }: SignUpFormProps) {
    try {
      setIsLoading(true)

      await createAccount(name, email, password)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível criar a conta, tente mais tarde.'

      setIsLoading(false)

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  return (
    <KeyboardAvoidingView behavior='padding'>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        w={'full'}
      >
        <VStack flex={1} px={8}>
          <Image
            source={BackgroundImg}
            defaultSource={BackgroundImg}
            alt='pessoas treinando'
            resizeMode='contain'
            position='absolute'
          />

          <Center my={24}>
            <LogoSvg />

            <Text color='gray.100' fontSize={'sm'}>
              Treine sua mente e o seu corpo
            </Text>
          </Center>

          <Center>
            <Heading
              color={'gray.100'}
              mb={6}
              fontFamily={'heading'}
              fontSize={'xl'}
            >
              Acesse sua conta
            </Heading>

            <Controller
              control={control}
              name='name'
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='Nome'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='email'
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='E-mail'
                  keyboardType='email-address'
                  autoCapitalize='none'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='password'
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='Senha'
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='confirm_password'
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='Confirme a Senha'
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.confirm_password?.message}
                  returnKeyType='send'
                />
              )}
            />

            <Button
              text='Criar e acessar'
              onPress={handleSubmit(handleSignUp)}
              isLoading={isLoading}
            />
          </Center>

          <Button
            mt={16}
            text='Voltar para o login'
            variant={'outline'}
            onPress={handleGoBack}
          />
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
