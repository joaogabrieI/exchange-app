import { useState } from 'react'
import Converter from './components/Converter/Converter'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import HistoryCard from './components/HistoryCard/HistoryCard'
import PageTitle from './components/PageTitle/PageTitle'
import RatesTable from './components/RatesTable/RatesTable'
import { DEFAULT_FROM, DEFAULT_TO } from './constants/currencies'
import { MOCK_RECORDS, MOCK_STATS } from './constants/mockData'
import { useCurrencies } from './hooks/useCurrencies'
import { useLanguage } from './hooks/useLanguage'
import styles from './App.module.css'

const MOCK_POINTS = [...MOCK_RECORDS].reverse()

function App() {
  const { locale } = useLanguage()
  // Lifting state up: o par fica no App porque conversor, gráfico e tabela dependem dele.
  const [from, setFrom] = useState(DEFAULT_FROM)
  const [to, setTo] = useState(DEFAULT_TO)
  const currencies = useCurrencies(locale)

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.content}>
        <PageTitle />
        <Converter
          from={from}
          to={to}
          amount={1000}
          rate={5.3123}
          effectiveDate="2026-10-30"
          currencies={currencies}
          onFromChange={setFrom}
          onToChange={setTo}
        />
        <HistoryCard
          from="USD"
          to="BRL"
          periodId="30D"
          onPeriodChange={() => {}}
          stats={MOCK_STATS}
          points={MOCK_POINTS}
        />
        <RatesTable from="USD" to="BRL" records={MOCK_RECORDS} />
      </main>
      <Footer />
    </div>
  )
}

export default App
