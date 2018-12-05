<template>
  <component v-if="iconType !== 'SvgIcon'" :is="iconType" :type="iconName" :color="iconColor" :size="iconSize"/>
  <svg-icon v-else :icon-class="iconName" :style="svgStyle"></svg-icon>
</template>

<script>
import Icons from '_c/icons'
import SvgIcon from '_c/SvgIcon'
export default {
  name: 'CommonIcon',
  components: {Icons, SvgIcon},
  props: {
    type: {
      type: String,
      required: true
    },
    color: String,
    size: Number
  },
  computed: {
    svgStyle() { // 适配一下 common-icon 的 prop 输入，给 svg 默认大小和颜色
      return {
        fontSize: `${this.size || 20}px`,
        color: this.color || ''
      }
    },
    iconType () {
      if (this.type.indexOf('svg_') === 0) { // 新增 svg 类型
        return 'SvgIcon'
      }
      return this.type.indexOf('_') === 0 ? 'Icons' : 'Icon'
    },
    iconName () {
      if (this.iconType === 'SvgIcon') { // 新增 svg Icon
        return this.type.slice(4)
      }
      return this.iconType === 'Icons' ? this.getCustomIconName(this.type) : this.type
    },
    iconSize () {
      return this.size || (this.iconType === 'Icons' ? 12 : undefined)
    },
    iconColor () {
      return this.color || ''
    }
  },
  methods: {
    getCustomIconName (iconName) {
      return iconName.slice(1)
    }
  }
}
</script>

<style>

</style>
