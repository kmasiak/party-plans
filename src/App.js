import React, { Component } from "react";

import CreateCollectionScreen from "./component/CreateCollectionScreen";
import CreatePartyScreen from "./component/CreatePartyScreen";
import CreateReviewScreen from "./component/CreateReviewScreen";
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
          <Route
            path="/create-collection"
            element={<CreateCollectionScreen />}
          />
          <Route path="/create-party" element={<CreatePartyScreen />} />
          <Route path="/create-review" element={<CreateReviewScreen />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
