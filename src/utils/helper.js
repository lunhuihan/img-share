import storage from './storage'
import { typeOf } from './assist'
import { Toast } from 'vant'

export default {
  title (title) {
    title = title || 'img-share'
    window.document.title = title
  },
  logout (routerName = 'login') {
    this.clearUserInfo()
    window.router.replace({ name: routerName, query: {} })
  },
  getUserInfo (infoKey = '', defaultValue = '') {
    return storage.getSessionObj('userInfo', infoKey, defaultValue)
  },
  saveUserInfo (infoObj) {
    storage.setSession('userInfo', infoObj)
  },
  updateUserInfo (infoObj) {
    storage.updateSessionObj('userInfo', infoObj)
  },
  clearUserInfo () {
    storage.removeSession('userInfo')
  },
  hasAuth (authKey) {
    if (typeOf(authKey) !== 'string') return false
    let authList = this.getUserInfo('permissions', [])
    return authList.includes(authKey)
  },
  toast (message, duration = 5000) {
    Toast({
      duration,
      message
    })
  }
}
