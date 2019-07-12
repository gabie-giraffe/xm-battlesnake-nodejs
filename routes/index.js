const express = require('express');
const insulter = require('insult');

const GameContext = require('../GameContext');

const router = express.Router();

var gameContext = null;
var currentInsult = "";
var steps = 0
const INSULT_ROTATION_RATE = 10;

// Handle POST request to '/start'
router.post('/start', (req, res) => {
  // NOTE: Do something here to start the game
  gameContext = new GameContext(req.body);
  // Response data
  let data = {
    color: "#4e47b2",
    name: "Lucky team 13",
    head_url: "https://pixabay.com/get/57e2dc464853a414ea9d857ec72a357e143cc3e45657734071277cd193/circle-icons-1295218.svg", // optional, but encouraged!
    head_type: "fang",
    tail_type: "small-rattle",
    taunt: "🐍 13 🐍", // optional, but encouraged!
    secondary_color: "#e8416f",
  }

  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', (req, res) => {
  if (steps % INSULT_ROTATION_RATE === 0) {
    currentInsult = insulter.Insult();
  }

  // Response data
  let data = {
    move: gameContext.nextMove(req.body), // one of: ['up','down','left','right']
    taunt: currentInsult, // optional, but encouraged!
  }

  steps++;

  return res.json(data)
})

module.exports = router
