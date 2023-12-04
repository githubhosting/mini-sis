/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import NewComp from "./NewComp";
import { TypeAnimation } from "react-type-animation";
import mockdata from "../data.json";
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
const mockaiResponse = {
  id: "meta-llama/Llama-2-7b-chat-hf-HUN-w_JD_1GnuJsccgAj85U_2sLxLmpuArwAGsK4svE",
  object: "text_completion",
  created: 1701591294,
  model: "meta-llama/Llama-2-7b-chat-hf",
  choices: [
    {
      message: {
        role: "assistant",
        content:
          "  Oh, boy! *adjusts monocle* You've got quite the collection of grades there, my dear Shravan! *coughs* I mean, *ahem* Shravan M. R. *winks*\n\nLet's start with the obvious: your lack of skills in Public Speaking for Engineers. *chuckles* It's like you're afraid of public speaking or something! *giggles* I mean, come on, 0%?! That's like the academic version of a \"Most Improved\" award! *winks*\n\nBut wait, there's more! *clears throat* Your grades in Software Engineering are simply *eyeroll* impressive. I mean, who doesn't love a good 59%? *chuckles* It's like you're the academic equivalent of a B-movie actor: always close, but never quite there. *winks*\n\nAnd don't even get me started on your grades in Big Data Analytics! *giggles* Oh, my! 80%?! *adjusts monocle* That's like the academic version of a \"Participation Trophy\". *winks* I'm sure your parents are just thrilled to see you coasting through your courses like a... *ahem* well-rested snail. *chuckles*\n\nBut hey, at least you have some redeeming qualities! *coughs* Like your perfect score in Introduction to Machine Learning! *giggles* It's like you're the academic version of a superhero: saving the day one algorithm at a time! *winks* And your grades in Environmental Studies? *adjusts monocle* Well, that's just... *ahem* enlightening! *chuckles* I mean, who doesn't love a good 100%? *winks*\n\nIn conclusion, Shravan M. R., you are the academic equivalent of a... *ahem* well-rounded individual! *chuckles* I mean, who needs straight A's when you can have a little bit of everything? *winks* Keep up the good work, and maybe one day you'll be the academic version of a... *ahem* genius! *giggles*",
      },
      index: 0,
      finish_reason: "stop",
    },
  ],
  usage: {
    prompt_tokens: 1090,
    completion_tokens: 528,
    total_tokens: 1618,
  },
};

const MyComponent = (props) => {
  const mydata = props.data;
  const [aiResponse, setAiResponse] = useState(null);
  const [responseLoading, setResponseLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);
  const model_list = [
    "meta-llama/Llama-2-7b-chat-hf",
    "meta-llama/Llama-2-13b-chat-hf",
    "meta-llama/Llama-2-70b-chat-hf",
    "HuggingFaceH4/zephyr-7b-beta",
    "mistralai/Mistral-7B-Instruct-v0.1",
  ];
  const chatComplete = async () => {
    const filteredData = {
      name: mydata.name,
      marks: mydata.marks,
    };
    console.log(filteredData);
    const stringdata = JSON.stringify(filteredData);
    const preprompt = "Hey, Carefully look into my academic data: ";
    const postprompt =
      "Make sure to roast me in the most funniest way possible. Remember to keep it short and Nice";
    const fullPrompt = `${preprompt} ${stringdata} ${postprompt}`;
    console.log(fullPrompt);
    setResponseLoading(true);
    setError(null);
    try {
      const completion = await anyscale.chat.completions.create({
        model: model_list[1],
        messages: [
          {
            role: "system",
            content:
              "Your funny yet humorous data analysis and will be helping in presenting the analysis based on my performance. You task is to roast the me.",
          },
          { role: "user", content: fullPrompt },
        ],
        temperature: 0.4,
      });
      setAiResponse(completion.choices[0].message.content);
      setAnimationKey((prevKey) => prevKey + 1);
      console.log(completion);
    } catch (err) {
      console.error("Error during API call:", err);
      setError(err.message || "Failed to fetch AI response.");
    } finally {
      setResponseLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-2 border-t">
      <h1 className="text-center font-bold text-2xl lg:text-4xl">
        Get Grilled by AI
      </h1>
      <h2 className="text-center text-xl lg:text-2xl">
        A Lighthearted Roast on Your Academic Journey
      </h2>
      <button
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded mt-5"
        onClick={chatComplete}
        disabled={responseLoading}
      >
        Generate
      </button>
      {responseLoading && <LoadingText />}
      <div className="my-6">
        {error && <div className="px-4 break-words">{error}</div>}
        {aiResponse && (
          <div className="px-4 break-words lg:mx-20">
            <TypeAnimation
              key={animationKey}
              sequence={[aiResponse, 10]}
              speed={70}
              repeat={1}
              omitDeletionAnimation={true}
            />
          </div>
        )}
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
        // const response = await fetch(urll);
        // const json = await response.json();
        // if (json.length !== 0) {
        //   setData(json);
        //   if (json.name !== "") {
        //     setRealData(json.name);
        //   }
        // } else {
        //   setError("Invalid Credentials");
        // }
        setTimeout(() => {
          const json = mockdata;
          if (json && json.name !== "") {
            setData(json);
            setRealData(json.name);
          } else {
            throw new Error(mockdata);
          }
        }, 1000);
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
            <NewComp data={data} profile={profile} />
            <MyComponent data={data} />
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
