import { LoaderCircle, RotateCw, SearchX, TriangleAlert, WifiOff } from 'lucide-react'
import Button from '../Button/Button'
import Card from '../Card/Card'
import HistoryChart from '../HistoryChart/HistoryChart'
import PeriodChip from '../PeriodChip/PeriodChip'
import StatCard from '../StatCard/StatCard'
import StatusMessage from '../StatusMessage/StatusMessage'
import { PERIODS } from '../../constants/periods'
import { useIsMobile } from '../../hooks/useIsMobile'
import { useLanguage } from '../../hooks/useLanguage'
import { formatDate, formatPercent, formatRate } from '../../utils/format'
import styles from './HistoryCard.module.css'

function HistoryCard({ from, to, period, onPeriodChange, history }) {
  const { t, locale } = useLanguage()
  const isMobile = useIsMobile()

  const pair = `${from} → ${to}`
  const periodText = (isMobile ? t.history.periodsShort : t.history.periods)[period.id]
  const { status, stats, points, startDate, endDate, retry } = history
  const trend = stats?.change > 0 ? 'up' : stats?.change < 0 ? 'down' : undefined

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
          {PERIODS.map((item) => (
            <PeriodChip
              key={item.id}
              label={item.id}
              active={item.id === period.id}
              onClick={() => onPeriodChange(item.id)}
            />
          ))}
        </div>
      </div>

      {status === 'loading' && (
        <>
          <div className={styles.loadingStats} aria-hidden="true">
            <div className={styles.skeleton} />
            <div className={styles.skeleton} />
            <div className={styles.skeleton} />
            <div className={styles.skeleton} />
          </div>
          <div className={styles.loading} role="status">
            <LoaderCircle className={styles.spinner} size={28} aria-hidden="true" />
            {isMobile ? (
              <>
                <p className={styles.loadingTitle}>{t.status.loadingShort}</p>
                <p className={styles.loadingText}>
                  {pair} · {t.history.periods[period.id]}
                </p>
              </>
            ) : (
              <p className={styles.loadingText}>
                {t.status.loadingRange(formatDate(startDate, locale), formatDate(endDate, locale))}
              </p>
            )}
          </div>
        </>
      )}

      {status === 'error' && (
        <StatusMessage
          icon={WifiOff}
          tone="danger"
          title={t.status.errorTitle}
          description={t.status.errorText}
          role="alert"
        >
          <Button variant="dark" icon={RotateCw} onClick={retry}>
            {t.status.retry}
          </Button>
        </StatusMessage>
      )}

      {status === 'idle' && <StatusMessage icon={TriangleAlert} title={t.history.samePair} />}

      {status === 'ready' && !stats && (
        <StatusMessage
          icon={SearchX}
          title={t.history.noData}
          description={t.history.noDataHint}
          role="status"
        />
      )}

      {stats && (
        <>
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
            weekly={period.weekly}
            label={t.history.chartLabel(pair, periodText)}
          />
          {period.weekly && <p className={styles.note}>{t.history.weeklyNote}</p>}
        </>
      )}
    </Card>
  )
}

export default HistoryCard
