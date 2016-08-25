import Btn from 'components/Btn';
import React from 'react';

const Grid = React.createClass({
  renderRow(row) {
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
    const handleTriggers = drums.map(
      (drum) => (typeof drum === 'object' ? () => drum.trigger(0) : null));

    btnRow.push(
      <button
        className="grid-row-caption"
        key={drumName[row].short}
        onClick={handleTriggers[row]}
        title={drumName[row].long}
      >
        {drumName[row].short}
      </button>
    );

    for (let step = 0; step < 16; ++step) {
      btnRow.push(
        <Btn
          activePattern={this.props.activePattern}
          activeStep={this.props.activeStep}
          btnClicked={this.props.btnClicked}
          btnState={this.props.sequence[row][step]}
          key={step}
          pattern={this.props.pattern}
          row={row}
          step={step}
        />
      );
    }

    return btnRow;
  },
  renderRows() {
    const btns = [];

    for (let row = 0; row < 11; ++row) {
      btns.push(
        <div
          className="button-row"
          key={row}
        >
          {this.renderRow(row)}
        </div>
      );
    }

    return btns;
  },
  render() {
    const style = {
      border: '1px solid green'
    };

    return (
      <div className={`button-wrapper ${this.props.className}`} style={style}>
        {this.renderRows()}
      </div>
    );
  }
});

export default Grid;
