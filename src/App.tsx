import { useState } from 'react';
import Modal from 'react-modal';
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from './components/NewTransactionModal';
import { GlobalStyle } from "./styles/global";
import { TransactionsProvider } from '../src/Hooks/useTransactions';

Modal.setAppElement("#root")

export function App() {
  const [isNewTransactionsOpen, setIsNewTransactionsOpen] = useState(false);


  function handleOpenNewTransactionModal() {
    setIsNewTransactionsOpen(true)
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionsOpen(false)
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />

      <NewTransactionModal
        isOpen={isNewTransactionsOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />

      <GlobalStyle />
    </TransactionsProvider>
  );
}
