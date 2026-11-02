import { useState } from 'react'
import {
  ArrowLeftRight,
  ArrowUpDown,
  Calendar,
  CalendarX,
  CircleAlert,
  Info,
  RotateCw,
  TriangleAlert,
  X,
} from 'lucide-react'
import Card from '../Card/Card'
import CurrencySelect from '../CurrencySelect/CurrencySelect'
import { useExchangeRate } from '../../hooks/useExchangeRate'
import { useIsMobile } from '../../hooks/useIsMobile'
import { useLanguage } from '../../hooks/useLanguage'
import { convertAmount, inverseRate, isValidAmount, parseNumber } from '../../utils/convert'
import {
  formatAmount,
  formatConverted,
  formatDate,
  formatRatePair,
  formatWeekday,
} from '../../utils/format'
import { toIsoDate } from '../../utils/periods'
import styles from './Converter.module.css'

// Primeira data publicada pelo BCE. Datas fora do intervalo nem chegam à API.
const MIN_DATE = '1999-01-04'

function Converter({ from, to, currencies, onFromChange, onToChange, onSwap }) {
  const { t, locale } = useLanguage()
  const isMobile = useIsMobile()
  const SwapIcon = isMobile ? ArrowUpDown : ArrowLeftRight

  const [amountText, setAmountText] = useState(() => formatAmount(1000, locale))
  const [selectedDate, setSelectedDate] = useState('')
  const [dismissedDate, setDismissedDate] = useState('')

  const today = toIsoDate(new Date())
  const isSamePair = from === to
  const isDateInRange = !selectedDate || (selectedDate >= MIN_DATE && selectedDate <= today)

  const { status, rate, effectiveDate, notFound, retry } = useExchangeRate(
    from,
    to,
    selectedDate,
    !isSamePair && isDateInRange,
  )

  const amount = parseNumber(amountText, t.thousandsSeparator)
  const isEmpty = amountText.trim() === ''
  const isAmountValid = isValidAmount(amount)
  const showAmountError = !isEmpty && !isAmountValid
  const canShowResult = status === 'ready' && isAmountValid

  // A API respondeu com outra data: a escolhida não tem cotação publicada.
  const showNoQuoteNotice =
    status === 'ready' &&
    selectedDate &&
    effectiveDate !== selectedDate &&
    dismissedDate !== selectedDate

  // Ao sair do campo, um valor válido é reescrito no formato local (1000 → 1.000,00).
  function handleAmountBlur() {
    if (isAmountValid) setAmountText(formatAmount(amount, locale))
  }

  function renderResult() {
    if (canShowResult) {
      return <span className={styles.result}>{formatConverted(convertAmount(amount, rate), locale)}</span>
    }
    if (status === 'loading' && isAmountValid) {
      return <span className={styles.resultPlaceholder}>{t.converter.loading}</span>
    }
    return <span className={styles.resultPlaceholder}>{t.converter.resultPlaceholder}</span>
  }

  const dateLabel = effectiveDate
    ? t.converter.quoteOf(formatDate(effectiveDate, locale))
    : t.converter.chooseDate

  return (
    <Card className={styles.card} aria-labelledby="converter-title">
      <div className={styles.top}>
        <h2 id="converter-title" className={styles.overline}>
          {isMobile ? t.converter.titleShort : t.converter.title}
        </h2>
        <div className={styles.dateArea}>
          {selectedDate && (
            <button type="button" className={styles.latest} onClick={() => setSelectedDate('')}>
              {t.converter.useLatest}
            </button>
          )}
          <label className={styles.quoteDate}>
            {!isMobile && <Calendar size={14} aria-hidden="true" />}
            <span>{dateLabel}</span>
            <input
              className={styles.dateInput}
              type="date"
              aria-label={t.converter.chooseDate}
              min={MIN_DATE}
              max={today}
              value={selectedDate || effectiveDate || ''}
              onChange={(event) => setSelectedDate(event.target.value)}
            />
          </label>
        </div>
      </div>

      <div className={styles.fields}>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="converter-amount">
            {t.converter.send}
          </label>
          <div className={`${styles.fieldBox} ${showAmountError ? styles.fieldBoxError : ''}`}>
            <input
              id="converter-amount"
              className={styles.amount}
              inputMode="decimal"
              autoComplete="off"
              value={amountText}
              aria-invalid={showAmountError}
              aria-describedby={showAmountError ? 'converter-amount-error' : undefined}
              onChange={(event) => setAmountText(event.target.value)}
              onBlur={handleAmountBlur}
            />
            <CurrencySelect
              label={t.converter.send}
              value={from}
              options={currencies.options}
              status={currencies.status}
              onRetry={currencies.retry}
              onChange={onFromChange}
            />
          </div>
          {showAmountError && (
            <p id="converter-amount-error" className={styles.fieldError} role="alert">
              <CircleAlert size={14} aria-hidden="true" />
              {t.converter.invalidAmount}
            </p>
          )}
        </div>

        <div className={styles.swapSlot}>
          <button type="button" className={styles.swap} aria-label={t.converter.swap} onClick={onSwap}>
            <SwapIcon size={isMobile ? 18 : 20} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.field}>
          <span className={styles.fieldLabel}>{t.converter.receive}</span>
          <div className={`${styles.fieldBox} ${styles.fieldBoxOutput}`}>
            <output className={styles.output} aria-live="polite">
              {renderResult()}
            </output>
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

      {isSamePair && (
        <div className={styles.warning} role="alert">
          <TriangleAlert size={16} aria-hidden="true" />
          <div>
            <p className={styles.warningTitle}>{t.converter.sameTitle}</p>
            <p className={styles.warningText}>{t.converter.sameText(from)}</p>
          </div>
        </div>
      )}

      {!isDateInRange && (
        <p className={styles.fieldError} role="alert">
          <CircleAlert size={14} aria-hidden="true" />
          {t.converter.dateOutOfRange(formatDate(MIN_DATE, locale), formatDate(today, locale))}
        </p>
      )}

      {status === 'error' && (
        <div className={styles.loadError} role="alert">
          <CircleAlert size={16} aria-hidden="true" />
          <p>{notFound ? t.converter.noPairData : t.converter.loadError}</p>
          {!notFound && (
            <button type="button" className={styles.retry} onClick={retry}>
              <RotateCw size={14} aria-hidden="true" />
              {t.status.retry}
            </button>
          )}
        </div>
      )}

      {showNoQuoteNotice && (
        <div className={styles.notice} role="status">
          <span className={styles.noticeIcon}>
            <CalendarX size={16} aria-hidden="true" />
          </span>
          <div className={styles.noticeText}>
            <p className={styles.noticeTitle}>
              {t.converter.noQuoteTitle(
                formatDate(selectedDate, locale),
                formatWeekday(selectedDate, locale),
              )}
            </p>
            <p className={styles.noticeDescription}>
              {t.converter.noQuoteText(formatDate(effectiveDate, locale))}
            </p>
          </div>
          <button
            type="button"
            className={styles.noticeClose}
            aria-label={t.converter.closeNotice}
            onClick={() => setDismissedDate(selectedDate)}
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      )}

      <div className={styles.rateInfo}>
        <dl className={styles.rates}>
          <div className={styles.rate}>
            <dt>{t.converter.rateUsed}</dt>
            <dd>{rate ? formatRatePair(rate, from, to, locale) : t.converter.noRate}</dd>
          </div>
          <div className={styles.rate}>
            <dt>{t.converter.rateInverse}</dt>
            <dd>{rate ? formatRatePair(inverseRate(rate), to, from, locale) : t.converter.noRate}</dd>
          </div>
          <div className={styles.rate}>
            <dt>{isMobile ? t.converter.effectiveDateShort : t.converter.effectiveDate}</dt>
            <dd>{effectiveDate ? formatDate(effectiveDate, locale) : t.converter.noRate}</dd>
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
