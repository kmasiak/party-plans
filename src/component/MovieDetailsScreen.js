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
      poster_link
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
            Movie Title
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
                <img className="img2" src={poster_link} alt="movie poster" />
              </div>
              <div
                style={{ display: "flex", flex: 0.5, flexDirection: "column" }}
              >
                <text>Director: </text>
                <br />
                <text>Duration: </text>
                <br />
                <text>Release Date: </text>
                <br />
                <text>Cast: </text>
                <br />
                <text>Genres: </text>
                <br />
                <text>Keywords: </text>
                <br />
                <text>Production Companies: </text>
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
