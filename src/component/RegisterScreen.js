import React from "react";
import ReactDOM from "react-dom";
import LoginScreen from "./LoginScreen";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";

const userInputProps = {
  fname: "",
  lname: "",
  email: "",
  password: "",
};

function registerUser() {
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
    //document.getElementById("firstName").error = true; - does not work
  } else {
    alert(
      "First Name: " +
        user_f_name +
        " \nLast Name: " +
        user_l_name +
        "\nEmail: " +
        user_email +
        "\nPassword: " +
        user_password
    );
  }
}

function goToLoginScreen() {
  this.props.navivagation.navigate(LoginScreen);
}

//TODO: Replace image with Party Plans Logo
export default class RegisterScreen extends React.Component {
  render() {
    return (
      <Container maxWidth="sm">
        <img
          src="../logo512.png"
          alt="Party Plans Logo"
          style={{
            height: "25%",
            width: "25%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <h1 style={{ textAlign: "center" }}>Register Account</h1>
        <FormGroup
          style={{
            backgroundColor: "#F5F5F5",
            padding: "25px",
            borderRadius: "25px",
          }}
        >
          <TextField
            required
            id="firstName"
            type="text"
            label="First Name"
            variant="outlined"
            margin="normal"
            style={{ backgroundColor: "white" }}
            inputRef={(ref) => {
              userInputProps.fname = ref;
            }}
            inputProps={{ maxLength: 45 }}
          />
          <TextField
            required
            id="lastName"
            type="text"
            label="Last Name"
            variant="outlined"
            margin="normal"
            style={{ backgroundColor: "white" }}
            inputRef={(ref) => {
              userInputProps.lname = ref;
            }}
            inputProps={{ maxLength: 45 }}
          />
          <TextField
            required
            id="email"
            type="text"
            label="Email"
            variant="outlined"
            props="required"
            margin="normal"
            style={{ backgroundColor: "white" }}
            inputRef={(ref) => {
              userInputProps.email = ref;
            }}
            inputProps={{ maxLength: 45 }}
          />
          <TextField
            required
            id="password"
            type="text"
            label="Password"
            variant="outlined"
            margin="normal"
            style={{ backgroundColor: "white" }}
            inputRef={(ref) => {
              userInputProps.password = ref;
            }}
            inputProps={{ maxLength: 45 }}
          />
          <br />
          <Button
            variant="contained"
            style={{ backgroundColor: "#DC143C", color: "white" }}
            onClick={() => registerUser()}
          >
            Register
          </Button>
        </FormGroup>
      </Container>
    );
  }
}

ReactDOM.render(
  React.createElement(RegisterScreen),
  document.getElementById("root")
);
