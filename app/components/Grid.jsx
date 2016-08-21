import React from 'react';
import Btn from 'components/Btn';

const Grid = React.createClass({
  render() {
    const btns = [];
    const style = {
      border: '1px solid green',
      // position: 'relative',
      // width: '45%',
      // margin: '.5em .5em',
      // float: (this.Left) ? 'left' : 'right',
    }
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
      <div className="button-wrapper" style = { style }>
        {btns}
      </div>
    );
  }
});

export default Grid;
