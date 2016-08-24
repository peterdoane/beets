import React from 'react';
import { Link, withRouter } from 'react-router';
import axios from 'axios';
import { notify } from 'react-notify-toast';

const Signup = React.createClass({
  getInitialState() {
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
    })
  },

  handleRegister(event) {
    axios.post('/api/users', {
      username: this.state.username,
      password: this.state.password
    })
    .then(() => {
      this.props.router.push('/');
      notify.show('Signup successful! You may now log in.', 'success', 10000);
    })
    .catch((err) => {
      notify.show('Oops! Try again....', 'error', 5000);
      throw err;
    })
  },

  render() {
    return <div className="component signup">
      <h2>Sign Up Now</h2>
      <div>
        <input
          onChange={this.handleUsername}
          placeholder="Choose username"
          type="text"
          value={this.state.username}
        />
      </div>
      <div>
        <input
          onChange={this.handlePassword}
          placeholder="Choose password"
          type="password"
          value={this.state.password}
        />
      </div>
      <div>
        <button onClick={this.handleRegister}>Register</button>
      </div>
      <Link to={'/'}>Nevermind</Link>
    </div>;
  }
});

export default withRouter(Signup);
