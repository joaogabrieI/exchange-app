import { useState } from 'react'
import Converter from './components/Converter/Converter'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import HistoryCard from './components/HistoryCard/HistoryCard'
import PageTitle from './components/PageTitle/PageTitle'
import RatesTable from './components/RatesTable/RatesTable'
import { DEFAULT_FROM, DEFAULT_TO } from './constants/currencies'
import { DEFAULT_PERIOD_ID, PERIODS } from './constants/periods'
import { useCurrencies } from './hooks/useCurrencies'
import { useHistory } from './hooks/useHistory'
import { useLanguage } from './hooks/useLanguage'
import styles from './App.module.css'

function App() {
  const { locale } = useLanguage()
  // Lifting state up: o par fica no App porque conversor, gráfico e tabela dependem dele.
  const [from, setFrom] = useState(DEFAULT_FROM)
  const [to, setTo] = useState(DEFAULT_TO)
  const [periodId, setPeriodId] = useState(DEFAULT_PERIOD_ID)
  const period = PERIODS.find((item) => item.id === periodId)

  const currencies = useCurrencies(locale)
  const history = useHistory(from, to, period)

  function handleSwap() {
    setFrom(to)
    setTo(from)
  }

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.content}>
        <PageTitle />
        <Converter
          from={from}
          to={to}
          currencies={currencies}
          onFromChange={setFrom}
          onToChange={setTo}
          onSwap={handleSwap}
        />
        <HistoryCard
          from={from}
          to={to}
          period={period}
          onPeriodChange={setPeriodId}
          history={history}
        />
        {history.status === 'ready' && <RatesTable from={from} to={to} records={history.records} />}
      </main>
      <Footer />
    </div>
  )
}

export default App
