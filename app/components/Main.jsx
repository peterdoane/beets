import React from 'react';
import Beets from 'components/Beets';
import Studios from 'components/Studios';

const Main = React.createClass({
  render() {
    return <div>
      <h2>Featured Songs</h2>
      <Beets />
      <Studios />
    </div>
  }
});

export default Main;
