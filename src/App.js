import React, { Component } from "react";

import HomeScreen from "./component/HomeScreen";
import LoginScreen from "./component/LoginScreen";
import RegisterScreen from "./component/RegisterScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { 
  friends,
  login
} from './api/api'

function createFriendData(fname, lname) {
  return [fname, lname];
}


class App extends Component {
  state = {
    friends: [],
    showPassword: false,
    is_admin: false,
    is_user: false,
    logged_in: false,
    email: '',
    password: '',
    login_err: false,
    first_name: '',
    last_name: '',
    area_code: 0,
    phone: 0,
    acc_from: 0,
    acc_to: 0,
    amount: 0,
    acc_type: 0,
    starting_balance: 0,
    transaction_id: 0,
    approved: -1,
    transaction_history: [],
    weekly_spending: [],
    balances: [],
    pending_transactions: [],
    customers: [],
    accounts: [],
    account_num: 0,
    transaction_error: false,
    acc_err: false,
    snackbar: false,
    debit_card_usage: 0,
    amt_err: false,
    input_first_name: '',
    input_last_name: '',
    input_area_code: 0,
    input_phone: 0,
    input_email: '',
    input_password: '',
    user_id: 0,
    modify_err: false,
    disabled: true,
    accSnackbar: false,
    customerSnackbar: false,
    deleteSnackbar: false,
    delete_err: false,
    dialogOpen: false
  }

  handleEmail = (event) =>  {
    this.setState({ email: event.target.value })
    console.log(this.state.logged_in)
  }

  handlePass = (event) => {
    this.setState({ password: event.target.value })
  }

  setShowPassword = (showPassword) => {
    this.setState({ showPassword: !showPassword})
  }

  makeFriendTable = () => {
    const friends_data = []
    const uemail = this.state.email


    friends(uemail).then((data) => {
      if (data.friends.length === 0) {
        friends_data.push(createFriendData('No', 'Friends'))
      } else {
        for (var i = 0; i < data.friends.length; i++) {
          friends_data.push(createFriendData(data.friends[i].f_name, data.friends[i].l_name))
        }
      }
      this.setState({
        friends: friends_data
      })

    })
  }

  onLogin = () => {
    var user_email = this.state.email;
    var user_password = this.state.password;
    
    if (user_email === "" || user_password === "") {
      alert("Please fill in all required fields.");
    } else {
      login(user_email, user_password).then((data) => {
        console.log({data})
        if (data.email === '') {
          alert("Incorrect email or password");
        } else {
          this.makeFriendTable()

          console.log("logged in", data.email)

          this.setState({
            logged_in: true
          })

        }
        
      })
  
    }
  }

  render() {
    const {
      friends,
      showPassword,
      is_admin,
      is_user,
      logged_in,
      email, 
      password,
      login_err,
      acc_from,
      acc_to,
      amount,
      pending_transactions,
      customers,
      transaction_history,
      weekly_spending,
      balances,
      accounts,
      account_num,
      register_err,
      transaction_error,
      snackbar,
      debit_card_usage,
      amt_err,
      disabled,
      acc_err,
      starting_balance,
      accSnackbar,
      customerSnackbar,
      deleteSnackbar,
      dialogOpen,
      delete_err
    } = this.state

    

    return (
      <div>
        <Router>
          <Route exact path="/" render={() => (<LoginScreen 
            email={email}
            password={password}
            handleEmail={this.handleEmail}
            handlePass={this.handlePass}
            login_err={login_err}
            onLogin={this.onLogin}
            logged_in={logged_in}
            showPassword={showPassword}
            setShowPassword={this.setShowPassword}
            />)} />
          <Route exact path="/register" render={() => (<RegisterScreen />)} />
          <Route exact path="/home" render={() => (<HomeScreen
            email={email}
            friends={friends}
            />)} />
        </Router>
      </div>
    );
  }
}

export default App;
