import Card from '../Card/Card'
import HistoryChart from '../HistoryChart/HistoryChart'
import PeriodChip from '../PeriodChip/PeriodChip'
import StatCard from '../StatCard/StatCard'
import { PERIODS } from '../../constants/periods'
import { useIsMobile } from '../../hooks/useIsMobile'
import { useLanguage } from '../../hooks/useLanguage'
import { formatPercent, formatRate } from '../../utils/format'
import styles from './HistoryCard.module.css'

function HistoryCard({ from, to, periodId, onPeriodChange, stats, points, weekly }) {
  const { t, locale } = useLanguage()
  const isMobile = useIsMobile()

  const pair = `${from} → ${to}`
  const periodText = (isMobile ? t.history.periodsShort : t.history.periods)[periodId]
  const trend = stats.change > 0 ? 'up' : stats.change < 0 ? 'down' : undefined

  return (
    <Card className={styles.card} aria-labelledby="history-title">
      <div className={styles.header}>
        <div className={styles.headings}>
          <p className={styles.overline}>{t.history.title}</p>
          <h2 id="history-title" className={styles.title}>
            {pair} · {periodText}
          </h2>
        </div>
        <div className={styles.periods} role="group" aria-label={t.history.periodsLabel}>
          {PERIODS.map((period) => (
            <PeriodChip
              key={period.id}
              label={period.id}
              active={period.id === periodId}
              onClick={() => onPeriodChange(period.id)}
            />
          ))}
        </div>
      </div>

      <dl className={styles.stats}>
        <StatCard
          label={isMobile ? t.history.lastShort : t.history.last}
          value={formatRate(stats.last, locale)}
        />
        <StatCard
          label={isMobile ? t.history.changeShort : t.history.change}
          value={formatPercent(stats.change, locale)}
          trend={trend}
        />
        <StatCard label={t.history.max} value={formatRate(stats.max, locale)} />
        <StatCard label={t.history.min} value={formatRate(stats.min, locale)} />
      </dl>

      <HistoryChart
        points={points}
        from={from}
        to={to}
        weekly={weekly}
        label={t.history.chartLabel(pair, periodText)}
      />
      {weekly && <p className={styles.note}>{t.history.weeklyNote}</p>}
    </Card>
  )
}

export default HistoryCard
