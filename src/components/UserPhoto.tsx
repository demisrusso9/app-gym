import { Image, IImageProps } from 'native-base'

interface UserPhotoProps extends IImageProps {
  size: number
}

export function UserPhoto({ size, ...rest }: UserPhotoProps) {
  return (
    <Image
      h={size}
      w={size}
      rounded='full'
      borderWidth={2}
      borderColor={'gray.400'}
      {...rest}
    />
  )
}
