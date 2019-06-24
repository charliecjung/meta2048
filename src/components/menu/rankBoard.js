import React from 'react'
import { addBtnTouchListener } from '../../util'

class RankBoard extends React.Component {
  constructor(props) {
    super(props)
    this.buttons = []
  }
  //Default Props for RankBoard
  //Not entirely sure why I need a ;(semicolon) instead of a period in order to compile.
  static defaultProps =
    {
      players: [{
        name: "Alpha",
        rank: 1,
        score: 90
      },
      {
        name: "Bravo",
        rank: 2,
        score: 100

      },
      {
        name: "Charlie",
        rank: 3,
        score: 200
      },
      {
        name: "Daniel",
        rank: 4,
        score: 300
      },
      {
        name: "Ethanol",
        rank: 5,
        score: 400
      },
      {
        name: "George",
        rank: 6,
        score: 700
      },
      {
        name: "Haitham",
        rank: 7,
        score: 800
      },

      {
        name: "Ish",
        rank: 8,
        score: 1000
      }]
  }

  componentDidMount() {
    addBtnTouchListener(this.buttons)
  }

  createHTMLContent () {
      let result = [];
      for (let i = 0; i < this.props.players.length; i++) {
        result.push(
          <tr>
            <td> {this.props.players[i].rank}</td>
            <td> {this.props.players[i].name}</td>
            <td> {this.props.players[i].score}</td>
          </tr>
        )
      }
      return result;


  }
  render() {
    return (
      <div>
        <body id='test'>

          <h2>Ranking</h2>
          <table className="padding-table-columns" align="center">
            <table>
              <tr>

                <th align="left">Rank</th>
                <th align="left">Player</th>
                <th align="left">Score</th>

              </tr>
              {this.createHTMLContent()}

            </table>

          </table>
          <span className="register-rankboard btn" ref={ref => {this.buttons.push(ref)}} onClick={() => this.registerScore()}>Register Score</span>
        </body>
      </div>
    )
  }
  registerScore() {
    
  }
}



export default RankBoard

/* Comment
*/
