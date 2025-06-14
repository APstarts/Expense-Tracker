import AddExpense from './components/AddExpense';
import Analysis from './components/Analysis';
import ExpenseDetails from './components/ExpenseDetails';
import Home from './components/Home';
import Navbar from './components/Navbar';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/add' element={<AddExpense />} />
            <Route path='/analysis' element={<Analysis />} />
            <Route path='/details' element={<ExpenseDetails />} />
          </Routes>
        </Router>
    </>
  )
}

export default App
