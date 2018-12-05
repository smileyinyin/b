<template>
  <h3 :style="style">
    <span style="margin-right: 10px; border-left: 6px solid #eb7252"> </span>
    <slot/>
  </h3>
</template>

<script>
const BORDER = '1px solid #e2e2e2'
const PADDING = '10px'

export default {
  name: 'divide-line',
  props: {
    placement: {
      type: String,
      default: 'top'
    }
  },
  computed: {
    style() {
      let style = {}
      switch (this.placement) {
        case 'top':
          style.borderTop = BORDER
          style.paddingTop = PADDING
          break
        case 'bottom':
          style.borderBottom = BORDER
          style.paddingBottom = PADDING
          break

        default:
          break
      }
      return style
    }
  }
}
</script>
