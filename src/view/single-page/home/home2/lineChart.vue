<template>
  <div ref="dom" style="height: 310px;margin-top: 20px;"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'

export default {
  name: 'lineChart2',
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
    const option = {
      title: {
        text: '近一年交易流水',
        textStyle: {
          align: 'center',
          fontWeight: 'normal'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: 'rgb(24, 144, 255)'
          }
        }
      },
      legend: {
        data: ['交易流水']
      },
      toolbox: {
      },
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
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'app订单金额',
          type: 'line',
          stack: '总量',
          // areaStyle: { normal: {} },
          data: [4000000, 3000000, 4100000, 3500000, 3000000, 9000000, 4900000, 3200000, 2900000, 3500000, 3200000, 3400000],
          itemStyle: {
            normal: {
              lineStyle: {
                color: 'rgb(24, 144, 255)'
              }
            }
          }
        }
      ]
    }
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
