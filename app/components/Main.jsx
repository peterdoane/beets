import React from 'react';
import Beets from 'components/Beets';
import Studios from 'components/Studios';
import Login from 'components/Login';
import cookie from 'react-cookie';
import LoggedIn from 'components/LoggedIn';

const Main = React.createClass({
  render() {
    return <div className="main">
      <div className="row">
        <div className="col s8">
          <Beets />
        </div>
        <div className="col s4">
          {cookie.load('mc_loggedIn') ? <LoggedIn username={cookie.load('mc_username')} /> : <Login />}
        </div>
      </div>
      <div className="row">
        <div>
          {cookie.load('mc_loggedIn') ? <Studios /> : null}
        </div>
      </div>
    </div>
  }
});

export default Main;
