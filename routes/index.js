const express = require('express');
const router = express.Router();
const GameContext = require('../GameContext')

console.log('>> module initializing')
var gameContext = null;

// Handle POST request to '/start'
router.post('/start', (req, res) => {
  // NOTE: Do something here to start the game
  gameContext = new GameContext(req.body);
  // Response data
  let data = {
    color: "#DFFF00",
    name: "Lucky team 13",
    head_url: "http://www.placecage.com/c/200/200", // optional, but encouraged!
    taunt: "I won't run into walls and i am made of javascript", // optional, but encouraged!
  }

  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', (req, res) => {
  // Response data
  let data = {
    move: gameContext.nextMove(req.body), // one of: ['up','down','left','right']
    taunt: 'Outta my way, snake!', // optional, but encouraged!
  }

  return res.json(data)
})

module.exports = router
