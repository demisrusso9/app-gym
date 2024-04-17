import { HStack, Heading, Icon, Text, VStack, Image, Box } from 'native-base'
import { ScrollView, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import BodySvg from '@/assets/body.svg'
import SeriesSvg from '@/assets/series.svg'
import RepetitionsSvg from '@/assets/repetitions.svg'
import { Button } from '@/components/Button'

export function Exercise() {
  const { goBack } = useNavigation()

  function handleGoBack() {
    goBack()
  }

  return (
    <VStack flex={1}>
      <VStack bg={'gray.600'} px={8} pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name='arrow-left' size={6} color='green.500' />
        </TouchableOpacity>

        <HStack
          justifyContent={'space-between'}
          alignItems={'center'}
          mt={4}
          mb={8}
        >
          <Heading color={'gray.100'} fontSize={'lg'} flexShrink={1}>
            Puxada frontal
          </Heading>

          <HStack alignItems={'center'}>
            <BodySvg />
            <Text
              color={'gray.200'}
              fontSize={'sm'}
              ml={1}
              textTransform={'capitalize'}
            >
              costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack p={8}>
          <Image
            source={{
              uri: 'https://fastly.picsum.photos/id/244/600/600.jpg?hmac=OeAzRT1ePNH0wsvaO680ILDE0pSs4gc0l9phxsXicnc'
            }}
            alt='Exercise'
            resizeMode='cover'
            width={'full'}
            height={80}
            rounded={'lg'}
            mb={3}
          />

          <Box bg={'gray.600'} rounded={'md'} pb={4} px={4}>
            <HStack
              alignItems={'center'}
              justifyContent={'space-around'}
              mb={6}
              mt={5}
            >
              <HStack>
                <SeriesSvg />
                <Text color={'gray.200'} ml={2}>
                  3 séries
                </Text>
              </HStack>

              <HStack>
                <RepetitionsSvg />
                <Text color={'gray.200'} ml={2}>
                  12 repetições
                </Text>
              </HStack>
            </HStack>

            <Button text='Marcar como realizado' />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
