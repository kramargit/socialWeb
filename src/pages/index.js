import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "../components/Layout";

import Home from "./home";
import MyNotes from "./mynotes";
import Likes from "./likes";

const Pages = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mynotes" element={<MyNotes />} />
          <Route path="/likes" element={<Likes />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default Pages;