import { useState } from "react";
import myImage from "../assets/demo.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddExpense() {
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    function formatDateToLocal(date) {
    const tzOffset = date.getTimezoneOffset() * 60000;
    const localISO = new Date(date.getTime() - tzOffset).toISOString();
    return localISO.split("T")[0];
  }

    const expenseData = {
      expenseDate: formatDateToLocal(expenseDate), 
      expenseName, 
      amount};
    try {
      fetch(`http://localhost:3000/api/v1/expenses/addexpense`, {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(expenseData)
      })
      setExpenseDate(new Date());
      setExpenseName("");
      setAmount('');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="addExpense-page flex justify-center items-center dark:bg-gray-900 min-h-screen">
      <img src={myImage} alt="graphic" className="w-full md:h-52 md:w-2xs" />
      <form
        className="flex flex-col gap-2 w-full md:w-2xs p-5 mt-5 rounded-lg dark:text-white dark:bg-gray-850"
        onSubmit={handleSubmit}
      >
        <label>Date:</label>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={expenseDate}
          onChange={(date) => setExpenseDate(date)}
          className="w-full p-2 rounded-lg border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-950 text-black dark:text-white"
        />

        <label>Expense:</label>
        <input
          className="border border-gray-400 p-2 rounded-lg dark:bg-gray-950 dark:text-white outline-none"
          type="text"
          name="expenseName"
          placeholder="Expense name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />

        <label>Amount of expense:</label>
        <input
          className="border border-gray-400 p-2 rounded-lg dark:bg-gray-950 dark:text-white outline-none"
          type="number"
          name="amount"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button className="bg-amber-700 hover:bg-amber-600 text-white dark:bg-sky-700 p-2 w-16 rounded-md hover:dark:bg-sky-800 cursor-pointer">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddExpense;
