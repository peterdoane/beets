import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { notify } from 'react-notify-toast';
import { withRouter } from 'react-router';

const LoggedIn = React.createClass({
  getInitialState() {
    return {
      username: cookie.load('beets_username'),
      beets: []
    };
  },

  componentWillMount() {
    const arr = [];

    axios.get(`/api/beets/${this.state.username}`)
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        arr.push(res.data[i].title);
      }

      this.setState({ beets: arr });
    })
    .catch((err) => {
      throw err;
    });
  },

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
        <h5>Your Beets</h5>
        <ul>
          {this.state.beets.map((beet, index) => {
            return <li key={index}>{beet}</li>;
          })}
        </ul>
        <div>
          <button onClick={this.handleLogOut}>Log Out</button>
        </div>
      </div>
    </div>;
  }
});

export default withRouter(LoggedIn);
