import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { HStack, Heading, Image, VStack, Text, Icon } from 'native-base'
import { Entypo } from '@expo/vector-icons'
import { api } from '@/services/api'

interface ExerciseCardProps extends TouchableOpacityProps {
  name: string
  series: number
  repetitions: number
  thumb: string
}

export function ExerciseCard({
  name,
  series,
  repetitions,
  thumb,
  ...rest
}: ExerciseCardProps) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg={'gray.500'}
        alignItems={'center'}
        p={2}
        pr={4}
        rounded={'md'}
        mb={3}
      >
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${thumb}`
          }}
          alt='Exercise'
          resizeMode='cover'
          width={16}
          height={16}
          rounded={'md'}
          mr={4}
        />

        <VStack flex={1}>
          <Heading fontSize={'lg'} color={'white'} fontFamily={'heading'}>
            {name}
          </Heading>

          <Text fontSize={'sm'} color={'gray.200'} mt={1} numberOfLines={2}>
            {series} séries x {repetitions} repetições
          </Text>
        </VStack>

        <Icon
          as={Entypo}
          name='chevron-thin-right'
          color={'gray.300'}
          size={5}
        />
      </HStack>
    </TouchableOpacity>
  )
}
