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
          <div className="row">

              {beets.map((beet, index) => {
                return <div key={index} className="card horizontal">
                  <div className="card-image">
                    <img className="album" src={beet.image_url} />
                  </div>
                  <div className="card-stacked">
                    <div className="card-content">
                      <span className="card-title">{beet.title}</span>
                      <p>by collab1, collab2</p>
                    </div>
                    <a className="waves-effect waves-light btn"><i className="material-icons">play_arrow / pause</i></a>
                  </div>
                </div>
              })}
          </div>
      </div>
    </div>
  }
});

export default Beets;
