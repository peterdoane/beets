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

const drums = [];
axios.get('/api/samples/bd/bd0000.mp3', { responseType: 'arraybuffer'})
  .then(function (response) {
    context.decodeAudioData(response.data, function(buffer) {
      drums[0] = new Drum(context, buffer);
    });

    })
  .catch(function (error) {
    console.log(error);
  });

  axios.get('/api/samples/SD/SD0000.mp3', { responseType: 'arraybuffer'})
    .then(function (response) {
      context.decodeAudioData(response.data, function(buffer) {
        drums[1] = new Drum(context, buffer);
      });

      })
    .catch(function (error) {
      console.log(error);
    });

  axios.get('/api/samples/LC/LC00.WAV', { responseType: 'arraybuffer'})
      .then(function (response) {
        context.decodeAudioData(response.data, function(buffer) {
          drums[2] = new Drum(context, buffer);
        });

        })
      .catch(function (error) {
        console.log(error);
      });

  axios.get('/api/samples/MC/MC00.WAV', { responseType: 'arraybuffer'})
      .then(function (response) {
        context.decodeAudioData(response.data, function(buffer) {
          drums[3] = new Drum(context, buffer);
        });

        })
      .catch(function (error) {
        console.log(error);
      });

  axios.get('/api/samples/HC/HC00.WAV', { responseType: 'arraybuffer'})
      .then(function (response) {
        context.decodeAudioData(response.data, function(buffer) {
          drums[4] = new Drum(context, buffer);
        });

        })
      .catch(function (error) {
        console.log(error);
      });

  axios.get('/api/samples/RS/RS.WAV', { responseType: 'arraybuffer'})
      .then(function (response) {
        context.decodeAudioData(response.data, function(buffer) {
          drums[5] = new Drum(context, buffer);
        });

        })
      .catch(function (error) {
        console.log(error);
      });

  axios.get('/api/samples/CP/CP.WAV', { responseType: 'arraybuffer'})
      .then(function (response) {
        context.decodeAudioData(response.data, function(buffer) {
          drums[6] = new Drum(context, buffer);
        });

        })
      .catch(function (error) {
        console.log(error);
      });

  axios.get('/api/samples/CB/CB.mp3', { responseType: 'arraybuffer'})
      .then(function (response) {
        context.decodeAudioData(response.data, function(buffer) {
          drums[7] = new Drum(context, buffer);
        });

        })
      .catch(function (error) {
        console.log(error);
      });

  axios.get('/api/samples/CY/CY0000.mp3', { responseType: 'arraybuffer'})
      .then(function (response) {
        context.decodeAudioData(response.data, function(buffer) {
          drums[8] = new Drum(context, buffer);
        });

        })
      .catch(function (error) {
        console.log(error);
      });

  axios.get('/api/samples/OH/OH00.WAV', { responseType: 'arraybuffer'})
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

  axios.get('/api/samples/CL/CL.WAV', { responseType: 'arraybuffer'})
      .then(function (response) {
        context.decodeAudioData(response.data, function(buffer) {
          drums[11] = new Drum(context, buffer);
        });

        })
      .catch(function (error) {
        console.log(error);
      });

  axios.get('/api/samples/LT/LT00.WAV', { responseType: 'arraybuffer'})
      .then(function (response) {
        context.decodeAudioData(response.data, function(buffer) {
          drums[12] = new Drum(context, buffer);
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
      activeStep: -1,
      bpm: 120,
      interval: null,
      isTicking: false,
      sequence: [[], [], [], [], [],[], [], [], [], [],[], [], []]
    };
  },
  btnClicked(row, step) {
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
    for (let i=0; i<this.state.sequence.length; ++i) {
      if (this.state.sequence[i][nextActiveStep]) {
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
