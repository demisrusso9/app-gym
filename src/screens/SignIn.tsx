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
import { useForm, Controller } from 'react-hook-form'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import BackgroundImg from '@/assets/background.png'
import LogoSvg from '@/assets/logo.svg'
import { AuthNavigationRoutesProps } from '@/routes/auth.routes'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { useAuth } from '@/hooks/useAuth'
import { AppError } from '@/utils/AppError'
import { useState } from 'react'

interface SignInFormProps {
  email: string
  password: string
}

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  const { signIn } = useAuth()
  const { navigate } = useNavigation<AuthNavigationRoutesProps>()

  const schema = z.object({
    email: z
      .string({ message: 'Informe o e-mail.' })
      .email({ message: 'E-mail inválido.' }),
    password: z.string({ message: 'Informe a senha.' })
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormProps>({
    resolver: zodResolver(schema)
  })

  function handleNewAccount() {
    navigate('signup')
  }

  async function handleLogin({ email, password }: SignInFormProps) {
    try {
      setIsLoading(true)
      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível entrar. Tente novamente mais tarde.'

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
              name='email'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='E-mail'
                  keyboardType='email-address'
                  autoCapitalize='none'
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              name='password'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='Senha'
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Button
              text='Acessar'
              onPress={handleSubmit(handleLogin)}
              isLoading={isLoading}
            />
          </Center>

          <Center mt={24}>
            <Text color={'gray.100'} fontSize={'sm'} fontFamily={'body'} mb={3}>
              Ainda não tem acesso?
            </Text>

            <Button
              text='Criar conta'
              variant={'outline'}
              onPress={handleNewAccount}
            />
          </Center>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
