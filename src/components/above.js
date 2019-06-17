import React from 'react'
import './style/main.css'

const Above = ({showMenu = f => f}) => 
  <div className="above-game">
    <p className="game-intro">Join the numbers and get to the <strong>2048 tile!</strong></p>
    <span className="restart-button btn " onClick={() => showMenu()}>Menu</span>
  </div>

export { Above }