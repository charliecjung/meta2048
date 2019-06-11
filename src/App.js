import React from 'react'

// Styles & JS
import './App.css'
import * as script from './components/js'

// Componets
import { Game } from './components/game'

class App extends React.Component {

  constructor (props) {
    super(props)

    this.state = {

    }

    this.data = {
      request: '10',  // Topic number - 10 : name
      user: { name: '', score: '', highscore: '' }
    }
  }

  componentDidMount () {
    this.gameScript()
  }

  gameScript () {
    script.classlist_polyfill()
    script.animframe_polyfill()
    script.application()
  }

  render () {
    return (
      <div>
        <Game/>
      </div>
    )
  }
}

export default App
