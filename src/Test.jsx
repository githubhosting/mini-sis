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
import OpenAI from "openai";
const apikey = "esecret_hanjm9lbkdr62f7csy3fem5fvys";
const anyscale = new OpenAI({
  baseURL: "https://api.endpoints.anyscale.com/v1",
  apiKey: apikey,
  dangerouslyAllowBrowser: true,
});

const MyOldComponent = (props) => {
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
            "x-api-key": "",
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
      "Your meticulous data analysis will be instrumental in extracting and presenting the key points.";
    const fullPrompt = `${preprompt} ${stringdata} ${postprompt}`;

    setResponseLoading(true);
    setError(null);

    try {
      const completion = await anyscale.chat.completions.create({
        model: "meta-llama/Llama-2-7b-chat-hf",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
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
