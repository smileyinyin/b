<template>
    <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'

export default {
  name: 'lineChart4',
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
  methods: {
    resize() {
      this.dom.resize()
    },
    handleChart() {
      let arr = this.waterBill
      let xArr = []
      let yArr = []
      arr.filter(v => v).forEach(item => {
        xArr.push(item.transDate)
        yArr.push(item.transactionMoney)
      })
      this.option.xAxis[0].data = xArr
      this.option.series[0].data = yArr
      this.dom && this.dom.setOption(this.option)
    }
  },

  mounted() {
    this.option = {
      title: {
        text: '交易流水（元）'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      // legend: {
      //   data: ['app订单金额', 'pos流水金额']
      // },
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
          // data: ['1', '2', '3', '4', '5', '6', '7']
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
          areaStyle: { normal: {} },
          // data: [1, 50, 600, 500, 430, 210, 180],
          data: [],
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#7cb5ec'
              }
            }
          }
        },
        {
          name: 'pos流水金额',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: { normal: {} },
          // data: [0, 10, 38, 550, 540, 520, 280],
          data: [],
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#434348'
              }
            }
          }
        }
      ]
    }
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(this.option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy() {
    off(window, 'resize', this.resize)
  }
}
</script>
