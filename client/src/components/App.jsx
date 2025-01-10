import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Movies from "./Movies";
import Navbar from "./Navbar";
function App() {
  const [searchItems, setSearchItems]= useState("")
  return (
    <div>
      <Navbar setSearchItems={setSearchItems} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies searchItems={searchItems} />} />
      </Routes>
  
    </div>
  );
}

export default App;
