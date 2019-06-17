import React from 'react'
import { Map } from 'immutable'

// Styles & JS
import './App.css'
import './components/style/main.css'
import gameScript from './components/js'
import { Heading, Above, Message, Grid, Explanation } from './components/game'

class App extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      gameData: Map({
        gameSize: 4,
        startTiles: 2,
        score: 0,
        bestScore: 0,
        login: false,
        over: false,
        won: false,
        terminated: false,
        keepPlaying: false
      }),
      showMenu: true,
      firstUse: true
    }

    this.data = {
      user: { name: '', score: '', highscore: '' }
    }

    this.setupCallback = this.setupCallback.bind(this)
    this.getGameData = this.getGameData.bind(this)
    this.updateGameData = this.updateGameData.bind(this)

    this.showMenu = this.showMenu.bind(this)
  }

  componentDidMount () {
    gameScript.classlist_polyfill()
    gameScript.animframe_polyfill()
  }

  async setupCallback (actuate) {
    actuate()
  }

  getGameData () {
    return { ...this.state.gameData.toJS() }
  }

  updateGameData (_state) {
    const { gameData } = this.state

    this.setState({
      gameData: gameData.update('score', score => (typeof _state.score === 'number')  ? _state.score : score)
        .update('bestScore', bestScore => _state.bestScore ? _state.bestScore : bestScore)
        .update('login', login => (typeof _state.login === 'boolean') ? _state.login : login)
        .update('over', over => (typeof _state.over === 'boolean') ? _state.over : over)
        .update('won', won => (typeof _state.won === 'boolean') ? _state.won : won)
        .update('terminated', terminated => (typeof _state.terminated === 'boolean') ? _state.terminated : terminated)
        .update('keepPlaying', keepPlaying => (typeof _state.keepPlaying === 'boolean') ? _state.keepPlaying : keepPlaying)
    })
  }

  showMenu () {
    const { gameData } = this.state
    
    this.setState({
      gameData: gameData.set('terminated', true),
      showMenu: true
    })
  }

  login () {
    // add Login Logic
    // this.updateGameData({ login: true })
  }

  resume () {
    const { gameData } = this.state
    
    this.setState({
      gameData: gameData.set('terminated', false),
      showMenu: false
    })
  }

  startGame () {
    gameScript.application(
      this.getGameData, 
      this.updateGameData,
      this.setupCallback
    )
    this.setState({ showMenu: false, firstUse: false })
  }

  getMenuScreen () {
    if(!this.state.showMenu) return

    let isLogin = this.state.gameData.get('login')
    let isFirstTime = this.state.firstUse
    return (
      <div className="menu">
        <p>Menu</p>
        {isFirstTime ? null : <span className="resume btn" onClick={() => this.resume()}>Resume</span>}
        <span className="start btn" onClick={() => this.startGame()}>New Game</span>
        <span className="login btn" onClick={() => this.login()}>Login</span>
        <span className={"my-score btn " + isLogin}>My Score</span>
        <span className={"ranking btn " + isLogin}>Rankging</span>
      </div>
    )
  }

  render () {
    return (
      <div className="container">
        <Heading/>
        <Above showMenu={this.showMenu}/>
        <div className="game-container">
          {this.getMenuScreen()}
          <Message/>
          <Grid/>
          <div className="tile-container"/>
        </div>
        <Explanation/>
      <hr />
      </div>
    )
  }
}

export default App
