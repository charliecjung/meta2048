import React from 'react'
import { addBtnTouchListener } from '../../util'

class RankBoard extends React.Component {
  constructor (props) {
    super(props)
    this.buttons = []
  }

  componentDidMount () {
    addBtnTouchListener(this.buttons)
  }

  getRankTable () {
    return this.props.users.map((user, index) => (
      <tr key={index}>
        <td>{user.rank}</td>
        <td>{user.name}</td>
        <td>{user.score}</td>
      </tr>
    ))
  }
  
  

  render () {
    let data = this.props
    return (
      <div>
        <h2>Ranking</h2>
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
        <span className='registerRankboard btn' ref={ref => { this.buttons.push(ref) }} onClick={() => data.registerScore()}>Register Score</span>
      </div>
    )
  }
}

export default RankBoard
