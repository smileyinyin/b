<template>
  <chart :options="options" style="height: 300px;"></chart>
</template>

<script>
import chart from '_c/charts/chart.vue'

export default {
  name: 'rankChart4',
  components: {
    chart
  },
  props: {
    rankWho: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      options: {}
    }
  },
  created() {
    this.options = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['门店一', '门店二', '门店三', '门店四', '门店五']
      },
      color: ['#eb7252', '#feb506', '#01a693', '#c1cfd8', '#5dc12e'],
      series: [
        {
          name: '会员数',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 1548, name: '门店一' },
            { value: 610, name: '门店二' },
            { value: 334, name: '门店三' },
            { value: 235, name: '门店四' },
            { value: 135, name: '门店五' }
          ]
        }
      ]
    }
  }
}
</script>
