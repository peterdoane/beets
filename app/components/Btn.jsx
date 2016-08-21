import React from 'react';

const Btn = React.createClass({
  handleClick() {
    this.props.btnClicked(this.props.row, this.props.step);
  },
  render() {
    const height = 50;
    const width = 50;
    const style = {
      background: this.props.btnState ? (this.props.step === this.props.activeStep ? 'green': 'red') : 'white',
      border: this.props.step === this.props.activeStep ? '5px solid green' : '1px solid green',
      boxSizing: 'border-box',
      height: '40px',
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
