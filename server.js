const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://root:example@localhost:27017/hangman', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const statsSchema = new mongoose.Schema({
  wins: Number,
  losses: Number,
});

const Stats = mongoose.model('Stats', statsSchema);

app.get('/stats', async (req, res) => {
  const stats = await Stats.findOne();
  res.json(stats);
});

app.post('/stats', async (req, res) => {
  const { wins, losses } = req.body;
  let stats = await Stats.findOne();
  if (stats) {
    stats.wins = wins;
    stats.losses = losses;
    await stats.save();
  } else {
    stats = new Stats({ wins, losses });
    await stats.save();
  }
  res.json(stats);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
