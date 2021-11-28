import React, { Component } from "react";
import "../css/HomeScreen.css";

import { Button, Container, FormGroup, TextField } from "@material-ui/core";
import PartyPlans from "../images/party-plans.png";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import SaveIcon from "@material-ui/icons/Save";
import TimeIcon from "@material-ui/icons/Schedule";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { Link, Redirect } from "react-router-dom";

class PartyScreen extends Component {
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
      onRemoveParty,
      movie_id,
      movie_name,
      partyUsers,
      onAddUser,
      party_id,
      puser_open,
      handleUemail,
      onRemoveUser,
      handlePartyTime,
      party_time,
      party_url,
    } = this.props;

    if (!logged_in) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Link to="/home">
            <img className="img2" src={PartyPlans} alt="Party Plans Logo" />
          </Link>

          <h1
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              marginRight: "auto",
            }}
          >
            View Party
          </h1>

          <Button
            style={{
              backgroundColor: "#dc143c",
              color: "white",
              margin: "5px",
              height: "0%",
            }}
            variant="contained"
            onClick={onLogout}
            endIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </div>
        <Container maxWidth="m">
          <FormGroup>
            <br />

            <TableContainer
              sx={{ marginRight: "auto", marginLeft: "auto", width: "80%" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <h2
                  style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                    marginRight: "auto",
                  }}
                >
                  Movie: {movie_name}
                </h2>

                <TextField
                  id="datetime-local"
                  label="Date & Time"
                  type="datetime-local"
                  defaultValue={party_time}
                  style={{ marginRight: "24px" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handlePartyTime}
                />
              </div>
              <br />

              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#dc143c" }}>
                    <TableCell align="left" style={{ color: "white" }}>
                      First Name
                    </TableCell>
                    <TableCell align="center" style={{ color: "white" }}>
                      Last Name
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {partyUsers.map((row) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      style={{ backgroundColor: "#f5f5f5" }}
                    >
                      <TableCell component="th" scope="row">
                        {row.f_name}
                      </TableCell>
                      <TableCell align="center">{row.l_name}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#dc143c", color: "white" }}
                          endIcon={<DeleteIcon />}
                          onClick={() => onRemoveUser(row.user_email, party_id)}
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
              id="addUsersBtn"
              style={{
                backgroundColor: "#dc143c",
                color: "white",
                alignSelf: "center",
              }}
              variant="contained"
              endIcon={<AddIcon />}
              onClick={() => setShowPassword(puser_open, "puo")}
            >
              Add Users
            </Button>
            <Dialog
              open={puser_open}
              onClose={() => setShowPassword(puser_open, "puo")}
            >
              <DialogTitle>Add a User</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="User Email"
                  type="email"
                  fullWidth
                  variant="standard"
                  inputProps={{ maxLength: 45 }}
                  onChange={handleUemail}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowPassword(puser_open, "puo")}>
                  Cancel
                </Button>
                <Button onClick={() => onAddUser(party_id)}>Submit</Button>
              </DialogActions>
            </Dialog>
          </FormGroup>
        </Container>
      </div>
    );
  }
}

export default PartyScreen;
