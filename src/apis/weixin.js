import Http from './http-base'

const moduleName = 'weixin'

class Wechat {
  /**
   * 获取微信分享需要的config数据
   */
  getJsapiSignature () {
    let url = window.encodeURIComponent(window.location.href.split('#')[0])
    let http = new Http()
    http.path = `/${moduleName}/getJsapiSignature`
    http.query = { url }
    http.loading = false
    return http.get()
  }
}
export default new Wechat()