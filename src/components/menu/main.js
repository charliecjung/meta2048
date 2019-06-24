import React from 'react'
import { addBtnTouchListener } from '../../util'

class Menu extends React.Component {
  constructor (props) {
    super(props)
    this.buttons = []
  }

  componentDidMount () {
    addBtnTouchListener(this.buttons)
  }

  render() {
    let data = this.props
    return (
      <div>
        <p>Menu</p>
        {!data.isFirstTime ? <span className="btn" ref={ref => {this.buttons.push(ref)}} onClick={() => data.resume()}>
          Resume
        </span> : null}
        <span className="btn" ref={ref => {this.buttons.push(ref)}} onClick={() => data.startGame()}>
          New Game
        </span>
        <span className="btn" ref={ref => {this.buttons.push(ref)}} onClick={() => data.showRank()}>
          Ranking
        </span>
        {!data.isFirstTime ? <span className="btn" ref={ref => {this.buttons.push(ref)}} onClick={() => data.saveGame()}>
          Save Game
        </span> : null}
        <span className="btn" ref={ref => {this.buttons.push(ref)}} onClick={() => data.loadGame()}>
          Load Game
        </span>
      </div>
    )
  }
}
export default Menu