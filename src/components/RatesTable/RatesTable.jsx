import { Download, SearchX, X } from 'lucide-react'
import Badge from '../Badge/Badge'
import Button from '../Button/Button'
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination'
import RatesGrid from '../RatesGrid/RatesGrid'
import RatesList from '../RatesList/RatesList'
import StatusMessage from '../StatusMessage/StatusMessage'
import TableFilters from '../TableFilters/TableFilters'
import { useIsMobile } from '../../hooks/useIsMobile'
import { useLanguage } from '../../hooks/useLanguage'
import { useTableFilters } from '../../hooks/useTableFilters'
import { formatDate, formatRate } from '../../utils/format'
import { sortToValue, valueToSort } from '../../utils/sort'
import styles from './RatesTable.module.css'

// Monta o resumo do estado vazio com os filtros que estão aplicados.
function describeCriteria(criteria, t, locale) {
  const { startDate, endDate, minRate, maxRate } = criteria
  const parts = []

  if (minRate !== null && maxRate !== null) {
    parts.push(t.table.emptyRate(formatRate(minRate, locale), formatRate(maxRate, locale)))
  } else if (minRate !== null) {
    parts.push(t.table.emptyRateMin(formatRate(minRate, locale)))
  } else if (maxRate !== null) {
    parts.push(t.table.emptyRateMax(formatRate(maxRate, locale)))
  }

  if (startDate && endDate) {
    parts.push(t.table.emptyDates(formatDate(startDate, locale), formatDate(endDate, locale)))
  } else if (startDate) {
    parts.push(t.table.emptyDateStart(formatDate(startDate, locale)))
  } else if (endDate) {
    parts.push(t.table.emptyDateEnd(formatDate(endDate, locale)))
  }

  return parts.join(' · ')
}

function RatesTable({ from, to, records }) {
  const { t, locale } = useLanguage()
  const isMobile = useIsMobile()
  const table = useTableFilters(records, t.thousandsSeparator)

  const pair = `${from} → ${to}`
  const total = records.length
  const shown = table.filtered.length
  const isEmpty = shown === 0
  const canExport = !isEmpty && !table.hasErrors

  const errorMessages = {
    dateOrder: t.filters.dateOrderError,
    rateOrder: t.filters.rateOrderError,
    number: t.filters.numberError,
  }
  const errors = Object.fromEntries(
    Object.entries(table.errors).map(([field, code]) => [field, errorMessages[code]]),
  )

  return (
    <Card className={styles.card} aria-labelledby="table-title">
      <div className={styles.header}>
        <div className={styles.headings}>
          <p className={styles.overline}>{t.table.title}</p>
          <div className={styles.titleRow}>
            <h2 id="table-title" className={styles.title}>
              {pair}
            </h2>
            <Badge tone={isEmpty ? 'neutral' : 'primary'} aria-live="polite">
              {(isMobile ? t.table.countShort : t.table.count)(shown, total)}
            </Badge>
          </div>
        </div>
        {!isMobile && (
          <div className={styles.actions}>
            <Button icon={Download} disabled={!canExport}>
              {t.table.export}
            </Button>
          </div>
        )}
      </div>

      <TableFilters
        values={table.values}
        errors={errors}
        activeCount={table.activeCount}
        sortValue={sortToValue(table.sort)}
        onChange={table.setFilter}
        onClear={table.clearFilters}
        onSortChange={(value) => table.changeSort(valueToSort(value))}
      />

      {isEmpty && (
        <StatusMessage
          icon={SearchX}
          title={t.table.emptyTitle}
          description={describeCriteria(table.criteria, t, locale)}
          role="status"
        >
          <Button variant="secondary" icon={X} iconSize={14} onClick={table.clearFilters}>
            {t.filters.clear}
          </Button>
        </StatusMessage>
      )}

      {!isEmpty && !isMobile && (
        <>
          <RatesGrid
            records={table.pageRecords}
            sort={table.sort}
            onSort={table.sortBy}
            caption={t.table.caption(pair)}
          />
          <div className={styles.footer}>
            <p className={styles.showing}>
              {t.table.showing(table.firstShown, table.lastShown, shown)}
            </p>
            <Pagination page={table.page} totalPages={table.totalPages} onPageChange={table.setPage} />
          </div>
        </>
      )}

      {!isEmpty && isMobile && (
        <>
          <RatesList records={table.mobileRecords} caption={t.table.caption(pair)} />
          {table.nextBatch > 0 && (
            <Button variant="secondary" fullWidth onClick={table.showMore}>
              {t.table.loadMore(table.nextBatch)}
            </Button>
          )}
        </>
      )}

      {isMobile && (
        <>
          <Button icon={Download} fullWidth disabled={!canExport}>
            {t.table.exportCount(shown)}
          </Button>
          {isEmpty && <p className={styles.exportHelp}>{t.table.nothingToExport}</p>}
        </>
      )}
    </Card>
  )
}

export default RatesTable
