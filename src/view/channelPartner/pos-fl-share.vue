
<template>
     <div class="settle">
        <Card>
        <p slot="title">
         POS费率分润
        </p>
      <div>
        <div style="width:100%">
          <div class="tr">
            <Input  placeholder="请输入交易流水号" style="width: 120px" v-model="batchNumber" clearable/>
           <Input placeholder="请输入渠道合伙人名称" style="width:120px;margin-left:10px;" v-model="roleName" clearable/>
           <Input placeholder="请输入商家名称" style="width:120px;margin-left:10px;" v-model="storeName" clearable/>
           <Input placeholder="请输入会员手机号" style="width:120px;margin-left:10px;" v-model="mobile" clearable/>
           <Input placeholder="请输入终端编码" style="width:120px;margin-left:10px;" v-model="csn" clearable/>
           <Input placeholder="请输入商户小票名称" style="width:120px;margin-left:10px;" v-model="ticketName" clearable/>
            <label style="margin-left:10px">
                        <DatePicker  type="daterange" placement="bottom-end" placeholder="请选择核销时间" style="width:  120px; " v-model="date"></DatePicker>
                          </label>

             <Button type="primary"
             icon="search" @click="getAll" style="margin-left:10px">
                        搜索
              </Button>
          </div>

          </div>
               <div class="tr" style="margin-top:20px;">
                 <Table  :columns="params" :data="data" stripe border></Table>
                 <br>
                  <Page :total="totalCounts" show-sizer
              :page-size="pageSize" :current.sync="currentPage"
              @on-change="getpage"
              @on-page-size-change="changePageSize"
        > </Page>
                </div>

      </div>

        </Card>
       </div>
</template>
<script>
import { findPosProfitByRole } from '@/api/jy-water'
import { formatDate } from '@/libs/util'
export default {
  name: 'settle',
  data() {
    return {
      // pos流水号
      batchNumber: '',
      roleName: '',
      // 商家名称
      storeName: '',
      // 会员手机号
      mobile: '',
      // 终端编码
      csn: '',
      // 小票名称
      ticketName: '',
      // 时间
      date: '',
      currentPage: 1,
      pageSize: 20,
      totalCounts: 0,
      // date: '',
      // datas: {},
      params: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: 'pos流水号',
          key: 'batch_number'
        },
        {
          title: '渠道合伙人',
          key: 'roleName'
        },
        {
          title: '商家名称',
          key: 'name'
        },

        {
          title: '会员手机号',
          key: 'mobile'
        },
        {
          title: '终端编码',
          key: 'pos_csn_number'
        },
        {
          title: '机具状态',
          key: 'shstatus'
        },
        {
          title: '商户小票名称',
          key: 'scan_tickets_name'
        },
        {
          title: '应收',
          key: 'deal_price'
        },
        {
          title: '实收',
          key: 'real_price'
        },
        {
          title: '费率利润比',
          key: 'profit_rate'
        },
        {
          title: '利润',
          key: 'profit'
        },
        {
          title: '核销时间',
          key: 'create_time',
          render: (h, params) => {
            return h(
              'span',
              null,
              formatDate(
                new Date(params.row.create_time),
                'yyyy-MM-dd hh:mm:ss'
              )
            )
          }
        }
      ],
      data: []
    }
  },
  created() {
    // this.datas = JSON.parse(localStorage.getItem('cp_userInfo'))
    this.getAll()
  },
  methods: {
    getpage(page) {
      this.currentPage = page
    },
    changePageSize(size) {
      this.pageSize = size
    },
    // findPosProfitByRole
    getAll() {
      let that = this
      let starttime = formatDate(this.date[0], 'yyyy-MM-dd hh:mm:ss')
      let endtime = formatDate(this.date[1], 'yyyy-MM-dd hh:mm:ss')
      findPosProfitByRole({
        // type: 2,
        // merchatType: 1,
        userId: this.$store.state.user.userId,
        roleId: this.$store.state.user.roleId,
        // roleId: this.datas.roleId,
        startTime: starttime,
        endTime: endtime,
        batchNumber: this.batchNumber,
        storeName: this.storeName,
        roleName: this.roleName,
        mobile: this.mobile,
        csn: this.csn,
        ticketName: this.ticketName,
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
        this.updateArray()
      })
    },
    updateArray() {
      this.data.forEach(item => {
        if (item.pos_status === 1) {
          item.shstatus = '正常'
        } else if (item.pos_status === 2) {
          item.shstatus = '分期'
        } else if (item.pos_status === 3) {
          item.shstatus = '试用'
        } else if (item.pos_status === 4) {
          item.sfstatus = '停机'
        } else if (item.pos_status === 5) {
          item.sfstatus = '解绑'
        } else if (item.pos_status === 6) {
          item.sfstatus = '故障'
        } else if (item.pos_status === 7) {
          item.sfstatus = '回收'
        } else if (item.pos_status === 8) {
          item.sfstatus = '重修'
        }
        // if (item.status === 0) {
        //   item.sfstatus = '上架'
        // } else if (item.status === 1) {
        //   item.sfstatus = '下架'
        // }
      })
    }
  }
}
</script>
