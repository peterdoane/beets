import Grid from 'components/Grid';
import React from 'react';
import axios from 'axios';

const context = new AudioContext();

class Drum {
  constructor(ctx, buffer) {
    this.context = ctx;
    this.buffer = buffer;
  }
  setup() {
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.context.destination);
  }
  trigger(time) {
    this.setup();
    this.source.start(time);
  }
}
const drums = [];

const filenames = [
  '/drumSamples/bd/BD2510.mp3',
  '/drumSamples/SD/SD0010.mp3',
  '/drumSamples/LT/LT50.WAV',
  '/drumSamples/MT/MT75.WAV',
  '/drumSamples/HT/HT75.mp3',
  '/drumSamples/RS/RS.WAV',
  '/drumSamples/CP/CP.WAV',
  '/drumSamples/CB/CB.mp3',
  '/drumSamples/CY/CY1000.mp3',
  '/drumSamples/OH/OH25.WAV',
  '/drumSamples/CH/CH.WAV'
];

for (let i = 0; i < filenames.length; ++i) {
  axios.get(filenames[i], { responseType: 'arraybuffer' })
  .then((response) => {
    context.decodeAudioData(response.data, (buffer) => {
      drums[i] = new Drum(context, buffer);
    });
  });
}

// To do: signal that all samples have been loaded.

const DrumMachine = React.createClass({
  getInitialState() {
    return {
      activePattern: 0,
      activeStep: -1,
      interval: null,
      isTicking: false
    };
  },
  btnClicked(pattern, row, step) {
    this.props.buttonClick(pattern, row, step);
  },
  handleChangeBpm(event) {
    this.props.bpmChanged(event.target.value);
  },
  handleChangePattern(event) {
    this.setState({ activePattern: Number(event.target.value) });
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
    const activeSequence = this.props.sequence[this.state.activePattern];

    for (let i = 0; i < activeSequence.length; ++i) {
      if (activeSequence[i][nextActiveStep]) {
        drums[i].trigger(context.currentTime);
      }
    }
    this.setState({
      activeStep: nextActiveStep,
      interval: setTimeout(this.tick, 60000 / this.props.bpm / 4)
    });
  },
  render() {
    return (
      <div className="drum-machine">
        <div className="sequencer-controls">
          <a
            className="btn-floating btn-large waves-effect waves-light red"
            onClick={this.handleClickStartStop}
          >
            {this.state.isTicking ? '⬛' : '▶︎'}
          </a>
          <input
            className="tempo"
            onChange={this.handleChangeBpm}
            type="number"
            value={this.props.bpm}
          />

          <select
            className="drum-pattern"
            onChange={this.handleChangePattern}
            value={this.state.activePattern}
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
          </select>
        </div>
        <div className="drum-machines">
          <Grid
            activePattern={this.state.activePattern}
            activeStep={this.state.activeStep}
            btnClicked={this.btnClicked}
            className="machine-left"
            drums={drums}
            pattern={0}
            sequence={this.props.sequence[0]}
          />
          <Grid
            activePattern={this.state.activePattern}
            activeStep={this.state.activeStep}
            btnClicked={this.btnClicked}
            className="machine-right"
            drums={drums}
            pattern={1}
            sequence={this.props.sequence[1]}
          />
        </div>
      </div>
    );
  }
});

export default DrumMachine;
