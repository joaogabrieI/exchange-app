import { useState } from 'react'
import {
  ArrowDownToLine,
  ArrowUpToLine,
  Calendar,
  ChevronDown,
  ChevronUp,
  CircleAlert,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import Button from '../Button/Button'
import Input from '../Input/Input'
import { useIsMobile } from '../../hooks/useIsMobile'
import { useLanguage } from '../../hooks/useLanguage'
import styles from './TableFilters.module.css'

const SORT_OPTIONS = ['date-desc', 'date-asc', 'rate-desc', 'rate-asc']

function TableFilters({ values, errors, activeCount, sortValue, onChange, onClear, onSortChange }) {
  const { t } = useLanguage()
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(true)

  const errorCount = Object.keys(errors).length
  const hasErrors = errorCount > 0
  const rateHint = hasErrors ? t.filters.hint : undefined

  const fields = (
    <>
      <div className={styles.fields}>
        <Input
          label={t.filters.startDate}
          type="date"
          icon={isMobile ? undefined : Calendar}
          value={values.startDate}
          error={errors.startDate}
          onChange={(event) => onChange('startDate', event.target.value)}
        />
        <Input
          label={t.filters.endDate}
          type="date"
          icon={isMobile ? undefined : Calendar}
          value={values.endDate}
          error={errors.endDate}
          onChange={(event) => onChange('endDate', event.target.value)}
        />
        <Input
          label={isMobile ? t.filters.minRateShort : t.filters.minRate}
          inputMode="decimal"
          placeholder={t.filters.ratePlaceholder}
          icon={isMobile ? undefined : ArrowDownToLine}
          value={values.minRate}
          error={errors.minRate}
          helper={rateHint}
          onChange={(event) => onChange('minRate', event.target.value)}
        />
        <Input
          label={isMobile ? t.filters.maxRateShort : t.filters.maxRate}
          inputMode="decimal"
          placeholder={t.filters.ratePlaceholder}
          icon={isMobile ? undefined : ArrowUpToLine}
          value={values.maxRate}
          error={errors.maxRate}
          helper={rateHint}
          onChange={(event) => onChange('maxRate', event.target.value)}
        />
        {!isMobile && (
          <Button className={styles.clear} variant="secondary" icon={X} iconSize={14} onClick={onClear}>
            {t.filters.clear}
          </Button>
        )}
      </div>

      {isMobile && (
        <div className={styles.mobileActions}>
          <label className={styles.sort}>
            <span className="visually-hidden">{t.filters.sortLabel}</span>
            <select value={sortValue} onChange={(event) => onSortChange(event.target.value)}>
              {SORT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {t.filters.sortOptions[option]}
                </option>
              ))}
            </select>
            <ChevronDown size={14} aria-hidden="true" />
          </label>
          <Button variant="secondary" icon={X} iconSize={13} onClick={onClear}>
            {t.filters.clearShort}
          </Button>
        </div>
      )}

      {hasErrors && (
        <p className={styles.summary} role="alert">
          <CircleAlert size={16} aria-hidden="true" />
          {t.filters.summary(errorCount)}
        </p>
      )}
    </>
  )

  if (!isMobile) {
    return (
      <div className={styles.filters} role="group" aria-label={t.filters.region}>
        {fields}
      </div>
    )
  }

  const ToggleIcon = isOpen ? ChevronUp : ChevronDown

  return (
    <div className={styles.filters} role="group" aria-label={t.filters.region}>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.toggleLabel}>
          <SlidersHorizontal size={14} aria-hidden="true" />
          {activeCount > 0 ? t.filters.toggleActive(activeCount) : t.filters.toggle}
        </span>
        <ToggleIcon size={16} aria-hidden="true" />
      </button>
      {isOpen && fields}
    </div>
  )
}

export default TableFilters
