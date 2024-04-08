import { useNavigation } from '@react-navigation/native'
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import BackgroundImg from '@/assets/background.png'
import LogoSvg from '@/assets/logo.svg'
import { AuthNavigationRoutesProps } from '@/routes/auth.routes'

export function SignIn() {
  const { navigate } = useNavigation<AuthNavigationRoutesProps>()

  function handleNewAccount() {
    navigate('signup')
  }

  return (
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

          <Input
            placeholder='E-mail'
            keyboardType='email-address'
            autoCapitalize='none'
          />

          <Input placeholder='Senha' secureTextEntry />

          <Button text='Acessar' />
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
  )
}
