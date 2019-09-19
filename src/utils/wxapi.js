import wx from 'weixin-js-sdk'
const apiList = ['updateAppMessageShareData', 'updateTimelineShareData']
export default class Wxapi {
  /**
   * 检测是否在微信浏览器中
   *
   * @returns
   * @memberof Wxapi
   */
  checkIsWeixin() {
    let useragent = navigator.userAgent.toLowerCase()
    return !!useragent.match(/micromessenger/i)
  }
  /**
   * 判断当前客户端版本是否支持指定JS接口
   *
   * @param {Array} [jsApiList=apiList]
   * @returns
   * @memberof Wxapi
   */
  checkJsApi (jsApiList = apiList) {
    return new Promise((resolve, reject) => {
      wx.checkJsApi({
        jsApiList, // 需要检测的JS接口列表
        success ({ checkResult = {} }) {
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"updateAppMessageShareData":true},"errMsg":"checkJsApi:ok"}
          if (typeof checkResult === 'string') {
            checkResult = JSON.parse(checkResult)
          }
          let result = jsApiList.every(api => checkResult[api])
          if (result) {
            resolve()
          } else {
            reject(checkResult)
          }
        }
      })
    })
  }
  /**
   * 使用JS-SDK的页面需先注入配置信息
   *
   * @param {Object} { appId, timestamp, nonceStr, signature }
   * @returns
   * @memberof Wxapi
   */
  config({ appId, timestamp, nonceStr, signature }) {
    return new Promise((resolve, reject) => {
      wx.config({
        debug: process.env.NODE_ENV === 'development', // 开启调试模式
        appId, // 必填，公众号的唯一标识
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature, // 必填，签名
        jsApiList: apiList // 必填，需要使用的JS接口列表
      })
      wx.ready(() => {
        resolve()
      })
      wx.error(res => {
        reject(res)
      })
    })
  }
  /**
   * 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
   *
   * @param {Object} [options={}]
   * @returns
   * @memberof Wxapi
   */
  updateAppMessageShareData(options = {}) {
    return new Promise((resolve, reject) => {
      let defaultOpts = {
        title: '', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: '', // 分享图标
        success() {
          resolve()
        },
        error(res) {
          reject(res)
        }
      }
      wx.updateAppMessageShareData({ ...defaultOpts, ...options })
    })
  }
  /**
   * 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
   *
   * @param {Object} [options={}]
   * @returns
   * @memberof Wxapi
   */
  updateTimelineShareData(options = {}) {
    return new Promise((resolve, reject) => {
      let defaultOpts = {
        title: '', // 分享标题
        link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: '', // 分享图标
        success() {
          resolve()
        },
        error(res) {
          reject(res)
        }
      }
      wx.updateTimelineShareData({ ...defaultOpts, ...options })
    })
  }
  isMiniProgram () { 
    return new Promise((resolve, reject) => {
      wx.miniProgram.getEnv(({ miniprogram = false }) => {
        resolve(miniprogram)
      })      
    })
  }
}