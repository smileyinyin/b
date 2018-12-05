<template>
  <div class="home">
    <Row :gutter="20" class-name="infor-card">
      <i-col :md="6" :xs="12" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px; margin-bottom: 20px">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style" :decimals="infor.decimals"><span v-if="infor.prefix" slot="prefix" class="count-style">￥</span></count-to>
          <p class="title">{{ infor.title }}</p>
          <span v-if="infor.tip" slot="tip">{{ infor.tip }}</span>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" class-name="center-number">
      <i-col :md="16" :xs="24">
        <Card>
          <Row :gutter="10">
            <i-col :md="6" :xs="12" v-for="(record, i) in records" :key="i" class-name="center-content">
              <div class="left">
                <count-to :end="record.count" count-class="number-style" />
                <p class="title">{{ record.title }}</p>
              </div>
              <div class="right">
                <commonIcon :type="i % 2 === 0 ? 'connection-bars' : 'arrow-graph-up-right'"
                  :color="i % 2 === 0 ? '#2d8cf0' : '#f39182'"
                ></commonIcon>
              </div>
            </i-col>
          </Row>
        </Card>
        <Card style="height: 560px; margin: 20px 0">
          <h4 slot="title" >近两周流水额</h4>
          <!-- <RadioGroup v-model="transLabel" type="button" >
            <Radio label="本月交易金额"></Radio>
            <Radio label="本月利润金额"></Radio>
          </RadioGroup> -->
          <example :waterBill="waterBill" style="height: 380px;margin-top: 40px;"/>
        </Card>
      </i-col>
      <i-col :md="8" :xs="24">
        <Card class="posList">
          <h4 slot="title" >POS消费实时推送</h4>
          <ul>
            <li v-for="(item, i) in posRecord" :key="i" class="pos-item">
              <span class="info">
                <span>{{ item.merchantsName }}</span>
                <span>{{ item.payChannel }}</span>
                <span>{{ item.transactionMoney }}元</span>
              </span>
              <span class="timestamp">{{ item.createTime | formatDate }}</span>
            </li>
          </ul>
        </Card>
        <Card class="bussinessList mt20">
          <h4 slot="title">业绩排行榜</h4>
          <RadioGroup v-model="rankLabel" type="button" >
            <Radio label="渠道合伙人" v-if="access === 'SXR001'"></Radio>
            <Radio label="业务员"></Radio>
            <Radio label="生态圈商家"></Radio>
          </RadioGroup>
          <rank-list :data="rankList" :property="rankProperty"></rank-list>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import commonIcon from '_c/common-icon'
import CountTo from '_c/count-to'
import Example from './example.vue'
import rankChart from './rankChart.vue'
import rankList from '../components/rankList'
import { formatDate } from '@/libs/util'
import ApiHome from '@/api/home/index'

const ApiMap = {
  'SXR001': 'cityPartner',
  'SXR002': 'channelPartner'
}

export default {
  name: 'home1', // '城市合伙人、渠道合伙人看到'
  components: {
    InforCard,
    CountTo,
    Example,
    commonIcon,
    rankChart,
    rankList
  },
  props: {
    access: {
      type: String
    }
  },
  data() {
    return {
      userId: this.$store.state.user.userId,
      rankLabel: this.access === 'SXR001' ? '渠道合伙人' : '业务员',
      rankProperty: ['rank', 'name', 'transactionCount', 'rate'],
      // transLabel: '本月交易金额',
      inforCardData: [
        {
          prop: 'trxSumMoney',
          title: '历史交易金额（元）',
          icon: '_jinbitixian',
          count: 0,
          color: '#ef7bad',
          decimals: 2,
          // lastTime: '2018-07-30 12:32:20',
          // tip: '最近一次提现：',
          prefix: true
        },
        {
          prop: 'trxTodayMoney',
          title: '今日交易金额（元）',
          icon: '_jinrigaikuang',
          count: 0,
          color: '#f29485',
          decimals: 2,
          // tip: '最近一笔分润：',
          // lastTime: '2018-07-30 12:32:20',
          prefix: true
        },
        {
          prop: 'profitSumMoney',
          title: '历史利润总额（元）',
          icon: '_zuorigaikuang',
          count: 0,
          color: '#53a69c',
          decimals: 2,
          // tip: '最近新增商户：',
          // lastTime: '2018-07-30 12:32:20',
          prefix: true
        },
        {
          prop: 'profitMonthMoney',
          title: '上月利润总额（元）',
          icon: '_ai204',
          count: 0,
          color: '#52c8e6',
          decimals: 2,
          // tip: '最近激活终端：',
          // lastTime: '2018-07-30 12:32:20',
          prefix: true
        }
      ],
      records: [
        { prop: 'merchantNumSum', title: '商户数（家）', count: 0 },
        { prop: 'storeNumSum', title: '门店数（家）', count: 0 },
        { prop: 'salesmanNumSum', title: '业务员数（位）', count: 0 },
        { prop: 'posNumSum', title: 'POS数（台）', count: 0 }
      ],
      posRecord: [
        // { merchantStoreName: '十足连锁，十足华盛达店', payChannel: '微信支付', transactionMoney: 1000, timeStamp: '10:47:42' },
        // { merchantStoreName: '十足连锁，十足华盛达店', payChannel: '微信支付', transactionMoney: 1000, timeStamp: '10:49:15' },
        // { merchantStoreName: '十足连锁，十足华盛达店', payChannel: '微信支付', transactionMoney: 1000, timeStamp: '10:49:17' },
        // { merchantStoreName: '十足连锁，十足华盛达店', payChannel: '微信支付', transactionMoney: 1000, timeStamp: '10:49:18' },
        // { merchantStoreName: '十足连锁，十足华盛达店', payChannel: '微信支付', transactionMoney: 1000, timeStamp: '10:49:20' }
      ],
      rankList: [
        // { rank: 1, name: '杭州城市代理001', transactionCount: '3731234.34', rate: '10.1' },
        // { rank: 1, name: '杭州城市代理002', transactionCount: '3731234.34', rate: '10.1' },
        // { rank: 1, name: '杭州城市代理003', transactionCount: '3731234.34', rate: '10.1' },
        // { rank: 1, name: '杭州城市代理004', transactionCount: '3731234.34', rate: '10.1' },
        // { rank: 1, name: '杭州城市代理005', transactionCount: '3731234.34', rate: '10.1' },
        // { rank: 1, name: '杭州城市代理006', transactionCount: '3731234.34', rate: '10.1' },
        // { rank: 1, name: '杭州城市代理007', transactionCount: '3731234.34', rate: '10.1' },
        // { rank: 1, name: '杭州城市代理008', transactionCount: '3731234.34', rate: '10.1' },
        // { rank: 1, name: '杭州城市代理009', transactionCount: '3731234.34', rate: '10.1' },
        // { rank: 1, name: '杭州城市代理010', transactionCount: '3731234.34', rate: '10.1' }
      ],
      waterBill: []
    }
  },
  computed: {
    Api() {
      return ApiHome[ApiMap[this.access]]
    }
  },
  watch: {
    // 根据排行榜 label 的切换查询不同列表
    rankLabel: {
      immediate: true,
      handler(label) {
        let method
        let rankProperty
        let sortBy
        if (label === '渠道合伙人') {
          method = 'getChannelList'
          rankProperty = ['i', 'channelPartnerName', 'channelMonthMoney', 'channelRate']
          sortBy = 'i'
        } else if (label === '业务员') {
          method = 'getSaleManList'
          rankProperty = ['salesmanSeq', 'salesmanName', 'salesmanMonthMoney', 'salesmanRate']
          sortBy = 'salesSeq'
        } else if (label === '生态圈商家') {
          method = 'getMerchantList'
          rankProperty = ['merchantsSeq', 'merchantName', 'merchantsMonthMoney', 'merchantsRate']
          sortBy = 'merchantsSeq'
        }
        this.Api[method](this.userId).then(res => {
          this.rankList = (res.data || []).sort((a, b) => a[sortBy] - b[sortBy])
          this.rankProperty = rankProperty
        })
      }
    }
  },
  created() {
    this._getInfos()
  },
  methods: {

    handleRecords(data) {
      this.records.forEach(item => {
        if (data[item.prop] || data[item.prop] === 0) {
          item.count = data[item.prop]
        }
      })
    },

    handleInfos(data) {
      this.inforCardData.forEach(item => {
        if (data[item.prop] || data[item.prop] === 0) {
          item.count = data[item.prop]
        }
      })
    },

    // 初始化获取数据
    _getInfos() {
      let api = this.Api
      // 统计数据 商户/门店/业务员/pos机
      api.getSum(this.userId).then(res => this.handleRecords(res.data || {}))
      // 统计数据 历史交易金额/今日交易金额
      api.getTransaction(this.userId).then(res => this.handleInfos(res.data || {}))
      // 统计数据 历史利润/上月利润
      api.getProfit(this.userId).then(res => this.handleInfos(res.data || {}))
      // 交易流水折线图
      api.getWaterBill(this.userId).then(res => (this.waterBill = res.data || []))
      // pos实时推送
      api.getPosList(this.userId).then(res => (this.posRecord = res.data || []))
    }
  },
  filters: {
    formatDate(v) {
      return formatDate(v, 'hh:mm:ss')
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  .ivu-card {
    box-shadow: 0 2px 10px 0 rgba(7, 17, 27, 0.1);
    &:hover {
      box-shadow: 0 14px 30px 0 rgba(0, 0, 0, 0.1) !important;
    }
  }
  /deep/.infor-card {
    .title {
      color: #fff;
      font-size: 12px;
    }
    .count-style {
      color: #fff;
      font-size: 18px;
    }
  }
  /deep/.center-number {
    // margin-top: 20px;
    .number-style {
      // font-weight: bold;
      font-size: 18px;
    }
  }
  .pos-item {
    margin: 0 10px;
    list-style: none;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    line-height: 24px;
    border-bottom: 1px solid #f3f3f3;

    &:last-of-type {
      border: none;
    }

    .info {
      flex: 1;
      display: flex;
      margin-right: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      > span {
        display: inline-block;
      }
      span:nth-child(1) {
        flex: 1 0 40%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #FF9900;
      }
      span:nth-child(3) {
        flex: 0 0 20%;
        color: #FF0000;
      }
    }
    .timestamp {
      flex-basis: 47px;
    }
  }
  .center-content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 26px;
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
}
</style>
