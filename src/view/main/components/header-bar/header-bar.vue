<template>
  <div class="header-bar">
    <!-- <img src="../../../../assets/images/logo1.png" alt="上下科技" class="logo"> -->
    <p style="width:180px; font-size: 16px; color: #fff">{{ curRolename }}</p>
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import './header-bar.less'
import iconMap from '../iconMap'

export default {
  name: 'HeaderBar',
  computed: {
    curRolename() {
      let role = this.$store.state.user.access[0]
      if (!role) {
        return ''
      }
      return iconMap[role][3]
      // return this.$store.state.user.accessList.find(v => v.code === role).name
    }
  }
}
</script>
