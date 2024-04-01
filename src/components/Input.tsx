import { Input as NativeBaseInput, IInputProps } from 'native-base'

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      bg={'gray.700'}
      h={14}
      px={4}
      borderColor='gray.700'
      fontSize={'md'}
      color={'white'}
      fontFamily={'body'}
      mb={4}
      w={'full'}
      placeholderTextColor={'gray.300'}
      _focus={{
        bg: 'gray.700',
        borderColor: 'green.500',
      }}
      {...rest}
    />
  )
}
