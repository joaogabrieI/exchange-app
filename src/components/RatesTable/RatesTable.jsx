import { Download } from 'lucide-react'
import Badge from '../Badge/Badge'
import Button from '../Button/Button'
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination'
import RatesGrid from '../RatesGrid/RatesGrid'
import RatesList from '../RatesList/RatesList'
import TableFilters from '../TableFilters/TableFilters'
import { useIsMobile } from '../../hooks/useIsMobile'
import { useLanguage } from '../../hooks/useLanguage'
import styles from './RatesTable.module.css'

const EMPTY_FILTERS = { startDate: '', endDate: '', minRate: '', maxRate: '' }
const noop = () => {}

function RatesTable({ from, to, records }) {
  const { t } = useLanguage()
  const isMobile = useIsMobile()
  const pair = `${from} → ${to}`
  const total = records.length

  return (
    <Card className={styles.card} aria-labelledby="table-title">
      <div className={styles.header}>
        <div className={styles.headings}>
          <p className={styles.overline}>{t.table.title}</p>
          <div className={styles.titleRow}>
            <h2 id="table-title" className={styles.title}>
              {pair}
            </h2>
            <Badge>{(isMobile ? t.table.countShort : t.table.count)(total, total)}</Badge>
          </div>
        </div>
        {!isMobile && (
          <Button icon={Download}>{t.table.export}</Button>
        )}
      </div>

      <TableFilters
        values={EMPTY_FILTERS}
        errors={{}}
        activeCount={0}
        sortValue="date-desc"
        onChange={noop}
        onClear={noop}
        onSortChange={noop}
      />

      {isMobile ? (
        <RatesList records={records} caption={t.table.caption(pair)} />
      ) : (
        <RatesGrid
          records={records}
          sort={{ column: 'date', direction: 'desc' }}
          onSort={noop}
          caption={t.table.caption(pair)}
        />
      )}

      {isMobile ? (
        <Button variant="primary" icon={Download} fullWidth>
          {t.table.exportCount(total)}
        </Button>
      ) : (
        <div className={styles.footer}>
          <p className={styles.showing}>{t.table.showing(1, total, total)}</p>
          <Pagination page={1} totalPages={1} onPageChange={noop} />
        </div>
      )}
    </Card>
  )
}

export default RatesTable
