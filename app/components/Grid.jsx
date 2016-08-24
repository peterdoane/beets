import React from 'react';
import Btn from 'components/Btn';

const Grid = React.createClass({
    renderRow(row){

        const btnRow = [];
        const drumName = ['BD', 'SD', 'LT', 'MT', 'HT', 'RS', 'CP', 'CB', 'CY', 'OH', 'CH'];
        btnRow.push(<span key={drumName[row]} className="grid-row-caption">{drumName[row]}</span>);
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
    getInitialState(){
      return {activeStep:0, bpm:120};
    },
    tick(){
      this.setState({ activeStep: this.state.activeStep > 11 ? 0 : this.state.activeStep + 1 });
      var ticker = 60000 / this.state.bpm / 4;
      setTimeout(this.tick, ticker);
    },
    renderRows(){
      const btns = [];
      for (let row=0; row < 11; ++row) {
        btns.push(<div className="button-row" key={row}>{this.renderRow(row)}</div>);
      }
      return btns;
    },
    renderBtns(){
      const btns = [];
      for(let row=0; row < 11; ++row){
        for(let column=0; column < 11; ++column){
        btns.push(
        <rect x={column*50} y={row*50} width="13" height="50"
          className={this.buttonClassName(column)}
          >
          <g width="15px" height="26px" viewBox="484 417 15 26">
            <defs>
                <rect id="path-1" x="0" y="0" width="13" height="26"></rect>
                <mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="13" height="26" fill="white">
                    <use href="#path-1"></use>
                </mask>
            </defs>
            <g id="Group-5" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(485.000000, 417.000000)">
                <use id="Rectangle-2" stroke="#FFFFFF" mask="url(#mask-2)" strokeWidth="2" fill="#FFFFFF" href="#path-1"></use>
                <path d="M0.158536585,6.9875 L12.8414634,6.9875" id="Line" stroke="#979797" strokeLinecap="square" opacity="0.316056437"></path>
                <ellipse id="Oval-2" stroke="#000000" fill='black' cx="6.5" cy="3.4125" rx="1.74390244" ry="1.7875"></ellipse>
            </g>
          </g>
        </rect>
          )
      }
    }
      return btns;
  },
  buttonClassName(column){
    return (column === this.state.activeStep) ? "drum-button-yellow" : "drum-button-white ";
  },
  render() {
    const style = {
      border: '1px solid green',
    }
    return (
      <div className={'button-wrapper ' + this.props.className} style = { style }>
        <svg>
          {this.renderBtns()}
        </svg>
        {/* {this.renderRows()} */}
      </div>
    );
  }
});

export default Grid;
