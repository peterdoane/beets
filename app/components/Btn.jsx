import React from 'react';

const Btn = React.createClass({
  getInitialState() {
    return {isBtnActive: false};
  },
  handleClick() {
    this.props.btnClicked(this.props.pattern, this.props.row, this.props.step);
    this.setState({isBtnActive:!this.state.isBtnActive});
    // console.log(this.state.isBtnActive);
    // console.log('step value:', this.props.step, 'activeStep: ', this.props.activeStep);
    // console.log('pattern: ', this.props.pattern, 'activePattern: ', this.props.activePattern);
  },
  isActive() {
    return this.props.step === this.props.activeStep && this.props.pattern === this.props.activePattern;
  },
  render() {
    const {
      step,
      btnState
    } = this.props;
    const height = 40;
    const width = 40;
    const active = this.isActive();
    const buttonClassName = () => {
      if (step <= 3) {
        return `drum-button-orange ${btnState ? 'pressed' : ''} ${active ? 'active' : ''}`;
      } else if (step <= 7) {
        return `drum-button-yellow ${btnState ? 'pressed' : ''} ${active ? 'active' : ''}`;
      } else if (step <= 11) {
        return `drum-button-white ${btnState ? 'pressed' : ''} ${active ? 'active' : ''}`;
      } else {
        return `drum-button-red ${btnState ? 'pressed' : ''} ${active ? 'active' : ''}`;
      }
    };
    const style = {
      // background: this.props.btnState ? (active ? 'green': 'black') : 'white',
      // border: active ? '1px solid red' : '1px solid black',
      // boxSizing: 'unset',
      // height: '5%',
      // width: '5%',
      // margin:'.125%'

      // left: `${this.props.step * width}px`,
      // top: `${this.props.row * height}px`,
    };
    const fill = this.state.isBtnActive ? '#fff' : '#000';
    return (
      <div
        onClick={this.handleClick}
        style={style}
        className={buttonClassName()}>
        <svg width="15px" height="26px" viewBox="484 417 15 26">
          <defs>
              <rect id="path-1" x="0" y="0" width="13" height="26"></rect>
              <mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="13" height="26" fill="white">
                  <use href="#path-1"></use>
              </mask>
          </defs>
          <g id="Group-5" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(485.000000, 417.000000)">
              <use id="Rectangle-2" stroke="#FFFFFF" mask="url(#mask-2)" strokeWidth="2" fill="#FFFFFF" href="#path-1"></use>
              <path d="M0.158536585,6.9875 L12.8414634,6.9875" id="Line" stroke="#979797" strokeLinecap="square" opacity="0.316056437"></path>
              <ellipse id="Oval-2" stroke="#000000" fill={fill} cx="6.5" cy="3.4125" rx="1.74390244" ry="1.7875"></ellipse>
          </g>
        </svg>
      </div>
    );
  }
});

export default Btn;
