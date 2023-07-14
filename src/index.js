/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import App1 from "./App1";
import App2 from "./App2";
import Login from "./components/Login";
import Appall from "./Appall";
import "./index.css";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./components/Dashboard";
import Preferences from "./components/Preferences";
import Test from "./Test";

export default function Apps() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="/nisha" element={<App1 />} />
          <Route path="/namratha" element={<App2 />} />
          <Route path="/all" element={<Appall />} />
          <Route path="/test" element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Apps />);
