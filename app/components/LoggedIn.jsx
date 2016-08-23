import { withRouter } from 'react-router';
import axios from 'axios';
import React from 'react';
import Studios from 'components/Studios';

const LoggedIn = React.createClass({
  handleLogOut() {
    axios.delete('/api/token')
      .then(() => {
        this.props.router.push('/');
      })
      .catch((err) => {
        throw err;
      });
  },

  render() {
    return <div>
        <h3>What Up {this.props.username}?!</h3>
        <h4>Your Songs</h4>
        <button onClick={this.handleLogOut}>Log Out</button>
    </div>
  }
});

export default withRouter(LoggedIn);
