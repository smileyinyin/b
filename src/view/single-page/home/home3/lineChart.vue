<template>
  <div ref="dom" style="height: 310px;margin-top: 20px;"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'

export default {
  name: 'lineChart3',
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
        text: '交易流水(元)',
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
        data: ['分润金额']
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
          // data: ['10/1', '10/2', '10/3', '10/4', '10/5', '10/6', '10/7', '10/8', '10/9']
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
          // areaStyle: { normal: {} },
          // data: [7000, 7500, 8000, 8100, 8500, 10500, 13500, 11500, 12500, 11500, 13500, 13500],
          data: [],
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
      this.dom.setOption(this.option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy() {
    off(window, 'resize', this.resize)
  }
}
</script>
