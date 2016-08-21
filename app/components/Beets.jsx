import React from 'react';
import axios from 'axios';

const Beets = React.createClass({
  getInitialState() {
    return {
      beets: []
    };
  },

  componentWillMount() {
    axios.get('/api/beets')
    .then((res) => {
      this.setState({ beets: res.data });
    })
    .catch((err) => {
      console.error(err);
    });
  },

  render() {
    const beets = this.state.beets;

    return <div>
      <h1>Featured Beets</h1>
      <ul>
      {beets.map((beet, index) => {
        return <li key={index}>
          <img src={beet.image_url} />
          {beet.name}
        </li>
      })}
      </ul>
    </div>
  }
});

export default Beets;
