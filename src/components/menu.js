import React from 'react'
import './style/main.css'
import { addBtnTouchListener } from '../util'

class Menu extends React.Component {
  constructor (props) {
    super(props)
    this.buttons = []
  }

  componentDidMount () {
    addBtnTouchListener(this.buttons)
  }

  render() {
    let data = this.props
    return (
      <div>
        <p>Menu</p>
        {!data.isFirstTime ? <span className="resume btn" ref={ref => {this.buttons.push(ref)}} onClick={(e) => data.resume()}>
          Resume
        </span> : null}
        <span className="start btn" ref={ref => {this.buttons.push(ref)}} onClick={(e) => data.startGame()}>
          New Game
        </span>
        <span className="login btn" ref={ref => {this.buttons.push(ref)}} onClick={(e) => data.onClickMenuBtn('login')}>
          Login
        </span>
        <span className={"my-score btn " + data.isLogin} ref={ref => {this.buttons.push(ref)}} onClick={(e) => data.onClickMenuBtn('myScore')}>
          My Score
        </span>
        <span className="ranking btn" ref={ref => {this.buttons.push(ref)}} onClick={(e) => data.onClickMenuBtn('rankBoard')}>
          Rankging
        </span>
      </div>
    )
  }
}


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
