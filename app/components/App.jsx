import DrumMachine from 'components/DrumMachine';
import Header from 'components/Header';
import Grid from 'components/Grid';
import Knobs from 'components/Knobs';
import React from 'react';
import { withRouter } from 'react-router';


const App = React.createClass({
  render() {
    return (
  <div>
    <div>
      <h1>Musical Chairs</h1>
      {this.props.children}
    </div>);
    return (
      <div>
        <Header />
      </div>
    <div>
      <div className="drum-machines">
        <div className="machine-left">
          <DrumMachine  />
        </div>

        {/* <div className="machine-right">
          <DrumMachine />
        </div> */}
      </div>
    </div>
  </div>
    )
  }
});

export default withRouter(App);
