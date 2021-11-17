import React, { useState } from "react";
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

import { Link } from "react-router-dom";

import { 
  login
} from '../api/api'

const userInputProps = {
  email: "",
  password: "",
};

function onLogin() {
  var user_email = userInputProps.email.value;
  var user_password = userInputProps.password.value;
  
  if (user_email === "" || user_password === "") {
    alert("Please fill in all required fields.");
  } else {
    login(user_email, user_password).then((data) => {
      let user_id = data.email;
      alert("Email: " + user_id + "\nPassword: " + user_password);
    })

  }
}

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
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
          inputRef={(ref) => {
            userInputProps.email = ref;
          }}
          inputProps={{ maxLength: 45 }}
        />
        <TextField
          required
          id="password"
          className="TextField"
          type={showPassword ? "text" : "password"}
          label="Password"
          variant="outlined"
          margin="normal"
          inputRef={(ref) => {
            userInputProps.password = ref;
          }}
          inputProps={{ maxLength: 45 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <br />
        <Button
          id="loginBtn"
          style={{ backgroundColor: "#dc143c", color: "white" }}
          variant="contained"
          onClick={() => onLogin()}
        >
          Login
        </Button>
        <br />
        <Button component={Link} to="/register">
          Don't have an account? Register
        </Button>
      </FormGroup>
    </Container>
  );
}
