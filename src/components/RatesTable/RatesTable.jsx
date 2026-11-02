import { useCallback, useState } from 'react'
import { Download, SearchX, X } from 'lucide-react'
import Badge from '../Badge/Badge'
import Button from '../Button/Button'
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination'
import RatesGrid from '../RatesGrid/RatesGrid'
import RatesList from '../RatesList/RatesList'
import StatusMessage from '../StatusMessage/StatusMessage'
import TableFilters from '../TableFilters/TableFilters'
import Toast from '../Toast/Toast'
import { useIsMobile } from '../../hooks/useIsMobile'
import { useLanguage } from '../../hooks/useLanguage'
import { useTableFilters } from '../../hooks/useTableFilters'
import { buildCsv, buildCsvFilename, downloadCsv } from '../../utils/csv'
import { formatDate, formatDayMonth, formatRate } from '../../utils/format'
import { sortToValue, valueToSort } from '../../utils/sort'
import styles from './RatesTable.module.css'

// Monta o resumo do estado vazio. Sem filtro de data, mostra o intervalo dos dados carregados.
function describeCriteria(criteria, records, t, locale) {
  const { startDate, endDate, minRate, maxRate } = criteria
  const parts = []

  if (minRate !== null && maxRate !== null) {
    parts.push(t.table.emptyRate(formatRate(minRate, locale), formatRate(maxRate, locale)))
  } else if (minRate !== null) {
    parts.push(t.table.emptyRateMin(formatRate(minRate, locale)))
  } else if (maxRate !== null) {
    parts.push(t.table.emptyRateMax(formatRate(maxRate, locale)))
  }

  const start = startDate || records[0].date
  const end = endDate || records[records.length - 1].date
  const startText = start.slice(0, 4) === end.slice(0, 4) ? formatDayMonth(start, locale) : formatDate(start, locale)
  parts.push(t.table.emptyDates(startText, formatDate(end, locale)))

  return parts.join(' · ')
}

function RatesTable({ from, to, records }) {
  const { t, locale } = useLanguage()
  const isMobile = useIsMobile()
  const table = useTableFilters(records, t.thousandsSeparator)
  const [exported, setExported] = useState(null)
  const closeToast = useCallback(() => setExported(null), [])

  const pair = `${from} → ${to}`
  const total = records.length
  const shown = table.filtered.length
  const isEmpty = shown === 0
  const canExport = !isEmpty && !table.hasErrors

  const filename = canExport ? buildCsvFilename(from, to, table.filtered) : null

  // table.filtered tem todos os registros filtrados, não só os da página atual.
  function handleExport() {
    downloadCsv(buildCsv(table.filtered), filename)
    setExported({ count: shown, filename })
  }

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
            {filename && <span className={styles.filename}>{filename}</span>}
            <Button icon={Download} disabled={!canExport} onClick={handleExport}>
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
          description={describeCriteria(table.criteria, records, t, locale)}
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
          <Button icon={Download} fullWidth disabled={!canExport} onClick={handleExport}>
            {t.table.exportCount(shown)}
          </Button>
          {isEmpty && <p className={styles.exportHelp}>{t.table.nothingToExport}</p>}
        </>
      )}

      {exported && (
        <Toast
          type="success"
          title={t.table.exportDoneTitle(exported.count)}
          description={t.table.exportDoneText(exported.filename)}
          closeLabel={t.table.close}
          onClose={closeToast}
        />
      )}
    </Card>
  )
}

export default RatesTable
