import React from 'react'
import './style/main.css'

const Game = () =>
  <div className="container">
    <div className="heading">
      <h1 className="title">2048</h1>
      <div className="scores-container">
        <div className="score-container">0</div>
        <div className="best-container">0</div>
      </div>
    </div>

    <div className="above-game">
      <p className="game-intro">Join the numbers and get to the <strong>2048 tile!</strong></p>
      <span className="restart-button btn">New Game</span>
    </div>

    <div className="game-container">
      <div className="game-message">
        <p></p>
        <div className="lower">
          <span className="keep-playing-button btn">Keep going</span>
          <span className="retry-button btn">Try again</span>
        </div>
      </div>

      <div className="grid-container">
        <div className="grid-row">
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
        </div>
        <div className="grid-row">
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
        </div>
        <div className="grid-row">
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
        </div>
        <div className="grid-row">
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
        </div>
      </div>

      <div className="tile-container">

      </div>
    </div>

    <p className="game-explanation">
      <strong className="important">How to play:</strong> Use your <strong>arrow keys</strong> to move the tiles. When two tiles with the same number touch, they <strong>merge into one!</strong>
    </p>
    <hr />
  </div>

export { Game }