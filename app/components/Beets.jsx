import React from 'react';
import axios from 'axios';

const Beets = React.createClass({
  getInitialState() {
    return {
      beets: []
    };
  },

  componentWillMount() {
    let beets;

    axios.get('/api/beets')
    .then((res) => {
      beets = res.data;

      const promises = beets.map((beet) => {
        return axios.get(`/api/beets_users/beet_id/${beet.id}`);
      });

      return axios.all(promises);
    })
    .then((res) => {
      for (let i = 0; i < beets.length; i++) {
        beets[i].collaborators = res[i].data;
      }

      this.setState({ beets });
    })
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
    });
  },

  render() {
    const beets = this.state.beets;

    return <div className="card beets">
      <div className="card-content">
        <span className="card-title">Recent Beets</span>
        <div className="row">

          {beets.map((beet, index) => {
            return (
              <div className="card horizontal" key={index}>
                <div className="card-image">
                  <img className="album" src={beet.image_url} />
                </div>
                <div className="card-stacked">
                  <div className="card-content">
                    <span className="card-title">{beet.title}</span>
                    <p>by {beet.collaborators.map((collab) => {
                      return collab.username;
                    }).join(', ')} </p>

                  </div>
                  <a className="waves-effect waves-light btn">
                    <i className="material-icons">play_arrow / pause</i>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>;
  }
});

export default Beets;
