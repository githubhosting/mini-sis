/* eslint-disable no-unused-vars */
import "./App.css";
import Anthropic from '@anthropic-ai/sdk';
import React, { useEffect, useState } from "react";
import data from "./data.json";
import NewComp from "./components/NewComp";
import Loading from "./components/Loading";
import { CookiesProvider, useCookies } from "react-cookie";
import Footer from "./components/Footer";

// const data = false;

const profile = {
  avatar:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
  backgroundImage:
    "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
};

function Test({ onLogout }) {
  const loading = false;
  const user = {
    username: "1ms21ci049",
    dob: "2003-05-21",
  };
  const realdata = true;
  // const urll =
  //   "https://upylba53h2.execute-api.us-east-1.amazonaws.com/sis?usn=1ms21ci049&dob=2003-05-21";
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(urll);
  //     const json = await response.json();
  //     setData(json);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  function formatDate(inputDate) {
    const dateParts = inputDate.split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    // Create a JavaScript Date object to get the month name
    const dateObj = new Date(inputDate);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = monthNames[dateObj.getMonth()];

    return `${day} ${monthName}, ${year}`;
  }
  return (
    <div className="w-full bg-gray-900 text-indigo-50">
      <div className="">
        <h1 className="text-center font-bold pt-8 text-2xl lg:text-4xl">
          Students Information System
        </h1>
        <div className="p-4">
          <h1 className="text-center font-bold">
            USN: {user.username.toUpperCase()}
          </h1>
          <h2 className="text-center">DOB: {formatDate(user.dob)}</h2>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : realdata ? (
        <div>
          <NewComp data={data} profile={profile} />
          <div className="p-4 flex justify-center w-full">
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-semibold w-full md:w-auto lg:px-10 mx-3 py-2 px-4 rounded"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-900">
          <div className="flex p-4 justify-center items-center flex-col">
            <h1 className="text-center font-bold mb-8">
              You might have entered wrong details logout and try again!
            </h1>
            <button
              className="bg-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={onLogout}
            >
              Refresh
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Test;
