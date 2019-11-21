<template>
  <div class="html-to-img-wrap">
    <slot></slot>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
export default {
  name: 'htmlToImg',
  data () {
    return {
      root: null,
      imgLoaded: false
    }
  },
  created () { },
  async mounted () {
    this.root = document.querySelector(`.html-to-img-wrap`)
    this.imgsLoaded()
  },
  methods: {
    imgsLoaded () {
      return new Promise((resolve, reject) => {
        if (this.imgLoaded) {
          resolve()
        } else {
          let imgList = this.root.querySelectorAll('img')
          if (!imgList.length) {
            resolve()
            return
          }
          imgList.forEach((img, index) => {
            let newImg = new Image()
            newImg.src = img.src
            newImg.onload = () => {
              if (index === (imgList.length - 1)) {
                this.imgLoaded = true
                resolve()
              }
            }
          })
        }
      })
    },
    html2Img () {
      return new Promise((resolve, reject) => {
        this.imgsLoaded().then(() => {
          let _this = this
          let scale = window.devicePixelRatio || 2
          html2canvas(this.root, {
            scale: scale
          }).then((canvas) => {
            let img = _this.canvasToImg(canvas, canvas.width / scale, canvas.height / scale)
            resolve(img)
          })
        })
      })
    },
    canvasToImg (canvas, width, height) {
      var image = new Image()
      image.src = canvas.toDataURL('image/jpeg')
      image.width = width
      image.height = height
      return image
    }
  },
  components: {
    html2canvas
  }
}
</script>