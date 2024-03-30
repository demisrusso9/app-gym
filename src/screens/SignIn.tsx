import { VStack, Image, Text, Center } from 'native-base'
import BackgroundImg from '@/assets/background.png'
import LogoSvg from '@/assets/logo.svg'

export function SignIn() {
  return (
    <VStack flex={1} backgroundColor='gray.700' width='100%'>
      <Image
        source={BackgroundImg}
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
    </VStack>
  )
}
