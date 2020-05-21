<template>
  <div class="page index-page">
    <van-button type="primary" @click="openSharePopup" plain round>图片分享</van-button>
    <html-to-img class="wrap" ref="html-to-img">
      <div class="title">
        分享商品
      </div>
      <div class="img-wrap">
        <img :src="img" alt="" v-for="(img, index) in imgList" :key="index">
      </div>
      <div class="bottom">
        <div class="left">
          <div class="label">活动时间：</div>
          <div class="value">2019.08.01-2019.08-03</div>
        </div>
        <div class="right">
          <qrcode value="https://www.bychjh.com/img-share/#/" :options="{ width: 100 }"></qrcode>
          <div class="tip">扫一扫或长按识别二维码</div>
        </div>
      </div>
    </html-to-img>
    <van-loading class="share-van-loading" v-show="loading"/>
    <van-popup class="share-popup" v-model="show" round></van-popup>
  </div>
</template>

<script>
import helper from 'utils/helper'
import htmlToImg from 'components/html-to-img'
export default {
  data () {
    return {
      show: false,
      loading: false,
      imgList: [require('../assets/img/share-img-1.png'), require('../assets/img/share-img-2.png'), require('../assets/img/share-img-3.png'), require('../assets/img/share-img-4.png')]
    }
  },
  computed: {
  },
  created () {
    helper.title('图片分享demo')
  },
  mounted () {
  },
  methods: {
    async openSharePopup () {
      this.show = true
      this.$nextTick(() => {
        this.appendShareImg(document.querySelector('.share-popup'))
      })
    },
    async appendShareImg (parent) {
      if (parent.innerHTML) return
      this.loading = true
      let img = await this.$refs['html-to-img'].html2Img()
      parent.style.height = `${img.height}px`
      parent.appendChild(img)
      this.loading = false
    }
  },
  components: {
    htmlToImg
  }
}
</script>
<style>
.index-page {
  font-size: 14px;
}
.share-popup {
  width: 90%;
  border-radius: 4px;
  overflow: hidden;
}
.wrap {
  width: 90%;
  position: absolute;
  left: -90%;
  background: white;
  padding: 10px;
}
.title {
  font-size: 16px;
}
.img-wrap {
  margin-bottom: 10px;
}
.img-wrap img {
  width: 50%;
}
.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.right {
  width: 100px;
  text-align: center;
}
.label {
  color: #666;
  margin-bottom: 10px;
}
.tip {
  padding: 0 10px;
  color: #999;
  font-size: 10px;
}
.share-van-loading{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2001;
}
</style>
