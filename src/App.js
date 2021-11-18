import React, { Component } from "react";

import HomeScreen from "./component/HomeScreen";
import LoginScreen from "./component/LoginScreen";
import RegisterScreen from "./component/RegisterScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { 
  friends
} from './api/api'

function createFriendData(fname, lname) {
  return [fname, lname];
}


class App extends Component {
  state = {
    friends: []
  }

  makeFriendTable = () => {
    var friends_data = []
  
    friends('bob@gmail.com').then((data) => {
      if (data.friends.length === 0) {
        friends_data.push(createFriendData('No', 'Friends'))
      } else {
        for (var i = 0; i < data.friends.length; i++) {
          friends_data.push(createFriendData(data.friends[i].f_name, data.friends[i].l_name))
        }
      }
      this.setState({
        friends: friends_data
      })

    })
  }

  render() {
    const {
      friends
    } = this.state

    this.makeFriendTable()

    return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/home" element={<HomeScreen
                friends={friends}
              />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
