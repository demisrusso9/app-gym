import { StatusBar } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'
import { NativeBaseProvider } from 'native-base'
import { Loading } from '@/components/Loading'
import { theme } from '@/theme'
import { Routes } from '@/routes'
import { AuthProvider } from '@/contexts/AuthContext'

export default function App() {
  const [fonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />

      <AuthProvider>{fonts ? <Routes /> : <Loading />}</AuthProvider>
    </NativeBaseProvider>
  )
}
