import React from 'react';
import Beets from 'components/Beets';
import Studios from 'components/Studios';
import Login from 'components/Login';
import cookie from 'react-cookie';
import LoggedIn from 'components/LoggedIn';

const Main = React.createClass({
  render() {
    return <div>
      <Beets />
      <Studios />
      {cookie.load('loggedIn') ? <LoggedIn /> : <Login />}
    </div>
  }
});

export default Main;
