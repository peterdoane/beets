import DrumMachine from 'components/DrumMachine';
import Grid from 'components/Grid';
import React from 'react';
import { withRouter } from 'react-router';

const App = React.createClass({

  render() {
    return (<div>
      <h1>Musical Chairs</h1>
      {this.props.children}
    </div>);
  }
});

export default withRouter(App);
