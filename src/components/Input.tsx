import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base'

interface InputProps extends IInputProps {
  errorMessage?: string | null
}

export function Input({ errorMessage = null, isInvalid, ...rest }: InputProps) {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid}>
      <FormControl.ErrorMessage mb={1}>{errorMessage}</FormControl.ErrorMessage>

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
        keyboardAppearance='dark'
        _focus={{
          bg: 'gray.700',
          borderColor: 'green.500'
        }}
        {...rest}
      />
    </FormControl>
  )
}
