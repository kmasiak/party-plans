import React, { Component } from "react";
import "../css/HomeScreen.css";

import { Button, Container, FormGroup } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EventIcon from "@material-ui/icons/Event";
import LinkIcon from "@material-ui/icons/Link";
import ListIcon from "@material-ui/icons/List";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ViewIcon from "@material-ui/icons/Visibility";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import PartyPlans from "../images/party-plans.png";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { Link, Redirect } from "react-router-dom";

class MovieDetailsScreen extends Component {
  render() {
    const {
      friends,
      parties,
      collections,
      collectionElements,
      first_name,
      logged_in,
      onLogout,
      collection_open,
      friend_open,
      setShowPassword,
      handleFemail,
      onAddFriend,
      onAddCollection,
      handleCollectionName,
      onRemoveFriend,
      onRemoveCollection,
      onViewFriend,
      friend_email,
      onViewMovie,
      collection_id,
      collection_name,
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
      onMovieSearch,
      handleTitle,
      handleDirector,
      handleActor,
      handleGenre,
      handleKeyword,
      handleProd,
      movie_open,
      handleCollectionId,
      onAddElement,
      onShowMovie,
      poster_link,
    } = this.props;

    if (!logged_in) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Link to="/home">
            <img className="img2" src={PartyPlans} alt="Party Plans Logo" />
          </Link>
          <h1
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              marginRight: "auto",
            }}
            className="h1"
          >
            {m_title}
          </h1>

          <Button
            style={{
              backgroundColor: "#dc143c",
              color: "white",
              margin: "5px",
              height: "0%",
            }}
            variant="contained"
            endIcon={<LogoutIcon />}
            onClick={onLogout}
          >
            Logout
          </Button>
        </div>

        <br />

        <Container maxWidth="sm">
          <FormGroup className="FormGroup">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{ display: "flex", flex: 0.5, flexDirection: "column" }}
              >
                <img
                  style={{ width: "75%", height: "100%" }}
                  src={poster_link}
                  alt="movie poster"
                />
              </div>
              <div
                style={{ display: "flex", flex: 0.5, flexDirection: "column" }}
              >
                <text>Director: {m_director}</text>
                <br />
                <text>Duration: {m_duration} minutes</text>
                <br />
                <text>
                  Release Date: {new Date(m_release_date).toDateString()}
                </text>
                <br />
                <text>Cast: {m_actor.join(", ")}</text>
                <br />
                <text>Genres: {m_genre.join(", ")}</text>
                <br />
                <text>Keywords: {m_keyword.join(", ")}</text>
                <br />
                <text>Production Companies: {m_prod_comp.join(", ")}</text>
              </div>
            </div>
            <br />
          </FormGroup>
        </Container>
      </div>
    );
  }
}

export default MovieDetailsScreen;
