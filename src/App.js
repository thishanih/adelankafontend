import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import RequireAuth from "./layout/RequireAuth";
import Login from "./page/Login.js";
import Unauthorized from "./page/UnauthorizedPage.js";
import PostLayout from "./layout/PostLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RequireAuth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/*" element={<PostLayout />} />
        <Route path="/unauthorized-page" element={<Unauthorized />} />
      </Routes>
    </>
  );
}

export default App;
