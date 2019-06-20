import React from 'react'
import './style/main.css'
import { addBtnTouchListener } from '../util'

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
        {!data.isFirstTime ? <span className="resume btn" ref={ref => {this.buttons.push(ref)}} onClick={(e) => data.resume()}>
          Resume
        </span> : null}
        <span className="start btn" ref={ref => {this.buttons.push(ref)}} onClick={(e) => data.startGame()}>
          New Game
        </span>
        <span className="login btn" ref={ref => {this.buttons.push(ref)}} onClick={(e) => data.onClickMenuBtn('login')}>
          Login
        </span>
        <span className={"my-score btn " + data.isLogin} ref={ref => {this.buttons.push(ref)}} onClick={(e) => data.onClickMenuBtn('myScore')}>
          My Score
        </span>
        <span className="ranking btn" ref={ref => {this.buttons.push(ref)}} onClick={(e) => data.onClickMenuBtn('rankBoard')}>
          Rankging
        </span>
      </div>
    )
  }
}

const MyBoard = () =>
<div >
</div>

const RankBoard = () =>
<div>
</div>

export { Menu, MyBoard, RankBoard }