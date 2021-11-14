import React, { Component } from "react";

import HomeScreen from "./component/HomeScreen";
import LoginScreen from "./component/LoginScreen";
import RegisterScreen from "./component/RegisterScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/home" element={<HomeScreen />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
