import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./home";
import MyNotes from "./mynotes";
import Likes from "./likes";

const Pages = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mynotes" element={<MyNotes />} />
        <Route path="/likes" element={<Likes />} />
      </Routes>
    </Router>
  );
};

export default Pages;