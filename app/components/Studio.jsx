import React from 'react';
import DrumMachine from 'components/DrumMachine';
import Knob from 'components/Knob'

const Studio = React.createClass({
  render() {
    const params = this.props.params;

    return <div>
      <h1>You Are in Studio {params.id}</h1>
      <Knob />
      <div>
        <DrumMachine />
      </div>
    </div>
  }
});

export default Studio;
