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
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
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
  if (!isSignedIn) {
    return (
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-blue-50 items-center h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white rounded-lg shadow-xl p-6">
          <h2 className="mt-6 text-center text-xl font-bold tracking-tight text-gray-900">
            Welcome to Mini-SIS
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
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
      </main>
    </CookiesProvider>
  );
}

export default App;
