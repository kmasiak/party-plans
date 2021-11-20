import React, { Component } from "react";

import HomeScreen from "./component/HomeScreen";
import LoginScreen from "./component/LoginScreen";
import RegisterScreen from "./component/RegisterScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { 
  home,
  login,
  register
} from './api/api'

class App extends Component {
  state = {
    friends: [],
    parties:[],
    lists: [],
    showPassword: false,
    logged_in: false,
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    
  }

  handleEmail = (event) =>  {
    this.setState({ email: event.target.value })
  }

  handlePass = (event) => {
    this.setState({ password: event.target.value })
  }

  handleFname = (event) =>  {
    this.setState({ first_name: event.target.value })
  }

  handleLname = (event) => {
    this.setState({ last_name: event.target.value })
  }

  setShowPassword = (showPassword) => {
    this.setState({ showPassword: !showPassword})
  }

  makeUserTables = () => {
    const uemail = this.state.email

    home(uemail).then((data) => {
      console.log(data.parties)
      this.setState({
        friends: data.friends,
        parties: data.parties,
        lists: data.collections
      })
    })
  }

  onRegisterUser = () => {
    const user_f_name = this.state.first_name;
    const user_l_name = this.state.last_name;
    const user_email = this.state.email;
    const user_password = this.state.password;
    if (
      user_f_name === "" ||
      user_l_name === "" ||
      user_email === "" ||
      user_password === ""
    ) {
      alert("Please fill in all required fields.");
    } else {
      register(user_email, user_f_name, user_l_name, user_password).then((data) => {
        if(!data) {
          alert("User already exists with email: " + user_email)
        } else {
          alert("User account successfully created!")
        }
      })
      
    }
  }

  onLogin = () => {
    const user_email = this.state.email;
    const user_password = this.state.password;
    
    if (user_email === "" || user_password === "") {
      alert("Please fill in all required fields.");
    } else {
      login(user_email, user_password).then((data) => {
        if (data.email === '') {
          alert("Incorrect email or password");
        } else {
          this.makeUserTables()

          this.setState({
            logged_in: true,
            first_name: data.f_name
          })
        }
      })
  
    }
  }

  onLogout = () => {
    this.setState({
      logged_in: false,
      email: '',
      password: ''
    })
  }

  render() {
    const {
      friends,
      parties,
      lists,
      showPassword,
      logged_in,
      email, 
      password,
      first_name
    } = this.state

    

    return (
      <div>
        <Router>
          <Route exact path="/" render={() => (<LoginScreen 
            handleEmail={this.handleEmail}
            handlePass={this.handlePass}
            onLogin={this.onLogin}
            logged_in={logged_in}
            showPassword={showPassword}
            setShowPassword={this.setShowPassword}
            />)} />
          <Route exact path="/register" render={() => (<RegisterScreen 
            handleEmail={this.handleEmail}
            handlePass={this.handlePass}
            handleFname={this.handleFname}
            handleLname={this.handleLname}
            showPassword={showPassword}
            setShowPassword={this.setShowPassword}
            logged_in={logged_in}
            onRegister={this.onRegisterUser}
            />)} />
          <Route exact path="/home" render={() => (<HomeScreen
            email={email}
            friends={friends}
            parties={parties}
            lists={lists}
            first_name={first_name}
            logged_in={logged_in}
            onLogout={this.onLogout}
            />)} />
        </Router>
      </div>
    );
  }
}

export default App;
