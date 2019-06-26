import React from 'react'
import { addBtnTouchListener } from '../../util'
import Storage from '../../storage.js'

class RankBoard extends React.Component {
  constructor (props) {
    super(props)
    this.storage = new Storage()

    this.buttons = []
  }
  


  componentDidMount () {
    addBtnTouchListener(this.buttons)
  }

  getRankTable () {
    if (2==2) {
      alert("jsx worked")
    }
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
    if (this.props.auth) {
      return (
      <div>
        <h2>Your Ranking</h2>
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
        <h2> Your Meta Id: {this.storage.metaID} </h2>
      </div>
      )

    } 
    return (
      <div>
        <h2>Rankings</h2>
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
export default RankBoard


