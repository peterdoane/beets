import { Link, withRouter } from 'react-router';
import React from 'react';

const Nav = React.createClass({
  render() {
    return <div>
      <nav className="nav">
        <div className="nav-wrapper">
          <Link
            className="brand-logo"
            to={'/'}
          >
            <img className="beets-logo" src="/Beets-logo.png" />
          </Link>
        </div>
      </nav>
      <div>
        {this.props.children}
      </div>
    </div>;
  }
});

export default withRouter(Nav);
