
<template>
     <div class="settle">
       <h3 class="pb10">业务员结算</h3>
        <Card>
          <Row>
             <i-col span="24" align="right">
              <Input  placeholder="请输入结算单号" style="width: 100px" v-model="bill_uuid" clearable />
              <Input  placeholder="请输入手机号" style="width: 100px" v-model="bill_uuid" clearable />
              <Input  placeholder="请输入业务员" style="width: 100px" v-model="bill_uuid" clearable />
              <Select clearable style="width:100px;margin-left:10px;" v-model="state" placeholder="请选择状态">
                            <Option value="0" key="0">已结算</Option>
                            <Option value="1" key="1">未结算</Option>
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
          title: '结算单号',
          key: 'billNo'
        },
        {
          title: '年月',
          key: 'billDate'
        },
        {
          title: '业务员',
          key: 'billNo'
        },
        {
          title: '手机号',
          key: 'billNo'
        },
        {
          title: '可结算金额',
          key: 'tradeBillNumber'
        },
        {
          title: '结算状态',
          key: 'totalSubsidiesPrice'
        },
        {
          title: '结算单生成时间',
          key: 'totalTradeMoney'
        },
        {
          title: '结算时间',
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
