/* eslint-disable no-unused-vars */
import "./App.css";
import React, { useEffect, useState } from "react";
import data from "./data.json";
import NewComp from "./components/NewComp";
import Loading from "./components/Loading";
import PageData from "./components/PageData";
import LoginPage from "./components/Login";
import { CookiesProvider, useCookies } from "react-cookie";
import Footer from "./components/Footer";
import FooterLogin from "./components/Footerlogin";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userCookie = cookies.user;
    if (userCookie) {
      setIsLoggedIn(true);
    }
  }, [cookies.user]);

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 100);

  function handleLogin(user, dob) {
    setCookie("user", user, { path: "/", expires: expirationDate });
    setCookie("dob", dob, { path: "/", expires: expirationDate });
    setIsLoggedIn(true);
  }

  const handleLogout = () => {
    removeCookie("user");
    removeCookie("dob");
    setIsLoggedIn(false);
  };

  return (
    <CookiesProvider>
      <main className="bg-gray-900">
        {isLoggedIn ? (
          <>
            <PageData user={cookies.user} onLogout={handleLogout} />
            <Footer />
          </>
        ) : (
          <div className="min-h-screen bg-blue-50">
            <LoginPage onLogin={handleLogin} />
            <FooterLogin />
          </div>
        )}
      </main>
    </CookiesProvider>
  );
}

export default App;
