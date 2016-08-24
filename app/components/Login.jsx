import React from 'react';
import { Link, withRouter } from 'react-router';
import Signup from 'components/Signup';
import axios from 'axios';
import { notify } from 'react-notify-toast';

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
    axios.post('/api/token', {
      username: this.state.username,
      password: this.state.password
    })
    .then((data) => {
      this.props.router.push('/');
      notify.show('You are now logged in!', 'success', 5000);
    })
    .catch((err) => {
      notify.show('Oops! Try again....', 'error', 5000);
      throw err;
    })
  },

  render() {
    return <div className="component login">
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

export default withRouter(Login);
