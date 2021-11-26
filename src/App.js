import React, { Component } from "react";

import CreateCollectionScreen from "./component/CreateCollectionScreen";
import CreatePartyScreen from "./component/CreatePartyScreen";
import CreateReviewScreen from "./component/CreateReviewScreen";
import HomeScreen from "./component/HomeScreen";
import LoginScreen from "./component/LoginScreen";
import RegisterScreen from "./component/RegisterScreen";
import FriendScreen from "./component/FriendScreen";
import ViewCollectionScreen from "./component/ViewCollectionScreen";
import MoviesScreen from "./component/MoviesScreen";
import MovieDetailsScreen from "./component/MovieDetailsScreen";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import {
  home,
  login,
  register,
  add_friend,
  add_collection,
  del_friend,
  del_collection,
  view_collection,
  movie_search,
  add_element,
  del_element,
  update_element,
  create_party,
  get_party_users,
  poster,
  get_movie_contents,
  duplicate_collection
} from "./api/api";
import { duration } from "@material-ui/core";

class App extends Component {
  state = {
    friends: [],
    parties: [],
    collections: [],
    collectionElements: [],
    f_friends: [],
    f_collections: [],
    friend_first_name: "",
    showPassword: false,
    logged_in: false,
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    collection_id: "",
    collection_name: "",
    collection_open: false,
    friend_email: "",
    friend_open: false,
    fd_open: false,
    f_title: "",
    f_director: "",
    f_actor: "",
    f_genre: "",
    f_keyword: "",
    f_prod_comp: "",
    m_title: "",
    m_director: "",
    m_duration: "",
    m_release_date: "",
    m_actor: [],
    m_genre: [],
    m_keyword: [],
    m_prod_comp: [],
    movies: [],
    movie_open: false,
    emails: [],
    movie_ids: [],
    poster_link: "",
    friend_collection: false
  };

  getPosterLink = (m_id) => {
    poster(m_id).then((data) => {
      this.setState({
        poster_link: data.poster_link,
      });
    });
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

  handleTitle = (event) => {
    this.setState({ f_title: event.target.value });
  };

  handleDirector = (event) => {
    this.setState({ f_director: event.target.value });
  };

  handleActor = (event) => {
    this.setState({ f_actor: event.target.value });
  };

  handleGenre = (event) => {
    this.setState({ f_genre: event.target.value });
  };

  handleKeyword = (event) => {
    this.setState({ f_keyword: event.target.value });
  };

  handleProd = (event) => {
    this.setState({ f_prod_comp: event.target.value });
  };

  handleCollectionId = (event) => {
    this.setState({ collection_id: event.target.value });
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
    } else if (name === "mo") {
      this.setState({ movie_open: !bool_val });
    } else {
      this.setState({ showPassword: !bool_val });
    }
  };

  makeUserTables = (uemail) => {
    if (uemail == this.state.email) {
      home(uemail).then((data) => {
        const email_list = [];

        email_list.push(uemail);

        this.setState({
          friends: data.friends,
          parties: data.parties,
          collections: data.collections,
        });
        for (var key in data.friends) {
          email_list.push(data.friends[key].email);
        }
        this.setState({ emails: email_list });

        console.log(email_list);
      });
    } else {
      home(uemail).then((data) => {
        console.log(data.friends.email);
        this.setState({
          f_friends: data.friends,
          f_collections: data.collections,
        });
      });
    }
  };

  makeCollectionTables = () => {};

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
        if (data.toString().substring(0, 3) === "ERR") {
          alert("Invalid email");
        } else {
          if (this.state.friend_open) {
            this.setShowPassword(this.state.friend_open, "fo");
          }
          this.makeUserTables(user_id);
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
        console.log(data);
        if (data.toString().substring(0, 3) === "ERR") {
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
        if (data.toString().substring(0, 3) === "ERR") {
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

  onRemoveCollection = (list_id, collection_name) => {
    const user_id = this.state.email;
    const collection_id = list_id;
    var r = window.confirm(
      "Delete collection with name: " + collection_name + "?"
    );

    if (r) {
      del_collection(collection_id).then((data) => {
        if (data.toString().substring(0, 3) === "ERR") {
          alert("Collection could not be deleted.");
        } else {
          this.setShowPassword(this.state.fd_open, "fd");
          this.makeUserTables(user_id);
          alert("Collection deleted!");
        }
      });
    } else {
      alert("Delete Cancelled!");
    }
  };

  onViewFriend = (f_email, f_name) => {
    this.makeUserTables(f_email);

    this.setState({
      friend_first_name: f_name,
    });
  };

  onViewCollection = (list_id, list_name, friend_coll) => {
    const collection_id = list_id;
    const collection_name = list_name;
    const friend_collection = friend_coll
    const element_list = [];

    view_collection(collection_id).then((data) => {
      for (var key in data.collectionElements) {
        element_list.push(data.collectionElements[key].movie_id);
      }

      this.setState({ 
        movie_ids: element_list,
        friend_collection: friend_collection
       });

      this.setState({
        collection_name: collection_name,
        collectionElements: data.collectionElements,
        collection_id: collection_id,
      });
    });

    
  };

  onMovieSearch = (new_page) => {
    var v_title;
    var v_director;
    var v_actor;
    var v_genre;
    var v_keyword;
    var v_prod;

    if (new_page) {
      this.setState({
        f_title: "",
        f_director: "",
        f_actor: "",
        f_genre: "",
        f_keyword: "",
        f_prod_comp: "",
      });
      v_title = "";
      v_director = "";
      v_actor = "";
      v_genre = "";
      v_keyword = "";
      v_prod = "";
    } else {
      v_title = this.state.f_title;
      v_director = this.state.f_director;
      v_actor = this.state.f_actor;
      v_genre = this.state.f_genre;
      v_keyword = this.state.f_keyword;
      v_prod = this.state.f_prod_comp;
    }

    movie_search(v_title, v_director, v_actor, v_genre, v_keyword, v_prod).then(
      (data) => {
        if (!data) {
          alert("Uh oh, something went wrong!");
        } else {
          this.setState({ movies: data.elements });
        }
      }
    );
  };

  onAddElement = (movie_element) => {
    const v_movie = movie_element;
    const v_collection = this.state.collection_id;
    const v_watched = this.state.watched;

    add_element(v_collection, v_movie, v_watched).then((data) => {
      if (!data) {
        alert("Uh oh, something went wrong!");
      } else {
        this.onViewCollection(v_collection, this.state.collection_name, false);
      }
    });
  };

  onRemoveElement = (c_id, m_id) => {
    const v_collection = c_id;
    const v_movie = m_id;

    var r = window.confirm("Delete movie from collection?");

    if (r) {
      del_element(v_collection, v_movie).then((data) => {
        if (!data) {
          alert("Uh oh, something went wrong!");
        } else {
          this.onViewCollection(v_collection, this.state.collection_name, false);
          alert("Element deleted!");
        }
      });
    } else {
      alert("Delete Cancelled!");
    }
  };

  onUpdateElement = (c_id, m_id) => {
    const v_collection = c_id;
    const v_movie = m_id;

    update_element(v_collection, v_movie).then((data) => {
      if (!data) {
        alert("Uh oh, something went wrong!");
      } else {
        this.onViewCollection(v_collection, this.state.collection_name, false);
        alert("Element updated!");
      }
    });
  };

  onCreateParty = (m_id) => {
    const user_id = this.state.email;
    const v_movie = m_id;

    create_party(user_id, v_movie).then((data) => {
      if (!data) {
        alert("Uh oh, something went wrong!");
      } else {
        alert("Party created!");
      }
    });
  };

  onPartyUsers = (p_id) => {
    const v_party_users = p_id;

    get_party_users(v_party_users).then((data) => {
      if (!data) {
        alert("Uh oh, something went wrong!");
      } else {
        alert("Element updated!");
      }
    });
  };

  onViewMovie = (m_id) => {
    const id = String(m_id);
    this.getPosterLink(id);

    get_movie_contents(m_id).then((data) => {
      var title = "";
      var director = "";
      var duration = "";
      var release_date = "";
      const cast = [];
      const genre = [];
      const keyword = [];
      const prod_comp = [];

      title = data.m_contents[0].title;
      director = data.m_contents[0].director;
      duration = String(data.m_contents[0].duration);
      release_date = String(data.m_contents[0].release_date);

      for (var key in data.m_contents) {
        if (typeof data.m_contents[key].cast_name !== "undefined") {
          cast.push(data.m_contents[key].cast_name);
        }
        if (typeof data.m_contents[key].genre_name !== "undefined") {
          genre.push(data.m_contents[key].genre_name);
        }
        if (typeof data.m_contents[key].keyword_name !== "undefined") {
          keyword.push(data.m_contents[key].keyword_name);
        }
        if (typeof data.m_contents[key].pc_name !== "undefined") {
          prod_comp.push(data.m_contents[key].pc_name);
        }
      }
      this.setState({
        m_title: title,
        m_director: director,
        m_duration: duration,
        m_release_date: release_date,
        m_actor: cast,
        m_genre: genre,
        m_keyword: keyword,
        m_prod_comp: prod_comp,
      });
    });
  };

  onDuplicateCollection = () => {
    const u_email = this.state.email
    const v_collection_name = this.state.collection_name
    const v_collection_id = this.state.collection_id
    const user_id = this.state.email;

    if (v_collection_name === "") {
      alert("Collection Name cannot be empty.");
    } else {
      duplicate_collection(u_email, v_collection_name, v_collection_id).then((data) => {
        if (data.toString().substring(0, 3) === "ERR") {
          alert("You already have a collection with that name.");
        } else {
          this.setShowPassword(this.state.collection_open, "co");
          this.makeUserTables(user_id);
          alert("Collection created!");
        }
      });
    }
  }

  render() {
    const {
      friends,
      parties,
      collections,
      collectionElements,
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
      friend_first_name,
      f_title,
      f_director,
      f_actor,
      f_genre,
      f_keyword,
      f_prod_comp,
      m_title,
      m_director,
      m_duration,
      m_release_date,
      m_actor,
      m_genre,
      m_keyword,
      m_prod_comp,
      movies,
      movie_open,
      collection_id,
      watched,
      emails,
      movie_ids,
      poster_link,
      friend_collection
    } = this.state;

    return (
      <div style={{ minHeight: "100%", margin: 0 }}>
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
                onRemoveCollection={this.onRemoveCollection}
                friend_email={friend_email}
                friend_open={friend_open}
                onAddFriend={this.onAddFriend}
                handleFemail={this.handleFemail}
                setShowPassword={this.setShowPassword}
                fd_open={fd_open}
                onRemoveFriend={this.onRemoveFriend}
                onViewFriend={this.onViewFriend}
                onViewCollection={this.onViewCollection}
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
            render={() => (
              <FriendScreen
                f_friends={f_friends}
                f_collections={f_collections}
                friend_first_name={friend_first_name}
                logged_in={logged_in}
                onLogout={this.onLogout}
                onAddFriend={this.onAddFriend}
                emails={emails}
                onViewCollection={this.onViewCollection}
              />
            )}
          />
          <Route
            exact
            path="/view-collection"
            render={() => (
              <ViewCollectionScreen
                collection_id={f_friends}
                collection_name={collection_name}
                collectionElements={collectionElements}
                onViewMovie={this.onViewMovie}
                onAddMovies={this.onAddMovies}
                onMovieSearch={this.onMovieSearch}
                logged_in={logged_in}
                onLogout={this.onLogout}
                onRemoveElement={this.onRemoveElement}
                onUpdateElement={this.onUpdateElement}
                onCreateParty={this.onCreateParty}
                setShowPassword={this.setShowPassword}
                movie_open={this.movie_open}
                onViewMovie={this.onViewMovie}
                friend_collection={friend_collection}
                onDuplicateCollection={this.onDuplicateCollection}
                collection_open={collection_open}
                handleCollectionName={this.handleCollectionName}
              />
            )}
          />
          <Route
            exact
            path="/movies"
            render={() => (
              <MoviesScreen
                collection_id={f_friends}
                collection_name={collection_name}
                collectionElements={collectionElements}
                f_title={f_title}
                f_director={f_director}
                f_actor={f_actor}
                f_genre={f_genre}
                f_keyword={f_keyword}
                f_prod_comp={f_prod_comp}
                handleTitle={this.handleTitle}
                handleDirector={this.handleDirector}
                handleActor={this.handleActor}
                handleGenre={this.handleGenre}
                handleKeyword={this.handleKeyword}
                handleProd={this.handleProd}
                movies={movies}
                onMovieSearch={this.onMovieSearch}
                onViewMovie={this.onViewMovie}
                logged_in={logged_in}
                onLogout={this.onLogout}
                movie_open={movie_open}
                handleCollectionId={this.handleCollectionId}
                onAddElement={this.onAddElement}
                setShowPassword={this.setShowPassword}
                collections={collections}
                movie_ids={movie_ids}
              />
            )}
          />

          <Route
            exact
            path="/create-party"
            render={() => (
              <CreatePartyScreen
                logged_in={logged_in}
                onLogout={this.onLogout}
              />
            )}
          />
          <Route
            exact
            path="/view-movie"
            render={() => (
              <MovieDetailsScreen
                logged_in={logged_in}
                onLogout={this.onLogout}
                poster_link={poster_link}
                m_title={m_title}
                m_director={m_director}
                m_duration={m_duration}
                m_release_date={m_release_date}
                m_actor={m_actor}
                m_genre={m_genre}
                m_keyword={m_keyword}
                m_prod_comp={m_prod_comp}
              />
            )}
          />
          <Route
            exact
            path="/create-review"
            render={() => <CreateReviewScreen />}
          />
        </Router>
      </div>
    );
  }
}

export default App;
