import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import RequireAuth from "./layout/RequireAuth";
import Login from "./page/Login.js";
import Post from "./page/Post.js";
import AddPost from "./page/AddPost.js";

import Unauthorized from "./page/UnauthorizedPage.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RequireAuth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<Post />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/unauthorized-page" element={<Unauthorized />} />
      </Routes>
    </>
  );
}

export default App;
