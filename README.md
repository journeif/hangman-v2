# 🔥 React Hangman Game  

## 🛠 Setup Instructions  

Follow these steps to download, install, and run the Hangman game on your computer.  

1️⃣ Clone the Repository  
Open your terminal and run:  
```bash
git clone <your-repo-url>
cd react-hangman

2️⃣ Install Dependencies
Make sure you have Node.js installed, then run:
npm install

3️⃣ Start the Game
To launch the game, run:
npm start
Then open http://localhost:3000/ in your browser.

🎮 How to Play

Guess the letters of the secret word.
If you get 5 wrong guesses, Game Over! 😭
Used letters are displayed to help you track guesses.
Wins/Losses are recorded during your session.
Start a new game anytime!

react-hangman/
│── public/              # Static assets (hangman images, favicon, etc.)
│── src/                 # React components
│   ├── App.css          # Stylesheet
│   ├── HangmanGame.js   # Main game logic
│   ├── LetterBox.js     # Displays each letter
│   ├── SingleLetterSearchBar.js  # Input for guessing letters
│── package.json         # Dependencies & scripts
│── README.md            # This file!
