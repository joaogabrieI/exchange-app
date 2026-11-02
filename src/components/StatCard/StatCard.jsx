import { TrendingDown, TrendingUp } from 'lucide-react'
import styles from './StatCard.module.css'

// trend: 'up' ou 'down' colore o valor e mostra o ícone. Sem trend, o valor fica neutro.
function StatCard({ label, value, trend }) {
  const Icon = trend === 'up' ? TrendingUp : TrendingDown

  return (
    <div className={styles.stat}>
      <dt className={styles.label}>{label}</dt>
      <dd className={`${styles.value} ${trend ? styles[trend] : ''}`}>
        {trend && <Icon className={styles.icon} size={16} aria-hidden="true" />}
        {value}
      </dd>
    </div>
  )
}

export default StatCard
