import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'
import { StatusBar } from 'react-native'
import { GluestackUIProvider, Text, Box } from '@gluestack-ui/themed'
import { Loading } from '@/components/Loading'
import { config } from '@/theme'

export default function App() {
  const [fonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <GluestackUIProvider config={config}>
      <Box width='100%' justifyContent='center' alignItems='center' flex={1}>
        <StatusBar
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />

        {!fonts ? <Text>Fonts Loaded</Text> : <Loading />}
      </Box>
    </GluestackUIProvider>
  )
}
