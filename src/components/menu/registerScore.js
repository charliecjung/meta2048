import React from 'react'
import { addBtnTouchListener } from '../../util'

class RegisterScore extends React.Component {
  constructor (props) {
    super(props)
    this.buttons = []
  }

  componentDidMount () {
    addBtnTouchListener(this.buttons)
  }


  render () {
    let data = this.props
    return (
      <div>
        <h2>myRank</h2>
        <table className='padding-table-columns' align='center'>
          <thead key='head'>
            <tr>
              <th align='left'>Rank</th>
              <th align='left'>Player</th>
              <th align='left'>Score</th>
            </tr>
          </thead>
        </table>
        <span className='registerScore btn' ref={ref => { this.buttons.push(ref) }} onClick={() => data.displayRanking()}>Register Score</span>
      </div>
    )
  }
}
export default RegisterScore
