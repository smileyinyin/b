<template>
    <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'

const OPTION = {
  title: {
    text: '近两周交易金额',
    x: 'center',
    textStyle: {
      fontWeight: 'normal'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // type: 'cross',
      // label: {
      //   backgroundColor: '#6a7985'
      // }
    }
  },
  color: ['rgb(24, 144, 255)', '#00cc00'],
  legend: {
    orient: 'vertical',
    left: 0,
    data: ['交易金额']
  },
  toolbox: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      // data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      data: []
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '交易金额',
      type: 'line',
      stack: '总量',
      // data: [100000, 110000, 120000, 120000, 130000, 130000, 130000, 130000, 130000, 130000, 120000, 120000],
      data: [],
      itemStyle: {
        normal: {
          color: 'rgb(24, 144, 255)',
          lineStyle: {
            color: 'rgb(24, 144, 255)'
          }
        }
      }
    }
  ]
}

export default {
  name: 'home-water-bill',
  props: {
    waterBill: {
      type: Array,
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
    },
    waterBill(v) {
      this.handleChart()
    }
  },
  mounted() {
    // 在 mounted 里把 option 赋给 this 以免 option 被 响应化 浪费效率
    // 但要注意 mounted 才有 option, watch 方法初始化时还没有 option 不能用 immediate 执行
    this.option = OPTION
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(this.option)
      on(window, 'resize', this.resize)
    })
  },
  methods: {
    resize() {
      this.dom.resize()
    },
    handleChart() {
      let arr = this.waterBill
      let xArr = []
      let yArr = []
      arr.filter(v => v).forEach(item => {
        xArr.push(item.trxDate)
        yArr.push(item.dayTrxMoney)
      })
      this.option.xAxis[0].data = xArr
      this.option.series[0].data = yArr
      this.dom && this.dom.setOption(this.option)
    }
  },
  beforeDestroy() {
    off(window, 'resize', this.resize)
  }
}
</script>
