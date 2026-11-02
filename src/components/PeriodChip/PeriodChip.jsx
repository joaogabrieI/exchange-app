import styles from './PeriodChip.module.css'

function PeriodChip({ label, active = false, onClick, ...props }) {
  return (
    <button
      type="button"
      className={`${styles.chip} ${active ? styles.active : ''}`}
      aria-pressed={active}
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  )
}

export default PeriodChip
