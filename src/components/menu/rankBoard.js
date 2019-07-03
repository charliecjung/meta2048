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
  highlightPlayer() {
  for (let i = 0; i < this.props.users.length; i++) {
    if (this.props.users[i].name.toLowerCase() === this.storage.username.toLowerCase()) {
      //We are at username
      if (this.storage.myName === "DEFAULT_NAME" && this.storage.myRank === "DEFAULT_RANK" && this.storage.myScore === "DEFAULT_SCORE") {
      this.props.users[i].name = this.props.users[i].name.toUpperCase()
      this.storage.myName = this.props.users[i].name
      this.storage.myRank = this.props.users[i].rank
      this.storage.myScore = this.props.users[i].score
    } else if (this.storage.myName !== "DEFAULT_NAME" && this.storage.myRank !== "DEFAULT_RANK" && this.storage.myScore !== "DEFAULT_SCORE") {
      } 
   }
  }
}
  resetList() {
    for (let i = 0; i < this.props.users.length; i++) {
      if (this.props.users[i].name === this.props.users[i].name.toUpperCase()) {
        this.props.users[i].name = this.props.users[i].name.charAt(0).toUpperCase() + this.props.users[i].name.slice(1).toLowerCase()
      }
    }
  }
  getRankTable () {
    if (this.props.auth) {
    this.highlightPlayer();
    } else {
      this.resetList();
    }
    var auth = this.props.auth
    return this.props.users.map((user, index) => (
      <div>
      {this.props.auth === true && user.name.toUpperCase() === this.storage.username.toUpperCase() ? (
        <tr key={index}>
        <td><mark>{user.rank}</mark></td>
        <td><mark>{user.name}</mark></td>
        <td><mark>{user.score}</mark></td>
      </tr>
      ) : (
        <tr key={index}>
        <td>{user.rank}</td>
        <td>{user.name}</td>
        <td>{user.score}</td>
      </tr>
      )}
      </div>
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
              <th align='center'>Rank</th>
              <th align='center'>Player</th>
              <th align='center'>Score</th>
            </tr>
          </thead>
          <tbody>{this.getRankTable()}</tbody>
        </table>
        <span className='register-rankboard btn' ref={ref => { this.buttons.push(ref) }} onClick={() => data.registerScore()}>Register Score</span>
        <h2> Your Name: {this.storage.myName}</h2>
        <h2> Your Rank: {this.storage.myRank} </h2>
        <h2> Your Score: {this.storage.myScore} </h2> 
        <h2> Your MetaID: {this.props.metaID} </h2>
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


