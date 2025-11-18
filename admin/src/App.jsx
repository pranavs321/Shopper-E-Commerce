import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin/Admin";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Admin />
    </div>
  );
};

export default App;
