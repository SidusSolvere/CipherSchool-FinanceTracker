import { useState } from 'react'
import { Auth } from './components/auth'
import TransactionsPage from './components/Transactions/TransactionsPage'
import UploadPdf from './components/UploadPdf'
import ClearUserTransactions from './components/DeleteAll'
import DisplayCharts from './components/Charts/DisplayCharts'


function App() {


  return (
    <>
    <Auth></Auth>
    <TransactionsPage></TransactionsPage>
   <UploadPdf></UploadPdf>
   <ClearUserTransactions></ClearUserTransactions>
   <DisplayCharts></DisplayCharts>

    </>
  )
}

export default App
