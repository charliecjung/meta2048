import React from 'react'
import { Map } from 'immutable'

// Styles & JS
import './App.css'
import './components/style/main.css'
import gameScript from './components/js'
import { Heading, Above, Message, Grid, Explanation } from './components/game'
import { Menu, MyBoard, RankBoard } from './components/menu'
import Network from './components/network'

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
      firstUse: true,
      showMenu: true,
      selectTopic: 'menu'
    }

    this.data = {
      user: { name: '', score: '', highscore: '' }
    }

    // related with game data
    this.getGameData = this.getGameData.bind(this)
    this.updateGameData = this.updateGameData.bind(this)

    // related with Menu
    this.showMenu = this.showMenu.bind(this)
    this.resume = this.resume.bind(this)
    this.startGame = this.startGame.bind(this)
    this.loginCallback = this.loginCallback.bind(this)
    this.onClickMenuBtn = this.onClickMenuBtn.bind(this)
  }

  componentDidMount () {
    gameScript.classlist_polyfill()
    gameScript.animframe_polyfill()
  }

  // related with game data

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
    }, this.isTerminated)
  }

  isTerminated () {
    const { gameData } = this.state
    const terminated = this.state.showMenu || this.state.gameData.get('over') || (this.state.gameData.get('won') && !this.state.gameData.get('keepPlaying'))

    this.setState({ gameData: gameData.set('terminated', terminated) })
  }

  // related with menu
  showMenu () {
    const { gameData } = this.state
    
    this.setState({
      gameData: gameData.set('terminated', true),
      showMenu: true,
      selectTopic: 'menu'
    })
  }

  getMenuScreen () {
    let topic = this.state.selectTopic
    let isLogin = this.state.gameData.get('login')
    let isFirstTime = this.state.firstUse

    switch(topic) {
      case 'login':
        return <Network
          topic="login"
          callback={this.loginCallback}
        />
      case 'myScore':
        return <MyBoard />
      case 'rankBoard':
        return <RankBoard />
      default:
        return <Menu
        isFirstTime={isFirstTime}
        isLogin = {isLogin}
        resume={this.resume}
        startGame={this.startGame}
        onClickMenuBtn={this.onClickMenuBtn} />
    }
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
      this.state.firstUse
    )
    this.setState({ showMenu: false, firstUse: false })
  }

  onClickMenuBtn (topic) {
    if(this.state.gameData.get('login') || topic === "login") this.setState({ selectTopic: topic })
  }

  loginCallback (result) {
    const { gameData } = this.state

    this.setState({
      gameData: gameData.set('login', result),
      selectTopic: 'menu'
    })
  }

  render () {
    return (
      <div className="container">
        <Heading/>
        <Above showMenu={this.showMenu}/>
        <div className="game-container">
          {this.state.showMenu ? <div className="menu"> {this.getMenuScreen()} </div> : null}
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
