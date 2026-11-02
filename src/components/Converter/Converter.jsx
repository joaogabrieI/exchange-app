import { ArrowLeftRight, ArrowUpDown, Calendar, Info } from 'lucide-react'
import Card from '../Card/Card'
import CurrencySelect from '../CurrencySelect/CurrencySelect'
import { useIsMobile } from '../../hooks/useIsMobile'
import { useLanguage } from '../../hooks/useLanguage'
import { formatAmount, formatDate, formatRatePair } from '../../utils/format'
import styles from './Converter.module.css'

function Converter({ from, to, amount, rate, effectiveDate, currencies, onFromChange, onToChange }) {
  const { t, locale } = useLanguage()
  const isMobile = useIsMobile()
  const SwapIcon = isMobile ? ArrowUpDown : ArrowLeftRight

  return (
    <Card className={styles.card} aria-labelledby="converter-title">
      <div className={styles.top}>
        <h2 id="converter-title" className={styles.overline}>
          {isMobile ? t.converter.titleShort : t.converter.title}
        </h2>
        <p className={styles.quoteDate}>
          {!isMobile && <Calendar size={14} aria-hidden="true" />}
          {t.converter.quoteOf(formatDate(effectiveDate, locale))}
        </p>
      </div>

      <div className={styles.fields}>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="converter-amount">
            {t.converter.send}
          </label>
          <div className={styles.fieldBox}>
            <input id="converter-amount" className={styles.amount} defaultValue={amount} />
            <CurrencySelect
              label={t.converter.send}
              value={from}
              options={currencies.options}
              status={currencies.status}
              onRetry={currencies.retry}
              onChange={onFromChange}
            />
          </div>
        </div>

        <div className={styles.swapSlot}>
          <button type="button" className={styles.swap} aria-label={t.converter.swap}>
            <SwapIcon size={isMobile ? 18 : 20} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.field}>
          <span className={styles.fieldLabel}>{t.converter.receive}</span>
          <div className={`${styles.fieldBox} ${styles.fieldBoxOutput}`}>
            <output className={styles.result}>{formatAmount(amount * rate, locale)}</output>
            <CurrencySelect
              label={t.converter.receive}
              value={to}
              options={currencies.options}
              status={currencies.status}
              onRetry={currencies.retry}
              onChange={onToChange}
              variant="outlined"
            />
          </div>
        </div>
      </div>

      <div className={styles.rateInfo}>
        <dl className={styles.rates}>
          <div className={styles.rate}>
            <dt>{t.converter.rateUsed}</dt>
            <dd>{formatRatePair(rate, from, to, locale)}</dd>
          </div>
          <div className={styles.rate}>
            <dt>{t.converter.rateInverse}</dt>
            <dd>{formatRatePair(1 / rate, to, from, locale)}</dd>
          </div>
          <div className={styles.rate}>
            <dt>{isMobile ? t.converter.effectiveDateShort : t.converter.effectiveDate}</dt>
            <dd>{formatDate(effectiveDate, locale)}</dd>
          </div>
        </dl>
        {!isMobile && (
          <p className={styles.hint}>
            <Info size={14} aria-hidden="true" />
            {t.converter.hint}
          </p>
        )}
      </div>
    </Card>
  )
}

export default Converter
