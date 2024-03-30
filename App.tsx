import { StatusBar } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'
import { NativeBaseProvider, Box } from 'native-base'
import { Loading } from '@/components/Loading'
import { theme } from '@/theme'
import { SignIn } from '@/screens/SignIn'

export default function App() {
  const [fonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <NativeBaseProvider theme={theme}>
      <Box width='100%' justifyContent='center' alignItems='center' flex={1}>
        <StatusBar
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />

        {fonts ? <SignIn /> : <Loading />}
      </Box>
    </NativeBaseProvider>
  )
}
