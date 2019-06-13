import React from 'react'
import './style/main.css'

const Message = () => 
  <div className="game-message">
    <p></p>
    <div className="lower">
      <span className="keep-playing-button btn">Keep going</span>
      <span className="retry-button btn">Try again</span>
    </div>
  </div>

export { Message }