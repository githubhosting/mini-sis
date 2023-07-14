import React, { useState } from "react";
import "../App.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onLogin({ username, dob });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center mt-10 bg-blue-50 py-10"
    >
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        DOB:
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </label>
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Login;
