
<template>
  <div class="account-statement">
    <h3 class="pb20">交易流水</h3>
    <Card>
      <Row type="flex" justify="end">
        <Col>
          <Input v-model="searchForm.activity_title" placeholder="活动名称" class="w180 mr20" clearable/>
          <DatePicker v-model="date" type="daterange" placement="bottom-end" placeholder="选择日期" class="w180 mr20"></DatePicker>
          <Button type="primary" icon="ios-search" @click="getTransactionList">查询</Button>
        </Col>
      </Row>
      <Table border :columns="columns" :data="tableData" class="mt20"></Table>
      <Page :total="searchForm.totalCounts" show-sizer :page-size="searchForm.pageSize" :current.sync="searchForm.pageNum" @on-change="getTransactionList" @on-page-size-change="changePageSize" class="mt20 tr"></Page>
    </Card>
  </div>
</template>

<script>
import { getTransactionList } from '@/api/bank/bank'
import { formatDate } from '@/libs/util'

export default {
  data() {
    return {
      date: [],
      searchForm: {
        // TODO 商户ID从登陆时获取
        merchant_id: String(this.$store.state.user.storesId), // '1,2', // 商户ID
        start_date: '',
        end_date: '',
        activity_title: '',
        pageNum: 1,
        pageSize: 20,
        totalCounts: 0
      },
      tableData: [],
      columns: [
        {
          title: '活动id',
          key: 'activityId'
        },
        {
          title: '流水号',
          key: 'transNo'
        },
        {
          title: '活动名称',
          key: 'activityTitle'
        },
        {
          title: '活动类型',
          key: 'ruleType'
        },
        {
          title: '终端号',
          key: 'acquirerTerminalNumber'
        },
        {
          title: '交易时间',
          key: 'transDateTime'
        },
        {
          title: '收款金额',
          key: 'payAmount'
        },
        {
          title: '补贴',
          key: 'subsidyStoreAmount'
        },
        {
          title: '总金额',
          key: 'totalAmount'
        }
      ]
    }
  },
  created() {
    this.getTransactionList()
  },
  methods: {
    getTransactionList() {
      getTransactionList(Object.assign({}, this.searchForm, {
        start_date: formatDate(this.date[0]),
        end_date: formatDate(this.date[1])
      })).then(res => {
        if (res.data) {
          this.tableData = res.data.list
          this.searchForm.totalCounts = res.data.total
        } else {
          this.tableData = []
          this.searchForm.totalCounts = 0
        }
      })
    },
    changePageSize(size) {
      this.searchForm.pageSize = size
      this.getTransactionList()
    }
  }
}
</script>
