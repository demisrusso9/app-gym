import { HStack, Heading, VStack, Text } from 'native-base'

export function HistoryCard() {
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
          color={'white'}
          fontSize={'md'}
          textTransform={'capitalize'}
          flexShrink={1}
        >
          Costas
        </Heading>

        <Text color={'gray.100'} fontSize={'lg'} numberOfLines={1}>
          Puxada Frontal
        </Text>
      </VStack>

      <Text color={'gray.300'} fontSize={'md'}>
        21:56
      </Text>
    </HStack>
  )
}
