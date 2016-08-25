import { IndexRoute, Route, Router, browserHistory } from 'react-router';
import DrumMachine from 'components/DrumMachine';
import Main from 'components/Main';
import Nav from 'components/Nav';
import React from 'react';
import Signup from 'components/Signup';
import Studio from 'components/Studio';

const Routes = React.createClass({
  render() {
    return <Router history={browserHistory}>
      <Route component={Nav} path="/">
        <IndexRoute component={Main} />
        <Route component={Studio} path="studio/:id" />
        <Route component={Signup} path="signup" />
        <Route component={DrumMachine} path="DrumMachine" />

      </Route>
    </Router>;
  }
});

export default Routes;
