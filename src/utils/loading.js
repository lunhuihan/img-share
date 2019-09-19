import { typeOf } from './assist'

const loadingRootClass = 'v-loading'
const loadingTypes = ['normal', 'bounce', 'loader', 'square']
const loadingDom = {
  normal: `
  <div class="loading-normal">
    <div class="loading-rotate">
      <span class="loading-line"></span>
      <span class="loading-line"></span>
      <span class="loading-line"></span>
      <span class="loading-line"></span>
      <span class="loading-line"></span>
      <span class="loading-line"></span>
      <span class="loading-line"></span>
      <span class="loading-line"></span>
      <span class="loading-line"></span>
      <span class="loading-line"></span>
      <span class="loading-line"></span>
      <span class="loading-line"></span>
    </div>
  </div>
  `,
  bounce: `
  <div class="loading-bounce">
  </div>
  `,
  loader: `
  <div class="loading-loader">
  </div>
  `,
  square: `
  <div class="loading-square">
    <div class="loading-dot"></div>
    <div class="loading-dot"></div>
    <div class="loading-dot"></div>
    <div class="loading-dot"></div>
  </div>
  `
}

export default {
  show (params = {}) {
    if (typeOf(params) !== 'object') { 
      throw new TypeError('loading的参数类型应为Object')
    }
    let { type = loadingTypes[0], parent = document.body } = params
    
    if (!loadingTypes.includes(type)) throw new RangeError(`loading的type必须为${loadingTypes.join('、')}中的一种！`)
    if (parent.nodeType !== 1) throw new TypeError('loading的parent类型必须为NODE节点类型！')

    if (this._checkExist()) {
      let id = Math.random().toString().replace('.', '')
      this._container.className = `${loadingRootClass} ${loadingRootClass}-${this._type} ${loadingRootClass}-${id}`
      this._id = id
    } else {
      this._setOptions({ type, parent })
      this._createLoading()
    }
    return this._id
  },

  hide (id = this._id) {
    let className = `${loadingRootClass}-${id}`
    if (!this._checkExist(className)) return

    this._parent.removeChild(document.querySelector(`.${className}`))
    this._setOptions({ id: '' })
  },

  _setOptions({ type = 'normal', parent = document.body, id = Math.random().toString().replace('.', '') }) {
    this._type = type
    this._parent = parent
    this._id = id
    this._container = null
  },

  _checkExist(className = loadingRootClass) {
    return document.body.contains(document.querySelector(`.${className}`))
  },

  _createLoading () {
    let { _type, _parent, _id } = this
    let loadingRoot = document.createElement('div')
    loadingRoot.className = `${loadingRootClass} ${loadingRootClass}-${_type} ${loadingRootClass}-${_id}`
    loadingRoot.innerHTML = loadingDom[_type]
    if (_parent === document.body) {
      loadingRoot.style.position = 'fixed'
    } else {
      _parent.style.position = 'relative'
    }
    this._container = loadingRoot
    _parent.appendChild(loadingRoot)
  }
}
