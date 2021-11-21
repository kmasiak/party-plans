import React, { Component } from "react";

import CreateCollectionScreen from "./component/CreateCollectionScreen";
import CreatePartyScreen from "./component/CreatePartyScreen";
import CreateReviewScreen from "./component/CreateReviewScreen";
import HomeScreen from "./component/HomeScreen";
import LoginScreen from "./component/LoginScreen";
import RegisterScreen from "./component/RegisterScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { home, login, register, add_friend, add_collection } from "./api/api";

class App extends Component {
  state = {
    friends: [],
    parties: [],
    collections: [],
    showPassword: false,
    logged_in: false,
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    collection_name: "",
    collection_open: false,
    friend_email: "",
    friend_open: false,
  };

  handleEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePass = (event) => {
    this.setState({ password: event.target.value });
  };

  handleFname = (event) => {
    this.setState({ first_name: event.target.value });
  };

  handleLname = (event) => {
    this.setState({ last_name: event.target.value });
  };

  handleFemail = (event) => {
    console.log(this.state.friend_email);
    this.setState({ friend_email: event.target.value });
  };

  handleCollectionName = (event) => {
    console.log(this.state.collection_name);
    this.setState({ collection_name: event.target.value });
  };

  setShowPassword = (bool_val, name) => {
    if (name === "co") {
      this.setState({ collection_open: !bool_val });
    } else if (name === "fo") {
      this.setState({ friend_open: !bool_val });
    } else if (name === "po") {
      this.setState({ party_open: !bool_val });
    } else {
      this.setState({ showPassword: !bool_val });
    }
  };

  makeUserTables = () => {
    const uemail = this.state.email;

    home(uemail).then((data) => {
      console.log(data.parties);
      this.setState({
        friends: data.friends,
        parties: data.parties,
        collections: data.collections,
      });
    });
  };

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
      register(user_email, user_f_name, user_l_name, user_password).then(
        (data) => {
          if (!data) {
            alert("User already exists with email: " + user_email);
          } else {
            alert("User account successfully created!");
          }
        }
      );
    }
  };

  onLogin = () => {
    const user_email = this.state.email;
    const user_password = this.state.password;

    if (user_email === "" || user_password === "") {
      alert("Please fill in all required fields.");
    } else {
      login(user_email, user_password).then((data) => {
        if (data.email === "") {
          alert("Incorrect email or password");
        } else {
          this.makeUserTables();

          this.setState({
            logged_in: true,
            first_name: data.f_name,
          });
        }
      });
    }
  };

  onLogout = () => {
    this.setState({
      logged_in: false,
      email: "",
      password: "",
    });
  };

  onAddFriend = () => {
    const user_id = this.state.email;
    const friend_id = this.state.friend_email;

    if (user_id === "" || friend_id === "") {
      alert("Please fill in all required fields.");
    } else {
      add_friend(user_id, friend_id).then((data) => {
        if (data.response === 500) {
          alert("Invalid email");
        } else {
          alert("Friend added!");
        }
      });
    }
  };

  onAddCollection = () => {
    const user_id = this.state.email;
    const collectionName = this.state.collection_name;

    if (collectionName === "") {
      alert("Collection Name cannot be empty.");
    } else {
      add_collection(user_id, collectionName).then((data) => {
        if (data.response === 500) {
          alert("Collection could not be created.");
        } else {
          alert("Collection created!");
        }
      });
      //setShowPassword(this.state.collection_open, "co");
    }
  };

  render() {
    const {
      friends,
      parties,
      collections,
      showPassword,
      logged_in,
      email,
      password,
      first_name,
      collection_name,
      collection_open,
      friend_email,
      friend_open,
    } = this.state;

    return (
      <div>
        <Router>
          <Route
            exact
            path="/"
            render={() => (
              <LoginScreen
                handleEmail={this.handleEmail}
                handlePass={this.handlePass}
                onLogin={this.onLogin}
                logged_in={logged_in}
                showPassword={showPassword}
                setShowPassword={this.setShowPassword}
              />
            )}
          />
          <Route
            exact
            path="/register"
            render={() => (
              <RegisterScreen
                handleEmail={this.handleEmail}
                handlePass={this.handlePass}
                handleFname={this.handleFname}
                handleLname={this.handleLname}
                showPassword={showPassword}
                setShowPassword={this.setShowPassword}
                logged_in={logged_in}
                onRegister={this.onRegisterUser}
              />
            )}
          />
          <Route
            exact
            path="/home"
            render={() => (
              <HomeScreen
                email={email}
                friends={friends}
                parties={parties}
                collections={collections}
                first_name={first_name}
                logged_in={logged_in}
                onLogout={this.onLogout}
                collection_name={collection_name}
                collection_open={collection_open}
                handleCollectionName={this.handleCollectionName}
                onAddCollection={this.onAddCollection}
                friend_email={friend_email}
                friend_open={friend_open}
                onAddFriend={this.onAddFriend}
                handleFemail={this.handleFemail}
                setShowPassword={this.setShowPassword}
              />
            )}
          />
          <Route
            exact
            path="/create-collection"
            render={() => <CreateCollectionScreen />}
          />

          {/* 
          <Route exact path="/create-party" render={() => (<CreatePartyScreen 
            
            />)}
          />
          <Route exact path="/create-review" render={() => (<CreateReviewScreen 
            
            />)}
          /> */}
        </Router>
      </div>
    );
  }
}

export default App;
