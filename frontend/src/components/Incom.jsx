import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState } from "react";
import axios from "axios";
import IncomeItem from "./IncomeItem";
import { plus } from "../utils/Icons";
const BASE_URL = "http://localhost:5000/api/v1/";

function Incom() {
  const [incomes, setIncomes] = useState([]);
  const [error, setError] = useState(null);
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const { title, amount, date, category, description } = inputState;

  const addIncome = async (income) => {
    const response = await axios
      .post(`${BASE_URL}add-income`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getIncomes();
  };

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addIncome(inputState);
    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    });
  };

  useEffect(() => {
    // Fetch incomes and expenses when the component mounts
    getIncomes();
  }, []);

  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-incomes`);
      setIncomes(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  const deleteIncome = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-income/${id}`);
    getIncomes();
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
            <p>Total Income : </p> <p> ৳ {totalIncome()}</p>
          </div>
        </div>

        {/* Second Row */}

        <div className="max-w-full flex flex-wrap gap-4 xl:mx-20">
          <div className="flex-1  m-4 p-4 shadow-lg border rounded-xl hover:shadow-lg hover:shadow-[#95c5ef] transition-all duration-300 h-[500px] ">
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
                    placeholder="Salary Title"
                    onChange={handleInput("title")}
                  />
                </div>
                <div className="flex-1 w-1/3">
                  <DatePicker
                    className="bg-[#f0f8ff] p-5 rounded-lg text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 w-full"
                    dateFormat="dd/MM/yyyy" // Set your desired date format
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    id="date"
                    placeholderText="Enter A Date"
                    selected={date}
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
                    type="text"
                    name={"amount"}
                    placeholder={"Salary Amount"}
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
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="stocks">Stocks</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="youtube">Youtube</option>
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
                <button className="text-white rounded-full bg-[#0184ff] py-2 px-5 hover:bg-blue-600  flex">
                  <p className="w-2 my-2 mr-2">{plus}</p> Add Income
                </button>
              </div>
            </form>
          </div>
          <div className="flex-1  m-4 p-4 shadow-lg border rounded-xl hover:shadow-lg hover:shadow-[#95c5ef] transition-all duration-300">
            {/* Content for the second row - second div */}

            {/* -------------- */}

            {/* ----------------------- */}
            {incomes.map((income) => {
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
                    deleteItem={deleteIncome}
                  />
                </div>
              );
            })}

            {/* -------------- */}
          </div>
        </div>
        {/* Second Row */}
      </center>
    </div>
  );
}
export default Incom;
