import React, { Component } from "react";

import Login from "./pages/login";
import AccountList from "./pages/account_list";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: false
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogin = () => {
    this.setState({ isLogin: true });
  };
  handleLogout = () => {
    this.setState({ isLogin: false });
  };
  render() {
    return (
      <div className="App">
        {!this.state.isLogin ? (
          <Login handleLogin={this.handleLogin} />
        ) : (
          <AccountList handleLogout={this.handleLogout} />
        )}
      </div>
    );
  }
}

export default App;
