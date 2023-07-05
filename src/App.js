import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import RequireAuth from "./layout/RequireAuth";
import Login from "./page/Login.js";
import Post from "./page/Post.js";
import PostCreate from "./page/PostCreate.js";
import Unauthorized from "./page/UnauthorizedPage.js";
import EditPost from "./page/EditPost";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RequireAuth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<Post />} />
        <Route path="/addpost" element={<PostCreate />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
        <Route path="/unauthorized-page" element={<Unauthorized />} />
      </Routes>
    </>
  );
}

export default App;
