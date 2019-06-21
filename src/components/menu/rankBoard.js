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
  //Cited from Stack Overflow
  //https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file

  readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    var players;
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status === 0)
            {
              players = JSON.parse(this.responseText);

              for (let i = 0; i < players.length; i++) {
                  var player = players[i];
              }
            }
        }
    }
    rawFile.send(null);
    return players
}

  createHTMLContent (players)   {
      /* Debugging print statements
      for (var key in players) {
        var first = players[key].name;
        var value = players[key].score;
      }
      */
      let result = [];
      for (let i = 0; i < players.length; i++) {
        result.push(
          <tr>
            <td>{players[i].rank}</td>
            <td>{players[i].name}</td>
            <td>{players[i].score}</td>

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
              {this.createHTMLContent(this.readTextFile("./data.json"))}

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
2. Receive 10 data in JSON format as a property. Use props to convert json to object in constructor function.
4. Make a separate function with 2 and 3 in above class.
*/
