<template>
    <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
export default {
  name: 'chart',
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dom: null
    }
  },
  watch: {
    '$store.state.app.collapsed'() {
      setTimeout(() => {
        this.dom.resize()
      }, 200)
    }
  },
  methods: {
    resize() {
      this.dom.resize()
    }
  },
  mounted() {
    const option = this.options
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy() {
    off(window, 'resize', this.resize)
  }
}
</script>
