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
                return <div key={index} className="card small">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" src={beet.image_url} />
                  </div>
                  {/* <div className="card-content">
                    <span className="card-title">{beet.name}<i className="material-icons right">more_vert</i></span>
                  </div> */}
                  <div className="card-reveal">
                    <span className="card-title">Collaborators on {beet.name}<i className="material-icons right">close</i></span>
                    <ul>
                      <li>Collaborator 1</li>
                      <li>Collaborator 2</li>
                    </ul>
                  </div>
                </div>;

                {/* <ul key={index}>
                  <li>
                    <img src={beet.image_url} />
                    {beet.name}
                  </li>
                  <li>
                    <span>{beet.title}</span>
                  </li>
                  // Loop collaborators
                </ul>; */}
              })}
          </div>
      </div>
    </div>
  }
});

export default Beets;
