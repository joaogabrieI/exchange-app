import styles from './Badge.module.css'

function Badge({ tone = 'primary', className = '', children, ...props }) {
  return (
    <span className={`${styles.badge} ${styles[tone]} ${className}`} {...props}>
      {children}
    </span>
  )
}

export default Badge
