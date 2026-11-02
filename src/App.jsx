import Converter from './components/Converter/Converter'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import HistoryCard from './components/HistoryCard/HistoryCard'
import PageTitle from './components/PageTitle/PageTitle'
import RatesTable from './components/RatesTable/RatesTable'
import { MOCK_RECORDS, MOCK_STATS } from './constants/mockData'
import styles from './App.module.css'

const MOCK_POINTS = [...MOCK_RECORDS].reverse()

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.content}>
        <PageTitle />
        <Converter from="USD" to="BRL" amount={1000} rate={5.3123} effectiveDate="2026-10-30" />
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
