<template>
  <chart :options="options" style="height: 300px;"></chart>
</template>

<script>
import chart from '_c/charts/chart.vue'

export default {
  name: 'rankChart2',
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
        // type: 'scroll',
        orient: 'horizontal',
        bottom: '0'
        // data: ['特产一', '特产二', '特产三', '特产四', '特产五']
      },
      color: ['#eb7252', '#feb506', '#01a693', '#c1cfd8', '#5dc12e'],
      series: [
        {
          name: '热销比例',
          type: 'pie',
          center: ['50%', '50%'],
          // radius: ['50%', '70%'],
          // avoidLabelOverlap: false,
          label: {
            normal: {
              // show: false,
              // position: 'center',
              formatter: '{b}: {d}%'
            }
          },
          // labelLine: {
          //   normal: {
          //     show: false
          //   }
          // },
          data: [
            { value: 1548, name: '特产一' },
            { value: 610, name: '特产二' },
            { value: 334, name: '特产三' },
            { value: 235, name: '特产四' },
            { value: 135, name: '特产五' }
          ]
        }
      ]
    }
  }
}
</script>
