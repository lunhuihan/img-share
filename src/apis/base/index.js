import { typeOf } from 'utils/assist'
import helper from 'utils/helper'
import loading from 'utils/loading'

let HttpEngine = (require(`core/plugins/http/HttpEngine.${process.env.NODE_ENV === 'development' ? 'dev' : 'prod'}`)).default

export default class Http extends HttpEngine {

  baseURL = process.env.HTTP_BASE_URL;
  mockTimeout = 3;
  requestedSever = false;

  beforeSendRequestHandler (config) {
    let commonHeader = helper.getCommonHeader()
    config.headers = { ...config.headers, ...commonHeader }
    if (config.loading) {
      let loadingType = typeOf(config.loading) === 'boolean' ? 'normal' : config.loading
      this.loadingHash = loading.show({ type: loadingType }) 
    }
  }

  afterResolveResponseHandler (response) {
    this.loadingHash && loading.hide(this.loadingHash)
  }

  afterRejectResponseHandler (error) {
    let errorMsg = error.message
    let response = error.response
    if (errorMsg === 'Network Error') {
      errorMsg = '网络异常'
    }
    if (errorMsg.indexOf('timeout') >= 0) {
      errorMsg = '请求超时'
    }
    if (typeOf(response) === 'object') {
      if (typeOf(response.data) === 'object') {
        errorMsg = response.data['error_msg']
      }
      if (response.status === 401) {
        helper.logout()
        return
      }
    }
    loading.hide()
    helper.toast(errorMsg)
  }
}