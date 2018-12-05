
<template>
     <div class="settle">
       <h3>POS费率分润</h3>
        <Card>
        <Row>
            <i-col span="2" align="left">
             <Button type="success" @click="but">分润明细</Button>
            </i-col>
            <i-col span="22" align="right">
                <Input  placeholder="请输入交易流水号" style="width: 100px" v-model="batchNumber" clearable/>
                <Input  placeholder="请输入合伙人" style="width: 100px;margin-left:10px;" v-model=" userName" clearable/>
                <Input  placeholder="请输入合伙人类型" style="width: 100px;margin-left:10px;" v-model="roleName" clearable/>
            <!-- <Select clearable style="width:100px;margin-left:10px;" v-model="status">
                            <Option value="0" key="0">城市合伙人</Option>
                            <Option value="1" key="1">渠道合伙人  </Option>
             </Select> -->
                <Input placeholder="请输入商家名称" style="width:100px;margin-left:10px;" v-model="storeName" clearable/>
                <Input placeholder="请输入会员手机号" style="width:100px;margin-left:10px;" v-model="mobile" clearable/>
                <Input placeholder="请输入终端编码" style="width:100px;margin-left:10px;" v-model="terminal_number" clearable/>
                <label style="margin-left:10px">
                        <DatePicker  type="daterange" placement="bottom-end" placeholder="请选择核销时间" style="width:  150px; " v-model="date"></DatePicker>
                          </label>

                 <Button type="primary" icon="search" @click="getAll" style="margin-left:10px">查询</Button>
            </i-col>
        </Row>
                 <Table  :columns="params" :data="data" stripe border class="mt20"></Table>
                  <Page :total="totalCounts" show-sizer :page-size="pageSize" :current.sync="currentPage" @on-change="getpage" @on-page-size-change="changePageSize" class="mt20 tr"> </Page>
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
      // 流水号
      batchNumber: '',
      // 渠道合伙人
      userName: '',
      // 商家名称
      storeName: '',
      // 渠道合伙人类型
      roleName: '',
      // 终端编码
      terminal_number: '',
      //  会员小票名称
      ticketName: '',
      // 会员手机号
      mobile: '',
      currentPage: 1,
      pageSize: 20,
      totalCounts: 0,
      date: '',
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
          title: '合伙人名称',
          key: 'userName'
        },
        {
          title: '合伙人类型',
          key: 'chstatus'
        },
        {
          title: '商家名称',
          key: 'storeName'
        },

        {
          title: '会员手机号',
          key: 'mobile'
        },
        {
          title: '终端编码',
          key: 'terminal_number'
        },
        // {
        //   title: '机具状态',
        //   key: 'shstatus'
        // },
        {
          title: '支付类型',
          key: 'scan_tickets_name'
        },
        {
          title: '应收',
          key: 'deal_price'
        },
        {
          title: '卡活动',
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
    this.getAll()
    // this.updataArray()
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
      let starttime = formatDate(this.date[0], 'yyyy-MM-dd hh:mm:ss')
      let endtime = formatDate(this.date[1], 'yyyy-MM-dd hh:mm:ss')
      findPosProfitByRole({
        // type: 2,
        // merchatType: 1,
        // userId: 2,
        roleId: 2,
        // 交易流水号
        batchNumber: this.batchNumber,
        // 渠道合伙人
        userName: this.userName,
        // 渠道合伙人类型
        roleName: this.roleName,
        // 商家名称
        storeName: this.storeName,
        // 会员手机号
        mobile: this.mobile,
        // 终端编码
        terminal_number: this.terminal_number,
        //  会员小票名称
        ticketName: this.ticketName,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        startTime: starttime,
        endTime: endtime
      }).then(res => {
        if (res.data) {
          that.data = res.data.list
          that.totalCounts = res.data.total
        } else {
          that.data = []
          that.totalCounts = 0
        }
        that.updateArray()
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
      })
    }
  }
}
</script>
