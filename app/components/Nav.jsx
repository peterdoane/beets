import React from 'react';
import { withRouter } from 'react-router';

const Nav = React.createClass({

  render() {
    return <div>
      <h1>Beets</h1>
      {this.props.children}
    </div>;
  }
});

export default withRouter(Nav);
