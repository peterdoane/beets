import React from 'react';

const Btn = React.createClass({
  handleClick() {
    this.props.btnClicked(this.props.pattern, this.props.row, this.props.step);
  },
  render() {
    const height = 40;
    const width = 40;
    const active = (this.props.step === this.props.activeStep && this.props.pattern === this.props.activePattern);
    const style = {
      background: this.props.btnState ? (active ? 'green': 'red') : 'white',
      border: active ? '1px solid red' : '1px solid green',
      boxSizing: 'unset',
      height: '5%',
      width: '5%',
      margin:'.125%'
      // left: `${this.props.step * width}px`,
      // top: `${this.props.row * height}px`,
    };
    return (
      <div onClick={this.handleClick} style={style} className="drum-button">

      </div>
    );
  }
});

export default Btn;
