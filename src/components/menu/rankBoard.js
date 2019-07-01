import React from 'react'
import { addBtnTouchListener } from '../../util'
import Storage from '../../storage.js'

class RankBoard extends React.Component {
  constructor (props) {
    super(props)

    var myName = "";
    var myRank = "";
    var myScore = "";
    this.storage = new Storage()
  

    this.buttons = []
  }
  


  componentDidMount () {
    addBtnTouchListener(this.buttons)
  }

  highlightPlayer() {

  for (let i = 0; i < this.props.users.length; i++) {
    //alert("this.username: " + this.props.users[i].name)
    if (this.props.users[i].name.toUpperCase() === this.storage.username.toUpperCase()) {
      //We are at username
      //this.props.users[i].name = this.props.users[i].name.toUpperCase()
      this.myName = this.props.users[i].name
      this.myRank = this.props.users[i].rank
      this.myScore = this.props.users[i].score
    }
  }
}

 
  getRankTable () {
    if (this.props.auth) {
    this.highlightPlayer();
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
        <h2> Your Name: {this.myName}</h2>
        <h2> Your Rank: {this.myRank} </h2>
        <h2> Your Score: {this.myScore} </h2> 
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


