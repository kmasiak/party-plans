import React, { useState } from "react";
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

import { Link, Navigate } from "react-router-dom";

import {
  register
} from '../api/api'

const userInputProps = {
  fname: "",
  lname: "",
  email: "",
  password: "",
};



export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [registered, setRegistered] = useState(null);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  function onRegisterUser() {
    var user_f_name = userInputProps.fname.value;
    var user_l_name = userInputProps.lname.value;
    var user_email = userInputProps.email.value;
    var user_password = userInputProps.password.value;
    if (
      user_f_name === "" ||
      user_l_name === "" ||
      user_email === "" ||
      user_password === ""
    ) {
      alert("Please fill in all required fields.");
    } else {
      register(user_email, user_f_name, user_l_name, user_password).then((data) => {
        if(!data) {
          setRegistered(data); 
          console.log("if", {registered, data}) 
          alert("User already exists with email: " + user_email)
        } else {
          setRegistered(data);
          console.log("else", {registered, data})
        }
      })
      
    }
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
          inputRef={(ref) => {
            userInputProps.fname = ref;
          }}
          inputProps={{ maxLength: 45 }}
        />
        <TextField
          required
          id="lastName"
          className="TextFieldReg"
          type="text"
          label="Last Name"
          variant="outlined"
          margin="normal"
          inputRef={(ref) => {
            userInputProps.lname = ref;
          }}
          inputProps={{ maxLength: 45 }}
        />
        <TextField
          required
          id="email"
          className="TextFieldReg"
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
          className="TextFieldReg"
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
          variant="contained"
          style={{ backgroundColor: "#DC143C", color: "white" }}
          onClick={() => onRegisterUser()}
          component={Link} 
          to={
            registered 
            ? '/'
            : '/register'
          }
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
