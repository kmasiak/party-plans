import React, { Component } from "react";
import "../css/HomeScreen.css";

import { Button, Container, FormGroup } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import EditIcon from '@mui/icons-material/Edit';

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
    // Pull the states from App.js
    const {
      logged_in,
      onLogout,
      setShowPassword,
      m_title,
      m_director,
      m_duration,
      m_release_date,
      m_actor,
      m_genre,
      m_keyword,
      m_prod_comp,
      poster_link,
      m_reviews,
      review_open,
      r_rating,
      onAddReview,
      handleRating,
      handleComments,
      onUpdateReview,
      rev_emails,
      email
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
            {m_title}
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
                <img
                  style={{ width: "75%", height: "100%" }}
                  src={poster_link}
                  alt="movie poster"
                />
              </div>
              {/* Populates movie description via data from movie states */}
              <div
                style={{ display: "flex", flex: 0.5, flexDirection: "column" }}
              >
                <text>Director: {m_director}</text>
                <br />
                <text>Duration: {m_duration} minutes</text>
                <br />
                <text>
                  Release Date: {new Date(m_release_date).toDateString()}
                </text>
                <br />
                <text>Cast: {m_actor.join(", ")}</text>
                <br />
                <text>Genres: {m_genre.join(", ")}</text>
                <br />
                <text>Keywords: {m_keyword.join(", ")}</text>
                <br />
                <text>Production Companies: {m_prod_comp.join(", ")}</text>
              </div>
            </div>
            <br />

            {/* Shows add review button unless you have already written a review */}
            {rev_emails.some(x => x === email) ? (
            <Container maxWidth="sm">
              <Button
                id="updateReviewBtn"
                style={{
                  backgroundColor: "#dc143c",
                  color: "white",
                  alignSelf: "center",
                }}
                variant="contained"
                endIcon={<EditIcon />}
                onClick={() => setShowPassword(review_open, "ro")}
              >
                Update Review
              </Button>
              <Dialog
                open={review_open}
                onClose={() => setShowPassword(review_open, "ro")}
              >
                <DialogTitle>Update a Review</DialogTitle>
                <DialogContent>
                  <Rating
                    name="simple-controlled"
                    value={parseInt(r_rating)}
                    onChange={handleRating}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Comments"
                    type="text"
                    fullWidth
                    variant="standard"
                    inputProps={{ maxLength: 200 }}
                    onChange={handleComments}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setShowPassword(review_open, "ro")}>
                    Cancel
                  </Button>
                  <Button onClick={onUpdateReview}>Submit</Button>
                </DialogActions>
              </Dialog>
            </Container>) :
            (<Container maxWidth="sm">
              <Button
                id="addReviewBtn"
                style={{
                  backgroundColor: "#dc143c",
                  color: "white",
                  alignSelf: 'center'
                }}
                variant="contained"
                endIcon={<AddIcon />}
                onClick={() => setShowPassword(review_open, "ro")}
              >
                Add Review
              </Button>
              <Dialog
              open={review_open}
              onClose={() => setShowPassword(review_open, "ro")}
              >
                <DialogTitle>Add a Review</DialogTitle>
                <DialogContent>
                  <Rating
                    name="simple-controlled"
                    value={parseInt(r_rating)}
                    onChange={handleRating}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Comments"
                    type="text"
                    fullWidth
                    variant="standard"
                    inputProps={{ maxLength: 200 }}
                    onChange={handleComments}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setShowPassword(review_open, "ro")}>
                    Cancel
                  </Button>
                  <Button onClick={onAddReview}>Submit</Button>
                </DialogActions>
              </Dialog>
            </Container>)}
          </FormGroup>
        </Container>
        <br />
        <TableContainer
          component={Paper}
          style={{ marginRight: "auto", marginLeft: "auto", width: "50%" }}
        >
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#dc143c" }}>
                <TableCell align="left" style={{ color: "white" }}>
                  Rating
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  Comments
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Takes the reviews data from the state and maps them into rows */}
              {m_reviews.map((row) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  style={{ backgroundColor: "#f5f5f5" }}
                >
                  <TableCell component="th" scope="row">
                    <Rating
                      name="simple-controlled"
                      value={parseInt(row.rating)}
                      readOnly
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.comments}
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

export default MovieDetailsScreen;
