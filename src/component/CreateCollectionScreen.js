import React, { Component } from "react";

import {
  Button,
  Checkbox,
  Container,
  FormGroup,
  TextField,
} from "@material-ui/core";
import PartyPlans from "../images/party-plans.png";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import SaveIcon from "@material-ui/icons/Save";
import ViewIcon from "@material-ui/icons/Visibility";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Link } from "react-router-dom";

const userInputProps = {
  collectionName: "",
};

function createCollectionData(movieTitle) {
  return { movieTitle };
}

function onAddMovies() {
  //
}

function onSaveCollection() {
  //
}

function onDiscardCollection() {
  //
}

const rowsCollectionTable = [
  createCollectionData("Shrek"),
  createCollectionData("Little Monsters"),
  createCollectionData("Cinderella"),
];

class CreateCollectionScreen extends Component {
  render() {
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
            Create Collection
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
                <TextField
                  required
                  id="collectionName"
                  style={{
                    backgroundColor: "white",
                    width: "25%",
                    height: "0%",
                    marginTop: "auto",
                    marginBottom: "auto",
                    marginRight: "auto",
                  }}
                  type="text"
                  label="Collection Name"
                  props="required"
                  inputRef={(ref) => {
                    userInputProps.collectionName = ref;
                  }}
                  inputProps={{ maxLength: 45 }}
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
                  onClick={() => onSaveCollection()}
                >
                  Save Collection
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
                  onClick={() => onDiscardCollection()}
                >
                  Discard Collection
                </Button>
              </div>
              <br />

              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#dc143c" }}>
                    <TableCell align="left" style={{ color: "white" }}>
                      Movie Title
                    </TableCell>
                    <TableCell align="center" style={{ color: "white" }}>
                      Watched
                    </TableCell>
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsCollectionTable.map((row) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      style={{ backgroundColor: "#f5f5f5" }}
                    >
                      <TableCell component="th" scope="row">
                        {row.movieTitle}
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox />
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
              onClick={() => onAddMovies()}
            >
              Add Movies
            </Button>
          </FormGroup>
        </Container>
      </div>
    );
  }
}

export default CreateCollectionScreen