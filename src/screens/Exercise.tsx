import { HStack, Heading, Icon, Text, VStack, Image, Box } from 'native-base'
import { ScrollView, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import BodySvg from '@/assets/body.svg'
import SeriesSvg from '@/assets/series.svg'
import RepetitionsSvg from '@/assets/repetitions.svg'
import { Button } from '@/components/Button'
import { ExerciseDTO } from '@/dtos/ExerciseDTO'
import { api } from '@/services/api'

interface RouteParams {
  exercise: ExerciseDTO
}

export function Exercise() {
  const route = useRoute()
  const { exercise } = route.params as RouteParams
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
          <Heading
            color={'gray.100'}
            fontSize={'lg'}
            flexShrink={1}
            fontFamily={'heading'}
          >
            {exercise.name}
          </Heading>

          <HStack alignItems={'center'}>
            <BodySvg />
            <Text
              color={'gray.200'}
              fontSize={'sm'}
              ml={1}
              textTransform={'capitalize'}
            >
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack p={8}>
          <Image
            source={{
              uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`
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
                  {exercise.series} séries
                </Text>
              </HStack>

              <HStack>
                <RepetitionsSvg />
                <Text color={'gray.200'} ml={2}>
                  {exercise.repetitions} repetições
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
