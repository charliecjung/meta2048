import React from 'react'
import { addBtnTouchListener } from '../../util'

import Storage from '../../storage.js'

class ShareInfo extends React.Component {
  constructor (props) {
    super(props)
    this.storage = new Storage()
    this.buttons = []
  }
  componentDidMount () {
    addBtnTouchListener(this.buttons)
  }
  
  

  render () {
    let data = this.props
    return (
    <div>
     hi   
    </div>
    )
    
  
}
}

export default ShareInfo


