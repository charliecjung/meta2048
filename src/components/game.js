import React from 'react'
import './style/main.css'

const Heading = () =>
  <div className='heading'>
    <h1 className='title'>2048</h1>
    <div className='scores-container'>
      <div className='score-container'>0</div>
      <div className='best-container'>0</div>
    </div>
  </div>

const Above = ({ showMenu = f => f }) =>
  <div className='above-game'>
    <p className='game-intro'>Join the numbers and get to the <strong>2048 tile!</strong></p>
    <span className='restart-button btn ' onClick={() => showMenu()}>Menu</span>
  </div>

const Message = () =>
  <div className='game-message'>
    <p />
    <div className='lower'>
      <span className='keep-playing-button btn'>Keep going</span>
      <span className='retry-button btn'>Try again</span>
    </div>
  </div>

const Grid = () =>
  <div className='grid-container'>
    <div className='grid-row'>
      <div className='grid-cell' />
      <div className='grid-cell' />
      <div className='grid-cell' />
      <div className='grid-cell' />
    </div>
    <div className='grid-row'>
      <div className='grid-cell' />
      <div className='grid-cell' />
      <div className='grid-cell' />
      <div className='grid-cell' />
    </div>
    <div className='grid-row'>
      <div className='grid-cell' />
      <div className='grid-cell' />
      <div className='grid-cell' />
      <div className='grid-cell' />
    </div>
    <div className='grid-row'>
      <div className='grid-cell' />
      <div className='grid-cell' />
      <div className='grid-cell' />
      <div className='grid-cell' />
    </div>
  </div>

const Explanation = () =>
  <p className='game-explanation'>
    <strong className='important'>How to play:</strong> Use your <strong>arrow keys</strong> to move the tiles. When two tiles with the same number touch, they <strong>merge into one!</strong>
  </p>

export { Heading, Above, Message, Grid, Explanation }
