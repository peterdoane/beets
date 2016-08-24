import React from 'react';
import DrumMachine from 'components/DrumMachine';


const drumSoundSampler = React.createClass({
  handleClick() {
    this.props.btnClicked(drums.trigger);
  },
});
