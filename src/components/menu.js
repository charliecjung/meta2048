import React from 'react'
import './style/main.css'

const Menu = ({ isFirstTime, isLogin, resume, startGame, onClickMenuBtn }) =>
<div>
  <p>Menu</p>
  {isFirstTime ? null : <span className="resume btn" onClick={() => resume()}>Resume</span>}
  <span className="start btn" onClick={() => startGame()}>New Game</span>
  <span className="login btn" onClick={() => onClickMenuBtn('login')}>Login</span>
  <span className={"my-score btn " + isLogin} onClick={() => onClickMenuBtn('myScore')}>My Score</span>
  <span className={"ranking btn " + isLogin} onClick={() => onClickMenuBtn('rankBoard')}>Ranking</span>
</div>


const MyBoard = ({ isFirstTime, isLogin, resume, startGame, onClickMenuBtn })  => {
var players = ["Player 0", "Player 1", "Player 2", "Player 3", "Player 4", "Player 5"];
var scores = [0, 10, 20, 30, 40, 50];
let result = [];

for (let i = 0; i < players.length; i++) {
result.push(
  <tr>
  <td>{"Player " + i}</td>
  <td>{scores[i]}</td>
  </tr>
)
}

  return (
    <div>
        <body id='test'>
        <h2>Scoreboard</h2>
    <table className="padding-table-columns" align="center">
      <table>
      <tr>
        <th align="left">Player</th>
        <th align="left">Score</th>

      </tr>
      {result}

    </table>

    </table>
           <span className={"register-scoreboard btn " + isLogin} onClick={() => onClickMenuBtn('register-scoreboard')}>Register Score (scoreboard)</span>
    </body>
    </div>
  )
}

const RankBoard = ({ isFirstTime, isLogin, resume, startGame, onClickMenuBtn })  => {
var players = ["Player 0", "Player 1", "Player 2", "Player 3", "Player 4", "Player 5"];
var scores = [0, 10, 20, 30, 40, 50];
let result = [];

for (let i = 0; i < players.length; i++) {
result.push(
  <tr>
  <td>{"Player " + i}</td>
  <td>{scores[i]}</td>
  </tr>
)
}

  return (
    <div>
        <body id='test'>
        <h2>Ranking</h2>
    <table className="padding-table-columns" align="center">
      <table>
      <tr>
        <th align="left">Player</th>
        <th align="left">Score</th>

      </tr>
      {result}

    </table>

    </table>
    <span className={"register-rankboard btn " + isLogin} onClick={() => onClickMenuBtn('register-rankboard')}>Register Score (rankboard)</span>
    </body>
    </div>
  )
}


export { Menu, MyBoard, RankBoard }
