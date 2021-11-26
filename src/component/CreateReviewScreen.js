import React from "react";

import {
  Button,
  Container,
  FormGroup,
  TextareaAutosize,
} from "@material-ui/core";
import PartyPlans from "../images/party-plans.png";
import DeleteIcon from "@material-ui/icons/Delete";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import SaveIcon from "@material-ui/icons/Save";

import Rating from "@mui/material/Rating";

import TableContainer from "@mui/material/TableContainer";

import { Link } from "react-router-dom";

const movieTitle = "Shrek";

function onSaveReview() {
  //
}

function onDiscardReview() {
  //
}

export default function CreateReviewScreen() {
  const [value, setValue] = React.useState(0);

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
          Create Review
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
                  marginRight: "auto",
                }}
              >
                Movie: {movieTitle}
              </h2>

              <Button
                id="saveBtn"
                style={{
                  backgroundColor: "#dc143c",
                  color: "white",
                  margin: "5px",
                }}
                variant="contained"
                endIcon={<SaveIcon />}
                onClick={() => onSaveReview()}
              >
                Save Review
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
                onClick={() => onDiscardReview()}
              >
                Discard Review
              </Button>
            </div>
            <br />

            <Container maxWidth="sm">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h2>Rating: </h2>
                <Rating
                  name="simple-controlled"
                  value={value}
                  style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                    marginLeft: "24px",
                  }}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </div>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={20}
                placeholder="Comments"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "100%",
                }}
              />
            </Container>
          </TableContainer>
        </FormGroup>
      </Container>
    </div>
  );
}
