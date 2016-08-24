import React from 'react';
import { withRouter, Link } from 'react-router';

const Nav = React.createClass({

  render() {
    const imageUrl = '/blackbird.jpg';

    return <div className="blackbird-background">
      <h1 className="body-title">
        <Link to={'/'} className="body-title-link">Beets</Link>
      </h1>
      {this.props.children}
    </div>;
  }
});

export default withRouter(Nav);
