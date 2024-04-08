import { useNavigation } from '@react-navigation/native'
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import LogoSvg from '@/assets/logo.svg'
import BackgroundImg from '@/assets/background.png'

export function SignUp() {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
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

          <Input placeholder='Nome' />

          <Input
            placeholder='E-mail'
            keyboardType='email-address'
            autoCapitalize='none'
          />

          <Input placeholder='Senha' secureTextEntry />
          <Input placeholder='Confirme a Senha' secureTextEntry />

          <Button text='Criar e acessar' />
        </Center>

        <Button
          mt={20}
          text='Voltar para o login'
          variant={'outline'}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  )
}
