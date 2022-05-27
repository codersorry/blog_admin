import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import AdminIndex from "./AdminIndex";

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/index" element={<AdminIndex />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
