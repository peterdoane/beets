import React from 'react';
import Btn from 'components/Btn';

const Grid = React.createClass({
    renderRow(row){
        const {
          drums = []
        } = this.props;
        const btnRow = [];
        const drumName = [{
          short: 'BD',
          long: 'Bass Drum'
        }, {
          short: 'SD',
          long: 'Snare Drum'
        }, {
          short: 'LT',
          long: 'Low-Tom'
        }, {
          short: 'MT',
          long: 'Mid-Tom '
        }, {
          short: 'HT',
          long: 'High-Tom'
        }, {
          short: 'RS',
          long: 'Rim-Shot'
        }, {
          short: 'CP',
          long: 'HandClap'
        }, {
          short: 'CB',
          long: 'CowBell'
        }, {
          short: 'CY',
          long: 'Cymbal'
        }, {
          short: 'OH',
          long: 'Open Hi-Hat'
        }, {
          short: 'CH',
          long: 'Closed Hi-Hat'
        }];
        const triggers = drums.map(drum => typeof drum === 'object' ? () => drum.trigger(0) : null);
        btnRow.push(
          <button
            key={drumName[row].short}
            title={drumName[row].long}
            className="grid-row-caption"
            onClick={triggers[row]}>
            {drumName[row].short}
          </button>
        );

        for (let step=0; step<16; ++step) {

          // this.props.class = (this.props.btnClicked) ? 'white' : 'black';

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
