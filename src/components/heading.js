import React from 'react'
import './style/main.css'

const Heading = () => 
  <div className="heading">
    <h1 className="title">2048</h1>
    <div className="scores-container">
      <div className="score-container">0</div>
      <div className="best-container">0</div>
    </div>
  </div>

export { Heading }