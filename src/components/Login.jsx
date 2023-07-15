import React, { useState } from "react";
import "../App.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onLogin({ username, dob });
  }
  console.log(username, dob);
  return (
    <div className="container bg-blue-50 min-h-screen">
      <h1 className="text-center font-semibold pt-5">
        Please Login to view your details
      </h1>
      <form
        onSubmit={handleSubmit}
        className="justify-center flex flex-col items-center py-10 align-middle"
      >
        <h1 className="font-semibold ">USN:</h1>
        <input
          type="text"
          className="mt-2 p-1 rounded-md text-center bg-blue-100"
          placeholder="USN"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <h1 className="font-semibold ">DOB:</h1>
        <input
          className="p-2 rounded-md text-center justify-center mt-2 text-black bg-blue-100"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <br />
        <input
          className="bg-green-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-5"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
}

export default Login;
