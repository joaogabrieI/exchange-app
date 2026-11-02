import CurrencyFlag from '../CurrencyFlag/CurrencyFlag'
import SortableHeader from '../SortableHeader/SortableHeader'
import { useLanguage } from '../../hooks/useLanguage'
import { formatDate, formatPercent, formatRate } from '../../utils/format'
import styles from './RatesGrid.module.css'

function changeClass(change) {
  if (change > 0) return styles.up
  if (change < 0) return styles.down
  return ''
}

// Versão desktop: tabela semântica.
function RatesGrid({ records, sort, onSort, caption }) {
  const { t, locale } = useLanguage()

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <caption className="visually-hidden">{caption}</caption>
        <thead>
          <tr>
            <SortableHeader
              label={t.table.columns.date}
              direction={sort.column === 'date' ? sort.direction : null}
              onSort={() => onSort('date')}
            />
            <th scope="col">{t.table.columns.from}</th>
            <th scope="col">{t.table.columns.to}</th>
            <SortableHeader
              label={t.table.columns.rate}
              direction={sort.column === 'rate' ? sort.direction : null}
              onSort={() => onSort('rate')}
            />
            <th scope="col">{t.table.columns.change}</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.date}>
              <td>{formatDate(record.date, locale)}</td>
              <td>
                <span className={styles.currency}>
                  <CurrencyFlag code={record.from} size={18} />
                  {record.from}
                </span>
              </td>
              <td>
                <span className={styles.currency}>
                  <CurrencyFlag code={record.to} size={18} />
                  {record.to}
                </span>
              </td>
              <td className={styles.rate}>{formatRate(record.rate, locale)}</td>
              <td className={`${styles.change} ${changeClass(record.dailyChange)}`}>
                {record.dailyChange === null ? '' : formatPercent(record.dailyChange, locale)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RatesGrid
