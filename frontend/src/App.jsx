import './App.css'
import ExpenseForm from './components/ExpenseForm';
import Header from './components/Header';
import Expense from './components/Expense';
import { useEffect, useState } from 'react'

function App() {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (newExpense) => {
    setExpenses(prev => [newExpense, ...prev]); 
  };
  
  return (
    <div >
      <Header />
      <div className='flex flex-col lg:flex-row'>

        <ExpenseForm onExpenseAdded={ addExpense} />
              <Expense expenses={expenses} setExpenses={ setExpenses} />
      </div>
    </div>
  )
}

export default App
