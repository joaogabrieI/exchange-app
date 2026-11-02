import { ChevronDown } from 'lucide-react'
import CurrencyFlag from '../CurrencyFlag/CurrencyFlag'
import styles from './CurrencySelect.module.css'

function CurrencySelect({ value, name, variant = 'filled' }) {
  return (
    <div className={styles.wrapper}>
      <button type="button" className={`${styles.trigger} ${styles[variant]}`}>
        <CurrencyFlag code={value} />
        <span className={styles.triggerText}>
          <span className={styles.code}>{value}</span>
          <span className={styles.name}>{name}</span>
        </span>
        <ChevronDown className={styles.chevron} size={16} aria-hidden="true" />
      </button>
    </div>
  )
}

export default CurrencySelect
