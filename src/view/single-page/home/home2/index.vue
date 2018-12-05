<template>
  <div class="home">
    <Row :gutter="20" class-name="infor-card">
      <i-col span="6" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36" :lastTime="infor.lastTime">
          <count-to :end="infor.count" count-class="count-style" :decimals="infor.decimals"><span v-if="infor.prefix" slot="prefix" class="count-style">￥</span></count-to>
          <p class="title">{{ infor.title }}</p>
          <span v-if="infor.tip" slot="tip">{{ infor.tip }}</span>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" class-name="center-number">
      <i-col span="12">
        <Card>
          <Row :gutter="10">
            <i-col span="12" v-for="(record, i) in records" :key="i" class-name="center-content">
              <div class="left">
                <p class="title">{{ record.title }}</p>
                <count-to :end="record.count" count-class="number-style" />
              </div>
              <div class="right">
                <commonIcon :type="i % 2 === 0 ? 'connection-bars' : 'arrow-graph-up-right'"
                  :color="i % 2 === 0 ? '#2d8cf0' : '#f39182'"
                ></commonIcon>
              </div>
            </i-col>
          </Row>
        </Card>
        <Card style="margin: 20px 0 30px; height: 380px;">
          <!-- <p class="card-title">本周流水额</p> -->
          <line-chart></line-chart>
        </Card>
      </i-col>
      <i-col span="12">
        <Card style="height: 521px;">
          <p class="card-title mb30 mt20">
            本周热销榜
          </p>
          <Radio-group v-model="rankWho" type="button" size="large">
            <Radio label="specialty">特产类</Radio>
            <Radio label="souvenir">纪念品</Radio>
            <Radio label="fresh">生鲜类</Radio>
          </Radio-group>
          <div class="mt30">
            <rank-chart :rank-who="rankWho"></rank-chart>
          </div>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import commonIcon from '_c/common-icon'
import CountTo from '_c/count-to'
import lineChart from './lineChart'
import rankChart from './rankChart.vue'

export default {
  name: 'home2', // 供应商首页
  components: {
    InforCard,
    CountTo,
    lineChart,
    commonIcon,
    rankChart
  },
  data() {
    return {
      rankWho: 'specialty',
      ranks: {
        specialty: [
          { index: 1, name: '门店一', rate: 35 },
          { index: 2, name: '门店二', rate: 25 },
          { index: 3, name: '门店三', rate: 20 },
          { index: 4, name: '门店四', rate: 15 },
          { index: 5, name: '门店五', rate: 4 },
          { index: 6, name: '门店六', rate: 1 }
        ],
        souvenir: [
          { index: 1, name: '门店一', rate: 37 },
          { index: 2, name: '门店二', rate: 25 },
          { index: 3, name: '门店三', rate: 20 },
          { index: 4, name: '门店四', rate: 15 }
        ],
        fresh: [
          { index: 1, name: '门店一', rate: 39 },
          { index: 2, name: '门店二', rate: 25 },
          { index: 3, name: '门店三', rate: 20 }
        ]
      },
      inforCardData: [
        {
          title: '待处理订单（笔）',
          icon: '_jinbitixian',
          count: 42,
          color: '#ef7bad',
          decimals: 2,
          lastTime: '2018-07-30 12:32:20',
          tip: '最近一笔订单',
          prefix: false
        },
        {
          title: '待补充库存（类）',
          icon: '_jinrigaikuang',
          count: 6,
          color: '#f29485',
          decimals: 2,
          lastTime: '2018-07-30 12:32:20',
          tip: '最近一次告警',
          prefix: false
        },
        {
          title: '本月当前累计交易额（元）',
          icon: '_zuorigaikuang',
          count: 120299.82,
          color: '#53a69c',
          decimals: 2,
          lastTime: '2018-07-30 12:32:20',
          tip: '最近一笔交易',
          prefix: true
        },
        {
          title: '今日已发货订单（笔）',
          icon: '_ai204',
          count: 82,
          color: '#52c8e6',
          lastTime: '2018-07-30 12:32:20',
          tip: '最近一笔发货',
          prefix: false
        }
      ],
      records: [
        { title: '在售商品（类）', count: 32 },
        { title: '下架商品（类）', count: 8 }
      ]
    }
  }
}
</script>

<style lang="less">
.home {
  .ivu-card {
    box-shadow: 0 2px 10px 0 rgba(7, 17, 27, 0.1);
    &:hover {
      box-shadow: 0 14px 30px 0 rgba(0, 0, 0, 0.1) !important;
    }
  }
}
.infor-card {
  .title {
    color: #fff;
    font-size: 12px;
  }
  .count-style {
    color: #fff;
    font-size: 20px;
  }
}
.center-number {
  margin-top: 20px;
  .number-style {
    font-weight: bold;
    font-size: 20px;
  }
}
.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px 26px;
  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  }
  .right {
    font-size: 30px;
    color: #2d8cf0;
  }
}

.bottom-card {
  margin-top: 20px;
  .card-title {
    padding: 20px 10px;
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
