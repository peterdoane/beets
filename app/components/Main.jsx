import Beets from 'components/Beets';
import LoggedIn from 'components/LoggedIn';
import Login from 'components/Login';
import React from 'react';
import Studios from 'components/Studios';
import cookie from 'react-cookie';

const Main = React.createClass({
  render() {
    return (
      <div className="blackbird-background">
        <div className="main container">
          <div className="row">
            <div className="col s8">
              <Beets />
            </div>
            <div className="col s4">
              {cookie.load('beets_loggedIn')
                ? <LoggedIn username={cookie.load('beets_username')} />
                : <Login />}
            </div>
          </div>
          <div className="row">
            <div>
              {cookie.load('beets_loggedIn') ? <Studios /> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Main;
