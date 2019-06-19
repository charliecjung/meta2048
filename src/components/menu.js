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

const MyBoard = () => {
  return (
  <div>
      <body id='test'>
      <h2>Scoreboard</h2>



  <table className="padding-table-columns" align="center">

    {/* PUT CODE IN BETWEEN */}
    <table>
    <tr>
      <th align="left">Player</th>
      <th align="left">Score</th>

    </tr>
  <tr>
    <td>Player 0</td>
    <td>0</td>

  </tr>
  <tr>
    <td>Player 1</td>
    <td>10</td>

  </tr>
  <tr>
    <td>Player 2</td>
    <td>20</td>

  </tr>
  <tr>
    <td>Player 3</td>
    <td>30</td>

  </tr>
  <tr>
    <td>Player 4</td>
    <td>40</td>

  </tr>
  <tr>
    <td>Player 5</td>
    <td>50</td>

  </tr>
</table>



    {/* EOM */}
  </table>
      </body>
  </div>
)

}

const RankBoard = () => {
return (
<div>
    <body id='test'>
    <h2>Rankings</h2>



<table className="padding-table-columns" align="center">
  {/* PUT CODE IN BETWEEN */}
  <table>
  <tr>
    <th align="left">Player</th>
    <th align="left">Score</th>

  </tr>
  <tr>
    <td>Player 0</td>
    <td>0</td>

  </tr>
  <tr>
    <td>Player 1</td>
    <td>10</td>

  </tr>
  <tr>
    <td>Player 2</td>
    <td>20</td>

  </tr>
  <tr>
    <td>Player 3</td>
    <td>30</td>

  </tr>
  <tr>
    <td>Player 4</td>
    <td>40</td>

  </tr>
  <tr>
    <td>Player 5</td>
    <td>50</td>

  </tr>
</table>



  {/* EOM */}
</table>
    </body>
</div>



)
}






export { Menu, MyBoard, RankBoard }
