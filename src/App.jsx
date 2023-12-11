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
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Analytics } from "@vercel/analytics/react";

const config = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: "mini-sis",
  storageBucket: "mini-sis.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};
firebase.initializeApp(config);

const uiConfig = {
  signInFlow: "popup",
  // signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
        setLoading(false);
      });
    return () => unregisterAuthObserver();
  }, []);

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
    firebase.auth().signOut();
  };
  if (loading) {
    return <Loading />; // Display loading indicator
  }
  if (!isSignedIn) {
    return (
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-blue-50 items-center h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white rounded-lg shadow-xl px-3 py-6">
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
            Welcome to Mini-SIS
          </h2>
          <h3 className="mt-2 text-center text-xl tracking-tight text-gray-600">
            The mini and awesome portal
          </h3>
          <p className="mt-2 text-center text-sm text-gray-600 italic">
            Please sign-in to continue
          </p>
          <StyledFirebaseAuth
            className=""
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
        <div className="mt-10">
          <FooterLogin />
        </div>
      </div>
    );
  }
  return (
    <CookiesProvider>
      <main className="bg-gray-900">
        {isLoggedIn ? (
          <>
            <PageData user={cookies.user} onLogout={handleLogout} />
            {/* <p className="text-white">
              {firebase.auth().currentUser.displayName}
            </p> */}
            <Footer />
          </>
        ) : (
          <div className="bg-blue-50">
            <LoginPage onLogin={handleLogin} />
            <FooterLogin />
          </div>
        )}
        <Analytics />
      </main>
    </CookiesProvider>
  );
}

export default App;
