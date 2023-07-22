/* eslint-disable no-unused-vars */
import "./App.css";
import Anthropic from "@anthropic-ai/sdk";
import React, { useEffect, useState } from "react";
import data from "./data.json";
import NewComp from "./components/NewComp";
import Loading from "./components/Loading";
import LoadingText from "./components/Loading1";
import { CookiesProvider, useCookies } from "react-cookie";
import Footer from "./components/Footer";
const anthropic = new Anthropic({
  apiKey:
    "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",
});

const MyComponent = (props) => {
  const mydata = props.data;
  const [aiResponse, setAiResponse] = useState(null);
  const [responseLoading, setResponseLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rerror, setRerror] = useState(null);

  useEffect(() => {
    const main = async () => {
      const url = "https://api.anthropic.com/v1/complete";
      const proxyUrl = "https://cors-anywhere.herokuapp.com/" + url;
      const filteredData = {
        name: mydata.name,
        usn: mydata.usn,
        marks: mydata.marks,
      };
      const stringdata = JSON.stringify(filteredData);
      const preprompt = "Please find below the essential student data:";
      const postprompt =
        "Your meticulous data analysis will be instrumental in extracting and presenting the key points.";
      const fullprompt = `${preprompt} ${stringdata} ${postprompt}`;
      // const fullprompt = "This just an test";
      const params = {
        prompt: `${Anthropic.HUMAN_PROMPT} ${fullprompt} ${Anthropic.AI_PROMPT}`,
        max_tokens_to_sample: 500,
        model: "claude-2",
      };

      try {
        setResponseLoading(true);
        setError(null);

        const response = await fetch(proxyUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": anthropic.apiKey,
          },
          body: JSON.stringify(params),
        });

        const results = await response.json();
        setAiResponse(results.completion);
        console.log(results);
        setRerror(results.error.message);
      } catch (error) {
        console.error("Anthropic API call failed:", error);
        setError("Failed to fetch AI response.");
        setRerror(null);
      } finally {
        setResponseLoading(false);
      }
    };
    main();
  }, [mydata]);

  return (
    <div>
      <div className="border-t border-gray-200 mt-6"></div>
      <div className="mt-6">
        <div className="mt-6">
          {responseLoading ? (
            <>
              <h1 className="text-center">
                Analyzing your data with AI magic. Hold on tight!
              </h1>
              <LoadingText />
            </>
          ) : (
            <div className="px-4">
              {rerror && <div className="px-4 break-words">{rerror}</div>}
              Here is analysis by AI:
              {aiResponse && <div className="break-words">{aiResponse}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
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
          <MyComponent data={data} />
          <NewComp data={data} />
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
