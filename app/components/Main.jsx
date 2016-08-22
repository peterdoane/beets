import React from 'react';
import Beets from 'components/Beets';
import Studios from 'components/Studios';
import Login from 'components/Login';

const Main = React.createClass({
  render() {
    return <div>
      <Beets />
      <Studios />
      <Login />
    </div>
  }
});

export default Main;
