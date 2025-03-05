import React from 'react';

class LetterBox extends React.Component {
  render() {
    return (
      <div className="letter-box" style={this.props.boxStyle}>
        <span style={this.props.letterStyle}>{this.props.letter}</span>
      </div>
    );
  }
}

export default LetterBox;
