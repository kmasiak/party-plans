import React, { Component } from "react";
import "../css/LoginScreen.css";

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

class LoginScreen extends Component {
  render() {

  const { 
    showPassword,
    setShowPassword,
    handleEmail, 
    handlePass,
    logged_in,
    onLogin,
  } = this.props

  if (logged_in) {
    return <Redirect to='/home' />
  }

  return (
    <Container maxWidth="sm">
      <img className="img" src={PartyPlans} alt="Party Plans Logo" />
      <h1 className="h1">Login</h1>
      <FormGroup className="FormGroup">
        <TextField
          required
          id="email"
          className="TextField"
          type="text"
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
          className="TextField"
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
                  onClick={() => setShowPassword(showPassword)}
                  onMouseDown={() => setShowPassword(showPassword)}
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
          id="loginBtn"
          style={{ backgroundColor: "#dc143c", color: "white" }}
          variant="contained"
          onClick={onLogin}
        >
          Login
        </Button>
        <br />
        <Button component={Link} to="/register">
          Don't have an account? Register
        </Button>
      </FormGroup>
    </Container>
    )
  }
}

export default LoginScreen