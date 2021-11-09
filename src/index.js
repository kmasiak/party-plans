import React from "react";
import "./index.css";
import RegisterScreen from "./component/RegisterScreen";

function goToRegisterScreen() {
  return this.props.navigation.navigate(RegisterScreen);
}

class index extends React.Component {
  render() {
    return goToRegisterScreen();
  }
}
