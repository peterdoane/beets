import { Link, withRouter } from 'react-router';
import React from 'react';

const Nav = React.createClass({

  render() {
    return <div className="blackbird-background">
      <nav>
        <div className="nav-wrapper">
          <Link className="brand-logo" to={'/'}>BEETS</Link>
        </div>
      </nav>
      <div className="container">
        {this.props.children}
      </div>
    </div>;
  }
});

export default withRouter(Nav);
