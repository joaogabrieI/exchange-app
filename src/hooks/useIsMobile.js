import { useEffect, useState } from 'react'

const MOBILE_QUERY = '(max-width: 768px)'

// Informa se a tela está no layout mobile e acompanha o redimensionamento.
// Serve para trocar a estrutura (tabela × lista). Ajustes de estilo ficam no CSS.
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches)

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY)
    function handleChange(event) {
      setIsMobile(event.matches)
    }
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  return isMobile
}
