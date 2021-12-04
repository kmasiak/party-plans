import React, { Component } from "react";
import "../css/HomeScreen.css";

import { Button, Container, FormGroup, TextField } from "@material-ui/core";
import PartyPlans from "../images/party-plans.png";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import LogoutIcon from "@material-ui/icons/ExitToApp";

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
    // Pull the states from App.js
    const {
      logged_in,
      onLogout,
      setShowPassword,
      movie_name,
      partyUsers,
      onAddUser,
      party_id,
      puser_open,
      handleUemail,
      onRemoveUser,
      handlePartyTime,
      party_time,
      recUsers,
      onAddRecUser,
    } = this.props;

    // Return to login screen if not logged in
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
                  {/* Takes the party users data from the state and maps them into rows */}
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
                <Button onClick={() => onAddUser(party_id, "")}>Submit</Button>
              </DialogActions>
            </Dialog>

            <br />

            <TableContainer
              sx={{ marginRight: "auto", marginLeft: "auto", width: "80%" }}
            >
              <h3
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                  marginRight: "auto",
                }}
              >
                Recommended Users to Add to Party
              </h3>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#dc143c" }}>
                    <TableCell align="left" style={{ color: "white" }}>
                      Email
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Takes the recommended users data from the state and maps them into rows */}
                  {recUsers.map((row) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      style={{ backgroundColor: "#f5f5f5" }}
                    >
                      <TableCell component="th" scope="row">
                        {row.user_email1}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#dc143c", color: "white" }}
                          endIcon={<AddIcon />}
                          onClick={() => onAddRecUser(row.user_email1)}
                        >
                          Add User
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </FormGroup>
        </Container>
      </div>
    );
  }
}

export default PartyScreen;
