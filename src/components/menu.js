import React from 'react'
import './style/main.css'

const Menu = ({ isFirstTime, isLogin, resume, startGame, onClickMenuBtn }) =>
<div>
  <p>Menu</p>
  {isFirstTime ? null : <span className="resume btn" onClick={() => resume()}>Resume</span>}
  <span className="start btn" onClick={() => startGame()}>New Game</span>
  <span className="login btn" onClick={() => onClickMenuBtn('login')}>Login</span>
  <span className={"my-score btn " + isLogin} onClick={() => onClickMenuBtn('myScore')}>My Score</span>
  <span className="ranking btn" onClick={() => onClickMenuBtn('rankBoard')}>Rankging</span>
</div>

const MyBoard = () =>
<div >
</div>

const RankBoard = () =>
<div>
</div>

export { Menu, MyBoard, RankBoard }