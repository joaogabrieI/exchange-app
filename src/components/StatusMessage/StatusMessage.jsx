import styles from './StatusMessage.module.css'

// Bloco central usado nos estados de erro e de ausência de dados.
// tone: 'danger' mostra o ícone em um círculo vermelho; 'neutral' mostra só o ícone.
function StatusMessage({ icon: Icon, tone = 'neutral', title, description, role, children }) {
  return (
    <div className={`${styles.message} ${styles[tone]}`} role={role}>
      <span className={styles.icon}>
        <Icon aria-hidden="true" />
      </span>
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </div>
  )
}

export default StatusMessage
