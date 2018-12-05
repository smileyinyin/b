
<template>
     <div class="settle">
       <h3>交易记录</h3>
        <Card>
        <Row type="flex" justify="space-between">
            <i-col>
             <Button type="success" @click="but">明细下载</Button>
            </i-col>
            <i-col>
                <Input  placeholder="请输入交易流水号" class="w120" v-model="batchNumber" clearable/>
                <Select v-model="pay_channel" clearable placeholder="支付渠道" class="w120 ml10">
                <Option value="1">支付宝</Option>
                <Option value="2">微信</Option>
                <Option value="3">借记卡</Option>
                <Option value="4">贷记卡</Option>
                <!-- <Option value="[]">银行卡</Option> -->
              </Select>

                <!-- <Input  placeholder="请输入合伙人" style="width: 100px;margin-left:10px;" v-model=" userName" clearable/>
                <Input  placeholder="请输入合伙人类型" style="width: 100px;margin-left:10px;" v-model="roleName" clearable/> -->
            <!-- <Select clearable style="width:100px;margin-left:10px;" v-model="status">
                            <Option value="0" key="0">城市合伙人</Option>
                            <Option value="1" key="1">渠道合伙人  </Option>
             </Select> -->
                <!-- <Input placeholder="请输入商家名称" style="width:100px;margin-left:10px;" v-model="storeName" clearable/>
                <Input placeholder="请输入会员手机号" style="width:100px;margin-left:10px;" v-model="mobile" clearable/>
                <Input placeholder="请输入终端编码" style="width:100px;margin-left:10px;" v-model="terminal_number" clearable/> -->
                <DatePicker  type="daterange" placement="bottom-end" placeholder="请选择交易时间" class="w165 ml10" v-model="date"></DatePicker>

                <Button type="primary" icon="search" @click="getAll" style="margin-left:10px">查询</Button>
            </i-col>
        </Row>
                 <Table  :columns="params" :data="data" stripe border class="mt20"></Table>
                  <Page :total="totalCounts" show-sizer :page-size="pageSize" :current.sync="currentPage" @on-change="getpage" @on-page-size-change="changePageSize" class="mt20 tr"> </Page>
        </Card>
        <Modal
                   v-model="modal"
                   title="确认提示"
                   @on-ok="ok"
                   @on-cancel="cancel" >
                  <p style="font-size:14px">请选择时间：</p>
                  <DatePicker  type="datetimerange" placement="bottom-end" placeholder="请选择结算时间" style="width:  450px;margin-top:20px " v-model="date1"></DatePicker>
        </Modal>
     </div>
</template>
<script>
import { posFlowList } from '@/api/zd'
import { formatDate } from '@/libs/util'
import makeColumn from './column'
import BASE_URL from '../../../config/url'

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
      pay_channel: '',
      currentPage: 1,
      pageSize: 20,
      totalCounts: 0,
      date1: '',
      date: '',
      modal: false,
      params: makeColumn(this.$store.state.user.access[0]),
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
      posFlowList({
        userId: this.$store.state.user.userId,
        roleId: this.$store.state.user.roleId,
        // type: 2,
        // merchatType: 1,
        // userId: 2,
        // roleId: 2,
        // 交易流水号
        batch_number: this.batchNumber,
        mobile: '',
        // 渠道合伙人
        // userName: this.userName,
        // 渠道合伙人类型
        // roleName: this.roleName,
        // 商家名称
        storeName: '',
        // 会员手机号
        // mobile: this.mobile,
        // 终端号
        pos_terminal_code: '',
        // 终端编码
        // terminal_number: this.terminal_number,
        //  会员小票名称
        // ticketName: this.ticketName,
        // 支付渠道
        pay_channel: this.pay_channel,
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
        // that.updateArray()
      })
    },
    // updateArray() {
    //   this.data.forEach(item => {
    //     if (item.pos_status === 1) {
    //       item.shstatus = '正常'
    //     } else if (item.pos_status === 2) {
    //       item.shstatus = '分期'
    //     } else if (item.pos_status === 3) {
    //       item.shstatus = '试用'
    //     } else if (item.pos_status === 4) {
    //       item.sfstatus = '停机'
    //     } else if (item.pos_status === 5) {
    //       item.sfstatus = '解绑'
    //     } else if (item.pos_status === 6) {
    //       item.sfstatus = '故障'
    //     } else if (item.pos_status === 7) {
    //       item.sfstatus = '回收'
    //     } else if (item.pos_status === 8) {
    //       item.sfstatus = '重修'
    //     }
    //   })
    // },
    but() {
      this.modal = true
    },
    ok() {
      window.open(BASE_URL + 'financial/order/posFlowdown' +
        '?roleId=' + this.$store.state.user.roleId +
        '&userId=' + this.$store.state.user.userId +
        '&startTime=' + formatDate(this.date1[0]) +
        '&endTime=' + formatDate(this.date1[1])
      )
      // posFlowdown({
      //   roleId: this.$store.state.user.roleId,
      //   userId: this.$store.state.user.userId,
      //   startTime: formatDate(new Date(this.date1[0]), 'yyyy-MM-dd hh:mm:ss'),
      //   endTime: formatDate(new Date(this.date1[1]), 'yyyy-MM-dd hh:mm:ss')
      // }).then(res => {
      //   debugger
      //   var form = document.createElement('form')
      //   form.action = res.data
      //   form.method = 'get'
      //   document.body.appendChild(form)
      //   form.submit()
      //   document.body.removeChild(form)
      // })
    },
    cancel() {}
  }
}
</script>
