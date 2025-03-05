import React from 'react';

class SingleLetterSearchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: '' };
  }

  handleInputChange = (event) => {
    const value = event.target.value.charAt(0).toLowerCase(); // Take first character, convert to lowercase
    this.setState({ inputValue: value });
  };

  handleSearchClick = () => {
    if (this.state.inputValue.length === 1) {
      if (this.props.onSearch) {
        this.props.onSearch(this.state.inputValue.toLowerCase());
      } else {
        console.error("onSearch prop is missing in SingleLetterSearchbar!");
      }
    } else {
      alert("Please enter a single letter.");
    }
  
    // Clear input after search
    this.setState({ inputValue: "" });
  };
  

  render() {
    return (
      <div className="search-bar">
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          maxLength={1}
          placeholder="Enter a letter"
        />
        <button onClick={this.handleSearchClick}>Guess</button>
      </div>
    );
  }
}

export default SingleLetterSearchbar;

