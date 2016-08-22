import React from 'react';
import { withRouter, Link } from 'react-router';

const Nav = React.createClass({

  render() {
    return <div>
      <h1>
        <Link to={'/'}>Beets</Link>
      </h1>
      {this.props.children}
    </div>;
  }
});

export default withRouter(Nav);
