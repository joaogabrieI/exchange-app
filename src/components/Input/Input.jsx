import { useId } from 'react'
import { CircleAlert } from 'lucide-react'
import styles from './Input.module.css'

function Input({ label, helper, error, icon: Icon, className = '', ...inputProps }) {
  const id = useId()
  const messageId = `${id}-message`
  const message = error || helper

  return (
    <div className={`${styles.field} ${className}`}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={`${styles.control} ${error ? styles.controlError : ''}`}>
        {Icon && <Icon className={styles.icon} size={16} aria-hidden="true" />}
        <input
          id={id}
          className={styles.input}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          {...inputProps}
        />
        {error && <CircleAlert className={styles.errorIcon} size={16} aria-hidden="true" />}
      </div>
      {message && (
        <p id={messageId} className={error ? styles.error : styles.helper}>
          {message}
        </p>
      )}
    </div>
  )
}

export default Input
