🔥 React Hangman Game

Welcome to the React Hangman Game! A fun, interactive game where you guess the letters of a secret word before you run out of lives.

🛠 Setup Instructions

Follow these steps to get the game running on your local machine.

1️⃣ Clone the Repository
Start by cloning the repository to your local machine. Open your terminal and run:

git clone <your-repo-url>
cd react-hangman
2️⃣ Install Dependencies
Make sure you have Node.js installed. If you don’t have it, you can download it from here. Then, install the necessary dependencies:

npm install
3️⃣ Start the Game
To launch the game locally, run:

npm start
Now, open your browser and go to http://localhost:3000 to play the game.

🎮 How to Play

Guess the letters of the secret word.
You have 6 chances to guess wrong before the game ends.
Used letters are displayed to help you track which ones you've already guessed.
Your wins and losses are recorded during the game session.
You can start a new game anytime.
📝 Folder Structure

The project folder structure is as follows:

react-hangman/
│── public/                          # Static assets (images, favicon, etc.)
│   ├── noose.png                    # Image for noose stage
│   ├── upperBody.png                # Image for upper body stage
│   └── dead.png                     # Image for dead stage
│── src/                             # React components and logic
│   ├── App.css                      # Stylesheet for the game
│   ├── HangmanGame.js               # Main game logic component
│   ├── LetterBox.js                 # Component that displays each letter
│   ├── SingleLetterSearchBar.js     # Input field for guessing letters
│   ├── server.js                    # Backend server to track wins and losses
│── package.json                     # Project dependencies and scripts
│── package-lock.json                # Package version locking
│── README.md                        # This file!

⚙️ How the Game Works

HangmanGame Component: This is the main component where the game is played. It handles the game logic (starting new games, tracking guesses, and displaying the game state).
Server Integration: The backend server (server.js) keeps track of user wins and losses. It communicates with the frontend to store and retrieve stats.
Game Over: If the player runs out of life (6 incorrect guesses), they lose the game, and the word is revealed. If they guess the word correctly, they win.
State Management: React hooks manage game state, including the word to guess, remaining life, used letters, and game results.
💡 Future Enhancements

Implement multiplayer mode.
Add more words to the word bank for a varied game experience.
Track user scores persistently via a database (e.g., MongoDB).
