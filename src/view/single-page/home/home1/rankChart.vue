<template>
  <chart :options="options"></chart>
</template>

<script>
import chart from '_c/charts/chart.vue'

export default {
  name: 'rankChart',
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
      title: {
        text: '分润来源比例',
        x: 'center',
        textStyle: {
          fontWeight: 'normal'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      color: ['rgb(24, 144, 255)', 'rgb(19, 194, 194)', 'rgb(47, 194, 91)'],
      legend: {
        orient: 'horizontal',
        bottom: '0',
        data: ['POS费率分润', '商户商品分润', '供应链商品分润']
      },
      series: [
        {
          name: '分润比例',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          label: {
            normal: {
              // show: false,
              // position: 'center',
              formatter: '{b}: {d}%'
            }
          },
          data: [
            { value: 335, name: 'POS费率分润' },
            { value: 310, name: '商户商品分润' },
            { value: 234, name: '供应链商品分润' }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }
}
</script>
