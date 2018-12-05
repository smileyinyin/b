
<template>
     <div class="settle">
       <h3 class="pb10">月度账单</h3>
        <Card>
          <Row>
             <i-col span="24" align="right">
                  <Select v-model="merchantsId" style="width:150px" clearable>
                        <Option v-for="(item, index) in shopNameList" :key="index" :value="item.id">{{item.name}}</Option>
                  </Select>
              <DatePicker  type="month" placement="bottom-end" placeholder="请选择时间" style="width:150px;margin-left:10px " v-model="date"></DatePicker>
              <Button type="primary" icon="search" @click="getAll" style="margin-left:10px" >查询</Button>
             </i-col>
          </Row>
              <Table  :columns="params" :data="data" stripe border class="mt20"></Table>
              <Page :total="totalCounts" show-sizer :page-size="pageSize" :current.sync="currentPage" @on-change="getpage" @on-page-size-change="changePageSize" class="mt20 tr"> </Page>
        </Card>
       </div>
</template>
<script>
import { getmonthCensus } from '@/api/zd'
import { formatDate } from '@/libs/util'
import { getMerchantsList } from '@/api/merchant'
import breadCrumb from '_c/breadCrumb/breadCrumb'
export default {
  name: 'settle',
  components: {
    breadCrumb
  },
  data() {
    return {
      date: '',
      currentPage: 1,
      pageSize: 20,
      totalCounts: 0,
      merchantsId: null,
      shopNameList: [],
      month: '',
      url: '', // 报表地址
      params: [
        {
          title: '序号',
          // key: 'id',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '账单号',
          key: 'billNo'
        },
        {
          title: '账单日期',
          key: 'billDate'
        },
        {
          title: '生成日期',
          key: 'createTime',
          render: (h, params) => {
            return h(
              'span',
              null,
              formatDate(
                new Date(params.row.createTime),
                'yyyy-MM-dd hh:mm:ss'
              )
            )
          }
        },
        {
          title: '商户名称',
          key: 'merchantsName'
        },
        {
          title: '交易门店数',
          key: 'tradeStoreNumber'
        },
        {
          title: '交易笔数',
          key: 'tradeBillNumber'
        },
        {
          title: '补贴总额',
          key: 'totalSubsidiesPrice'
        },
        {
          title: '交易总额',
          key: 'totalTradeMoney'
        },
        {
          title: '操作',
          width: 200,
          key: 'control',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {},
                  on: {
                    click: () => {
                      this.but(params.row)
                    }
                  }
                },
                '账单明细'
              )
            ])
          }
        }
      ],
      data: []
    }
  },
  created() {
    // 获取商户列表
    getMerchantsList({ userId: this.$store.state.user.userId,
      roleId: this.$store.state.user.roleId }).then(res => {
      this.shopNameList = res.data.list
    })
    this.getAll()
  },
  methods: {
    getpage(page) {
      this.currentPage = page
      this.getAll()
    },
    changePageSize(size) {
      this.pageSize = size
      this.getAll()
    },
    getAll() {
      let that = this
      this.month = formatDate(this.date, 'yyyy-MM')
      getmonthCensus({
        userId: this.$store.state.user.userId,
        roleId: this.$store.state.user.roleId,
        month: this.month,
        merchatId: this.merchantsId,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (res.data) {
          that.data = res.data.list
          that.totalCounts = res.data.total
        } else {
          that.data = []
          that.totalCounts = 0
        }
      })
    },
    but(row) {
      this.url = row.downUrl
      window.open(this.url)
    }
  }
}
</script>
