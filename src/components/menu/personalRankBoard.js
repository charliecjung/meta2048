import React from 'react'
import { addBtnTouchListener } from '../../util'

class PersonalRankBoard extends React.Component {
  constructor (props) {
    super(props)

    this.buttons = []
  }
  


  componentDidMount () {
    addBtnTouchListener(this.buttons)
  }

  getRankTable () {
    var result = ""
    for (let i = 0; i < this.storage.dumyUsers.length; i++) {
      result += this.storage.dumyUsers[i] + "<br>"
    }
    /*
    return this.props.dumyUsers.map((user, index) => (
      <tr key={index}>
        <td>{user.rank}</td>
        <td>{user.name}</td>
        <td>{user.score}</td>
      </tr>
    ))
  }
  */
 //return result


  render () {
    alert("PersonalObjKeys: " + Object.keys(this.props))
    alert("auth prop: " + this.state.auth)
    let data = this.props
    return (
      <div>
        <h2>Hello</h2>
        <table className='padding-table-columns' align='center'>
          <thead key='head'>
            <tr>
              <th align='left'>Rank</th>
              <th align='left'>Player</th>
              <th align='left'>Score</th>
            </tr>
          </thead>
          <tbody>{this.getRankTable()}</tbody>
        </table>
        <span className='register-rankboard btn' ref={ref => { this.buttons.push(ref) }} onClick={() => data.registerScore()}>Register Score</span>
      </div>
    )
  }
}
export default PersonalRankBoard



