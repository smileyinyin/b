<template>
  <div class="home">
    <Row :gutter="20" class-name="infor-card">
      <i-col :md="6" :xs="12" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px; margin-bottom: 20px">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36" :lastTime="infor.lastTime">
          <count-to :end="infor.count" count-class="count-style" :decimals="infor.decimals">
            <span slot="prefix" class="count-style">￥</span>
          </count-to>
          <p class="title">{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" class-name="center-number">
      <i-col :md="16" :xs="24">
        <Card>
          <Row :gutter="10">
            <i-col :md="8" :xs="8" v-for="(record, i) in records" :key="i" class-name="center-content">
              <div class="left">
                <count-to :end="record.count" count-class="number-style" />
                <p class="title">{{ record.title }}</p>
              </div>
              <!-- <div class="right">
                <commonIcon :type="i % 2 === 0 ? 'connection-bars' : 'arrow-graph-up-right'" :color="i % 2 === 0 ? '#2d8cf0' : '#f39182'"></commonIcon>
              </div> -->
            </i-col>
          </Row>
        </Card>
         <Card style="height: 660px; margin: 20px 0">
          <h4 slot="title" >近两周流水额</h4>
          <line-chart :waterBill="waterBill" style="height: 380px;margin-top: 40px;"></line-chart>
        </Card>
      </i-col>
      <i-col :md="8" :xs="24">
        <Card>
          <h4 slot="title">POS消费实时推送</h4>
          <ul class="clearfix">
            <li v-for="(item, i) in posRecord" :key="i" class="pos-item">
              <div class="pos-left">
                <span class="m-title" style="color:orange">{{ item.storeName }}</span>
                <span class="m-pay">{{ item.payMode }}</span>
                <span class="m-price" style="color:red">{{ item.transactionMoney }}</span>
              </div>
              <div class="pos-right">
                <span class="m-time">{{ item.transDateTime | formatDate }}</span>

              </div>
            </li>
          </ul>

        </Card>
      </i-col>
      <i-col :md="8" :xs="24" class-name="bottom-card">
        <Card>
          <h4 slot="title">业务排行榜(2018年10月)</h4>
          <RadioGroup value="生态圈商家" type="button" @on-change="radioChange">
            <Radio label="生态圈商家"></Radio>
            <Radio label="POS支付排行"></Radio>
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
import { formatDate } from '@/libs/util'
import CountTo from '_c/count-to'
import lineChart from './lineChart'
import rankChart from './rankChart.vue'
import rankList from '../components/rankList'
import { getCollection, getPos, getMerchantRank, getPosRank, getTransaction } from '@/api/home/home3'

export default {
  name: 'home3', // 供应商首页
  components: {
    InforCard,
    CountTo,
    lineChart,
    commonIcon,
    rankChart,
    rankList
  },
  data() {
    return {
      userId: this.$store.state.user.userId, // TODO
      rankProperty: ['rank', 'merchantsName', 'merchantsAmount', 'transInfo'],
      inforCardData: [
        {
          prop: 'historyAmount',
          title: '历史交易金额（元）',
          icon: '_jinbitixian',
          count: 0,
          color: '#ef7bad',
          decimals: 2
          // lastTime: '2018-07-30 12:32:20'
        },
        {
          prop: 'todayAmount',
          title: '今日交易金额（元）',
          icon: '_jinrigaikuang',
          count: 0,
          color: '#f29485',
          decimals: 2
          // lastTime: '2018-07-30 12:32:20'
        },
        {
          prop: 'historyProfit',
          title: '历史补贴总额（元）',
          icon: '_zuorigaikuang',
          count: 0,
          color: '#53a69c',
          decimals: 2
          // lastTime: '2018-07-30 12:32:20'
        },
        {
          prop: 'lastMonthProfit',
          title: '今日补贴总额（元）',
          icon: '_ai204',
          count: 0,
          color: '#52c8e6',
          decimals: 2
          // lastTime: '2018-07-30 12:32:20'
        }
      ],
      records: [
        { prop: 'merchantsCount', title: '商户数（家）', count: 0 },
        { prop: 'storeCount', title: '门店数（家）', count: 0 },
        { prop: 'posCount', title: 'POS数（台）', count: 0 }
      ],
      posRecord: [],
      rankList: [],
      waterBill: []
    }
  },
  created() {
    this.getInfos()
  },

  methods: {
    getInfos() {
      this._getCollection()
      this._getPos()
      this._getMerchantRank()
      this._getTransaction()
    },

    // 排行榜切换
    radioChange(v) {
      // console.log(v)
      if (v === '生态圈商家') {
        this._getMerchantRank()
      } else if (v === 'POS支付排行') {
        this._getPosRank()
      }
    },

    // 处理卡片上数据
    handleCollection(data) {
      this.inforCardData.forEach(item => {
        if (data[item.prop] || data[item.prop] === 0) {
          item.count = data[item.prop]
        }
      })
      this.records.forEach(item => {
        if (data[item.prop] || data[item.prop] === 0) {
          item.count = data[item.prop]
        }
      })
    },

    // 获取业务员首页汇总信息
    _getCollection() {
      getCollection({ userId: this.userId }).then(res => {
        // console.log(res)
        this.handleCollection(res.data || {})
      })
    },

    // 获取POS数量
    _getPos() {
      getPos({ userId: this.userId }).then(res => {
        // console.log(res)
        this.posRecord = res.data || []
      })
    },

    // 获取商户排行榜
    _getMerchantRank() {
      getMerchantRank({ userId: this.userId }).then(res => {
        // console.log(res)
        this.rankList = res.data || []
      })
    },

    // 获取POS排行榜
    _getPosRank() {
      getPosRank({ userId: this.userId }).then(res => {
        // console.log(res)
        this.rankList = res.data || []
      })
    },

    // 获取本月交易金额
    _getTransaction() {
      getTransaction({ userId: this.userId }).then(res => {
        // console.log(res)
        let newArray = res.data.map((item) => {
          return {
            transactionMoney: item.transactionMoney.toFixed(2),
            transDate: item.transDate
          }
        })
        this.waterBill = newArray
      })
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
  /deep/ .infor-card {
    .title {
      color: #fff;
      font-size: 12px;
    }
    .count-style {
      color: #fff;
      font-size: 18px;
      // font-weight: bold;
    }
  }
  /deep/ .center-number {
    // margin-top: 20px;
    .number-style {
      // font-weight: bold;
      font-size: 18px;
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
      align-items: flex-start;
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
      font-weight: normal;
    }
  }
  .tansLabel{
    float: left;
    padding: 10px 0 30px;
  }
  .pos-item{
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
  }
  .pos-left {
    flex: 1;
      margin-right: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      span:nth-child(1) {
        color: #FF9900;
      }
      span:nth-child(3) {
        color: #FF0000;
      }
  }
  .pos-right{
    float:right;
  }
  .clearfix{
    overflow: hidden;
    li{
      padding:3px 0;
    }
  }
  .ivu-radio-group{
    display:flex;
    justify-content: center;
    align-items: center;
  }
  .radio-group{
    float: left;
    padding:10px 20px;
  }
}
</style>
