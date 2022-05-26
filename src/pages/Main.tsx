import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Login";

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
