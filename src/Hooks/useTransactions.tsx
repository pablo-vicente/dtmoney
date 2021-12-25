import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api';

interface Transaction {
    id: number,
    title: string,
    type: string,
    category: string,
    amount: number,
    creatAt: Date
}

interface TransactionsProviderProps {
    children: ReactNode
}

interface TransactionsProviderData {
    transactions: Transaction[],
    createTransaction: (transaction: TransactionInput) => Promise<void>,
}

type TransactionInput = Omit<Transaction, 'id' | 'creatAt'>

const TransactionsContext = createContext<TransactionsProviderData>({} as TransactionsProviderData)
export function TransactionsProvider({ children }: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions')
            .then(res => setTransactions(res.data.transactions))
    }, [])

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('transactions', {
            ...transactionInput,
            creatAt: new Date()
        });
        const { transaction } = response.data
        setTransactions([
            ...transactions,
            transaction
        ])
    }

    return (

        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>

    )
}

export function UseTransactions() {
    const transactionsContext = useContext(TransactionsContext)

    return transactionsContext;
} 