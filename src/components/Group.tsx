import { Pressable, IPressableProps, Text } from 'native-base'

interface GroupProps extends IPressableProps {
  name: string
  isActive: boolean
}

export function Group({ name, isActive, ...rest }: GroupProps) {
  return (
    <Pressable
      mr={3}
      w={24}
      h={10}
      bg={'gray.600'}
      rounded={'md'}
      justifyContent={'center'}
      alignItems={'center'}
      isPressed={isActive}
      _pressed={{
        borderColor: 'green.500',
        borderWidth: 1
      }}
      // overflow={'hidden'}
      {...rest}
    >
      <Text
        color={isActive ? 'green.500' : 'gray.200'}
        textTransform={'uppercase'}
        fontSize={'xs'}
        fontWeight={'bold'}
      >
        {name}
      </Text>
    </Pressable>
  )
}
