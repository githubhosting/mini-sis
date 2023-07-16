/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import NewComp from "./NewComp";

const profile = {
  avatar:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
  backgroundImage:
    "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
};

function PageData({ user, onLogout }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [check, setCheck] = useState(false);
  const [realdata, setRealData] = useState(null);
  console.log(user.username, user.dob);

  useEffect(() => {
    if (
      user.dob !== "" &&
      user.username !== "" &&
      user.dob !== undefined &&
      user.username !== undefined
    ) {
      setCheck(true);
    }
  }, [user]);

  const urll = `https://upylba53h2.execute-api.us-east-1.amazonaws.com/sis?usn=${user.username}&dob=${user.dob}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urll);
        const json = await response.json();
        if (json.length !== 0) {
          setData(json);
          if (json.name !== "") {
            setRealData(json.name);
          }
        } else {
          setError("Invalid Credentials");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Invalid Credentials");
      }
    };
    fetchData();
  }, [urll]);
  console.log(realdata);

  if (check === true) {
    return (
      <div className="w-full bg-blue-50 xl:flex">
        <h1 className="text-center font-bold">Students Information System</h1>
        <div className="bg-blue-100 rounded p-3">
          <h1 className="text-center font-bold">
            USN: {user.username.toUpperCase()}
          </h1>
          <h2 className="text-center">DOB: {user.dob}</h2>
        </div>
        <div className="flex p-4 justify-center">
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
            onClick={onLogout}
          >
            Clear cookies
          </button>
        </div>
        {realdata ? (
          <NewComp data={data} profile={profile} />
        ) : (
          <Loading err={realdata} />
        )}
      </div>
    );
  } else if (realdata === null || realdata === undefined) {
    return (
      <div className="container">
        <div className="flex p-4 justify-center items-center flex-col">
          <h1 className="text-center font-bold">
            You might have entered wrong details logout and try again!
          </h1>
          <h1 className="text-center font-bold">USN: {user.username}</h1>
          <h2 className="text-center">DOB: {user.dob}</h2>
          <button
            className="bg-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default PageData;
