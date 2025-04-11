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
    hiddenWord: [],
    lifeLeft: 6,
    usedLetters: [],
    wins: 0,
    losses: 0,
    gameOver: false
  };

  componentDidMount() {
    const savedStats = JSON.parse(localStorage.getItem('hangmanStats'));
    if (savedStats) {
      this.setState({ wins: savedStats.wins, losses: savedStats.losses });
    }
    this.startNewGame();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.wins !== this.state.wins || prevState.losses !== this.state.losses) {
      const { wins, losses } = this.state;
      localStorage.setItem('hangmanStats', JSON.stringify({ wins, losses }));
    }
  }

  startNewGame = () => {
    const newWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    this.setState({
      curWord: newWord,
      hiddenWord: Array(newWord.length).fill('_'),
      lifeLeft: 6,
      usedLetters: [],
      gameOver: false
    });
  };

  handleLetterGuess = (letter) => {
    const { curWord, usedLetters, lifeLeft, hiddenWord, gameOver } = this.state;
    if (gameOver || usedLetters.includes(letter)) return;

    const newUsedLetters = [...usedLetters, letter];
    const updatedHiddenWord = [...hiddenWord];
    let correctGuess = false;

    curWord.split('').forEach((char, index) => {
      if (char === letter) {
        updatedHiddenWord[index] = letter;
        correctGuess = true;
      }
    });

    const newLifeLeft = correctGuess ? lifeLeft : lifeLeft - 1;
    let newWins = this.state.wins;
    let newLosses = this.state.losses;
    let isGameOver = false;

    if (!updatedHiddenWord.includes('_')) {
      newWins += 1;
      isGameOver = true;
    } else if (newLifeLeft === 0) {
      newLosses += 1;
      isGameOver = true;
    }

    this.setState({
      usedLetters: newUsedLetters,
      hiddenWord: updatedHiddenWord,
      lifeLeft: newLifeLeft,
      wins: newWins,
      losses: newLosses,
      gameOver: isGameOver
    });
  };

  render() {
    const { lifeLeft, usedLetters, hiddenWord, wins, losses, gameOver, curWord } = this.state;
    const totalGames = wins + losses;
    const winPercentage = totalGames > 0 ? ((wins / totalGames) * 100).toFixed(2) : '0.00';

    return (
      <div className="hangman-container">
        <div className="game-banner">
          <h1 className="game-title">🔥 Journei's React Hangman 2.0 🔥</h1>
          <p className="game-subtitle">WELCOME TO MY WORLD 😈</p>
        </div>

        <img src={pics[6 - lifeLeft]} alt="Hangman" className="hangman-image" />

        <p className="word-display">{hiddenWord.join(' ')}</p>

        <SingleLetterSearchbar onSearch={this.handleLetterGuess} />

        <div className="used-letters">
          <h3>Used Letters:</h3>
          <p>{usedLetters.join(', ') || 'None'}</p>
        </div>

        <div className="scoreboard">
          <p>🏆 Wins: {wins} | 💀 Losses: {losses}</p>
          <p>📈 Win Percentage: {winPercentage}%</p>
          <p>🧠 Total Games Played: {totalGames}</p>
        </div>

        {gameOver && <p className="game-over">Game Over! The word was: <strong>{curWord}</strong></p>}

        <button onClick={this.startNewGame}>🔄 New Game</button>
      </div>
    );
  }
}

export default HangmanGame;
