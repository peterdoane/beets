import React from 'react';

const Header = React.createClass({
  render() {
    const style = {
      background: 'yellow',
      boxSizing: 'border-box',
      height: '200px',

    };
    return (
      <div id="header" style={style}>
          <h1>Test</h1>
      </div>
    );
  }
});

export default Header;
