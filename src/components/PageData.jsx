/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import NewComp from "./NewComp";
import { TypeAnimation } from "react-type-animation";
import mockdata from "../data.json";
import LoadingText from "./Loading1";
import OpenAI from "openai";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const apikey = process.env.REACT_APP_API_URL;
const anyscale = new OpenAI({
  baseURL: "https://api.endpoints.anyscale.com/v1",
  apiKey: apikey,
  dangerouslyAllowBrowser: true,
});
const config = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: "mini-sis",
  storageBucket: "mini-sis.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};
firebase.initializeApp(config);

const profile = {
  avatar:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
  backgroundImage:
    "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
};

const MyComponent = (props) => {
  const mydata = props.data;
  const firestore = firebase.firestore();
  const authname = firebase.auth().currentUser.displayName;
  const [aiResponse, setAiResponse] = useState(null);
  const [responseLoading, setResponseLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [generateCount, setGenerateCount] = useState(0);

  useEffect(() => {
    fetchGenerateCount();
  }, []);

  const model_list = [
    "meta-llama/Llama-2-7b-chat-hf",
    "meta-llama/Llama-2-13b-chat-hf",
    "meta-llama/Llama-2-70b-chat-hf",
    "HuggingFaceH4/zephyr-7b-beta",
    "mistralai/Mistral-7B-Instruct-v0.1",
  ];

  const fetchGenerateCount = async () => {
    try {
      const response = await firestore.collection("users").doc(authname).get();
      if (response.exists) {
        setGenerateCount(response.data().generateCount || 0);
      } else {
        setGenerateCount(0);
      }
    } catch (err) {
      console.error("Error fetching generate count:", err);
    }
  };

  const saveResponseToFirestore = async (newResponse, totalTokens) => {
    const userDocRef = firestore.collection("users").doc(authname);
    try {
      const doc = await userDocRef.get();
      if (doc.exists) {
        await userDocRef.update({
          responses: firebase.firestore.FieldValue.arrayUnion({
            usn: mydata.usn,
            name: mydata.name,
            response: newResponse,
            tokens: totalTokens,
          }),
          generateCount: firebase.firestore.FieldValue.increment(1),
        });
      } else {
        await userDocRef.set({
          responses: [
            {
              usn: mydata.usn,
              name: mydata.name,
              response: newResponse,
              tokens: totalTokens,
            },
          ],
          generateCount: 1,
        });
      }
      setGenerateCount((prevCount) => prevCount + 1);
      console.log("Response saved to Firestore.");
    } catch (err) {
      console.error("Error updating or creating user document:", err);
    }
  };

  const formatGrades = (jsonData) => {
    let formattedString = "";
    jsonData.marks.forEach((subject) => {
      if (subject.t1 !== "-") {
        formattedString += `Subject: ${subject.name}. `;
        if (subject["final cie"] !== "-") {
          formattedString += `My score is ${subject["final cie"]}. `;
        }
        if (subject.class_average.t1 !== "0") {
          formattedString += `Class average is ${subject.class_average.t1}. `;
        }
        formattedString += "\n";
      }
    });

    return formattedString;
  };

  const chatComplete = async () => {
    if (generateCount >= 10) {
      alert("You have reached the maximum number of generations.");
      return;
    }
    const filteredData = {
      name: mydata.name,
      marks: mydata.marks,
    };
    const formate_data = formatGrades(filteredData);
    console.log(formate_data);
    const preprompt = `Hey my name is ${mydata.name}, Carefully look into my academic data: `;
    const postprompt =
      "Make sure to roast me in the most funniest way possible. Remember to keep it short and not more than 150 words.";
    const fullPrompt = `${preprompt} ${formate_data} ${postprompt}`;
    console.log("full prompt", fullPrompt);

    setResponseLoading(true);
    setError(null);

    try {
      const completion = await anyscale.chat.completions.create({
        model: model_list[1],
        messages: [
          {
            role: "system",
            content:
              "You're a witty AI assistant, tasked with humorously roasting me based on my academic scores. Analyze my performance in each subject and deliver sharp, funny, and slightly exaggerated roasts, highlighting my strengths and weaknesses in a playful way.",
          },
          { role: "user", content: fullPrompt },
        ],
        temperature: 0.6,
      });

      if (completion.choices[0].message.content) {
        const totalTokens = completion.usage.total_tokens;
        await saveResponseToFirestore(
          completion.choices[0].message.content,
          totalTokens
        );
        setAiResponse(completion.choices[0].message.content);
        setAnimationKey((prevKey) => prevKey + 1);
      }
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
      <h1 className="text-center font-bold text-2xl lg:text-3xl mt-3 text-gray-300">
        Introducing New feature in Mini-SIS
      </h1>
      <h1 className="text-center font-bold text-3xl lg:text-4xl mt-3 from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
        Get Grilled by AI
      </h1>
      <h2 className="text-center text-md lg:text-2xl mt-2">
        A Lighthearted Roast on Your CIE Marks
      </h2>
      <p className="text-xs italic text-gray-300">
        You can generate {10 - generateCount} more times.
      </p>
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
  const firestore = firebase.firestore();
  const authname = firebase.auth().currentUser.displayName;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [check, setCheck] = useState(false);
  const [realdata, setRealData] = useState(null);
  console.log(user.username, user.dob);
  const profileurl = firebase.auth().currentUser.photoURL;
  const signname = firebase.auth().currentUser.displayName;

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
            await updateLoginCount();
          }
        } else {
          setError("Invalid Credentials");
        }
        // setTimeout(() => {
        //   const json = mockdata;
        //   if (json && json.name !== "") {
        //     setData(json);
        //     setRealData(json.name);
        //   } else {
        //     throw new Error(mockdata);
        //   }
        // }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Invalid Credentials");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [urll]);

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

  const updateLoginCount = async () => {
    const userDocRef = firestore.collection("users").doc(authname);
    try {
      await userDocRef.update({
        loginCount: firebase.firestore.FieldValue.increment(1),
      });
    } catch (err) {
      console.error("Error updating login count:", err);
    }
  };

  if (check === true) {
    return (
      <div className="w-full bg-gray-900 text-indigo-50">
        <div className="">
          <h1 className="text-center font-bold pt-8 text-2xl lg:text-4xl">
            Mini Students Information System
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
            <NewComp
              data={data}
              profile={profile}
              profileurl={profileurl}
              signname={signname}
            />
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
