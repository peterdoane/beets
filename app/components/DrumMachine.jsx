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
axios.get('/api/samples/bd/bd2510.mp3', { responseType: 'arraybuffer'})
  .then(function (response) {
    context.decodeAudioData(response.data, function(buffer) {
      drums[0] = new Drum(context, buffer);
    });

    })
  .catch(function (error) {
    console.log(error);
  });

  axios.get('/api/samples/SD/SD0010.mp3', { responseType: 'arraybuffer'})
    .then(function (response) {
      context.decodeAudioData(response.data, function(buffer) {
        drums[1] = new Drum(context, buffer);
      });

      })
    .catch(function (error) {
      console.log(error);
    });

  axios.get('/api/samples/LT/LT50.WAV', { responseType: 'arraybuffer'})
      .then(function (response) {
        context.decodeAudioData(response.data, function(buffer) {
          drums[2] = new Drum(context, buffer);
        });

        })
      .catch(function (error) {
        console.log(error);
      });

  axios.get('/api/samples/MT/MT75.WAV', { responseType: 'arraybuffer'})
      .then(function (response) {
        context.decodeAudioData(response.data, function(buffer) {
          drums[3] = new Drum(context, buffer);
        });

        })
      .catch(function (error) {
        console.log(error);
      });

  axios.get('/api/samples/HT/HT75.mp3', { responseType: 'arraybuffer'})
      .then(function (response) {
        context.decodeAudioData(response.data, function(buffer) {
          drums[3] = new Drum(context, buffer);
        });

        })
      .catch(function (error) {
        console.log(error);
      });

  axios.get('/api/samples/RS/RS.WAV', { responseType: 'arraybuffer'})
      .then(function (response) {
        context.decodeAudioData(response.data, function(buffer) {
          drums[4] = new Drum(context, buffer);
        });

        })
      .catch(function (error) {
        console.log(error);
      });

  axios.get('/api/samples/CP/CP.WAV', { responseType: 'arraybuffer'})
      .then(function (response) {
        context.decodeAudioData(response.data, function(buffer) {
          drums[5] = new Drum(context, buffer);
        });

        })
      .catch(function (error) {
        console.log(error);
      });

  axios.get('/api/samples/CB/CB.mp3', { responseType: 'arraybuffer'})
      .then(function (response) {
        context.decodeAudioData(response.data, function(buffer) {
          drums[6] = new Drum(context, buffer);
        });

        })
      .catch(function (error) {
        console.log(error);
      });

  axios.get('/api/samples/CY/CY1000.mp3', { responseType: 'arraybuffer'})
      .then(function (response) {
        context.decodeAudioData(response.data, function(buffer) {
          drums[8] = new Drum(context, buffer);
        });

        })
      .catch(function (error) {
        console.log(error);
      });

  axios.get('/api/samples/OH/OH25.WAV', { responseType: 'arraybuffer'})
      .then(function (response) {
        context.decodeAudioData(response.data, function(buffer) {
          drums[9] = new Drum(context, buffer);
        });

        })
      .catch(function (error) {
        console.log(error);
      });

  axios.get('/api/samples/CH/CH.WAV', { responseType: 'arraybuffer'})
      .then(function (response) {
        context.decodeAudioData(response.data, function(buffer) {
          drums[10] = new Drum(context, buffer);
        });

        })
      .catch(function (error) {
        console.log(error);
      });

//
// var sampleLoader = function(url, context, callback) {
//   console.log(url);
//   var request = new XMLHttpRequest();
//   request.open('get', url, true);
//   request.responseType = 'arraybuffer';
//   request.onload = function() {
//     context.decodeAudioData(request.response, function(buffer) {
//       callback(buffer);
//     }, function(err) { console.log(err);});
//   };
//   request.send();
// };
// const drums = [];
// sampleLoader('./bd/bd0000.mp3', context, function(buffer) {
//   drums[0] = new Drum(context, buffer);
// });
// sampleLoader('./SD/SD0000.mp3', context, function(buffer) {
//   drums[1] = new Drum(context, buffer);
// });
// sampleLoader('./LC/LC00.WAV', context, function(buffer) {
//   drums[2] = new Drum(context, buffer);
// });
// sampleLoader('./MC/MC00.WAV', context, function(buffer) {
//   drums[3] = new Drum(context, buffer);
// });
// sampleLoader('./HC/HC00.WAV', context, function(buffer) {
//   drums[4] = new Drum(context, buffer);
// });
// sampleLoader('./RS/RS.WAV', context, function(buffer) {
//   drums[5] = new Drum(context, buffer);
// });
// sampleLoader('./CP/CP.WAV', context, function(buffer) {
//   drums[6] = new Drum(context, buffer);
// });
// sampleLoader('./CB/CB.mp3', context, function(buffer) {
//   drums[7] = new Drum(context, buffer);
// });
// sampleLoader('./CY/CY0000.mp3', context, function(buffer) {
//   drums[8] = new Drum(context, buffer);
// });
// sampleLoader('./OH/OH00.WAV', context, function(buffer) {
//   drums[9] = new Drum(context, buffer);
// });
// sampleLoader('./CH/CH.WAV', context, function(buffer) {
//   drums[10] = new Drum(context, buffer);
// });
// sampleLoader('./CL/CL.WAV', context, function(buffer) {
//   drums[11] = new Drum(context, buffer);
// });
// sampleLoader('./LT/LT00.WAV', context, function(buffer) {
//   drums[12] = new Drum(context, buffer);
// });




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
  },
  handleChangeBpm(event) {
    console.log(this.state.bpm);
    this.refs.grid.setState({ bpm: event.target.value });
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
      this.refs.grid.tick()
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
    // var ticker = 60000 / this.state.bpm / 4;
    // this.setState({
    //   activeStep: nextActiveStep,
    //   interval: setTimeout(this.tick, ticker)
    // });
    // console.log(ticker);
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
          ref="grid"
          activeStep={this.state.activeStep}
          activePattern={this.state.activePattern}
          btnClicked={this.btnClicked}
          className="machine-left"
          pattern={0}
          sequence={this.state.sequence[0]}
        />
        <Grid
          activeStep={this.state.activeStep}
          activePattern={this.state.activePattern}
          btnClicked={this.btnClicked}
          className="machine-right"
          pattern={1}
          sequence={this.state.sequence[1]}
        />
      </div>
    </div>
    );
  }
});

export default DrumMachine;
