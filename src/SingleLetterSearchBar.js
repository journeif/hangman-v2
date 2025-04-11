import React from 'react';

class SingleLetterSearchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: '' };
  }

  handleInputChange = (event) => {
    const value = event.target.value.toUpperCase(); // Convert to uppercase
    // Only allow A-Z characters
    if (/^[A-Z]?$/.test(value)) {
      this.setState({ inputValue: value });
    }
  };

  handleSearchClick = () => {
    const { inputValue } = this.state;

    if (inputValue.length === 1) {
      this.props.onSearch?.(inputValue); // optional chaining
    } else {
      alert("Please enter a single letter from A-Z.");
    }

    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <div className="search-bar">
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          maxLength={1}
          placeholder="💌 Guess a letter"
          className="letter-input"
        />
        <button onClick={this.handleSearchClick} className="guess-button">
          💡 Guess
        </button>
      </div>
    );
  }
}

export default SingleLetterSearchbar;

