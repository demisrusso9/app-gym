import {
  createBottomTabNavigator,
  BottomTabNavigationProp
} from '@react-navigation/bottom-tabs'
import { Home } from '@/screens/Home'
import { History } from '@/screens/History'
import { Exercise } from '@/screens/Exercise'
import { Profile } from '@/screens/Profile'

import HomeSvg from '@/assets/home.svg'
import HistorySvg from '@/assets/history.svg'
import ProfileSvg from '@/assets/profile.svg'
import { useTheme } from 'native-base'
import { Platform } from 'react-native'
import { ExerciseDTO } from '@/dtos/ExerciseDTO'

type AppRoutes = {
  home: undefined
  history: undefined
  profile: undefined
  exercise: {
    exercise: ExerciseDTO
  }
}

export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>

export function AppRoutes() {
  const { sizes, colors } = useTheme()

  const iconSize = sizes[6]

  const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingTop: Platform.OS === 'ios' ? sizes[6] : sizes[8],
          paddingBottom: Platform.OS === 'ios' ? sizes[10] : sizes[8]
        }
      }}
    >
      <Screen
        name='home'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen
        name='history'
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen
        name='profile'
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen
        name='exercise'
        component={Exercise}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  )
}
