import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { HStack, Heading, Image, VStack, Text, Icon } from 'native-base'
import { Entypo } from '@expo/vector-icons'

interface ExerciseCardProps extends TouchableOpacityProps {
  name: string
  text: string
}

export function ExerciseCard({ name, text, ...rest }: ExerciseCardProps) {
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
            uri: 'https://fastly.picsum.photos/id/244/600/600.jpg?hmac=OeAzRT1ePNH0wsvaO680ILDE0pSs4gc0l9phxsXicnc'
          }}
          alt='Exercise'
          resizeMode='center'
          width={16}
          height={16}
          rounded={'md'}
          mr={4}
        />

        <VStack flex={1}>
          <Heading fontSize={'lg'} color={'white'}>
            {name}
          </Heading>

          <Text fontSize={'sm'} color={'gray.200'} mt={1} numberOfLines={2}>
            {text}
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
