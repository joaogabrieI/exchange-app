import { useEffect, useMemo, useState } from 'react'
import { DEFAULT_LANGUAGE, LANGUAGES } from '../../constants/languages'
import { texts } from '../../constants/texts'
import { LanguageContext } from '../../hooks/useLanguage'

const STORAGE_KEY = 'hermes-language'

// O armazenamento do navegador pode estar bloqueado, e o app precisa funcionar assim mesmo.
function readSavedLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return LANGUAGES.includes(saved) ? saved : DEFAULT_LANGUAGE
  } catch {
    return DEFAULT_LANGUAGE
  }
}

function saveLanguage(language) {
  try {
    localStorage.setItem(STORAGE_KEY, language)
  } catch {
    // Sem armazenamento, o idioma vale só até recarregar a página.
  }
}

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(readSavedLanguage)
  const t = texts[language]

  useEffect(() => {
    document.documentElement.lang = t.locale
    document.title = t.documentTitle
    saveLanguage(language)
  }, [language, t])

  const value = useMemo(() => ({ language, setLanguage, t, locale: t.locale }), [language, t])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export default LanguageProvider
