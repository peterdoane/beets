import React from 'react';

const Header = React.createClass({
  render() {
    const style = {
      background: '#F5A623',
      boxSizing: 'border-box',
      height: '200px'
    };

    return (
      <div id="header" style={style}>
        <h1>Musical Chairs</h1>
      </div>
    );
  }
});

export default Header;
