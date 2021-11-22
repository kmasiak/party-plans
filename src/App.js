import React, { Component } from "react";

import CreateCollectionScreen from "./component/CreateCollectionScreen";
import CreatePartyScreen from "./component/CreatePartyScreen";
import CreateReviewScreen from "./component/CreateReviewScreen";
import HomeScreen from "./component/HomeScreen";
import LoginScreen from "./component/LoginScreen";
import RegisterScreen from "./component/RegisterScreen";
import FriendScreen from "./component/FriendScreen";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { home, login, register, add_friend, add_collection, del_friend } from "./api/api";


class App extends Component {
  state = {
    friends: [],
    parties: [],
    collections: [],
    f_friends: [],
    f_collections: [],
    friend_first_name: "",
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
    fd_open: false
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
    } else if (name === "fd") {
      this.setState({ fd_open: !bool_val });
    } else if (name === "po") {
      this.setState({ party_open: !bool_val });
    } else {
      this.setState({ showPassword: !bool_val });
    }
  };

  makeUserTables = (uemail) => {
    if (uemail == this.state.email) {
      home(uemail).then((data) => {
        console.log(data.parties);
        this.setState({
          friends: data.friends,
          parties: data.parties,
          collections: data.collections,
        });
      });
    } else {
      home(uemail).then((data) => {
        console.log(data.parties);
        this.setState({
          f_friends: data.friends,
          f_collections: data.collections,
        });
      });
    }
    
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
          this.makeUserTables(user_email);

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

  onAddFriend = (f_email) => {
    const user_id = this.state.email;

    if (user_id === "" || f_email === "") {
      alert("Please fill in all required fields.");
    } else {
      add_friend(user_id, f_email).then((data) => {
        if (data.toString().substring(0, 3) === 'ERR') {
          alert("Invalid email");
        } else {
          if (this.state.friend_open) {
            this.setShowPassword(this.state.friend_open, "fo");
          }
          this.makeUserTables(user_id);
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
        console.log(data)
        if (data.toString().substring(0, 3) === 'ERR') {
          alert("You already have a collection with that name.");
        } else {
          this.setShowPassword(this.state.collection_open, "co");
          this.makeUserTables(user_id);
          alert("Collection created!");
        }
      });
    }
  };

  onRemoveFriend = (f_email) => {
    const user_id = this.state.email;
    var r = window.confirm("Delete friend with email: " + f_email + "?");

    if (r) {
      del_friend(user_id, f_email).then((data) => {
        if (data.toString().substring(0, 3) === 'ERR') {
          alert("Invalid email");
        } else {
          this.setShowPassword(this.state.fd_open, "fd");
          this.makeUserTables(user_id);
          alert("Friend deleted!");
        }
      });
    } else {
      alert("Delete Cancelled!");
    }
  };

  onViewFriend = (f_email, f_name) => {
    this.makeUserTables(f_email);

    this.setState({
      friend_first_name: f_name
    });
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
      fd_open,
      f_friends,
      f_collections,
      friend_first_name
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
                fd_open={fd_open}
                onRemoveFriend={this.onRemoveFriend}
                onViewFriend={this.onViewFriend}
              />
            )}
          />
          <Route
            exact
            path="/create-collection"
            render={() => <CreateCollectionScreen />}
          />
          <Route
            exact
            path="/friend"
            render={() => 
              <FriendScreen 
                f_friends={f_friends}
                f_collections={f_collections}
                friend_first_name={friend_first_name}
                logged_in={logged_in}
                onLogout={this.onLogout}
                onAddFriend={this.onAddFriend}
              />}
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
