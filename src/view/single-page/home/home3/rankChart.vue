<template>
  <chart :options='options' style='height: 400px;'></chart>
</template>

<script>
import chart from '_c/charts/chart.vue'

export default {
  name: 'rankChart3',
  components: {
    chart
  },
  data() {
    return {
      options: {}
    }
  },
  created() {
    this.options = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      yAxis: [
        {
          type: 'category',
          data: ['门店10', '门店9', '门店8', '门店7', '门店6', '门店5', '门店4', '门店3', '门店2', '门店1'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      xAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 120, 140, 180, 200, 220, 330, 334, 390]
        }
      ]
    }
  }
}
</script>
