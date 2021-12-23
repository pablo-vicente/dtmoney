import { useState } from 'react';
import Modal from 'react-modal';
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";

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
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />

      <Modal
        isOpen={isNewTransactionsOpen}
        onRequestClose={handleCloseNewTransactionModal}>
        <h2>Cadatrar Transção</h2>
      </Modal>


      <GlobalStyle />
    </>
  );
}
