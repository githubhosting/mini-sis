/* eslint-disable no-unused-vars */
import "./App.css";
import React, { useEffect, useState } from "react";
import data from "./data.json";
import NewComp from "./components/NewComp";
import Loading from "./components/Loading";
import PageData from "./components/PageData";
import LoginPage from "./components/Login";
import { CookiesProvider, useCookies } from "react-cookie";

const profile = {
  avatar:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
  backgroundImage:
    "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
};

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  function handleLogin(user, dob) {
    setCookie("user", user, "dob", dob, { path: "/" });
  }
  const handleLogout = () => {
    removeCookie("user");
  };
  // function check() {
  //   if (cookies.user.username == null || cookies.user.dob == null) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  return (
    <main className="container">
      <CookiesProvider>
        <div>
          {cookies.user ? (
            <>
              <PageData user={cookies.user} onLogout={handleLogout} />
            </>
          ) : (
            <LoginPage onLogin={handleLogin} />
          )}
        </div>
      </CookiesProvider>
    </main>
  );
}

export default App;
