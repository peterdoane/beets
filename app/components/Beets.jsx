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

    return <div className="component beets">
      <h1>Recent Beets</h1>
      <ul>
      {beets.map((beet, index) => {
        return <ul>
          <li key={index}>
            <img src={beet.image_url} />
            {beet.name}
          </li>
          <li>
            <span>{beet.title}</span>
          </li>
        </ul>
      })}
      </ul>
    </div>
  }
});

export default Beets;
