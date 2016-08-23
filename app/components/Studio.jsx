import React from 'react';
import DrumMachine from 'components/DrumMachine';
import Knob from 'components/Knob';
import axios from 'axios';

const Studio = React.createClass({
  getInitialState() {
    return {
      collaborators: '',
      image_url: '',
      sequence: '[[],[],[],[],[],[],[],[],[],[],[],[],[]]',
      title: ''
    }
  },

  handleTitle(event) {
    const title = event.target.value;

    this.setState({
      title: title
    });
  },

  handleImageUrl(event) {
    const image_url = event.target.value;

    this.setState({
      image_url: image_url
    });
  },

  // handleSequence() {
  //
  // },

  handlePublish(event) {
    event.preventDefault();
    axios.post('/api/beets', {
      title: this.state.title,
      image_url: this.state.image_url,
      sequence: this.state.sequence
    })
    .then(() => {
      console.log(this.state);
    })
    .catch((err) => {
      throw err;
    })
  },

  render() {
    const params = this.props.params;

    return <div>
      <h1>You Are in {params.id}</h1>
      <Knob />
      <div>
        <DrumMachine />
      </div>
      <div>
        <h2>Publish Beet</h2>
        <div>
          <h3>Collaborators</h3>
          <ul>
            <li>mcfresh</li>
            <li>djstale</li>
          </ul>
        </div>
        <h3>Add Beet Info</h3>
        <form>
          <div>
            <input
              onChange={this.handleTitle}
              placeholder="Title"
              type="text"
            />
          </div>
          <div>
            <input
              onChange={this.handleImageUrl}
              placeholder="Album Image URL"
              type="text"
            />
          </div>
          <button onClick={this.handlePublish}>Publish Beet</button>
        </form>
      </div>
    </div>
  }
});

export default Studio;
