import { useCallback, useEffect, useState } from 'react'
import { FlatList, HStack, Heading, VStack, Text, useToast } from 'native-base'
import { Group } from '@/components/Group'
import { HomeHeader } from '@/components/HomeHeader'
import { ExerciseCard } from '@/components/ExerciseCard'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@/routes/app.routes'
import { api } from '@/services/api'
import { AppError } from '@/utils/AppError'
import { ExerciseDTO } from '@/dtos/ExerciseDTO'
import { Loading } from '@/components/Loading'

export function Home() {
  const toast = useToast()
  const { navigate } = useNavigation<AppNavigationRoutesProps>()

  const [groups, setGroups] = useState<string[]>([])
  const [exercises, setExercises] = useState<ExerciseDTO[]>([])
  const [groupSelected, setGroupSelected] = useState('')
  const [loading, setLoading] = useState(false)

  function handleOpenExerciseDetails(exercise: ExerciseDTO) {
    navigate('exercise', { exercise })
  }

  async function fetchGroups() {
    try {
      setLoading(true)
      const { data } = await api.get('/groups')

      setGroups(data)
      setGroupSelected(data[0])
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os grupos'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setLoading(false)
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setLoading(true)
      const { data } = await api.get(`/exercises/bygroup/${groupSelected}`)

      setExercises(data)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os exercícios'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup()
    }, [groupSelected])
  )

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
          <Heading color={'gray.200'} fontSize={'md'} fontFamily={'heading'}>
            <Text>Exercícios</Text>
          </Heading>

          <Text color={'gray.200'} fontSize={'sm'}>
            {exercises.length}
          </Text>
        </HStack>

        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={exercises}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                name={item.name}
                series={item.series}
                repetitions={item.repetitions}
                thumb={item.thumb}
                onPress={() => handleOpenExerciseDetails(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ pb: 20 }}
          />
        )}
      </VStack>
    </VStack>
  )
}
