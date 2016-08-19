import Grid from 'components/Grid';
import React from 'react';

const DrumMachine = React.createClass({
  getInitialState() {
    return {
      activeStep: -1,
      bpm: 120,
      interval: null,
      isTicking: false,
      sequence: [[], [], [], [], []],
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
  handleClickStartStop() {
    if (this.state.isTicking) {
      clearTimeout(this.state.interval);
      this.setState({
        activeStep: -1,
        isTicking: false
      });
    }
    else {
      this.setState({
        isTicking: true
      });
      this.tick();
    }
  },
  tick() {
    const nextActiveStep = (this.state.activeStep + 1) % 16;
    for (let i=0; i<5; ++i) {
      if (this.state.sequence[i][nextActiveStep]) {
        console.log(`Play instrument ${i}.`);
      }
    }
    this.setState({
      activeStep: nextActiveStep,
      interval: setTimeout(this.tick, 60000 / this.state.bpm / 4)
    });
  },
  render() {
    this.state.sequence[0][0] = true;
    this.state.sequence[4][15] = true;
    return (
      <div>
        <button onClick={this.handleClickStartStop}>{this.state.isTicking ? 'Stop' : 'Start'}</button>
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
