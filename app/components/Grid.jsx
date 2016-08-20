import React from 'react';
import Btn from 'components/Btn';

const Grid = React.createClass({
  render() {
    const btns = [];
    for (let row=0; row<this.props.sequence.length; ++row) {
      const btnRow = [];
      for (let step=0; step<16; ++step) {
        btnRow.push(
          <Btn
            activeStep={this.props.activeStep}
            btnClicked={this.props.btnClicked}
            btnState={this.props.sequence[row][step]}
            row={row}
            step={step}
          >

          </Btn>
        );
      }
      btns.push(btnRow);
    }
    return (
      <div
        style = {{
          border: '1px solid green',
          position: 'absolute'
        }}
      >
        {btns}
      </div>
    );
  }
});

export default Grid;
