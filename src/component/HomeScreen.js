import React, { Component } from "react";
import "../css/HomeScreen.css";

import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EventIcon from "@material-ui/icons/Event";
import LinkIcon from "@material-ui/icons/Link";
import ListIcon from "@material-ui/icons/List";
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

import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/styles";



function createListData(listName) {
  return { listName };
}

function createPartyData(movieName, date) {
  return { movieName, date };
}



const rowsListTable = [
  createListData("Scary Movies"),
  createListData("Christmas Movies"),
  createListData("All-Time Greats"),
  createListData("Childhood Favorites"),
];

const rowsPartyTable = [createPartyData("Shrek", "11/13/21 7:00PM")];


class HomeScreen extends Component {
  render() {
    const { 
      friends,
      parties,
      lists,
      first_name,
      logged_in,
      onLogout
    } = this.props

    if (!logged_in) {
      return <Redirect to='/'/>
    }

    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img className="img2" src={PartyPlans} alt="Party Plans Logo" />

          <h1 style={{ marginTop: "auto", marginBottom: "auto" }} className="h1">
            Welcome, {first_name}
          </h1>

          <Button
            style={{
              backgroundColor: "#dc143c",
              color: "white",
              margin: "5px",
              height: "0%",
              marginTop: "auto",
              marginBottom: "auto",
              marginLeft: "auto",
            }}
            variant="contained"
            endIcon={<PersonAddIcon />}
          >
            Add Friend
          </Button>
          <Button
            style={{
              backgroundColor: "#dc143c",
              color: "white",
              margin: "5px",
              height: "0%",
              marginTop: "auto",
              marginBottom: "auto",
            }}
            variant="contained"
            endIcon={<ListIcon />}
          >
            Create List
          </Button>
          <Button
            style={{
              backgroundColor: "#dc143c",
              color: "white",
              margin: "5px",
              height: "0%",
              marginTop: "auto",
              marginBottom: "auto",
              marginRight: "auto",
            }}
            variant="contained"
            endIcon={<EventIcon />}
          >
            Create Party
          </Button>
          <Button
            style={{
              backgroundColor: "#dc143c",
              color: "white",
              margin: "5px",
              height: "0%",
            }}
            variant="contained"
            endIcon={<EventIcon />}
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
                  {friends.map((row) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      style={{ backgroundColor: "#f5f5f5" }}
                    >
                      <TableCell component="th" scope="row">
                        {row.f_name}
                      </TableCell>
                      <TableCell align="left">{row.l_name}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#dc143c", color: "white" }}
                          endIcon={<ViewIcon />}
                        >
                          View Lists
                        </Button>
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
                      My Lists
                    </TableCell>
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lists.map((row) => (
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
                        >
                          View
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#dc143c", color: "white" }}
                          endIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <br />
        <TableContainer
          component={Paper}
          style={{ marginRight: "auto", marginLeft: "auto", width: "90%" }}
        >
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#dc143c" }}>
                <TableCell align="left" style={{ color: "white" }}>
                  Party
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  Date
                </TableCell>
                <TableCell />
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {parties.map((row) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  style={{ backgroundColor: "#f5f5f5" }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="left">{row.time}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#dc143c", color: "white" }}
                      endIcon={<LinkIcon />}
                      onClick={() => window.open(row.url)}
                    >
                      Link
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#dc143c", color: "white" }}
                      endIcon={<ViewIcon />}
                    >
                      View
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#dc143c", color: "white" }}
                      endIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
  
export default HomeScreen