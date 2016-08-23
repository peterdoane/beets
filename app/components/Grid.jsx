import React from 'react';
import Btn from 'components/Btn';

const Grid = React.createClass({
    renderRow(row){
        const btnRow = [];
        const drumName = ['BD', 'CB', 'CH', 'CL', 'CP', 'CY', 'HC', 'HT', 'JS', 'LC', 'LT'];

        btnRow.push(<span key={drumName[row]}>{drumName[row]}</span>);
        for (let step=0; step<16; ++step) {

          btnRow.push(

            <Btn
              activeStep={this.props.activeStep}
              activePattern={this.props.activePattern}
              btnClicked={this.props.btnClicked}
              btnState={this.props.sequence[row][step]}
              pattern={this.props.pattern}
              row={row}
              step={step}
              key={step}
            >
            </Btn>
          );
        }
        return btnRow;
    },
    renderRows(){
      const btns = [];
      for (let row=0; row < 11; ++row) {
        btns.push(<div className="button-row" key={row}>{this.renderRow(row)}</div>);
      }
      return btns;
    },
  render() {
    const style = {
      border: '1px solid green',
    }
    return (
      <div className={'button-wrapper ' + this.props.className} style = { style }>
        {this.renderRows()}
      </div>
    );
  }
});

export default Grid;
