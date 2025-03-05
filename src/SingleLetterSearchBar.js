import React from "react";

// This component allows the user to enter a letter and submit it
class SingleLetterSearchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
    };
  }

  handleInputChange = (event) => {
    const value = event.target.value.toUpperCase().charAt(0); // Convert to uppercase and take only the first character
    this.setState({ inputValue: value });
  };

  handleSearchClick = () => {
    const { inputValue } = this.state;

    if (inputValue.length === 1 && /^[A-Z]$/.test(inputValue)) {
      this.props.onGuess(inputValue); // Calls the function from HangmanGame.js
    } else {
      alert("Please enter a valid letter.");
    }

    // Clear input after search
    this.setState({ inputValue: "" });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          maxLength={1}
          disabled={this.props.disabled} // Disable input if game is over
        />
        <button onClick={this.handleSearchClick} disabled={this.props.disabled}>
          Guess
        </button>
      </div>
    );
  }
}

export default SingleLetterSearchbar;
