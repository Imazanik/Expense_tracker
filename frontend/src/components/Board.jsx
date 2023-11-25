import { dollar } from "../utils/Icons";
import Chart from "./Chart";

import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";

function Board() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch incomes and expenses when the component mounts
    getIncomes();
    getExpenses();
  }, []);

  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-incomes`);
      setIncomes(response.data);
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-expenses`);
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  const totalExpenses = () => {
    let totalIncome = 0;
    expenses.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  const [...history] = transactionHistory();

  return (
    <div className="flex flex-col gap-4 ">
      <center>
        {/* First Row */}
        {/* <div className="max-w-full rounded-xl p-4 m-4  shadow-lg border h-96 xl:mx-24">
          
          <Chart />
        </div> */}
        <div className="max-w-full flex flex-wrap gap-4 xl:mx-20">
          <div className="flex-1  m-4 p-4 shadow-lg border rounded-xl h-96 hover:shadow-lg hover:shadow-[#95c5ef] transition-all duration-300">
            <Chart />
          </div>
          <div className="flex-1  m-4 p-4 shadow-lg border rounded-xl hover:shadow-lg hover:shadow-[#95c5ef] transition-all duration-300">
            {/* Content for the second row - second div */}
            <div className="">
              <div className="flex gap-4 p-4 ">
                <div className="flex-1 bg-[#f0f8ff] p-10 rounded-lg text-gray-500">
                  <p className="py-2">Total Income</p>
                  <p className=" text-2xl">৳ {totalIncome()}</p>
                </div>
                <div className="flex-1 bg-[#f0f8ff] p-10 rounded-lg text-gray-500 ">
                  <p className="py-2">Total Expenses</p>
                  <p className=" text-2xl">৳ {totalExpenses()}</p>
                </div>
              </div>
            </div>
            <div className="mx-4">
              <div className="bg-[#f0f8ff] p-10 rounded-lg text-[#0184ff]">
                <p className="mb-2">Total Balance</p>
                <p className=" text-5xl">৳ {totalBalance()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row */}

        <div className="max-w-full flex flex-wrap gap-4 xl:mx-20">
          <div className="flex-1  m-4 p-4 shadow-lg border rounded-xl h-96 hover:shadow-lg hover:shadow-[#95c5ef] transition-all duration-300">
            {/* --------------- */}
            <div className="mb-10 border rounded-xl m-4 p-4 ">
              <p className="text-left my-5 text-gray-500">Salary</p>
              <div className="flex">
                <div className="flex-1 flex">
                  <p className="p-2 text-gray-400 w-full bg-[#f0f8ff] text-left">
                    ৳ {Math.min(...incomes.map((item) => item.amount))}
                  </p>
                  <p className="p-2 text-gray-400 text-left">Min</p>
                </div>
                <div className="flex-1 flex">
                  <p className="p-2 text-gray-400 w-full bg-[#f0f8ff] text-left ml-2">
                    ৳ {Math.max(...incomes.map((item) => item.amount))}
                  </p>
                  <p className="p-2 text-gray-400 text-left ">Max</p>
                </div>
              </div>
            </div>
            <div className="mb-10 border rounded-xl m-4 p-4 ">
              <p className="text-left my-5 text-gray-500">Expenses</p>
              <div className="flex">
                <div className="flex-1 flex">
                  <p className="p-2 text-gray-400 w-full bg-[#f0f8ff] text-left">
                    ৳ {Math.min(...expenses.map((item) => item.amount))}
                  </p>
                  <p className="p-2 text-gray-400 text-left">Min</p>
                </div>
                <div className="flex-1 flex">
                  <p className="p-2 text-gray-400 w-full bg-[#f0f8ff] text-left ml-2">
                    ৳ {Math.max(...expenses.map((item) => item.amount))}
                  </p>
                  <p className="p-2 text-gray-400 text-left">Max</p>
                </div>
              </div>
            </div>
            {/* --------------- */}
          </div>
          <div className="flex-1  m-4 p-4 shadow-lg border rounded-xl hover:shadow-lg hover:shadow-[#95c5ef] transition-all duration-300">
            {/* Content for the second row - second div */}
            {/* -------------- */}
            <h1 className="p-5 text-[#0184ff]">Recent History</h1>
            {/* ----------------------- */}

            {history.map((item) => {
              return (
                <div key={item.id} className="flex">
                  <div
                    key={item.id}
                    className="flex-1 flex bg-[#f0f8ff] rounded-xl m-2"
                  >
                    <p
                      className="p-4 text-gray-600 w-full  text-left text-red-500"
                      style={{
                        color: item.type === "expense" ? "#ef4545" : "#22c55e",
                      }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="p-4 text-gray-600 text-right w-full"
                      style={{
                        color: item.type === "expense" ? "#ef4545" : "#22c55e",
                      }}
                    >
                      {item.type === "expense"
                        ? `-${item.amount <= 0 ? 0 : item.amount}`
                        : `+${item.amount <= 0 ? 0 : item.amount}`}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* ------------------------- */}
          </div>
        </div>
      </center>
    </div>
  );
}
export default Board;
