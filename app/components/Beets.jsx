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

    return <div className="card beets">
      <div className="card-content">
        <span className="card-title">Recent Beets</span>
          <div>
            <ul>
              {beets.map((beet, index) => {
                return <ul key={index}>
                  <li>
                    <img src={beet.image_url} />
                    {beet.name}
                  </li>
                  <li>
                    <span>{beet.title}</span>
                  </li>
                  // Loop collaborators
                </ul>;
              })}
            </ul>
          </div>
      </div>
    </div>
  }
});

export default Beets;
