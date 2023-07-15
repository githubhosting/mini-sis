/* eslint-disable no-unused-vars */
import "./App.css";
import React, { useEffect, useState } from "react";
import data from "./data.json";
import NewComp from "./components/NewComp";
import Loading from "./components/Loading";
import { CookiesProvider, useCookies } from "react-cookie";

const profile = {
  avatar:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
  backgroundImage:
    "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
};

function Test() {
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
  return (
    <main className="container">
      {data ? <NewComp data={data} profile={profile} /> : <Loading />}
    </main>
  );
}

export default Test;
