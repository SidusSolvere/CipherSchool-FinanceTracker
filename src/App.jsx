import { useState } from 'react'
import { Auth } from './components/auth'
import Table from './components/table'
import TransactionsPage from './components/Transactions/TransactionsPage'

function App() {


  return (
    <>
    <Auth></Auth>
    <TransactionsPage></TransactionsPage>
    </>
  )
}

export default App
