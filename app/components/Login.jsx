import React from 'react';
import { Link } from 'react-router';
import Signup from 'components/Signup';

const Login = React.createClass({
  getInitialState(){
    return {
      username: '',
      password: ''
    }
  },

  handleUsername(event) {
    const username = event.target.value;

    this.setState({
      username: username
    });
  },

  handlePassword(event) {
    const password = event.target.value;

    this.setState({
      password: password
    });
  },

  handleLogin(event) {
    console.log(this.state.username, this.state.password);
  },

  render() {
    return <div>
      <h2>Log In!!!</h2>
      <div>
        <input
          onChange={this.handleUsername}
          placeholder="Username"
          type="text"
          value={this.state.username}
        />
      </div>
      <div>
        <input
          onChange={this.handlePassword}
          placeholder="Password"
          type="password"
          value={this.state.password}
        />
      </div>
      <div>
        <button onClick={this.handleLogin}>Log In</button>
      </div>
      <Link to="Signup">Need an account? Sign up here!</Link>
    </div>;
  }
});

export default Login;
