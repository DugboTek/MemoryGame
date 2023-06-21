//write a react component that is the main container for a memory game where you have to remember the order of cards 

import React, { useState } from 'react'
//import GameContainer.css from one folder above in CSS/GameContainer.css
import '../CSS/GameContainer.css'
//import Card.jsx from the same folder
import GameEngine from './GameEngine'

function GameContainer() {
return (
    <div className="game-container">
      <GameEngine></GameEngine>
    </div>
)
}
export default GameContainer