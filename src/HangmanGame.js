import React, { useState, useEffect } from 'react';
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

const HangmanGame = () => {
  const [curWord, setCurWord] = useState('');
  const [hiddenWord, setHiddenWord] = useState([]);
  const [lifeLeft, setLifeLeft] = useState(6);
  const [usedLetters, setUsedLetters] = useState([]);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Fetch stats from the backend when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/stats')
      .then(res => res.json())
      .then(data => {
        setWins(data.wins);
        setLosses(data.losses);
      })
      .catch(error => console.error('Error fetching stats:', error));

    startNewGame();
  }, []);

  // Function to update stats on the server
  const updateStats = (newWins, newLosses) => {
    fetch('http://localhost:5000/stats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ wins: newWins, losses: newLosses })
    });
  };

  const startNewGame = () => {
    const newWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    setCurWord(newWord);
    setHiddenWord(Array(newWord.length).fill('_'));
    setLifeLeft(6);
    setUsedLetters([]);
    setGameOver(false);
  };

  const handleLetterGuess = (letter) => {
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
    let newWins = wins;
    let newLosses = losses;
    let isGameOver = false;

    if (!updatedHiddenWord.includes('_')) {
      newWins += 1;
      isGameOver = true;
    } else if (newLifeLeft === 0) {
      newLosses += 1;
      isGameOver = true;
    }

    // Update stats on backend when game ends
    if (isGameOver) {
      updateStats(newWins, newLosses);
    }

    setUsedLetters(newUsedLetters);
    setHiddenWord(updatedHiddenWord);
    setLifeLeft(newLifeLeft);
    setWins(newWins);
    setLosses(newLosses);
    setGameOver(isGameOver);
  };

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

      <SingleLetterSearchbar onSearch={handleLetterGuess} />

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

      <button onClick={startNewGame}>🔄 New Game</button>
    </div>
  );
};

export default HangmanGame;
