import React from 'react';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import { withRouter } from 'react-router';

const LoggedIn = React.createClass({
  handleLogOut() {
    axios.delete('/api/token')
      .then(() => {
        this.props.router.push('/');
        notify.show('You are now logged out!', 'success', 5000);
      })
      .catch((err) => {
        notify.show('Oops! Try again....', 'error', 5000);
        throw err;
      });
  },

  render() {
    return <div className="card logged-in">
      <div className="card-content">
        <span className="card-title">Welcome {this.props.username}!</span>
        <h4>Your Songs</h4>
        <button onClick={this.handleLogOut}>Log Out</button>
      </div>
    </div>;
  }
});

export default withRouter(LoggedIn);
