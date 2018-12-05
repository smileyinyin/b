<template>
  <div class="user-manger">
    <h3 style="padding-bottom: 10px">会员管理</h3>
    <Card>
      <Row>
        <Col span="24" align="right">
          <!-- <Select placeholder="会员状态" clearable style="width: 180px; margin-right: 20px; text-align: left;" v-model="params.status">
            <Option :value="0">正常</Option>
            <Option :value="1">冻结</Option>
          </Select> -->
          <Input clearable placeholder="请输入会员ID" style="width: 180px; margin-right: 20px;" v-model="params.mobile"/>
          <DatePicker  type="daterange" placement="bottom-end" placeholder="请选择生成时间" style="width:200px;margin-right:20px " v-model="date" ></DatePicker>
          <Button type="primary" icon="ios-search" @click="getAll">查询</Button>
        </Col>
      </Row>
      <Table border :columns="columns" :data="tableData" style="margin-top: 20px;"></Table>
      <Page :total="totalCounts" show-sizer :page-size="params.pageSize" :current.sync="params.pageNum" @on-change="getpage" @on-page-size-change="changePageSize" style="margin-top: 20px; text-align: right"> </Page>
    </Card>
  </div>
</template>

<script>
import { findMemberList } from '@/api/userManger'
import { formatDate } from '@/libs/util'
export default {
  name: 'userManger',
  data () {
    return {
      params: {
        pageNum: 1,
        pageSize: 20,
        merchantId: String(this.$store.state.user.storesId),
        startTime: null,
        endTime: null,
        mobile: null
      },
      date: '',
      totalCounts: 0,
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60
        },
        {
          title: '会员ID',
          key: 'mobile'
        },
        {
          title: '最后一次返利',
          key: '暂无'
        },
        {
          title: '历史返利',
          key: '暂无'
        },
        {
          title: '消费总额',
          key: 'transactionMoney'
        },
        {
          title: '注册时间',
          key: '',
          width: 120,
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
        }
      ],
      tableData: []
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    getAll() {
      let that = this
      this.params.startTime = formatDate(this.date[0], 'yyyy-MM-dd hh:mm:ss')
      this.params.endTime = formatDate(this.date[1], 'yyyy-MM-dd hh:mm:ss')
      findMemberList(that.params).then(res => {
        if (res.data) {
          this.tableData = res.data.list
          this.totalCounts = res.data.total
        } else {
          this.tableData = []
          this.totalCounts = 0
        }
      })
    },
    // 分页切换
    getpage(val) {
      this.params.pageNum = val
      this.getAll()
    },
    // 页面条数切换
    changePageSize(val) {
      this.params.pageSize = val
      this.getAll()
    }
  }
}
</script>

<style lang="less">
</style>
