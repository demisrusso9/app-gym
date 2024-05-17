import { useCallback, useState } from 'react'
import { VStack, Heading, SectionList, Text, useToast } from 'native-base'

import { HistoryCard } from '@/components/HistoryCard'
import { ScreenHeader } from '@/components/ScreenHeader'
import { Loading } from '@/components/Loading'
import { api } from '@/services/api'
import { AppError } from '@/utils/AppError'
import { useFocusEffect } from '@react-navigation/native'
import { HistoryByDayDTO } from '@/dtos/HistoryByDayDTO'

export function History() {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([])

  async function fetchHistory() {
    try {
      setLoading(true)

      const { data } = await api.get('/history')

      setExercises(data)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar o histórico.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory()
    }, [])
  )

  return (
    <VStack flex={1}>
      <ScreenHeader title='Histórico de Exercícios' />

      {loading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <HistoryCard
              name={item.name}
              duration={item.hour}
              exercise={item.group}
            />
          )}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section }) => (
            <Heading
              color={'gray.200'}
              fontSize={'md'}
              mt={10}
              mb={3}
              fontFamily={'heading'}
            >
              {section.title}
            </Heading>
          )}
          contentContainerStyle={
            exercises.length === 0 && {
              flex: 1,
              justifyContent: 'center'
            }
          }
          ListEmptyComponent={() => (
            <Text color={'gray.100'} fontSize={'md'} textAlign={'center'}>
              Nenhum exercício encontrado. {'\n'}
              Vamos treinar hoje?
            </Text>
          )}
          px={8}
          showsVerticalScrollIndicator={false}
        />
      )}
    </VStack>
  )
}
