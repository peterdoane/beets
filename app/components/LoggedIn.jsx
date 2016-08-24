import { withRouter } from 'react-router';
import axios from 'axios';
import React from 'react';
import Studios from 'components/Studios';
import { notify } from 'react-notify-toast';

const LoggedIn = React.createClass({
  handleLogOut() {
    axios.delete('/api/token')
      .then(() => {
        this.props.router.push('/');
        notify.show('You are now logged out!', 'success', 5000)
      })
      .catch((err) => {
        throw err;
      });
  },

  render() {
    return <div className="component logged-in">
        <h3>Welcome {this.props.username}</h3>
        <h4>Your Songs</h4>
        <button onClick={this.handleLogOut}>Log Out</button>
    </div>
  }
});

export default withRouter(LoggedIn);
