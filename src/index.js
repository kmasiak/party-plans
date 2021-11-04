import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class HelloMessage extends React.Component {
  render() {
    return React.createElement("div", null, "Hello ", this.props.name);
  }
}

ReactDOM.render(
  React.createElement(HelloMessage, { name: "Jakob" }),
  document.getElementById("root")
);
