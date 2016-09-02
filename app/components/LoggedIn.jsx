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
    axios.get(`/api/beets/${this.state.username}`)
    .then((res) => {
      const arr = res.data.map((beet) => {
        return beet.title;
      });

      this.setState({ beets: arr });
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
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

        // eslint-disable-next-line no-console
        console.error(err);
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
