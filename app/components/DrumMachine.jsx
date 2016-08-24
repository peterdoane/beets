import Grid from 'components/Grid';
import React from 'react';
import axios from 'axios';

var context = new AudioContext;

class Drum {
  constructor(context, buffer) {
    this.context = context;
    this.buffer = buffer;
  };
  setup() {
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.context.destination);
  };
  trigger(time) {
    this.setup();
    this.source.start(time);
  };
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
  '/api/samples/bd/bd2510.mp3',
  '/api/samples/SD/SD0010.mp3',
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
    context.decodeAudioData(response.data, function(buffer) {
      drums[i] = new Drum(context, buffer);
    });
  })
}

const DrumMachine = React.createClass({
  getInitialState() {
    return {
      activePattern: 0,
      activeStep: -1,
      bpm: 120,
      interval: null,
      isTicking: false,
      sequence: [
        [[], [], [], [], [],[], [], [], [], [],[], [], []],
        [[], [], [], [], [],[], [], [], [], [],[], [], []]
      ]
    };
  },
  btnClicked(pattern, row, step) {
    this.state.sequence[pattern][row][step] = !this.state.sequence[pattern][row][step];
    this.setState({ sequence: this.state.sequence });
    this.props.buttonClick(pattern, row, step);
  },
  handleChangeBpm(event) {
    this.setState({ bpm: event.target.value });
  },
  handleChangePattern(event) {
    this.setState({ activePattern: +event.target.value });
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

    for (let i=0; i<activeSequence.length; ++i) {
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
        <button onClick={this.handleClickStartStop}>{this.state.isTicking ? 'Stop' : 'Start'}</button>
        <input className="tempo" onChange={this.handleChangeBpm} type='number' value={this.state.bpm}/>
        <select onChange={this.handleChangePattern} value={this.state.activePattern}>
          <option value={0}>0</option>
          <option value={1}>1</option>
        </select>
      </div>
      <div className="drum-machines">
        <Grid
          activeStep={this.state.activeStep}
          activePattern={this.state.activePattern}
          btnClicked={this.btnClicked}
          className="machine-left"
          pattern={0}
          sequence={this.state.sequence[0]}
          drums={drums}
        />
        <Grid
          activeStep={this.state.activeStep}
          activePattern={this.state.activePattern}
          btnClicked={this.btnClicked}
          className="machine-right"
          pattern={1}
          sequence={this.state.sequence[1]}
          drums={drums}
        />
      </div>
    </div>
    );
  }
});

export default DrumMachine;
