import React from 'react';
import { withRouter, Link } from 'react-router';

const Nav = React.createClass({

  render() {

    const imageUrl = '/blackbird.jpg';

    return <div>
      <nav className="nav">
        <div className="nav-wrapper">
          <Link to={'/'} className="brand-logo"><img className="beets-logo" src="/Beets-logo.png"></img></Link>
        </div>
      </nav>
      <div>
        {this.props.children}
      </div>
    </div>;
  }
});

export default withRouter(Nav)
