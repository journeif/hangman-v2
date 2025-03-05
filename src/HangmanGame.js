import React from 'react';
import SingleLetterSearchbar from './SingleLetterSearchBar';
import './App.css';

const pics = [
  `${process.env.PUBLIC_URL}/noose.png`,
  `${process.env.PUBLIC_URL}/upperBody.png`,
  `${process.env.PUBLIC_URL}/upperandlowerbody.png`,
  `${process.env.PUBLIC_URL}/1arm.png`,
  `${process.env.PUBLIC_URL}/botharms.png`,
  `${process.env.PUBLIC_URL}/1leg.png`,
  `${process.env.PUBLIC_URL}/dead.png`
];

const words = ["Morehouse", "Spelman", "Basketball", "Table", "Museum", "Excellent", "Fun", "React"];

class HangmanGame extends React.Component {
  state = {
    curWord: '',
    hiddenWord: '',
    lifeLeft: 6,
    usedLetters: [],
    wins: 0,
    losses: 0,
    gameOver: false
  };

  componentDidMount() {
    this.startNewGame();
  }

  startNewGame = () => {
    const newWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    this.setState({
      curWord: newWord,
      hiddenWord: '_ '.repeat(newWord.length).trim(),
      lifeLeft: 6,
      usedLetters: [],
      gameOver: false
    });
  };

  handleLetterGuess = (letter) => {
    const { curWord, usedLetters, lifeLeft, gameOver } = this.state;
    if (gameOver || usedLetters.includes(letter)) return;

    const newUsedLetters = [...usedLetters, letter];
    let updatedHiddenWord = this.state.hiddenWord.split(' ');

    if (curWord.includes(letter)) {
      curWord.split('').forEach((char, index) => {
        if (char === letter) {
          updatedHiddenWord[index] = letter;
        }
      });
    } else {
      this.setState({ lifeLeft: lifeLeft - 1 });
    }

    const newHiddenWord = updatedHiddenWord.join(' ');

    this.setState({
      usedLetters: newUsedLetters,
      hiddenWord: newHiddenWord
    });

    if (!newHiddenWord.includes('_')) {
      this.setState((prevState) => ({ wins: prevState.wins + 1, gameOver: true }));
    } else if (lifeLeft - 1 === 0) {
      this.setState((prevState) => ({ losses: prevState.losses + 1, gameOver: true }));
    }
  };

  render() {
    const { lifeLeft, usedLetters, hiddenWord, wins, losses, gameOver, curWord } = this.state;

    return (
      <div className="hangman-container">
        <h1 className="game-title">🔥 Journei's React Hangman 🔥</h1>
        <img src={pics[6 - lifeLeft]} alt="Hangman" className="hangman-image" />
        <p className="word-display">{hiddenWord}</p>
        
        <SingleLetterSearchbar onSearch={this.handleLetterGuess} />

        <div className="used-letters">
          <h3>Used Letters:</h3>
          <p>{usedLetters.join(', ') || 'None'}</p>
        </div>

        <div className="scoreboard">
          <p>🏆 Wins: {wins} | 💀 Losses: {losses}</p>
        </div>

        {gameOver && <p className="game-over">Game Over! The word was: <strong>{curWord}</strong></p>}

        <button onClick={this.startNewGame}>🔄 New Game</button>
      </div>
    );
  }
}

export default HangmanGame;
