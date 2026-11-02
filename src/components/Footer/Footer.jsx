import { useLanguage } from '../../hooks/useLanguage'
import styles from './Footer.module.css'

function Footer() {
  const { t } = useLanguage()

  return (
    <footer className={styles.footer}>
      <p>{t.footer.disclaimer}</p>
      <p>{t.footer.source}</p>
    </footer>
  )
}

export default Footer
