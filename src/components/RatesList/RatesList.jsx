import { useLanguage } from '../../hooks/useLanguage'
import { formatDate, formatPercent, formatRate } from '../../utils/format'
import styles from './RatesList.module.css'

function changeClass(change) {
  if (change > 0) return styles.up
  if (change < 0) return styles.down
  return ''
}

// Versão mobile: lista em duas colunas, no lugar da tabela.
function RatesList({ records, caption }) {
  const { locale } = useLanguage()

  return (
    <ul className={styles.list} aria-label={caption}>
      {records.map((record) => (
        <li key={record.date} className={styles.row}>
          <div>
            <p className={styles.date}>{formatDate(record.date, locale)}</p>
            <p className={styles.pair}>
              {record.from} → {record.to}
            </p>
          </div>
          <div className={styles.values}>
            <p className={styles.rate}>{formatRate(record.rate, locale)}</p>
            {record.dailyChange !== null && (
              <p className={`${styles.change} ${changeClass(record.dailyChange)}`}>
                {formatPercent(record.dailyChange, locale)}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default RatesList
