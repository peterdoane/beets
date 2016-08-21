import App from 'components/App';
import React from 'react';
import Beets from 'components/Beets';
import DrumMachine from 'components/DrumMachine';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';

const Routes = React.createClass({
  render() {
    return <Router history={browserHistory}>
      <Route component={App} path="/">
        <IndexRoute component={Beets} />
        <Route component={DrumMachine} path="DrumMachine" />
      </Route>
    </Router>

    {React.cloneElement(this.props.children, {
      decrementVotes: this.decrementVotes,
      editing: this.state.editing,
      incrementVotes: this.incrementVotes,
      posts: this.state.posts,
      stopEditingPost: this.stopEditingPost,
      updatePost: this.updatePost
    })};
  }
});

export default Routes;
