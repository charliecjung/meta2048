import React from 'react'
import { addBtnTouchListener } from '../../util'

class RankBoard extends React.Component {
  constructor(props) {
    super(props)
    this.buttons = []
  }

  componentDidMount() {
    addBtnTouchListener(this.buttons)
  }

  render() {
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
          <span className={"register-rankboard btn"}>Register Score (rankboard)</span>
        </body>
      </div>
    )
  }
}

export default RankBoard

/* Comment
1. Why did you mix let and var?
2. Receive 10 data in JSON format as a property. Use props to convert json to object in constructor function.
3. Do not use two arrays, please use one object with user name and score mapped.
4. Make a separate function with 2 and 3 in above class.
5. Do not make a Register button's function now.
6. Do not insert CSS data in main.css. please use APP.css
*/