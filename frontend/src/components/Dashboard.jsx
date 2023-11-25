// src/components/Dashboard.js
import { useState } from "react";
import Board from "../components/Board";
import ViewTransaction from "../components/ViewTransaction";
import Incom from "../components/Incom";
import Expenses from "../components/Expenses";
const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [selectedTab, setSelectedTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setSelectedTab(tabNumber);
  };
  return (
    <div className="flex h-full ">
      {/* Collapsible Sidebar */}
      <div
        className={`flex-shrink-0 w-72 bg-white border-r bg-cover ${
          isSidebarOpen ? "" : "hidden"
        }`}
      >
        <div className="p-4 mt-2">
          <div className="flex justify-center items-center">
            <img
              className="w-16 rounded-full"
              src="src/assets/images/MM.png"
              alt=""
            />
            <div className="ml-2">
              <h1 className="text-xl font-normal text-gray-800">Mashiur</h1>

              <h1 className="text-md font-light text-gray-300">Your Money</h1>
            </div>
          </div>

          {/* Sidebar Menu */}
          <nav className="mt-20 pl-10 space-y-5 ">
            <button
              onClick={() => handleTabClick(1)}
              className={
                selectedTab === 1
                  ? "flex items-center py-2 bg-[#F0F8FF] w-full text-[#0184FF] font-bold border-l-2 border-[#0184FF] focus:outline-none transition-all duration-200"
                  : "flex items-center py-2 font-normal text-[#757D88] text-sm focus:outline-none transition-all duration-200 hover:bg-[#F0F8FF] w-full"
              }
            >
              <img
                className="mr-4 ml-2"
                src={
                  selectedTab === 1
                    ? "src/assets/images/D_B.png"
                    : "src/assets/images/D.png"
                }
                alt=""
              />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => handleTabClick(2)}
              className={
                selectedTab === 2
                  ? "flex items-center py-2 bg-[#F0F8FF] w-full text-[#0184FF] font-bold border-l-2 border-[#0184FF] focus:outline-none transition-all duration-200"
                  : "flex items-center py-2 font-normal text-[#757D88] text-sm focus:outline-none transition-all duration-200 hover:bg-[#F0F8FF] w-full"
              }
            >
              <img
                className="mr-4 ml-2"
                src={
                  selectedTab === 2
                    ? "src/assets/images/V_B.png"
                    : "src/assets/images/V.png"
                }
                alt=""
              />
              <span>View Transaction</span>
            </button>
            <button
              onClick={() => handleTabClick(3)}
              className={
                selectedTab === 3
                  ? "flex items-center py-2 bg-[#F0F8FF] w-full text-[#0184FF] font-bold border-l-2 border-[#0184FF] focus:outline-none transition-all duration-200"
                  : "flex items-center py-2 font-normal text-[#757D88] text-sm focus:outline-none transition-all duration-200 hover:bg-[#F0F8FF] w-full"
              }
            >
              <img
                className="mr-4 ml-2"
                src={
                  selectedTab === 3
                    ? "src/assets/images/I_B.png"
                    : "src/assets/images/I.png"
                }
                alt=""
              />
              <span>Income</span>
            </button>
            <button
              onClick={() => handleTabClick(4)}
              className={
                selectedTab === 4
                  ? "flex items-center py-2 bg-[#F0F8FF] w-full text-[#0184FF] font-bold border-l-2 border-[#0184FF] focus:outline-none transition-all duration-200"
                  : "flex items-center py-2 font-normal text-[#757D88] text-sm focus:outline-none transition-all duration-200 hover:bg-[#F0F8FF] w-full"
              }
            >
              <img
                className="mr-4 ml-2"
                src={
                  selectedTab === 4
                    ? "src/assets/images/E_B.png"
                    : "src/assets/images/E.png"
                }
                alt=""
              />
              <span>Expenses</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <div className="bg-white border-b p-10 flex justify-evenly items-center">
          {/* Toggle Sidebar Button */}
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-800 focus:outline-none lg:hidden"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          {/* Search Input */}
          <div className="relative w-full max-w-3xl">
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="What do you want to find"
                className="block w-full pl-10 pr-4 py-3 border border-gray-100 rounded-full leading-5 bg-[#F0F8FF] focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 placeholder-gray-400 text-base"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <img src="src/assets/images/search.png" alt="" />
              </span>
            </div>
          </div>

          {/* Icons for Messages and Notifications */}
          <div className="flex items-center space-x-4 ">
            <button className="text-gray-600 hover:text-gray-800 focus:outline-none  rounded-full p-2 bg-[#F0F8FF] border-gray-100 transition-all duration-200 hover:p-0">
              <img
                className=" transition-all duration-200"
                src="src/assets/images/message.png"
                alt=""
              />
            </button>
            <button className="text-gray-600 hover:text-gray-800 focus:outline-none border rounded-full p-2 bg-[#F0F8FF] border-gray-100 transition-all duration-200 hover:p-0">
              <img src="src/assets/images/Notification.png" alt="" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4">
          {selectedTab === 1 && <Board />}
          {selectedTab === 2 && <ViewTransaction />}
          {selectedTab === 3 && <Incom />}
          {selectedTab === 4 && <Expenses />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
