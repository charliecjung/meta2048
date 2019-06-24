import { qrcode } from 'qrcode.es'
import constants from './constants'

function addBtnTouchListener (buttons) {
  if(buttons) {
    let eventTouchend = window.navigator.msPointerEnabled ? 'MSPointerUp' : 'touchend'
    buttons.forEach((button) => {
      if(!button) return
      button.addEventListener(eventTouchend, function(event) {
        event.preventDefault()
        event.target.click()
      })
    })
  }
}

function checkOS () {
  let OSName = ""
  let uAgent = navigator.userAgent.toLocaleLowerCase()

  if (uAgent.indexOf("android") !== -1) OSName = "android"
  else if (uAgent.indexOf("iphone") !== -1 || uAgent.indexOf("ipad") !== -1 || uAgent.indexOf("ipod") !== -1) OSName = "ios"
  else OSName = "notMobile"

  return OSName
}

function makeSessionID() {
  let text = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < 8; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)) }
  return text
}

function makeCallbackUrl(key) {
  return 'https%3A%2F%2F' + constants.cacheServer.host + '/' + constants.cacheServer.stage + '?key=' + key
}

function makeUri(nonce, auto_reg, callback) {
  let uri = constants.scheme

  uri += '?service_id=' + constants.service_id
  if(nonce) uri += '&nonce=' + nonce
  else uri += '&nonce=' + makeSessionID()
  
  if(typeof auto_reg === 'boolean') uri += '&auto_reg=' + auto_reg
  if(callback) uri += '&callback=' + callback

  return uri
}

async function showQR(qrbox, uri) {
  if(!qrbox) return false
  const qrCode = new qrcode(qrbox)
  await qrCode.generate(uri, constants.qrOptions)
  return true
}

export {
  addBtnTouchListener,
  checkOS,
  makeSessionID,
  makeCallbackUrl,
  makeUri,
  showQR
}