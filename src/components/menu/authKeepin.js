import React from 'react'
import PropTypes from 'prop-types'
import Loader from 'react-loader-spinner'
// import ipfsClient from 'ipfs-http-client'
import https from 'https'

import * as util from '../../util'
import constants from '../../constants'
import Storage from '../../storage.js'


class AuthKeppin extends React.Component {
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
      appReady: false,
      isAuthenticated: false
    }
    /*
    this.ipfs = ipfsClient({
      host: constants.ipfs.host,
      port: constants.ipfs.port,
      protocol: constants.ipfs.protocol
    })
    */
    this.callbackUrl = util.makeCallbackUrl(this.state.session)
    this.uri = util.makeUri(this.state.session, true, this.callbackUrl)
    console.log(this.uri)

    this.storage = new Storage()
 
    
  }
  

       //this.props.authCallback(this.props.metaID)
       //return
     
  componentDidMount () {
    //let OSName = this.state.OSName
 
      this.props.authCallback(this.storage.metaID, this.state.isAuthenticated)
      return <AuthKeppin />


    /*
    if (OSName === 'android' || OSName === 'ios') {
      let visitedAt = (new Date()).getTime()
      document.checkframe.location = this.uri
      setTimeout(() => this.checkApplicationInstall(visitedAt), 1500)
    } else {
      this.makeQR()
    }
    */
  }

  componentWillUnmount () {
    if (this.interval) clearInterval(this.interval)
  }

  checkApplicationInstall (visitedAt) {
    let OSName = this.state.OSName

    if (OSName === 'android') {
      try {
        // check application
        let check = document.checkframe.document.body.innerHTML

        if (!check) {
          this.setState({ OSName: 'notMobile' }, this.makeQR)
          return
        }
      } catch (err) {
        if (window.confirm('Keepin is not installed')) {
          window.location.href = constants.googleAppStore
        }
      }
    }

    if (OSName === 'ios' && (new Date()).getTime() - visitedAt < 2000) {
      if (window.confirm('Keepin is not installed')) {
        window.location.href = constants.apppleAppStroe
      }
    }

    this.setState({ appReady: true }, () => this.makeInterval())
  }

  makeQR () {
    util.showQR(this.qrbox, this.uri).then((result) => this.setState({ qrReady: result }, () => this.makeInterval()))
    /*
    this.ipfs.add([Buffer.from(this.uri)], (err, ipfsHash) => {
      if(!err) console.log('SendTransaction IPFS hash:', ipfsHash[0].hash)

      let uri = err ? this.uri : ipfsHash[0].hash
      util.showQR(this.qrbox, uri).then((result) => this.setState({ qrReady: result }, () => this.makeInterval()))
    })
    */
  }

  makeInterval () {
    this.interval = setInterval(() => this.checkResponse(), 1000)
  }

  checkResponse () {
    https.request({
      host: constants.cacheServer.host,
      path: '/' + constants.cacheServer.stage + '?key=' + this.state.session
    }, (res) => {
      let data = ''
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => {
        if (data !== '') {
          clearInterval(this.interval)
          let result = JSON.parse(data)
          console.log('meta id is: ', result.meta_id)
          if (this.props.authCallback) this.props.authCallback(result.meta_id)
        }
      })
    }).on('error', (err) => {
      console.log('error: ', err)
    }).end()
  }

  render () {
    const OSName = this.state.OSName
    const qrBoxDisplay = this.state.qrReady ? 'block' : 'none'
    return (
      <div className='network'>
        {(this.state.qrReady || this.state.appReady)
          ? null : <Loader
            type={constants.loading.type}
            color={constants.loading.color}
            height={constants.loading.height}
            width={constants.loading.width} />}
        {(OSName === 'android' || OSName === 'ios')
          ? <iframe
            id='checkframe'
            name='checkframe'
            title='checkframe'
            width='0'
            height='0'
            style={{ display: 'none' }}
          />
          : <div
            className='qrbox'
            ref={(ref) => { this.qrbox = ref }}
            style={{ display: qrBoxDisplay }} />}
      </div>
    )
  }
}

export default AuthKeppin
