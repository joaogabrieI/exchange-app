import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Check, ChevronDown, ChevronUp, RotateCw, Search } from 'lucide-react'
import CurrencyFlag from '../CurrencyFlag/CurrencyFlag'
import { useLanguage } from '../../hooks/useLanguage'
import { filterCurrencies, getCurrencyName } from '../../utils/currencies'
import styles from './CurrencySelect.module.css'

function CurrencyDropdown({ value, options, status, onRetry, onSelect, onClose }) {
  const { t } = useLanguage()
  const listId = useId()
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, options.findIndex((option) => option.code === value)),
  )

  const results = useMemo(() => filterCurrencies(options, query), [options, query])

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  // Mantém a opção destacada pelo teclado visível dentro da lista com rolagem.
  useEffect(() => {
    listRef.current?.children[activeIndex]?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  function handleQueryChange(event) {
    setQuery(event.target.value)
    setActiveIndex(0)
  }

  function handleKeyDown(event) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((current) => Math.min(current + 1, results.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((current) => Math.max(current - 1, 0))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      if (results[activeIndex]) onSelect(results[activeIndex].code)
    } else if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
    } else if (event.key === 'Tab') {
      onClose()
    }
  }

  return (
    <div className={styles.dropdown}>
      <div className={styles.search}>
        <Search size={16} aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-label={t.currency.search}
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={results[activeIndex] ? `${listId}-${results[activeIndex].code}` : undefined}
          placeholder={t.currency.search}
          value={query}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <p className={styles.listTitle}>{t.currency.available}</p>

      <ul ref={listRef} id={listId} className={styles.list} role="listbox" aria-label={t.currency.available}>
        {results.map((option, index) => (
          <li
            key={option.code}
            id={`${listId}-${option.code}`}
            role="option"
            aria-selected={option.code === value}
            className={[
              styles.option,
              option.code === value ? styles.optionSelected : '',
              index === activeIndex ? styles.optionActive : '',
            ].join(' ')}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => onSelect(option.code)}
          >
            <CurrencyFlag code={option.code} size={22} />
            <span className={styles.optionCode}>{option.code}</span>
            <span className={styles.optionName}>{option.name}</span>
            {option.code === value && <Check className={styles.check} size={16} aria-hidden="true" />}
          </li>
        ))}
      </ul>

      {status === 'loading' && <p className={styles.message}>{t.currency.loading}</p>}
      {status === 'ready' && results.length === 0 && (
        <p className={styles.message}>{t.currency.noResults}</p>
      )}
      {status === 'error' && (
        <div className={styles.message} role="alert">
          <p>{t.currency.loadError}</p>
          <button type="button" className={styles.retry} onClick={onRetry}>
            <RotateCw size={14} aria-hidden="true" />
            {t.status.retry}
          </button>
        </div>
      )}
    </div>
  )
}

function CurrencySelect({ label, value, options, status, onRetry, onChange, variant = 'filled' }) {
  const { t, locale } = useLanguage()
  const wrapperRef = useRef(null)
  const triggerRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const name = getCurrencyName(value, locale)
  const ChevronIcon = isOpen ? ChevronUp : ChevronDown

  // Fecha ao clicar fora. O listener só existe enquanto a lista está aberta.
  useEffect(() => {
    if (!isOpen) return undefined

    function handleOutsideClick(event) {
      if (!wrapperRef.current.contains(event.target)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [isOpen])

  function closeAndRefocus() {
    setIsOpen(false)
    triggerRef.current.focus()
  }

  function handleSelect(code) {
    onChange(code)
    closeAndRefocus()
  }

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.trigger} ${styles[variant]} ${isOpen ? styles.triggerOpen : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t.currency.select(label, value, name)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <CurrencyFlag code={value} />
        <span className={styles.triggerText}>
          <span className={styles.code}>{value}</span>
          <span className={styles.name}>{name}</span>
        </span>
        <ChevronIcon className={styles.chevron} size={16} aria-hidden="true" />
      </button>

      {isOpen && (
        <CurrencyDropdown
          value={value}
          options={options}
          status={status}
          onRetry={onRetry}
          onSelect={handleSelect}
          onClose={closeAndRefocus}
        />
      )}
    </div>
  )
}

export default CurrencySelect
