import React, { Component } from "react";
import "../css/RegisterScreen.css";

import {
  Button,
  Container,
  FormGroup,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import PartyPlans from "../images/party-plans.png";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { Link, Redirect } from "react-router-dom";

class RegisterScreen extends Component {
  render() {
    // Pull the states from App.js
    const {
      handleEmail,
      handlePass,
      handleFname,
      handleLname,
      showPassword,
      setShowPassword,
      logged_in,
      onRegister
    } = this.props

    // Redirect to home if logged in
    if (logged_in) {
      return <Redirect to='/home' />
    }

    return (
      <Container maxWidth="sm">
        <img
          className="imgReg"
          src={PartyPlans}
          alt="Party Plans Logo"
          style={{
            height: "25%",
            width: "25%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <h1 className="h1Reg">Register Account</h1>
        <FormGroup className="FormGroupReg">
          <TextField
            required
            id="firstName"
            className="TextFieldReg"
            type="text"
            label="First Name"
            variant="outlined"
            margin="normal"
            inputProps={{ maxLength: 45 }}
            onChange={handleFname}
          />
          <TextField
            required
            id="lastName"
            className="TextFieldReg"
            type="text"
            label="Last Name"
            variant="outlined"
            margin="normal"
            inputProps={{ maxLength: 45 }}
            onChange={handleLname}
          />
          <TextField
            required
            id="email"
            className="TextFieldReg"
            type="email"
            label="Email"
            variant="outlined"
            props="required"
            margin="normal"
            inputProps={{ maxLength: 45 }}
            onChange={handleEmail}
          />
          <TextField
            required
            id="password"
            className="TextFieldReg"
            type={showPassword ? "text" : "password"}
            label="Password"
            variant="outlined"
            margin="normal"
            inputProps={{ maxLength: 45 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(showPassword, '')}
                    onMouseDown={() => setShowPassword(showPassword, '')}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={handlePass}
          />
          <br />
          <Button
            variant="contained"
            style={{ backgroundColor: "#DC143C", color: "white" }}
            onClick={onRegister}
            component={Link} to="/"
          >
            Register
          </Button>
          <br />
          <Button component={Link} to="/">
            Already have an account? Login
          </Button>
        </FormGroup>
      </Container>
    );
  }
}

export default RegisterScreen