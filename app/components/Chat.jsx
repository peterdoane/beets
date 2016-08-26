import React from 'react';

const Chat = React.createClass({
  getInitialState() {
    return {
      message: '',
      messages: []
    };
  },
  componentWillMount() {
    // when the server emits the 'chat message' event back here, the user
    // and message are appended to the #messages <ul> in the DOM

    this.props.socket.on('post message', (data) => {
      this.setState({
        messages: this.state.messages.concat(
          <li key={this.state.messages.length}>
            {`${data.username}: ${data.message}`}
          </li>
        )
      });
    });
  },
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  },

  handleSubmitSend(event) {
    event.preventDefault();
    this.props.socket.emit('chat message', {
      studio: this.props.studio,
      message: this.state.message,
      username: this.props.username
    });
    this.setState({ message: '' });
  },

  render() {
    return (
      <div id={'chat-container'}>
        <div id={'message-container'}>
          <ul id={"messages"}>{this.state.messages}</ul>
        </div>

        <div id={"container"}>
          <form id={"send"} onSubmit={this.handleSubmitSend}>
            <input
              autoComplete={"off"}
              id={"m"}
              name={'message'}
              onChange={this.handleChange}
              value={this.state.message}
            />
            <button>Send</button>
          </form>
        </div>
      </div>
    );
  }
});

export default Chat;
