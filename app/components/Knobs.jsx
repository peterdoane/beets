import React from 'react';

const Knobs = React.createClass({
  render() {
    const style = {
      background: 'amber',
      boxSizing: 'border-box',
      height: '200px',

    };
    return (
      <div id="knobs" style={style}>
          <h1>Knobberz</h1>
      </div>
    );
  }
});

export default Knobs;
