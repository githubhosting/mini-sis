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

  const urll = `https://upylba53h2.execute-api.us-east-1.amazonaws.com/sis?usn=${user.username}&dob=${user.dob}`;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(urll);
      const json = await response.json();
      if (json.length !== 0) {
        setData(json);
      } else {
        setError("Invalid Credentials");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="">
      <h1 className="text-center font-bold">
        USN: {user.username.toUpperCase()}
      </h1>
      <h2 className="text-center">DOB: {user.dob}</h2>
      <div className="flex p-4 justify-center">
        <button
          className="bg-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
      {data ? (
        <NewComp data={data} profile={profile} />
      ) : error ? (
        <h1 className="text-center font-bold">{error}</h1>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default PageData;
