import { Coins } from 'lucide-react'
import { CURRENCY_FLAGS } from '../../constants/currencies'
import styles from './CurrencyFlag.module.css'

// O Vite transforma cada SVG da pasta em uma URL que pode ser usada na tag <img>.
const flagUrls = import.meta.glob('../../assets/flags/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
})

function CurrencyFlag({ code, size = 24 }) {
  const url = flagUrls[`../../assets/flags/${CURRENCY_FLAGS[code]}.svg`]

  if (!url) {
    return <Coins className={styles.fallback} size={size} aria-hidden="true" />
  }
  return <img className={styles.flag} src={url} width={size} height={size} alt="" />
}

export default CurrencyFlag
