import React, { Component } from "react";
import "../css/HomeScreen.css";

import { Button, Container, FormGroup } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
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

import { Link, Redirect } from "react-router-dom";

class MoviesScreen extends Component {
  render() {
    const {
      logged_in,
      onLogout,
      onViewMovie,
      collection_name,
      movies,
      onMovieSearch,
      handleTitle,
      handleDirector,
      handleActor,
      handleGenre,
      handleKeyword,
      handleProd,
      onAddElement,
      movie_ids,
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
          <div style={{ display: "flex", flexDirection: "row" }}>
            <FormGroup style={{ flex: "20%" }}>
              <text
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  alignSelf: "center",
                }}
              >
                Set Filters
              </text>
              <TextField
                id="title"
                className="TextField"
                label="Title"
                variant="outlined"
                margin="normal"
                inputProps={{ maxLength: 45 }}
                onChange={handleTitle}
              />
              <TextField
                id="director"
                className="TextField"
                label="Director"
                variant="outlined"
                margin="normal"
                inputProps={{ maxLength: 45 }}
                onChange={handleDirector}
              />
              <TextField
                id="cast"
                className="TextField"
                label="Cast"
                variant="outlined"
                margin="normal"
                inputProps={{ maxLength: 45 }}
                onChange={handleActor}
              />
              <TextField
                id="genre"
                className="TextField"
                label="Genre"
                variant="outlined"
                margin="normal"
                inputProps={{ maxLength: 45 }}
                onChange={handleGenre}
              />
              <TextField
                id="keywords"
                className="TextField"
                label="Keywords"
                variant="outlined"
                margin="normal"
                inputProps={{ maxLength: 45 }}
                onChange={handleKeyword}
              />
              <TextField
                id="productionCompany"
                className="TextField"
                label="Production Company"
                variant="outlined"
                margin="normal"
                inputProps={{ maxLength: 45 }}
                onChange={handleProd}
              />
              <br />
              <Button
                id="applyFiltersBtn"
                style={{
                  backgroundColor: "#dc143c",
                  color: "white",
                  alignSelf: "center",
                }}
                variant="contained"
                //endIcon={<AddIcon />}
                onClick={() => onMovieSearch(false)}
              >
                Apply Filters
              </Button>
            </FormGroup>
            <FormGroup style={{ flex: "80%" }}>
              <TableContainer
                component={Paper}
                style={{
                  marginRight: "auto",
                  marginLeft: "auto",
                  width: "90%",
                }}
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
                        Duration (min)
                      </TableCell>
                      <TableCell />
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {movies.map((row) => (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
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
                        <TableCell component="th" scope="row">
                          {row.duration}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: "#dc143c",
                              color: "white",
                            }}
                            endIcon={<ViewIcon />}
                            component={Link}
                            to="/view-movie"
                            onClick={() => onViewMovie(row.movie_id)}
                          >
                            View
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          {!movie_ids.some((x) => x === row.movie_id) && (
                            <Button
                              id="addMoviesBtn"
                              style={{
                                backgroundColor: "#dc143c",
                                color: "white",
                                alignSelf: "center",
                              }}
                              variant="contained"
                              endIcon={<AddIcon />}
                              onClick={() => onAddElement(row.movie_id)}
                            >
                              Add to Collection
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <br />
            </FormGroup>
          </div>
        </Container>
      </div>
    );
  }
}

export default MoviesScreen;
