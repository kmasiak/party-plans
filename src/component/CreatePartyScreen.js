import React from "react";

import { Button, Container, FormGroup, TextField } from "@material-ui/core";
import PartyPlans from "../images/party-plans.png";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import SaveIcon from "@material-ui/icons/Save";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Link } from "react-router-dom";

const movieTitle = "Shrek";

function createUsersData(fname, lname) {
  return { fname, lname };
}

function onAddUsers() {
  //
}

function onSaveParty() {
  //
}

function onDiscardParty() {
  //
}

const rowsUsersTable = [
  createUsersData("Jakob", "Short"),
  createUsersData("Sam", "Bracellari"),
  createUsersData("Olivia", "Yee"),
  createUsersData("Kyle", "Masiak"),
];

export default function CreatePartyScreen() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <img
          style={{
            height: "7.5%",
            width: "7.5%",
            display: "block",
          }}
          src={PartyPlans}
          alt="Party Plans Logo"
        />

        <h1
          style={{
            marginTop: "auto",
            marginBottom: "auto",
            marginRight: "auto",
          }}
        >
          Create Party
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
                }}
              >
                Movie: {movieTitle}
              </h2>

              <TextField
                id="datetime-local"
                label="Date & Time"
                type="datetime-local"
                defaultValue="2021-12-15T21:30"
                style={{ marginRight: "auto", marginLeft: "24px" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                id="saveBtn"
                style={{
                  backgroundColor: "#dc143c",
                  color: "white",
                  margin: "5px",
                }}
                variant="contained"
                endIcon={<SaveIcon />}
                onClick={() => onSaveParty()}
              >
                Save Party
              </Button>
              <Button
                id="discardBtn"
                style={{
                  backgroundColor: "#dc143c",
                  color: "white",
                  margin: "5px",
                }}
                variant="contained"
                endIcon={<DeleteIcon />}
                onClick={() => onDiscardParty()}
              >
                Discard Party
              </Button>
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
                {rowsUsersTable.map((row) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ backgroundColor: "#f5f5f5" }}
                  >
                    <TableCell component="th" scope="row">
                      {row.fname}
                    </TableCell>
                    <TableCell align="center">{row.lname}</TableCell>
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
            onClick={() => onAddUsers()}
          >
            Add Users
          </Button>
        </FormGroup>
      </Container>
    </div>
  );
}
