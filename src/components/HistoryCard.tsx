import { HStack, Heading, VStack, Text } from 'native-base'

interface HistoryCardProps {
  name: string
  exercise: string
  duration: string
}

export function HistoryCard({ name, exercise, duration }: HistoryCardProps) {
  return (
    <HStack
      bg={'gray.600'}
      px={5}
      mb={3}
      py={4}
      w={'full'}
      rounded={'md'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <VStack>
        <Heading
          fontFamily={'heading'}
          color={'white'}
          fontSize={'md'}
          textTransform={'capitalize'}
          flexShrink={1}
        >
          {exercise}
        </Heading>

        <Text color={'gray.100'} fontSize={'lg'} numberOfLines={1}>
          {name}
        </Text>
      </VStack>

      <Text color={'gray.300'} fontSize={'md'}>
        {duration}
      </Text>
    </HStack>
  )
}
