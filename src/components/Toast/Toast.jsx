import { useEffect } from 'react'
import { Check, CircleAlert, Info, X } from 'lucide-react'
import styles from './Toast.module.css'

const ICONS = { info: Info, success: Check, error: CircleAlert }
const AUTO_CLOSE_MS = 6000

function Toast({ type = 'info', title, description, closeLabel, onClose }) {
  const Icon = ICONS[type]

  useEffect(() => {
    const timer = setTimeout(onClose, AUTO_CLOSE_MS)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`${styles.toast} ${styles[type]}`} role="status">
      <span className={styles.iconBox}>
        <Icon size={16} aria-hidden="true" />
      </span>
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <button type="button" className={styles.close} aria-label={closeLabel} onClick={onClose}>
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  )
}

export default Toast
