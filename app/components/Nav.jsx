import React from 'react';
import { withRouter, Link } from 'react-router';

const Nav = React.createClass({

  render() {

    const imageUrl = '/blackbird.jpg';

    return <div className="blackbird-background">
      <nav>
        <div className="nav-wrapper">
          <Link to={'/'} className="brand-logo">BEETS</Link>
        </div>
      </nav>
      <div className="container">
        {this.props.children}
      </div>
    </div>;
  }
});

export default withRouter(Nav);
