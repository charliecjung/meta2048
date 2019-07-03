import React from 'react'
import { addBtnTouchListener } from '../../util'
import Storage from '../../storage.js'

class RankBoard extends React.Component {
  constructor (props) {
    console.log("new rankboard")
    super(props)
    console.log("Prev Props: " + Object.keys(props))
 
    this.storage = new Storage()
    this.buttons = []
  }
  


  componentDidMount () {
    addBtnTouchListener(this.buttons)
  }

  highlightPlayer() {

  for (let i = 0; i < this.props.users.length; i++) {
    //alert("this.username: " + this.props.users[i].name)
    if (this.props.users[i].name.toLowerCase() === this.storage.username.toLowerCase()) {
      //We are at username
      
      console.log("BEFORE this.storage.myName: " + this.storage.myName)
      console.log("BEFORE this.storage.myRank: " + this.storage.myRank)
      console.log("BEFORE this.storage.myScore: " + this.storage.myScore)
      if (this.storage.myName === "DEFAULT_NAME" && this.storage.myRank === "DEFAULT_RANK" && this.storage.myScore === "DEFAULT_SCORE") {
      console.log("Changing from default to real values")
      this.props.users[i].name = this.props.users[i].name.toUpperCase()
      this.storage.myName = this.props.users[i].name
      this.storage.myRank = this.props.users[i].rank
      this.storage.myScore = this.props.users[i].score
      
    } else if (this.storage.myName !== "DEFAULT_NAME" && this.storage.myRank !== "DEFAULT_RANK" && this.storage.myScore !== "DEFAULT_SCORE") {
      console.log("Dont have to do anything: Real values made")
      } 
      console.log("AFTER this.storage.myName: " + this.storage.myName)
      console.log("AFTER this.storage.myRank: " + this.storage.myRank)
      console.log("AFTER this.storage.myScore: " + this.storage.myScore)
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
    console.log("In rankBoard's render()")
    console.log("this.props.auth: " + this.props.auth)
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
        <h2> Your Name: {this.storage.myName}</h2>
        <h2> Your Rank: {this.storage.myRank} </h2>
        <h2> Your Score: {this.storage.myScore} </h2> 
        <h2> Your MetaID: {this.props.metaID} </h2>
        <h2> Storage metaid: {this.storage.metaID} </h2>
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


