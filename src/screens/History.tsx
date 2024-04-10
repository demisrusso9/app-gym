import { useState } from 'react'
import { VStack, Heading, SectionList, Text } from 'native-base'

import { HistoryCard } from '@/components/HistoryCard'
import { ScreenHeader } from '@/components/ScreenHeader'

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '09.04.24',
      data: ['Puxada Frontal', 'Remada Unica']
    },
    {
      title: '10.04.24',
      data: ['Puxada Frontal']
    }
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader title='Histórico de Exercícios' />

      <SectionList
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => <HistoryCard />}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          <Heading color={'gray.200'} fontSize={'md'} mt={10} mb={3}>
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
    </VStack>
  )
}
