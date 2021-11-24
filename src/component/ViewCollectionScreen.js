import React, { Component } from "react";
import "../css/HomeScreen.css";

import { Button, Checkbox, Container, FormGroup } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EventIcon from "@material-ui/icons/Event";
import LinkIcon from "@material-ui/icons/Link";
import ListIcon from "@material-ui/icons/List";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ViewIcon from "@material-ui/icons/Visibility";
import TextField from "@mui/material/TextField";

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

class ViewCollectionScreen extends Component {
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
      onAddMovies,
      collection_id,
      collection_name,
      onMovieSearch,
      onRemoveElement,
      onUpdateElement,
      onCreateParty,
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
            {collection_name}
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

        <Container maxWidth="m">
          <FormGroup>
            <TableContainer
              component={Paper}
              style={{ marginRight: "auto", marginLeft: "auto", width: "90%" }}
            >
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#dc143c" }}>
                    <TableCell align="left" style={{ color: "white" }}>
                      Movie Title
                    </TableCell>
                    <TableCell align="left" style={{ color: "white" }}>
                      Director
                    </TableCell>
                    <TableCell align="left" style={{ color: "white" }}>
                      Release Date
                    </TableCell>
                    <TableCell align="left" style={{ color: "white" }}>
                      Watched
                    </TableCell>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {collectionElements.map((row) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      style={{ backgroundColor: "#f5f5f5" }}
                    >
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.director}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.release_date}
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox
                          onChange={() =>
                            onUpdateElement(row.list_id, row.movie_id)
                          }
                          checked={row.watched}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#dc143c", color: "white" }}
                          endIcon={<ViewIcon />}
                          onClick={() => onViewMovie()}
                          //component={Link}
                          //to="/view-collection"
                        >
                          View
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          component={Link}
                          to="/create-party"
                          variant="contained"
                          style={{ backgroundColor: "#dc143c", color: "white" }}
                          endIcon={<EventIcon />}
                          onClick={() => onCreateParty(row.movie_id)}
                        >
                          Create Party
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#dc143c", color: "white" }}
                          endIcon={<DeleteIcon />}
                          onClick={() =>
                            onRemoveElement(row.list_id, row.movie_id)
                          }
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            <Button
              id="addMoviesBtn"
              style={{
                backgroundColor: "#dc143c",
                color: "white",
                alignSelf: "center",
              }}
              variant="contained"
              endIcon={<AddIcon />}
              onClick={() => onMovieSearch()}
              component={Link}
              to="/movies"
            >
              Add Movies
            </Button>
          </FormGroup>
        </Container>
      </div>
    );
  }
}

export default ViewCollectionScreen;
