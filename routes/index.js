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
    color: "#0D27DB",
    name: "Lucky team 13",
    head_url: "http://www.placecage.com/c/200/200", // optional, but encouraged!
    taunt: "Lucky snake 13 is lucky", // optional, but encouraged!
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
