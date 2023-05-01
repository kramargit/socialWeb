import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "../components/Layout";

import Home from "./home";
import MyNotes from "./mynotes";
import Likes from "./likes";
import NotePage from './note';
import Settings from "./settings";
import SignUp from "./signup";
import NewNote from "./new";
import EditNote from "./edit";
import Profile from "./profile";

const Pages = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<MyNotes />} path="/mynotes" />
          <Route element={<Likes />} path="/likes" />
          <Route element={<NotePage />} path="/note/:id" />
          <Route element={<Settings />} path="/settings" />
          <Route element={<SignUp />} path="/registration" />
          <Route element={<NewNote />} path="/newnote" />
          <Route element={<EditNote />} path="/edit/:id" />
          <Route element={<Profile />} path="/profile" />
        </Routes>
      </Layout>
    </Router>
  );
};

export default Pages;
