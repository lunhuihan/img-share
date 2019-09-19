import Wxapi from 'utils/wxapi'
import helper from 'utils/helper'

const wxapi = new Wxapi()

export default {
  data() {
    return {}
  },
  methods: {
    async wxCustomShare({ link = window.location.href, title, desc, imgUrl }) {
      // if (!title || !desc || !imgUrl) { throw new Error('请设置微信分享的标题title、描述desc和图片imgUrl') }
      let res = await this.$Http.weixin.getJsapiSignature()
      let { appid, timestamp, noncestr, signature } = res.data
      try {
        await wxapi.checkJsApi()
        try {
          await wxapi.config({ appId: appid, timestamp, nonceStr: noncestr,signature })
          wxapi.updateAppMessageShareData({ title, desc, link, imgUrl })
          wxapi.updateTimelineShareData({ title, link, imgUrl })
        } catch (e) {
          helper.toast('微信分享配置失败')
        }
      } catch (e) {
        helper.toast('请升级微信客户端后分享')
      }
      return res
    }
  }
}