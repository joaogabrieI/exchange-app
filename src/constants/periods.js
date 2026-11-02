// amount + unit alimentam o cálculo do intervalo em utils/periods.js.
// weekly: true indica que o gráfico agrega a série por semana.
export const PERIODS = [
  { id: '7D', amount: 7, unit: 'days' },
  { id: '15D', amount: 15, unit: 'days' },
  { id: '30D', amount: 30, unit: 'days' },
  { id: '3M', amount: 3, unit: 'months' },
  { id: '6M', amount: 6, unit: 'months' },
  { id: '1A', amount: 1, unit: 'years' },
  { id: '5A', amount: 5, unit: 'years', weekly: true },
  { id: '10A', amount: 10, unit: 'years', weekly: true },
]

export const DEFAULT_PERIOD_ID = '30D'
