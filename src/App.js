import React, { Component } from "react";

import Login from "./pages/login";
import BankList from "./pages/bank_list";
import AccountList from "./pages/account_list";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
      isBank: false
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogin = () => {
    this.setState({ isLogin: true });
  };
  handleLogout = () => {
    this.setState({ isLogin: false });
    this.setState({ isBank: false });
  };
  handleChangeBank = () => {
    this.setState({ isBank: true });
  };
  render() {
    return (
      <div className="App">
        {!this.state.isLogin ? (
          <Login handleLogin={this.handleLogin} />
        ) : !this.state.isBank ? (
          <BankList handleChangeBank={this.handleChangeBank} />
        ) : (
          <AccountList handleLogout={this.handleLogout} />
        )}
      </div>
    );
  }
}

export default App;
