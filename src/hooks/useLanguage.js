import { texts } from '../constants/texts'

// Por enquanto só existe português. A troca de idioma entra com o i18n.
export function useLanguage() {
  return { language: 'pt', setLanguage: () => {}, t: texts.pt, locale: texts.pt.locale }
}
