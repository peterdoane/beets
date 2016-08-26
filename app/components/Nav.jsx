import { Link, withRouter } from 'react-router';
import React from 'react';

const Nav = React.createClass({

  render() {
    return <div>
      <nav>
        <div className="nav-wrapper">
          <Link className="brand-logo" to={'/'}>BEETS</Link>
        </div>
      </nav>
      {this.props.children}
    </div>;
  }
});

export default withRouter(Nav);
