<template>
    <div class="integral-detail">
      <bread-crumb :data="[{title: '用户管理'}, {title: '积分明细'}]"></bread-crumb>
      <Card>
        <Table border :columns="columns" :data="tableData" class="mt20"></Table>
        <Page :total="totalCounts" show-sizer :page-size="params.pageSize" :current.sync="params.pageNum" @on-change="getpage" @on-page-size-change="changePageSize" class="mt20 tr"></Page>
      </Card>
    </div>
</template>

<script>
import { findUserIntegralLog } from '@/api/userManger'
import breadCrumb from '_c/breadCrumb/breadCrumb'
export default {
  components: {
    breadCrumb
  },
  name: 'integralDetail',
  data() {
    return {
      totalCounts: 1,
      params: {
        pageSize: 20,
        pageNum: 1,
        user_id: null
      },
      columns: [
        {
          title: '时间',
          key: 'Time'
        },
        // {
        //   title: '地址',
        //   key: 'name'
        // },
        {
          title: '事件',
          key: 'click',
          render: (h, params) => {
            return h('div', [
              h('span', params.row.event_type === 1 ? '订单返利' : (params.row.status === 2 ? 'POS机消费返利' : '商品分享返利 '))
            ])
          }
        },
        {
          title: '积分',
          key: 'integral'
        }
      ],
      tableData: [
      ]
    }
  },
  created() {
    this.params.user_id = this.$route.query.id
    this.getAll()
  },
  methods: {
    getAll() {
      let that = this
      findUserIntegralLog(that.params).then(res => {
        that.tableData = res.data.list
        that.totalCounts = res.data.total
        that.updatedArray()
      })
    },
    changePageSize(val) {
      this.params.pageSize = val
      this.getAll()
    },
    getpage(val) {
      this.params.pageNum = val
      this.getAll()
    },
    updatedArray() {
      this.tableData.forEach((item) => {
        let time = new Date(item.create_time)
        let y = time.getFullYear()
        let m = time.getMonth() + 1
        let d = time.getDate()
        let h = time.getHours()
        let mm = time.getMinutes()
        let s = time.getSeconds()
        item.Time = y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
      })
    },
    add0(m) { return m < 10 ? '0' + m : m }
  }
}
</script>
