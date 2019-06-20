import { modes, ecLevel } from 'qrcode.es'

const constants = {
  testUri: 'metadium-keepin://authentication?service_id=a0ad73f907ab3ce870db6671afb4a417a3315f03e5eca6a2b44cb1fac08d5d60&nonce=53418903428&auto_reg=true',
  googleAppStore: "https://play.google.com/store/apps/details?id=com.coinplug.metadium&hl=ko",
  apppleAppStroe: "https://play.google.com/store/apps/details?id=com.coinplug.metadium&hl=ko",
  qrOptions: {
    size: 300,
    ecLevel: ecLevel.LOW,
    minVersion: 8,
    background: '#ffffff',
    mode: modes.DRAW_WITH_IMAGE_BOX,
    radius: 0.0,
    image: 'https://raw.githubusercontent.com/METADIUM/metadium-token-contract/master/misc/Metadium_Logo_Vertical_PNG.png',
    mSize: 0.15
  },
  loading: {
    type: "Grid",
    color: "#8f7a66",
    height: "45",
    width: "45"
  },
  ipfs: {
    host: '15.164.64.229',
    port: 5001,
    protocol: 'http'
  },
  gameData: {
    gameSize: 4,
    startTiles: 2
  }
}

export default constants