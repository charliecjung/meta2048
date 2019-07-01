import React from 'react'
import { addBtnTouchListener } from '../../util'
import Storage from '../../storage.js'
import { ENGINE_METHOD_ALL } from 'constants';

class RankBoard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      myName: "",
      myRank: "",
      myScore: "",
      weAreIn: false
    };
    this.storage = new Storage()
    this.buttons = []
  }
  
  flipVariable() {
    alert("in flipVariable()")
    alert("before weAreIn: " + this.state.weAreIn)
    this.setState ({ weAreIn: false})
    alert("after weAreIn: " + this.state.weAreIn)
    //return null
  }

  componentDidMount (props) {
    

    addBtnTouchListener(this.buttons)

  }
  componentWillUnmount (props) {
    this.setState(this.flipVariable())
    alert("weAreIn: " + this.state.weAreIn)
   
  }

  highlightPlayer (state, props) {
  
    if (this.state.myName !== "" && this.state.myRank !== "" && this.state.myScore !== "") {
      return null
    }
  for (let i = 0; i < this.props.users.length; i++) {
  
    if (this.props.users[i].name === this.storage.username) {
        return ( {myName: this.props.users[i].name,
                  myRank: this.props.users[i].rank,
                  myScore: this.props.users[i].score } )
    }
      

    
    }
    return null
  }


 
  getRankTable () {
    if (this.props.auth) {
    this.setState(this.highlightPlayer);
    } 
    return this.props.users.map((user, index) => (
      
      <tr key={index}>
        <td>{user.rank}</td>
        <td>{user.name}</td>
        <td>{user.score}</td>
      </tr>
    ))
  }
 
  displayRankings (props) {
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
        {this.state.myName === "" ? (
        //<h1>NO-NAME-AVAILABLE</h1> 
        <span> </span>
        ) : (
          <p> Your Name: {this.state.myName} </p>
          
          
        )}
        {this.state.myRank === "" ? (
        //<h1>NO-RANK-AVAILABLE</h1> 
        <span> </span> 
        ) : (
          <p> Your Rank: {this.state.myRank} </p>
          
        )}
        {this.state.myScore === "" ? (
        //<h1>NO-SCORE-AVAILABLE</h1> 
        <span> </span>
        ) : (
          <p> Your Score: {this.state.myScore} </p>
          
        )}
        
        </div>
        
      )
    
    } else {
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
        {this.state.myName === "" ? (
        //<h1>NO-NAME-AVAILABLE</h1> 
        <span> </span>
        ) : (
          //<h2> Your Name: {this.state.myName} </h2>
          <span> </span>
          
        )}
        {this.state.myRank === "" ? (
        //<h1>NO-RANK-AVAILABLE</h1> 
        <span> </span>
        ) : (
          //<h2> Your Rank: {this.state.myRank} </h2>
          <span> </span>
          
        )}
        {this.state.myScore === "" ? (
        //<h1>NO-SCORE-AVAILABLE</h1> 
        <span> </span>
        ) : (
          //<h2> Your Score: {this.state.myScore} </h2>
          <span> </span>
          
        )}
      </div>
    )
        }
  }

  render () {
  
      
      return (
        <div>
          {this.displayRankings()}
        </div>
      )
    }
   
  

    
  }

export default RankBoard


