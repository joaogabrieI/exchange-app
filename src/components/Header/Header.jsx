import { ArrowLeftRight, ChevronDown, Globe } from 'lucide-react'
import { LANGUAGES } from '../../constants/languages'
import { useIsMobile } from '../../hooks/useIsMobile'
import { useLanguage } from '../../hooks/useLanguage'
import styles from './Header.module.css'

function Header() {
  const { language, setLanguage, t } = useLanguage()
  const isMobile = useIsMobile()

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.mark}>
          <ArrowLeftRight size={isMobile ? 16 : 18} aria-hidden="true" />
        </span>
        <span className={styles.brand}>Hermes</span>
        <span className={styles.tagline}>{t.brandTagline}</span>
      </div>

      {isMobile ? (
        <label className={styles.languageSelect}>
          <Globe size={14} aria-hidden="true" />
          <span className="visually-hidden">{t.language}</span>
          <select value={language} onChange={(event) => setLanguage(event.target.value)}>
            {LANGUAGES.map((code) => (
              <option key={code} value={code}>
                {code.toUpperCase()}
              </option>
            ))}
          </select>
          <ChevronDown size={14} aria-hidden="true" />
        </label>
      ) : (
        <div className={styles.languageSwitch} role="group" aria-label={t.language}>
          {LANGUAGES.map((code) => (
            <button
              key={code}
              type="button"
              className={code === language ? styles.languageActive : styles.languageButton}
              aria-pressed={code === language}
              onClick={() => setLanguage(code)}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}

export default Header
