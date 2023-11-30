/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import NewComp from "./NewComp";
import LoadingText from "./Loading1";
import OpenAI from "openai";
const apikey = process.env.REACT_APP_API_URL;
const anyscale = new OpenAI({
  baseURL: "https://api.endpoints.anyscale.com/v1",
  apiKey: apikey,
  dangerouslyAllowBrowser: true,
});

const profile = {
  avatar:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
  backgroundImage:
    "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
};
const MyComponent = (props) => {
  const mydata = props.data;
  const [aiResponse, setAiResponse] = useState(null);
  const [responseLoading, setResponseLoading] = useState(false);
  const [error, setError] = useState(null);

  const chatComplete = async () => {
    const filteredData = {
      name: mydata.name,
      usn: mydata.usn,
      marks: mydata.marks,
    };
    const stringdata = JSON.stringify(filteredData);
    const preprompt = "Carefully look into the student data provided:";
    const postprompt =
      "Your funny data analysis and will be helping in presenting the analysis based. You task is to roast the student.";
    const fullPrompt = `${preprompt} ${stringdata} ${postprompt}`;

    setResponseLoading(true);
    setError(null);

    try {
      const completion = await anyscale.chat.completions.create({
        model: "meta-llama/Llama-2-7b-chat-hf",
        messages: [
          { role: "system", content: "You are a funny roasting data analyst." },
          { role: "user", content: fullPrompt },
        ],
        temperature: 0.7,
      });

      setAiResponse(completion.choices[0].message.content);
    } catch (err) {
      console.error("Error during API call:", err);
      setError(err.message || "Failed to fetch AI response.");
    } finally {
      setResponseLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        onClick={chatComplete}
        disabled={responseLoading}
      >
        Analyze Data
      </button>
      {responseLoading && <LoadingText />}
      <div className="mt-6">
        {error && <div className="px-4 break-words">{error}</div>}
        {aiResponse && <div className="px-4 break-words">{aiResponse}</div>}
      </div>
    </div>
  );
};

function PageData({ user, onLogout }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
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
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [urll]);
  console.log(realdata);
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

  if (check === true) {
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
            <MyComponent data={data} />
            <NewComp data={data} profile={profile} />
            <div className="p-4 flex justify-center w-full">
              <button
                className="w-full md:w-auto lg:px-10 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-900 min-h-screen">
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
      </div>
    );
  }
}

export default PageData;
