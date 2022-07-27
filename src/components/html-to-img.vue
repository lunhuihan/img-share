<template>
  <div class="html-to-img-wrap">
    <slot></slot>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import helper from 'utils/helper'
export default {
  name: 'HtmlToImg',
  components: {},
  data() {
    return {
      root: null,
      imgLoaded: false
    }
  },
  created() {},
  async mounted() {
    this.root = document.querySelector(`.html-to-img-wrap`)
    this.imgsLoaded()
  },
  methods: {
    imgsLoaded() {
      return new Promise((resolve, reject) => {
        if (this.imgLoaded) {
          resolve()
        } else {
          const imgList = this.root.querySelectorAll('img')
          if (!imgList.length) {
            resolve()
            return
          }
          let list = Array.from(imgList).map((img) => this.imgLoad(img.src))
          Promise.all(list)
            .then(() => {
              this.imgLoaded = true
              resolve()
            })
            .catch((e) => {
              this.imgLoaded = false
              reject(e)
            })
        }
      })
    },
    imgLoad(src) {
      return new Promise((resolve, reject) => {
        const newImg = new Image()
        newImg.src = src
        newImg.onload = () => {
          resolve()
        }
        newImg.onerror = (e) => {
          reject(e)
        }
      })
    },
    html2Img() {
      return new Promise((resolve, reject) => {
        this.imgsLoaded().then(() => {
          const _this = this
          const scale = window.devicePixelRatio || 2
          html2canvas(this.root, {
            scale,
            allowTaint: true,
            useCORS: true,
            backgroundColor: null
          })
            .then((canvas) => {
              const img = _this.canvasToImg(canvas, canvas.width / scale, canvas.height / scale)
              resolve(img)
            })
            .catch((e) => {
              helper.toast('保存错误')
              reject(e)
            })
        })
      })
    },
    canvasToImg(canvas, width, height) {
      const image = new Image()
      image.crossOrigin = '*'
      image.src = canvas.toDataURL('image/jpeg')
      image.width = width
      image.height = height
      return image
    }
  }
}
</script>
