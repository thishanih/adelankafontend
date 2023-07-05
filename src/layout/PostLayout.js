import React from "react";
import { Routes, Route } from "react-router-dom";
// import Sidebar from "../components/adminComponents/adminComponents";

import Post from "../page/Post.js";
import PostCreate from "../page/PostCreate.js";
import EditPost from "../page/EditPost";

export default function PostLayout() {
  return (
    <>
      {/* <Sidebar /> */}
      <Routes>
        <Route path="/" element={<Post />} />
        <Route path="/add" element={<PostCreate />} />
        <Route path="/:id" element={<EditPost />} />
      </Routes>
    </>
  );
}
