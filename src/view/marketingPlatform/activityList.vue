
<template>
  <div class="activity-list">
    <h3 class="pb20">活动列表</h3>
    <Card>
      <Row type="flex" justify="end">
        <Col>
          <Input v-model="searchForm.act_name" placeholder="活动名称" class="w180 mr20" clearable/>
          <DatePicker v-model="date" type="daterange" placement="bottom-end" placeholder="选择日期" class="w180 mr20"></DatePicker>
          <Button type="primary" icon="ios-search" @click="getActivityList">查询</Button>
        </Col>
      </Row>
      <Table border :columns="columns" :data="tableData" class="mt20"></Table>
      <Page :total="searchForm.totalCounts" show-sizer :page-size="searchForm.pageSize" :current.sync="searchForm.pageNum" @on-change="getActivityList" @on-page-size-change="changePageSize" class="mt20 tr"></Page>
    </Card>
  </div>
</template>

<script>
import { getActivityList } from '@/api/bank/bank'
import { formatDate } from '@/libs/util'

export default {
  data() {
    return {
      date: [],
      searchForm: {
        // TODO 商户ID从登陆时获取
        merchant_id: String(this.$store.state.user.storesId), // '1,2', // 商户 ID, 数组
        act_name: '', // 活动名称、
        start_date: '',
        end_date: '',
        pageNum: 1,
        pageSize: 20,
        totalCounts: 0
      },
      tableData: [],
      columns: [
        {
          title: '活动ID',
          key: 'id'
        },
        {
          title: '活动名称',
          key: 'name'
        },
        {
          title: '活动类型',
          key: 'ruleType'
        },
        {
          title: '银行',
          key: 'bankName'
        },
        {
          title: '参与卡bin',
          key: 'data',
          render: (h, params) => {
            return h('span', null, params.row.data || '不限制')
          }
        },
        {
          title: '开始时间',
          key: 'startTime'
        },
        {
          title: '结束时间',
          key: 'endTime'
        },
        {
          title: '状态',
          key: 'status'
        }
      ]
    }
  },
  created() {
    this.getActivityList()
  },
  methods: {
    getActivityList() {
      getActivityList(Object.assign({}, this.searchForm, {
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
      this.getActivityList()
    }
  }
}
</script>
