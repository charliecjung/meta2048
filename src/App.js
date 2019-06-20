import React from 'react'
import { Map } from 'immutable'

import './App.css'
import './components/style/main.css'
import gameScript from './components/js'
import constants from './constants'
import { Heading, Above, Message, Grid, Explanation } from './components/game'
import { Menu, RankBoard } from './components/menu'

class App extends React.Component {


  constructor (props) {
    super(props)

    this.state = {
      gameData: Map({
        gameSize: constants.gameData.gameSize,
        startTiles: constants.gameData.startTiles,
        score: 0,
        bestScore: 0,
        over: false,
        won: false,
        terminated: false,
        keepPlaying: false
      }),
      firstUse: true,
      showMenu: true,
      selectTopic: 'menu'
    }
    
    // related with game data
    this.getGameData = this.getGameData.bind(this)
    this.updateGameData = this.updateGameData.bind(this)

    // related with Menu
    this.showMenu = this.showMenu.bind(this)
    this.resume = this.resume.bind(this)
    this.startGame = this.startGame.bind(this)
    this.showRank = this.showRank.bind(this)
    this.loadGame = this.loadGame.bind(this)
    this.backToMain = this.backToMain.bind(this)
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
        .update('over', over => (typeof _state.over === 'boolean') ? _state.over : over)
        .update('won', won => (typeof _state.won === 'boolean') ? _state.won : won)
        .update('keepPlaying', keepPlaying => (typeof _state.keepPlaying === 'boolean') ? _state.keepPlaying : keepPlaying)
    }, this.isTerminated)
  }

  isTerminated () {
    const { gameData } = this.state
    const terminated = this.state.showMenu || this.state.gameData.get('over') || (this.state.gameData.get('won') && !this.state.gameData.get('keepPlaying'))

    if( gameData.get('terminated') !== terminated) this.setState({ gameData: gameData.set('terminated', terminated) })
  }

  // related with menu
  showMenu () {
    const { gameData } = this.state

    this.setState({
      gameData: gameData.set('terminated', true),
      showMenu: true,
      selectTopic: 'main'
    })
  }

  getMenuScreen () {
    let topic = this.state.selectTopic
    let isFirstTime = this.state.firstUse

    switch(topic) {
      case 'rankBoard':
        return <RankBoard
        isFirstTime={isFirstTime}
        back={this.back}/>

      default:
        return <Menu
        isFirstTime={isFirstTime}
        resume={this.resume}
        startGame={this.startGame}
        showRank={this.showRank}
        loadGame={this.loadGame} />
    }
  }

  backToMain () {
    this.setState({ selectTopic: 'main'})
  }

  resume () {
    const { gameData } = this.state
    let isOver = gameData.get('over')
    this.setState({
      gameData: gameData.set('terminated', isOver),
      showMenu: false,
    })
  }

  startGame () {
    gameScript.application(this.getGameData, this.updateGameData)
    this.setState({ showMenu: false, firstUse: false, login: false})
  }

  showRank () {
    this.setState({ selectTopic: 'rankBoard' })
  }

  loadGame () {
    // Load game logic
  }

  render () {
    return (
      <div className="container">
        <Heading/>
        <Above showMenu={this.showMenu}/>
        <div className="game-container">
          {this.state.showMenu ? <div className="menu">{this.getMenuScreen()}</div> : null}
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
