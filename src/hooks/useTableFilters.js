import { useMemo, useState } from 'react'
import { applyFilters, countActiveFilters, EMPTY_FILTERS, validateFilters } from '../utils/filters'
import { getTotalPages } from '../utils/pagination'
import { DEFAULT_SORT, sortRecords, toggleSort } from '../utils/sort'

const PAGE_SIZE = 8
const MOBILE_INITIAL = 5
const MOBILE_STEP = 10

// Concentra o estado da tabela: filtros, ordenação, página e "ver mais".
export function useTableFilters(records, thousandsSeparator) {
  const [values, setValues] = useState(EMPTY_FILTERS)
  // Últimos critérios válidos. Com filtro inválido, eles não mudam e a tabela mantém o resultado.
  const [criteria, setCriteria] = useState(() => validateFilters(EMPTY_FILTERS).criteria)
  const [sort, setSort] = useState(DEFAULT_SORT)
  const [page, setPage] = useState(1)
  const [visibleCount, setVisibleCount] = useState(MOBILE_INITIAL)

  const { errors } = validateFilters(values, thousandsSeparator)

  const filtered = useMemo(
    () => sortRecords(applyFilters(records, criteria), sort),
    [records, criteria, sort],
  )

  function resetView() {
    setPage(1)
    setVisibleCount(MOBILE_INITIAL)
  }

  function setFilter(field, value) {
    const nextValues = { ...values, [field]: value }
    const next = validateFilters(nextValues, thousandsSeparator)

    setValues(nextValues)
    if (Object.keys(next.errors).length === 0) {
      setCriteria(next.criteria)
      resetView()
    }
  }

  function clearFilters() {
    setValues(EMPTY_FILTERS)
    setCriteria(validateFilters(EMPTY_FILTERS).criteria)
    resetView()
  }

  function sortBy(column) {
    setSort(toggleSort(sort, column))
    resetView()
  }

  function changeSort(nextSort) {
    setSort(nextSort)
    resetView()
  }

  const totalPages = getTotalPages(filtered.length, PAGE_SIZE)
  const firstIndex = (page - 1) * PAGE_SIZE

  return {
    values,
    errors,
    criteria,
    hasErrors: Object.keys(errors).length > 0,
    activeCount: countActiveFilters(values),
    setFilter,
    clearFilters,
    sort,
    sortBy,
    changeSort,
    filtered,
    page,
    totalPages,
    setPage,
    pageRecords: filtered.slice(firstIndex, firstIndex + PAGE_SIZE),
    firstShown: filtered.length === 0 ? 0 : firstIndex + 1,
    lastShown: Math.min(firstIndex + PAGE_SIZE, filtered.length),
    mobileRecords: filtered.slice(0, visibleCount),
    nextBatch: Math.min(MOBILE_STEP, Math.max(0, filtered.length - visibleCount)),
    showMore: () => setVisibleCount(visibleCount + MOBILE_STEP),
  }
}
