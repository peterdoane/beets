// import App from 'components/App';
import React from 'react';
import Beets from 'components/Beets';
import DrumMachine from 'components/DrumMachine';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';
import Nav from 'components/Nav';
import Main from 'components/Main';
import Studio from 'components/Studio';
import Signup from 'components/Signup';

const Routes = React.createClass({
  render() {
    return <Router history={browserHistory}>
      <Route component={Nav} path="/">
        <IndexRoute component={Main} />
        <Route component={Studio} path="studio/:id" />
        <Route component={Signup} path="signup" />
        <Route component={DrumMachine} path="DrumMachine" />

      </Route>
    </Router>
  }
});

export default Routes;
