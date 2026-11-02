import { format, subDays, subMonths, subYears } from 'date-fns'

const SUBTRACT = { days: subDays, months: subMonths, years: subYears }

export function toIsoDate(date) {
  return format(date, 'yyyy-MM-dd')
}

// Transforma um período ({ amount: 3, unit: 'months' }) nas datas da consulta.
export function getPeriodRange(period, today = new Date()) {
  return {
    startDate: toIsoDate(SUBTRACT[period.unit](today, period.amount)),
    endDate: toIsoDate(today),
  }
}
