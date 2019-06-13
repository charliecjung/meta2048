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
      loading: true
    }

    this.data = {
      user: { name: '', score: '', highscore: '' }
    }

    this.setupCallback = this.setupCallback.bind(this)
    this.getGameData = this.getGameData.bind(this)
    this.updateGameData = this.updateGameData.bind(this)
  }

  componentDidMount () {
    this.initGame()
  }

  initGame () {
    gameScript.classlist_polyfill()
    gameScript.animframe_polyfill()
    gameScript.application(
      this.getGameData, 
      this.updateGameData,
      this.setupCallback
    )
  }

  async setupCallback () {
    
  }

  getGameData () {
    return { ...this.state.gameData.toJS() }
  }

  updateGameData (_state) {
    const { gameData } = this.state

    this.setState({
      gameData: gameData.update('score', score => _state.score  ? _state.score : score)
        .update('bestScore', bestScore => _state.bestScore ? _state.bestScore : bestScore)
        .update('login', login => (typeof _state.login === 'boolean') ? _state.login : login)
        .update('over', over => (typeof _state.over === 'boolean') ? _state.over : over)
        .update('won', won => (typeof _state.won === 'boolean') ? _state.won : won)
        .update('terminated', terminated => (typeof _state.terminated === 'boolean') ? _state.terminated : terminated)
        .update('keepPlaying', keepPlaying => (typeof _state.keepPlaying === 'boolean') ? _state.keepPlaying : keepPlaying)
    })
    
    console.log('complete update Game Data', this.getGameData())
  }

  render () {
    return (
      <div className="container">
        <Heading/>
        <Above/>
        <div className="game-container">
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
