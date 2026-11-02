// Dados fixos do design, usados no layout estático até a integração com a API.
const RATES = [
  ['2026-10-30', 5.3123, 0.16],
  ['2026-10-29', 5.3037, -0.4],
  ['2026-10-28', 5.3251, 0.49],
  ['2026-10-26', 5.3108, -0.71],
  ['2026-10-23', 5.3369, -0.67],
  ['2026-10-22', 5.3611, -0.36],
  ['2026-10-21', 5.3744, 0.85],
  ['2026-10-20', 5.345, -0.51],
]

export const MOCK_RECORDS = RATES.map(([date, rate, dailyChange]) => ({
  date,
  from: 'USD',
  to: 'BRL',
  rate,
  dailyChange,
}))

export const MOCK_STATS = { last: 5.3123, change: -2.87, max: 5.4693, min: 5.2871 }
