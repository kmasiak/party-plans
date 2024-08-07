import React, { Component } from "react";
import "../css/HomeScreen.css";

import { Button, Checkbox, Container, FormGroup } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EventIcon from "@material-ui/icons/Event";
import LogoutIcon from "@material-ui/icons/ExitToApp";
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
    // Pull the states from App.js
    const {
      collectionElements,
      logged_in,
      onLogout,
      collection_open,
      setShowPassword,
      handleDCollectionName,
      onViewMovie,
      collection_name,
      onMovieSearch,
      onRemoveElement,
      onUpdateElement,
      onCreateParty,
      friend_collection,
      onDuplicateCollection,
      party_open,
      handlePartyTime,
      onPartyDialog,
    } = this.props;

    // Return to login screen if not logged in
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
                    {!friend_collection && (
                      <TableCell align="left" style={{ color: "white" }}>
                        Watched
                      </TableCell>
                    )}
                    {!friend_collection && <TableCell />}
                    {!friend_collection && <TableCell />}
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Takes the elements data from the state and maps them into rows */}
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
                        {new Date(row.release_date).toDateString()}
                      </TableCell>
                      {/* Removes button if viewing friend collection */}
                      {!friend_collection && (
                        <TableCell align="center">
                          <Checkbox
                            onChange={() =>
                              onUpdateElement(row.list_id, row.movie_id)
                            }
                            checked={row.watched}
                          />
                        </TableCell>
                      )}
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#dc143c", color: "white" }}
                          endIcon={<ViewIcon />}
                          onClick={() => onViewMovie(row.movie_id)}
                          component={Link}
                          to="/view-movie"
                        >
                          View
                        </Button>
                      </TableCell>
                      {/* Removes button if viewing friend collection */}
                      {!friend_collection && (
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: "#dc143c",
                              color: "white",
                            }}
                            endIcon={<EventIcon />}
                            onClick={() => onPartyDialog(row.movie_id)}
                          >
                            Create Party
                          </Button>
                          {/* Dialog opens to propmt for party time for selected movie */}
                          <Dialog
                            open={party_open}
                            onClose={() => setShowPassword(party_open, "po")}
                          >
                            <DialogTitle>Create a Party</DialogTitle>
                            <DialogContent>
                              <text>Set a time for the party:</text>
                              <br />
                              <br />
                              <TextField
                                id="datetime-local"
                                label="Date & Time"
                                type="datetime-local"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                onChange={handlePartyTime}
                              />
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={() =>
                                  setShowPassword(party_open, "po")
                                }
                              >
                                Cancel
                              </Button>
                              <Button onClick={() => onCreateParty()}>
                                Submit
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </TableCell>
                      )}
                      {/* Removes button if viewing friend collection */}
                      {!friend_collection && (
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: "#dc143c",
                              color: "white",
                            }}
                            endIcon={<DeleteIcon />}
                            onClick={() =>
                              onRemoveElement(row.list_id, row.movie_id)
                            }
                          >
                            Delete
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            {/* If viewing friend collection shows option to duplicate collection, else can add movies */}
            {!friend_collection ? (
              <Button
                id="addMoviesBtn"
                style={{
                  backgroundColor: "#dc143c",
                  color: "white",
                  alignSelf: "center",
                }}
                variant="contained"
                endIcon={<AddIcon />}
                onClick={() => onMovieSearch(true)}
                component={Link}
                to="/movies"
              >
                Add Movies
              </Button>
            ) : (
              <Button
                id="addMoviesBtn"
                style={{
                  backgroundColor: "#dc143c",
                  color: "white",
                  alignSelf: "center",
                }}
                variant="contained"
                endIcon={<ContentCopyIcon />}
                onClick={() => setShowPassword(collection_open, "co")}
              >
                Duplicate Collection
              </Button>
            )}
            <Dialog
              open={collection_open}
              onClose={() => setShowPassword(collection_open, "co")}
            >
              <DialogTitle>Duplicate a Collection</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="New Collection Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  inputProps={{ maxLength: 45 }}
                  onChange={handleDCollectionName}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowPassword(collection_open, "co")}>
                  Cancel
                </Button>
                <Button onClick={onDuplicateCollection}>Submit</Button>
              </DialogActions>
            </Dialog>
          </FormGroup>
        </Container>
      </div>
    );
  }
}

export default ViewCollectionScreen;
