import Badge from '../Badge/Badge'
import { useIsMobile } from '../../hooks/useIsMobile'
import { useLanguage } from '../../hooks/useLanguage'
import styles from './PageTitle.module.css'

function PageTitle() {
  const { t } = useLanguage()
  const isMobile = useIsMobile()

  return (
    <div className={styles.pageTitle}>
      <div className={styles.text}>
        <h1 className={styles.title}>{t.page.title}</h1>
        <p className={styles.subtitle}>{isMobile ? t.page.subtitleShort : t.page.subtitle}</p>
      </div>
      {!isMobile && (
        <Badge className={styles.source}>
          <span className={styles.dot} aria-hidden="true" />
          {t.page.source}
        </Badge>
      )}
    </div>
  )
}

export default PageTitle
