import React, { Component } from "react";
import "../css/HomeScreen.css";

import { Button } from "@material-ui/core";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ViewIcon from "@material-ui/icons/Visibility";

import PartyPlans from "../images/party-plans.png";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Redirect, Link } from "react-router-dom";

class FriendScreen extends Component {
  render() {
    // Pull the states from App.js
    const {
      logged_in,
      onLogout,
      friend_first_name,
      f_friends,
      f_collections,
      onAddFriend, 
      emails,
      onViewCollection
    } = this.props;

    // Return to login screen if not logged in
    if (!logged_in) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
        <Link to='/home'>
          <img className="img2" src={PartyPlans} alt="Party Plans Logo"/>
        </Link>

          <h1
            style={{ marginTop: "auto", marginBottom: "auto", marginRight: "auto"}}
            className="h1"
          >
            {friend_first_name}'s Profile
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
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ width: "50%" }}>
            <TableContainer
              component={Paper}
              style={{ marginRight: "auto", marginLeft: "auto", width: "90%" }}
            >
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#dc143c" }}>
                    <TableCell align="left" style={{ color: "white" }}>
                      First Name
                    </TableCell>
                    <TableCell align="left" style={{ color: "white" }}>
                      Last Name
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Takes the friends friends data from the state and maps them into rows */}
                  {f_friends.map((row) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      style={{ backgroundColor: "#f5f5f5" }}
                    >
                      <TableCell component="th" scope="row">
                        {row.f_name}
                      </TableCell>
                      <TableCell align="left">{row.l_name}</TableCell>
                      <TableCell align="center">
                        {/* No add friend button if this user is already your friend  */}
                        {(!emails.some(x => x === row.email)) && <Button
                          variant="contained"
                          style={{ backgroundColor: "#dc143c", color: "white" }}
                          endIcon={<PersonAddIcon />}
                          onClick={() => onAddFriend(row.email)}
                        >
                          Add
                        </Button>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ width: "50%" }}>
            <TableContainer
              component={Paper}
              style={{ marginRight: "auto", marginLeft: "auto", width: "90%" }}
            >
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#dc143c" }}>
                    <TableCell align="left" style={{ color: "white" }}>
                      Collections
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Takes the friends collection data from the state and maps them into rows */}
                  {f_collections.map((row) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      style={{ backgroundColor: "#f5f5f5" }}
                    >
                      <TableCell component="th" scope="row">
                        {row.list_name}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#dc143c", color: "white" }}
                          endIcon={<ViewIcon />}
                          onClick={() =>
                            onViewCollection(row.list_id, row.list_name, true)
                          }
                          component={Link}
                          to="/view-collection"
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default FriendScreen;