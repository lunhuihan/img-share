const demoData = require('./json/test.json')
var getJsapiSignature = require('./json/weixin.getJsapiSignature.json')

module.exports = {
  openApi: [
    {
      baseURL: 'http://test.com',
      paths: {
        '/test': {
          get: demoData
        }
      }
    }
  ],
  unknown: {}
}
