<template>
  <div>
    <transition name="home-transform" mode="out-in">
      <component :is="curComponent" :access="access"></component>
    </transition>
  </div>
</template>

<script>
import home1 from './home1/home'
// import home2 from './home2/index'
import home3 from './home3/index'
import home4 from './home4/index'

export default {
  name: 'home',
  computed: {
    access() {
      return this.$store.state.user.access[0]
    },
    curComponent() {
      if (this.access === 'SXR003') {
        return 'home3' // 业务员
      } else if (this.access === 'SXR004' || this.access === 'SXR006') {
        // return 'home2' // 供应商、商户
        return 'home4' // 供应商、商户
      } else if (this.access === 'SXR001' || this.access === 'SXR002') {
        return 'home1' // 城市合伙人、渠道合伙人
      }
    }
  },
  components: {
    home1,
    // home2,
    home3,
    home4
  }
}
</script>

<style>
/*home-transform*/
.home-transform-leave-active,
.home-transform-enter-active {
  transition: all .3s;
}
.home-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.home-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
