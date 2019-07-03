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
    }
    this.storage = new Storage()
    this.callbackUrl = util.makeCallbackUrl(this.state.session)
    this.uri = util.makeUri(this.state.session, true, this.callbackUrl)
  }
       componentDidMount () {
          var randomID = "test"
          if (this.storage.metaID === "DEFAULT_METAID") {
            this.storage.metaID = randomID
          } else {
            this.storage.metaID = "DEFAULT_METAID_ERROR"
            alert("Error has occurred. Cannot create unique METAID")
          }
          this.props.authCallback(this.storage.metaID)
          return <AuthKeppin />
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
          if (this.props.authCallback) this.props.authCallback(result.meta_id)
        }
      })
    }).on('error', (err) => {
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
