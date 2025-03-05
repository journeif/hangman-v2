import React from 'react';
import './App.css';
import LetterBox from './LetterBox';
import SingleLetterSearchbar from './SingleLetterSearchBar';

const pics = ['noose.png', 'upperBody.png', 'upperandlower.png', '1arm.png', 'botharms.png'];
const words = ["Morehouse", "Spelman", "Basketball", "Table", "Museum", "Excellent", "Fun", "React"];

class HangmanGame extends React.Component {
  state = {
    wordList: words,
    curWord: 0,
    lifeLeft: 5,
    usedLetters: [],
    sessionRecord: { wins: 0, losses: 0 },
  };

  componentDidMount() {
    this.startNewGame();
  }

  startNewGame = () => {
    this.setState((prevState) => ({
      curWord: Math.floor(Math.random() * prevState.wordList.length),
      lifeLeft: 5,
      usedLetters: [],
    }));
  };

  updateSessionRecord = (didWin) => {
    this.setState((prevState) => ({
      sessionRecord: {
        wins: didWin ? prevState.sessionRecord.wins + 1 : prevState.sessionRecord.wins,
        losses: didWin ? prevState.sessionRecord.losses : prevState.sessionRecord.losses + 1,
      },
    }));
  };

  handleGuess = (letter) => {
    if (this.state.usedLetters.includes(letter)) return;

    const word = this.state.wordList[this.state.curWord].toUpperCase();
    const isCorrect = word.includes(letter);

    this.setState((prevState) => {
      const updatedUsedLetters = [...prevState.usedLetters, letter];

      if (!isCorrect) {
        const updatedLife = prevState.lifeLeft - 1;
        if (updatedLife === 0) {
          this.updateSessionRecord(false);
        }
        return { usedLetters: updatedUsedLetters, lifeLeft: Math.max(0, updatedLife) };
      }

      const wordComplete = [...word].every((char) => updatedUsedLetters.includes(char) || char === " ");
      if (wordComplete) {
        this.updateSessionRecord(true);
      }

      return { usedLetters: updatedUsedLetters };
    });
  };

  render() {
    const word = this.state.wordList[this.state.curWord].toUpperCase();
    const gameOver = this.state.lifeLeft <= 0;
    const wordComplete = [...word].every((char) => this.state.usedLetters.includes(char) || char === " ");

    return (
      <div className="hangman-container">
        <h1 className="game-title">🔥 Journei's Hangman 🔥</h1>
        <h2 className="life-counter">Lives Left: {this.state.lifeLeft}</h2>

        <img className="hangman-image" src={pics[Math.min(5 - this.state.lifeLeft, pics.length - 1)]} alt="Hangman Stage" />

        <div className="word-container">
          {word.split("").map((letter, index) => (
            <LetterBox key={index} letter={letter} isVisible={this.state.usedLetters.includes(letter)} />
          ))}
        </div>

        <p className="used-letters">Used Letters: {this.state.usedLetters.join(", ") || "None"}</p>

        {!gameOver && !wordComplete && <SingleLetterSearchbar onSearch={this.handleGuess} />}

        {gameOver && <h3 className="game-over">💀 Game Over! The word was: {word}</h3>}
        {wordComplete && <h3 className="win-message">🎉 You Won! 🎉</h3>}

        <button className="new-game-button" onClick={this.startNewGame}>New Game</button>

        <h3 className="record">🏆 Wins: {this.state.sessionRecord.wins} | ❌ Losses: {this.state.sessionRecord.losses}</h3>
      </div>
    );
  }
}

export default HangmanGame;
