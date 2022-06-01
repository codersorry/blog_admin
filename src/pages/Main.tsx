import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import AdminIndex from "./AdminIndex";
import AddArticle from "./menu/AddArticle";
import ArticleList from "./menu/ArticleList";

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="main" element={<AdminIndex />}>
          <Route path="add" element={<AddArticle />}></Route>
          <Route path="add/:id" element={<AddArticle />}></Route>
          <Route path="list" element={<ArticleList />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
