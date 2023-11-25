import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import axios from "axios";
import IncomeItem from "./IncomeItem";
import { plus } from "../utils/Icons";

const BASE_URL = "http://localhost:5000/api/v1/";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(inputState);
    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    });
  };

  const addExpense = async (income) => {
    const response = await axios
      .post(`${BASE_URL}add-expense`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getExpenses();
  };

  useEffect(() => {
    // Fetch incomes and expenses when the component mounts
    getExpenses();
  }, []);

  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-expenses`);
      setExpenses(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const totalExpenses = () => {
    let totalIncome = 0;
    expenses.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  const deleteExpense = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-expense/${id}`);
    getExpenses();
  };

  return (
    <div className="flex flex-col gap-4 ">
      <center>
        {/* First Row */}
        {/* <div className="max-w-full rounded-xl p-4 m-4  shadow-lg border h-96 xl:mx-24">
          
          <Chart />
        </div> */}
        <div className="max-w-full gap-4 xl:mx-20">
          <div className="flex-1  m-4 p-4 shadow-lg border rounded-xl h-40 hover:shadow-lg hover:shadow-[#95c5ef] transition-all duration-300 items-center justify-center flex text-4xl text-[#0184ff]">
            <p>Total Expenses : </p> <p> ৳ {totalExpenses()}</p>
          </div>
        </div>

        {/* Second Row */}

        <div className="max-w-full flex flex-wrap gap-4 xl:mx-20">
          <div className="flex-1  m-4 p-4 shadow-lg border rounded-xl hover:shadow-lg hover:shadow-[#95c5ef] transition-all duration-300 h-[480px] ">
            {/* Content for the second row - second div */}
            <form action="" onSubmit={handleSubmit}>
              {error && <p className="error">{error}</p>}
              <div className="flex flex-row gap-4 p-4 ">
                <div className="flex-2 w-2/3">
                  <input
                    className="bg-[#f0f8ff] p-5 rounded-lg text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 w-full"
                    type="text"
                    value={title}
                    name={"title"}
                    placeholder="Expense Title"
                    onChange={handleInput("title")}
                  />
                </div>
                <div className="flex-1 w-1/3">
                  <DatePicker
                    className="bg-[#f0f8ff] p-5 rounded-lg text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 w-full"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="Enter A Date"
                    id="date"
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                      setInputState({ ...inputState, date: date });
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-row gap-4 p-4 ">
                <div className="flex-2 w-2/3">
                  <input
                    className="bg-[#f0f8ff] p-5 rounded-lg text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 w-full"
                    value={amount}
                    type="text"
                    name={"amount"}
                    placeholder={"Expense Amount"}
                    onChange={handleInput("amount")}
                  />
                </div>
                <div className="flex-1 w-1/3">
                  <select
                    required
                    value={category}
                    name="category"
                    id="category"
                    onChange={handleInput("category")}
                    className="bg-[#f0f8ff] p-5 rounded-lg text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 w-full"
                  >
                    <option className="text-gray-500" value disabled>
                      Select Option
                    </option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>
                    <option value="travelling">Travelling</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mx-4">
                <textarea
                  className="bg-[#f0f8ff] p-10 rounded-lg text-gray-400 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 w-full mb-2"
                  cols="20"
                  rows="5"
                  name="description"
                  value={description}
                  placeholder="Add A Reference"
                  id="description"
                  onChange={handleInput("description")}
                ></textarea>
                <button className="text-white rounded-full bg-[#0184ff] py-2 px-5 hover:bg-blue-600 flex">
                  <p className="w-2 my-2 mr-2">{plus}</p> Add Expenses
                </button>
              </div>
            </form>
          </div>
          <div className="flex-1  m-4 p-4 shadow-lg border rounded-xl hover:shadow-lg hover:shadow-[#95c5ef] transition-all duration-300">
            {/* Content for the second row - second div */}

            {/* -------------- */}

            {/* ----------------------- */}

            {expenses.map((income) => {
              const { _id, title, amount, date, category, description, type } =
                income;
              return (
                <div key={_id}>
                  <IncomeItem
                    key={_id}
                    id={_id}
                    title={title}
                    description={description}
                    amount={amount}
                    date={date}
                    type={type}
                    category={category}
                    indicatorColor="var(--color-green)"
                    deleteItem={deleteExpense}
                  />
                </div>
              );
            })}

            {/* ------------------------- */}

            {/* -------------- */}
          </div>
        </div>
        {/* Second Row */}
      </center>
    </div>
  );
}
export default Expenses;
