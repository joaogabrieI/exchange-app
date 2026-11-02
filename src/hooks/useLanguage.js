import { createContext, useContext } from 'react'

export const LanguageContext = createContext(null)

// Dá a qualquer componente o idioma atual, a troca de idioma e os textos.
export function useLanguage() {
  return useContext(LanguageContext)
}
