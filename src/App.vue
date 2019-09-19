<template>
  <div id="app">
    <weixin-env-tip v-if="requireWeixin"></weixin-env-tip>
    <vertical-screen-tip></vertical-screen-tip>
    <router-view/>
  </div>
</template>

<script>
import weixinEnvTip from 'components/weixin-env-tip'
import verticalScreenTip from 'components/vertical-screen-tip'

export default {
  name: 'app',
  data () {
    return {
      requireWeixin: process.env.NODE_ENV !== 'development'
    }
  },
  created () {
    window.router = this.$router
  },
  components: {
    weixinEnvTip,
    verticalScreenTip
  }
}
</script>
