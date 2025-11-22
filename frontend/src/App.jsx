import './App.css'
import ExpenseForm from './components/ExpenseForm';
import Header from './components/Header';
import Expense from './components/Expense';
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Register from './components/Register';
import Login  from './components/Login';

function App() {
  const [expenses, setExpenses] = useState([]);
  const isLoggedIn = localStorage.getItem("token") !== null;
  console.log("isLoggedIn:", isLoggedIn, "token:", localStorage.getItem("token"));

  const addExpense = (newExpense) => {
    setExpenses(prev => [...prev, newExpense]); 
  };
  
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={
          <div >
            <Header />
            <div className='flex flex-col lg:flex-row'>
              <ExpenseForm onExpenseAdded={addExpense} />
              <Expense expenses={expenses} setExpenses={setExpenses} />
            </div>
          </div>
        }></Route>
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
