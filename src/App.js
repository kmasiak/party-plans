import React, { Component } from "react";

import RegisterScreen from "./component/RegisterScreen";
import LoginScreen from "./component/LoginScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



class App extends Component {
    render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
