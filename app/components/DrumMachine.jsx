import Grid from 'components/Grid';
import React from 'react';

const DrumMachine = React.createClass({
  getInitialState() {
    setInterval(this.tick, 200);
    return {
      bpm: 120,
      sequence: [[], [], [], [], []],
      activeStep: 0
    };
  },
  btnClicked(row, step) {
    console.log(row, step);
    this.state.sequence[row][step] = !this.state.sequence[row][step];
    this.setState({ sequence: this.state.sequence });
  },
  handleChange(event) {
    this.setState({ bpm: event.target.value });
  },
  tick() {
    const nextActiveStep = (this.state.activeStep + 1) % 16;
    for (let i=0; i<5; ++i) {
      if (this.state.sequence[i][nextActiveStep]) {
        console.log(`Play instrument ${i}.`);
      }
    }
    this.setState({ activeStep: nextActiveStep });
  },
  render() {
    this.state.sequence[0][0] = true;
    this.state.sequence[4][15] = true;
    return (
      <div>
        <button>Play/Pause</button>
        <input onChange={this.handleChange} type='number' value={this.state.bpm}/>
        <Grid
          activeStep={this.state.activeStep}
          btnClicked={this.btnClicked}
          sequence={this.state.sequence}
        />
      </div>
    );
  }
});

export default DrumMachine;
