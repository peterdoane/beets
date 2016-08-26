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

// axios.all([]).then(responses => {
//
// });

//
/*
see if axios has a method to resolve all the requests ...
axios parallel api (later optimizations)
const files = ['f1', 'f2', 'f3'];
q.all(files.map(f => {
return axios.get(f, { responseType: 'arraybuffer'})
})).then(allRawData => {
// another one to returna list of buffers ...
  const drums = allBuffer.map(b => {return new Drum (context, b)})
}).catch(e => {
});
*/
const drums = [];

const filenames = [
  '/api/samples/SD/SD0010.mp3',
  '/api/samples/bd/bd2510.mp3',
  '/api/samples/LT/LT50.WAV',
  '/api/samples/MT/MT75.WAV',
  '/api/samples/HT/HT75.mp3',
  '/api/samples/RS/RS.WAV',
  '/api/samples/CP/CP.WAV',
  '/api/samples/CB/CB.mp3',
  '/api/samples/CY/CY1000.mp3',
  '/api/samples/OH/OH25.WAV',
  '/api/samples/CH/CH.WAV'
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
      bpm: 120,
      interval: null,
      isTicking: false,
      sequence: [
        [[], [], [], [], [], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], [], [], [], [], []]
      ]
    };
  },
  btnClicked(pattern, row, step) {
    const nextSequence = this.state.sequence.slice();

    nextSequence[pattern][row][step] =
      !nextSequence[pattern][row][step];
    this.setState({ sequence: nextSequence });
    this.props.buttonClick(pattern, row, step);
  },
  handleChangeBpm(event) {
    this.setState({ bpm: event.target.value });
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
    const activeSequence = this.state.sequence[this.state.activePattern];

    for (let i = 0; i < activeSequence.length; ++i) {
      if (activeSequence[i][nextActiveStep]) {
        drums[i].trigger(context.currentTime);
      }
    }
    this.setState({
      activeStep: nextActiveStep,
      interval: setTimeout(this.tick, 60000 / this.state.bpm / 4)
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
            value={this.state.bpm}
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
            sequence={this.state.sequence[0]}
          />
          <Grid
            activePattern={this.state.activePattern}
            activeStep={this.state.activeStep}
            btnClicked={this.btnClicked}
            className="machine-right"
            drums={drums}
            pattern={1}
            sequence={this.state.sequence[1]}
          />
        </div>
      </div>
    );
  }
});

export default DrumMachine;
