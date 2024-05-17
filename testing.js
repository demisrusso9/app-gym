const groups = [
  'antebraço',
  'bíceps',
  'costas',
  'ombro',
  'peito',
  'pernas',
  'trapézio',
  'tríceps'
]

const exercises = [
  {
    id: 1,
    name: 'Supino inclinado com barra',
    series: 4,
    repetitions: 12,
    group: 'peito',
    demo: 'supino_inclinado_com_barra.gif',
    thumb: 'supino_inclinado_com_barra.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  },
  {
    id: 2,
    name: 'Crucifixo reto',
    series: 3,
    repetitions: 12,
    group: 'peito',
    demo: 'crucifixo_reto.gif',
    thumb: 'crucifixo_reto.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  },
  {
    id: 3,
    name: 'Supino reto com barra',
    series: 3,
    repetitions: 12,
    group: 'peito',
    demo: 'supino_reto_com_barra.gif',
    thumb: 'supino_reto_com_barra.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  },
  {
    id: 4,
    name: 'Francês deitado com halteres',
    series: 3,
    repetitions: 12,
    group: 'tríceps',
    demo: 'frances_deitado_com_halteres.gif',
    thumb: 'frances_deitado_com_halteres.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  },
  {
    id: 5,
    name: 'Corda Cross',
    series: 4,
    repetitions: 12,
    group: 'tríceps',
    demo: 'corda_cross.gif',
    thumb: 'corda_cross.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  },
  {
    id: 6,
    name: 'Barra Cross',
    series: 3,
    repetitions: 12,
    group: 'tríceps',
    demo: 'barra_cross.gif',
    thumb: 'barra_cross.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  },
  {
    id: 7,
    name: 'Tríceps testa',
    series: 4,
    repetitions: 12,
    group: 'tríceps',
    demo: 'triceps_testa.gif',
    thumb: 'triceps_testa.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  },
  {
    id: 8,
    name: 'Levantamento terra',
    series: 3,
    repetitions: 12,
    group: 'costas',
    demo: 'levantamento_terra.gif',
    thumb: 'levantamento_terra.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  },
  {
    id: 9,
    name: 'Pulley frontal',
    series: 3,
    repetitions: 12,
    group: 'costas',
    demo: 'pulley_frontal.gif',
    thumb: 'pulley_frontal.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  },
  {
    id: 10,
    name: 'Pulley atrás',
    series: 4,
    repetitions: 12,
    group: 'costas',
    demo: 'pulley_atras.gif',
    thumb: 'pulley_atras.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  },
  {
    id: 11,
    name: 'Remada baixa',
    series: 4,
    repetitions: 12,
    group: 'costas',
    demo: 'remada_baixa.gif',
    thumb: 'remada_baixa.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  },
  {
    id: 12,
    name: 'Serrote',
    series: 4,
    repetitions: 12,
    group: 'costas',
    demo: 'serrote.gif',
    thumb: 'serrote.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  },
  {
    id: 13,
    name: 'Rosca alternada com banco inclinado',
    series: 4,
    repetitions: 12,
    group: 'bíceps',
    demo: 'rosca_alternada_com_banco_inclinado.gif',
    thumb: 'rosca_alternada_com_banco_inclinado.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  },
  {
    id: 14,
    name: 'Rosca Scott barra w',
    series: 4,
    repetitions: 12,
    group: 'bíceps',
    demo: 'rosca_scott_barra_w.gif',
    thumb: 'rosca_scott_barra_w.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  },
  {
    id: 15,
    name: 'Rosca direta barra reta',
    series: 3,
    repetitions: 12,
    group: 'bíceps',
    demo: 'rosca_direta_barra_reta.gif',
    thumb: 'rosca_direta_barra_reta.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  },
  {
    id: 16,
    name: 'Martelo em pé',
    series: 3,
    repetitions: 12,
    group: 'bíceps',
    demo: 'martelo_em_pe.gif',
    thumb: 'martelo_em_pe.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  },
  {
    id: 17,
    name: 'Rosca punho',
    series: 4,
    repetitions: 12,
    group: 'antebraço',
    demo: 'rosca_punho.gif',
    thumb: 'rosca_punho.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  },
  {
    id: 18,
    name: 'Leg press 45 graus',
    series: 4,
    repetitions: 12,
    group: 'pernas',
    demo: 'leg_press_45_graus.gif',
    thumb: 'leg_press_45_graus.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  },
  {
    id: 19,
    name: 'Extensor de pernas',
    series: 4,
    repetitions: 12,
    group: 'pernas',
    demo: 'extensor_de_pernas.gif',
    thumb: 'extensor_de_pernas.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  },
  {
    id: 20,
    name: 'Abdutora',
    series: 4,
    repetitions: 12,
    group: 'pernas',
    demo: 'abdutora.gif',
    thumb: 'abdutora.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  },
  {
    id: 21,
    name: 'Stiff',
    series: 4,
    repetitions: 12,
    group: 'pernas',
    demo: 'stiff.gif',
    thumb: 'stiff.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  },
  {
    id: 22,
    name: 'Neck Press',
    series: 4,
    repetitions: 10,
    group: 'ombro',
    demo: 'neck-press.gif',
    thumb: 'neck-press.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  },
  {
    id: 23,
    name: 'Desenvolvimento maquina',
    series: 3,
    repetitions: 10,
    group: 'ombro',
    demo: 'desenvolvimento_maquina.gif',
    thumb: 'desenvolvimento_maquina.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  },
  {
    id: 24,
    name: 'Elevação lateral com halteres sentado',
    series: 4,
    repetitions: 10,
    group: 'ombro',
    demo: 'elevacao_lateral_com_halteres_sentado.gif',
    thumb: 'elevacao_lateral_com_halteres_sentado.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  },
  {
    id: 25,
    name: 'Encolhimento com halteres',
    series: 4,
    repetitions: 10,
    group: 'trapézio',
    demo: 'encolhimento_com_halteres.gif',
    thumb: 'encolhimento_com_halteres.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  },
  {
    id: 26,
    name: 'Encolhimento com barra',
    series: 4,
    repetitions: 10,
    group: 'trapézio',
    demo: 'encolhimento_com_barra.gif',
    thumb: 'encolhimento_com_barra.png',
    created_at: '2023-01-31 17:36:21',
    updated_at: '2023-01-31 17:36:21'
  }
]

const groupedExercises = groups.map((group, index) => {
  if(group === exercises[index].group) {
    return {
      group: {
        ...exercises[index]
      }
    }
  }

  return 1
})

console.log({ groupedExercises })
