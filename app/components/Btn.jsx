import React from 'react';

const Btn = React.createClass({
  handleClick() {
    this.props.btnClicked(this.props.row, this.props.step);
  },
  render() {
    const height = 70;
    const width = 70;
    const style = {
      background: this.props.btnState ? (this.props.step === this.props.activeStep ? 'green': 'red') : 'white',
      border: this.props.step === this.props.activeStep ? '5px solid green' : '1px solid green',
      boxSizing: 'border-box',
      height: '50px',
      left: `${this.props.step * width}px`,
      position: 'absolute',
      top: `${this.props.row * height}px`,
      width: '50px'
    };
    return (
      <div onClick={this.handleClick} style={style}>

      </div>
    );
  }
});

export default Btn;
