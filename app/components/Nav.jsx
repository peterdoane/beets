import React from 'react';
import { withRouter, Link } from 'react-router';

const Nav = React.createClass({

  render() {

    const imageUrl = '/blackbird.jpg';

    return <div className="blackbird-background">
      {/* <h1 className="body-title">
        <Link to={'/'} className="body-title-link">Beets</Link>
      </h1>

    return <div className="component-nav"> */}

        <div className="logo-bar">
          <Link to={'/'} className="logo">BEETS</Link>
        </div>
      {this.props.children}
    </div>;
  }
});

export default withRouter(Nav);
