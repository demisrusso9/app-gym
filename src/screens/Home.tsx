import { useState } from 'react'
import { FlatList, HStack, Heading, VStack, Text } from 'native-base'
import { Group } from '@/components/Group'
import { HomeHeader } from '@/components/HomeHeader'
import { ExerciseCard } from '@/components/ExerciseCard'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@/routes/app.routes'

export function Home() {
  const { navigate } = useNavigation<AppNavigationRoutesProps>()

  const [groups, setGroups] = useState([
    'costa',
    'ombro',
    'biceps',
    'triceps',
    'peitoral',
    'perna'
  ])

  const [exercises, setExercises] = useState([
    {
      name: 'Costa',
      text: '3 séries x 12 repetições'
    },
    {
      name: 'Ombro',
      text: '3 séries x 12 repetições'
    },
    {
      name: 'Biceps',
      text: '3 séries x 12 repetições'
    },
    {
      name: 'Triceps',
      text: '3 séries x 12 repetições'
    },
    {
      name: 'Peitoral',
      text: '3 séries x 12 repetições'
    },
    {
      name: 'Perna',
      text: '3 séries x 12 repetições'
    }
  ])

  const [groupSelected, setGroupSelected] = useState('costa')

  function handleOpenExerciseDetails() {
    navigate('exercise')
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent={'space-between'} mb={8}>
          <Heading color={'gray.200'} fontSize={'md'}>
            <Text>Exercícios</Text>
          </Heading>

          <Text color={'gray.200'} fontSize={'sm'}>
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <ExerciseCard
              name={item.name}
              text={item.text}
              onPress={() => handleOpenExerciseDetails()}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 20 }}
        />
      </VStack>
    </VStack>
  )
}
