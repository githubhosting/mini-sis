/* eslint-disable jsx-a11y/anchor-is-valid */
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
    <div className="bg-blue-50 min-h-screen h-full">
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-16 w-auto bg-white rounded-md"
            src="https://user-images.githubusercontent.com/71520844/185781029-0afe7079-1d90-4cbc-9c8f-ce424c73a916.png"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900 px-2">
            Login to view your SIS data
          </h2>
          <div className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-blue-600">
              make sure to enter the correct information
            </p>
          </div>
        </div>

        <div className="mt-8 mx-auto w-full max-w-md px-4">
          <div className="bg-white py-8 px-4 shadow-md rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  USN:
                </label>
                <div className="mt-1">
                  <input
                    id="usn"
                    name="usn"
                    type="text"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  DOB:
                </label>
                <div className="mt-1">
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    required
                    onChange={(e) => setDob(e.target.value)}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
