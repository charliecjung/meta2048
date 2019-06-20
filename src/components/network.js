import React from 'react'
import PropTypes from 'prop-types'
import Loader from 'react-loader-spinner'

import * as util from '../util'
import constants from '../constants'
import ipfs from '../ipfs'

class Network extends React.Component {
  static propTypes = {
    to: PropTypes.string,
    value: PropTypes.string,
    data: PropTypes.string,
    topic: PropTypes.string,
    callback: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = {
      OSName: util.checkOS(),
      session: util.makeSessionID(),
      qrReady: false,
      appReady:false
    }

    this.checkApplicationInstall = this.checkApplicationInstall.bind(this)
  }

  componentDidMount () {
    let OSName = this.state.OSName
    if(OSName === "android" || OSName === "ios") {
      let visitedAt = (new Date()).getTime()
      document.checkframe.location = constants.testUri
      setTimeout(() => this.checkApplicationInstall(visitedAt), 1500)
    } else {
      this.makeQR()
    }
  }

  checkApplicationInstall (visitedAt) {
    let OSName = this.state.OSName

    if(OSName === "android") {
      try {
        // check application 
        let check = document.checkframe.document.body.innerHTML
        if(!check) {
          this.setState({ OSName: "notMobile"}, this.makeQR())
          return
        }
      } catch (err) {
        if(window.confirm("Keepin is not installed")) {
          window.location.href = constants.googleAppStore
        }
      }
    }

    if(OSName === "ios" && (new Date()).getTime() - visitedAt < 2000) {
      if(window.confirm("Keepin is not installed")) {
        window.location.href = constants.apppleAppStroe
      }
    }

    this.setState({ appReady: true })
  }

  makeQR () {
    let baseRequestUri = constants.testUri

    // here is logic to make uri

    ipfs.add([Buffer.from(baseRequestUri)], (err, ipfsHash) => {
      if(!err) console.log('SendTransaction IPFS hash:', ipfsHash[0].hash)
      
      let uri = err ? baseRequestUri : ipfsHash[0].hash
      util.showQR(this.qrbox, uri).then((result) => this.setState({ qrReady: result }))
    })
  }

  loading () {
    let loading = (this.state.qrReady || this.state.appReady) ?
    null : <Loader
      type={constants.loading.type}
      color={constants.loading.color}
      height={constants.loading.height}
      width={constants.loading.width}
    />
    return loading
  }

  render () {
    const OSName = this.state.OSName

    return (
      <div className="network">
        {this.loading()}
        {(OSName === 'android' || OSName === 'ios') ? 
          <iframe
            id="checkframe"
            name="checkframe"
            title="checkframe"
            width="0" 
            height="0"
            style={{display:'none'}}
          /> :
          <div className="qrbox" ref={(ref) => {this.qrbox = ref}}/>}
      </div>
    )
  }
}

export default Network