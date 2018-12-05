<template>
  <div class="home">
    <Row :gutter="20" class-name="infor-card">
      <i-col :md="6" :xs="12" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;margin-bottom:20px" >
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36" :lastTime="infor.lastTime">
          <count-to :end="infor.count" count-class="count-style" :decimals="infor.decimals">
            <span v-if="infor.prefix" slot="prefix" class="count-style">￥</span>
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
                <commonIcon :type="i % 2 === 0 ? 'connection-bars' : 'arrow-graph-up-right'"
                  :color="i % 2 === 0 ? '#2d8cf0' : '#f39182'"
                ></commonIcon>
              </div> -->
            </i-col>
          </Row>
        </Card>
        <Card style="height: 560px; margin: 20px 0">
          <h4 slot="title" >近两周流水额</h4>
          <RadioGroup v-model="transLabel" type="button" @on-change="radioLabelChange">
            <Radio label="交易金额"></Radio>
            <Radio label="营销金额"></Radio>
          </RadioGroup>
          <example :waterBill="waterBill" style="height: 380px;margin-top: 40px;"/>
        </Card>
      </i-col>
      <i-col :md="8" :xs="24">
        <Card class="posList">
          <h4 slot="title" >POS消费实时推送</h4>
          <ul>
            <li v-for="(item, i) in posRecord" :key="i" class="pos-item">
              <span class="info">
                <Tooltip :content="item.storeName + item.payMode + item.transactionMoney" placement="top">
                  <span>{{ item.storeName }}</span>
                  <span>{{ item.payMode }}</span>
                  <span>{{ item.transactionMoney }}</span>元
                </Tooltip>
              </span>
              <span class="timestamp">{{ item.transDateTime | formatDate }}</span>
            </li>
          </ul>
        </Card>
        <Card class="bussinessList mt20">
          <h4 slot="title">业绩排行榜</h4>
          <RadioGroup v-model="rankLabel" type="button" @on-change="radioChange">
            <Radio label="门店"></Radio>
            <Radio label="POS交易量"></Radio>
          </RadioGroup>
          <rank-list :data="rankList" :isPos="rankLabel === 'POS交易量'" :property="rankProperty"></rank-list>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import InforCard from '_c/info-card'
import commonIcon from '_c/common-icon'
import { formatDate } from '@/libs/util'
import CountTo from '_c/count-to'
import Example from './example.vue'
import rankChart from './rankChart.vue'
import rankList from '../components/rankList'
import { getMerchantCollection, getMerchantPos, getMerchantStoreRank, getMerchantPosRank, getMonthTransaction, getMonthActivity } from '@/api/home/home3'

export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    Example,
    commonIcon,
    rankChart,
    rankList
  },
  data () {
    return {
      rankProperty: ['salesmanSeq', 'storeName', 'csnNo', 'storeAmount', 'transInfo'],

      rankLabel: '门店',
      transLabel: '本月交易金额',
      inforCardData: [
        { prop: 'historyAmount', title: '历史交易金额（元）', icon: '_jinbitixian', count: 0, color: '#ef7bad', decimals: 2, prefix: true },
        { prop: 'todayAmount', title: '今日交易金额（元）', icon: '_jinrigaikuang', count: 0, color: '#f29485', decimals: 2, prefix: true },
        { prop: 'historyTransCount', title: '历史交易笔数', icon: '_zuorigaikuang', count: 0, color: '#53a69c' },
        { prop: 'todayTransCount', title: '今日交易笔数', icon: '_zuorigaikuang', count: 0, color: '#52c8e6' },
        { prop: 'activityAmount', title: '活动交易总额（元）', icon: '_zuorigaikuang', count: 0, color: '#ef7bad', decimals: 2, prefix: true },
        { prop: 'historySubsidyMerchants', title: '历史补贴（元）', icon: '_zuorigaikuang', count: 0, color: '#f29485', decimals: 2, prefix: true },
        { prop: 'todaySubsidyMerchants', title: '今日补贴（元）', icon: '_zuorigaikuang', count: 0, color: '#53a69c', decimals: 2, prefix: true },
        { prop: 'activityTransCount', title: '活动交易笔数', icon: '_ai204', count: 0, color: '#52c8e6' }
      ],
      records: [
        { prop: 'memberCount', title: '会员数（位）', count: 0 },
        { prop: 'posCount', title: 'POS数（台）', count: 0 },
        { prop: 'storeCount', title: '门店数（家）', count: 0 }
      ],
      posRecord: [
        // { storeName: '十足连锁，十足华盛达店', payMode: '微信支付', transactionMoney: 1000, transDateTime: '2018-11-10 10:47:42' },
        // { storeName: '十足连锁，十足华盛达店', payMode: '微信支付', transactionMoney: 1000, transDateTime: '2018-11-10 10:49:15' },
        // { storeName: '十足连锁，十足华盛达店', payMode: '微信支付', transactionMoney: 1000, transDateTime: '2018-11-10 10:49:17' },
        // { storeName: '十足连锁，十足华盛达店', payMode: '微信支付', transactionMoney: 1000, transDateTime: '2018-11-10 10:49:18' },
        // { storeName: '十足连锁，十足华盛达店', payMode: '微信支付', transactionMoney: 1000, transDateTime: '2018-11-10 10:49:20' }
      ],
      rankList: [
        // { salesmanSeq: 1, storeName: '杭州城市代理001', csnNo: '456135485', storeAmount: '3731234.34', transInfo: '10.1' },
        // { salesmanSeq: 1, storeName: '杭州城市代理002', csnNo: '456135485', storeAmount: '3731234.34', transInfo: '10.1' },
        // { salesmanSeq: 1, storeName: '杭州城市代理003', csnNo: '456135485', storeAmount: '3731234.34', transInfo: '10.1' },
        // { salesmanSeq: 1, storeName: '杭州城市代理004', csnNo: '456135485', storeAmount: '3731234.34', transInfo: '10.1' },
        // { salesmanSeq: 1, storeName: '杭州城市代理005', csnNo: '456135485', storeAmount: '3731234.34', transInfo: '10.1' },
        // { salesmanSeq: 1, storeName: '杭州城市代理006', csnNo: '456135485', storeAmount: '3731234.34', transInfo: '10.1' },
        // { salesmanSeq: 1, storeName: '杭州城市代理007', csnNo: '456135485', storeAmount: '3731234.34', transInfo: '10.1' },
        // { salesmanSeq: 1, storeName: '杭州城市代理008', csnNo: '456135485', storeAmount: '3731234.34', transInfo: '10.1' },
        // { salesmanSeq: 1, storeName: '杭州城市代理009', csnNo: '456135485', storeAmount: '3731234.34', transInfo: '10.1' },
        // { salesmanSeq: 1, storeName: '杭州城市代理010', csnNo: '456135485', storeAmount: '3731234.34', transInfo: '10.1' }
      ],
      waterBill: []
    }
  },
  computed: {
    ...mapState({
      merchantId: state => state.user.storesId[0]
    })
  },
  watch: {
    '$store.state.user.storesId': {
      immediate: true,
      handler(v) {
        if (v && v.length) {
          this._getMerchantCollection()
          this._getMerchantPos()
          if (this.rankLabel === '门店') {
            this._getMerchantStoreRank()
          } else {
            this._getMerchantPosRank()
          }
          if (this.transLabel === '本月交易金额') {
            this._getMonthTransaction()
          } else {
            this._getMonthActivity()
          }
        }
      }
    }
  },
  methods: {

    // 排行榜切换
    radioChange(row) {
      console.log(row)
      if (row === '门店') {
        this._getMerchantStoreRank()
      } else if (row === 'POS交易量') {
        this._getMerchantPosRank()
      }
    },
    // 月流水额切换
    radioLabelChange(r) {
      if (r === '本月交易金额') {
        this._getMonthTransaction()
      } else if (r === '本月利润金额') {
        this._getMonthActivity()
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

    // 获取商户首页汇总信息
    _getMerchantCollection() {
      getMerchantCollection({ merchantId: this.merchantId }).then(res => {
        this.handleCollection(res.data || {})
      })
    },

    // 获取POS数量
    _getMerchantPos() {
      getMerchantPos({ merchantId: this.merchantId }).then(res => {
        this.posRecord = res.data || []
      })
    },

    // 获取门店排行榜
    _getMerchantStoreRank() {
      getMerchantStoreRank({ merchantId: this.merchantId }).then(res => {
        // console.log(res)
        this.rankList = res.data || []
      })
    },

    // 获取POS排行榜
    _getMerchantPosRank() {
      getMerchantPosRank({ merchantId: this.merchantId }).then(res => {
        // console.log(res)
        this.rankList = res.data || []
      })
    },
    // 获取折线图月交易金额
    _getMonthTransaction() {
      getMonthTransaction({ merchantId: this.merchantId }).then(res => {
        // console.log(res)
        let newArray = res.data.map((item) => {
          return {
            transactionMoney: item.transactionMoney.toFixed(2),
            transDate: item.transDate
          }
        })
        this.waterBill = newArray
      })
    },
    // 获取折线图月营销金额
    _getMonthActivity() {
      getMonthActivity({ merchantId: this.merchantId }).then(res => {
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
  .ivu-card{
    box-shadow: 0 2px 10px 0 rgba(7, 17, 27, 0.1);
    &:hover {
      box-shadow: 0 14px 30px 0 rgba(0,0,0,.1)!important;
    }
  }
}
/deep/ .infor-card {
  .title {
    color: #fff;
    font-size: 12px;
  }
  .count-style{
    color: #fff;
    font-size: 18px;
    // font-weight: bold;
  }
}
/deep/ .center-number {
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
      margin-right: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      .ivu-tooltip {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      span:nth-child(1) {
        color: #FF9900;
      }
      span:nth-child(3) {
        color: #FF0000;
      }
    }
  }
.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 26px;
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
    font-weight: bold;
  }
}
</style>
