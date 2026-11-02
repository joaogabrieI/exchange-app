import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useIsMobile } from '../../hooks/useIsMobile'
import { useLanguage } from '../../hooks/useLanguage'
import { getDateTicks, getYearTicks, getYTicks } from '../../utils/chartAxis'
import { formatDate, formatDayMonth, formatNumber, formatRatePair } from '../../utils/format'
import styles from './HistoryChart.module.css'

const COLORS = {
  primary: '#0D5C46',
  soft: '#E6F0EC',
  grid: '#EEEFEA',
  axis: '#D5D7D0',
  subtle: '#8A909A',
  ink: '#14181F',
}

function ChartTooltip({ active, payload, from, to, locale }) {
  if (!active || !payload?.length) return null
  const { date, rate } = payload[0].payload

  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipDate}>{formatDate(date, locale)}</p>
      <p className={styles.tooltipRate}>{formatRatePair(rate, from, to, locale)}</p>
    </div>
  )
}

function HistoryChart({ points, from, to, weekly = false, label }) {
  const { locale } = useLanguage()
  const isMobile = useIsMobile()

  const rates = points.map((point) => point.rate)
  const { ticks: yTicks, decimals } = getYTicks(
    Math.min(...rates),
    Math.max(...rates),
    isMobile ? 4 : 6,
  )
  const xTicks = weekly
    ? getYearTicks(points, isMobile ? 4 : 6)
    : getDateTicks(points, isMobile ? 3 : 5)

  const tickStyle = { fill: COLORS.subtle, fontSize: isMobile ? 10 : 11 }

  return (
    <div className={styles.chart} role="img" aria-label={label}>
      <ResponsiveContainer width="100%" height={isMobile ? 168 : 263}>
        <AreaChart data={points} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="history-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.primary} stopOpacity={0.16} />
              <stop offset="100%" stopColor={COLORS.soft} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke={COLORS.grid} />
          <XAxis
            dataKey="date"
            ticks={xTicks}
            interval={0}
            tickFormatter={(date) => (weekly ? date.slice(0, 4) : formatDayMonth(date, locale))}
            tick={tickStyle}
            tickLine={false}
            tickMargin={8}
            axisLine={{ stroke: COLORS.axis }}
          />
          <YAxis
            domain={[yTicks[0], yTicks[yTicks.length - 1]]}
            ticks={yTicks}
            tickFormatter={(value) => formatNumber(value, locale, decimals)}
            tick={tickStyle}
            tickLine={false}
            axisLine={false}
            width={isMobile ? 40 : 56}
          />
          <Tooltip
            cursor={{ stroke: COLORS.ink, strokeWidth: 1 }}
            content={<ChartTooltip from={from} to={to} locale={locale} />}
          />
          <Area
            type="monotone"
            dataKey="rate"
            stroke={COLORS.primary}
            strokeWidth={2}
            fill="url(#history-area)"
            dot={false}
            activeDot={{ r: 6, fill: '#FFFFFF', stroke: COLORS.primary, strokeWidth: 2 }}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default HistoryChart
