import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dialog from "./uiComponents/Dialog";

function ExpenseDetails() {
  const [expenses, setExpenses] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [showModal, setShowModal] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert("Please select a start date and end date");
      return;
    }

    function formatDateToLocal(date) {
      const tzOffset = date.getTimezoneOffset() * 60000; // offset in ms
      const localISO = new Date(date.getTime() - tzOffset).toISOString();
      return localISO.split("T")[0];
    }

    const res = await fetch(
      `http://localhost:3000/api/v1/expenses/details?start=${formatDateToLocal(
        startDate
      )}&end=${formatDateToLocal(endDate)}`
    );

    const data = await res.json();
    console.log("Front end captured from backend: ", data);
    setExpenses(data);
  }

  function handleDelete(id) {
    try {
        fetch(`http://localhost:3000/api/v1/expenses/details/${id}`, {
        method: 'DELETE'
    });
    console.log("Selected data successfully deleted!");
    setShowModal(true);
    } catch (error) {
        console.log("Error for deleting: ", error);
    }
  }

  return (
    <div className="expenseDetail-container flex flex-col gap-5 items-center">
      <h1 className="dark:text-white font-bold text-2xl">
        Your expenses record
      </h1>
      {showModal && <Dialog displayText="Expense deleted successfully!" onClick={() => setShowModal(false)} />}
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="date-search-container flex gap-2 justify-between">
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            isClearable={true}
            showYearDropdown
            scrollableYearDropdown
            className="dark:border-gray-800 border dark:text-white p-2 text-center rounded-sm"
            placeholderText="Select Date Range"
          />
          <button className="text-white bg-amber-600 hover:bg-amber-500 dark:bg-sky-500 hover:dark:bg-sky-600 p-2 rounded-sm cursor-pointer">
            Search
          </button>
        </div>

        {expenses.length > 0 ? (
          <div className="">
            <table className="border border-gray-300 border-spacing-0 border-separate rounded-md">
              <thead>
                <tr>
                  <th className="dark:text-white p-2">
                    Expense Date
                  </th>
                  <th className="dark:text-white p-2">
                    Expense Name
                  </th>
                  <th className="dark:text-white p-2">
                    Amount
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td className="dark:text-white p-2">
                      {new Date(expense.expensedate).toLocaleDateString()}
                    </td>
                    <td className="dark:text-white p-2">
                      {expense.expensename}
                    </td>
                    <td className="dark:text-white p-2">
                      {expense.amount}
                    </td>
                    <td><button className="bg-amber-600 p-2 m-1 text-white rounded-sm hover:bg-amber-500 cursor-pointer" onClick={() => handleDelete(expense.id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Please select a date range to find the expenses.</p>
        )}
      </form>
    </div>
  );
}

export default ExpenseDetails;
