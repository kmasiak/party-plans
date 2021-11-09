import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/FormGroup";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";

const userInputProps = {
  fname: "",
  lname: "",
  email: "",
  password: "",
};

function registerUser() {
  alert(
    "First Name: " +
      userInputProps.fname.value +
      " \nLast Name: " +
      userInputProps.lname.value +
      "\nEmail: " +
      userInputProps.email.value +
      "\nPassword: " +
      userInputProps.password.value
  );
}

//TODO - Add limit of characters in text field to match db column length restrictions
export default class RegisterScreen extends React.Component {
  render() {
    return (
      <FormGroup>
        <TextField
          required
          id="firstName"
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
          type="text"
          label="Password"
          variant="outlined"
          margin="normal"
          inputRef={(ref) => {
            userInputProps.password = ref;
          }}
          inputProps={{ maxLength: 45 }}
        />
        <Button variant="contained" onClick={() => registerUser()}>
          Register
        </Button>
      </FormGroup>
    );
  }
}

ReactDOM.render(
  React.createElement(RegisterScreen),
  document.getElementById("root")
);
