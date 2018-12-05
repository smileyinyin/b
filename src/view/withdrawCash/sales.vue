
<template>
     <div class="settle">
      <h3 class="pb10">我的结算</h3>
        <Card>
        <Row>
          <i-col span="24" align="right">
             <Input  placeholder="请输入账单号" style="width: 100px" v-model="bill_uuid" clearable />
             <!-- <Input  placeholder="请输入用户名" style="width: 100px;margin-left:10px;" v-model="partnerName" clearable /> -->
             <!-- <Select clearable style="width:100px;margin-left:10px;" v-model="partnerType" >
                            <Option value="1" key="1">城市合伙人</Option>
                            <Option value="2" key="2">渠道合伙人</Option>
             </Select> -->
             <Select clearable style="width:100px;margin-left:10px;" v-model="state" placeholder="请选择状态">
                            <Option value="0" key="0">待审核</Option>
                            <Option value="1" key="1">已打款</Option>
                            <Option value="-1" key="-1">未提现</Option>
                            <Option value="2" key="2">审核不通过</Option>
             </Select>
             <DatePicker  type="daterange" placement="bottom-end" placeholder="请选择生成时间" style="width:200px;margin-left:10px " v-model="date" ></DatePicker>
             <Button type="primary" icon="search" @click="getAll" style="margin-left:10px" >查询</Button>
          </i-col>
        </Row>
        <Table  :columns="params" :data="data" stripe border class="mt20"></Table>
        <Page :total="totalCounts" show-sizer :page-size="pageSize" :current.sync="currentPage" @on-change="getpage" @on-page-size-change="changePageSize" class="mt20 tr"> </Page>
        </Card>
       </div>
</template>
<script>
import { monthBillList } from '@/api/money/index'
import UploadImg from '_c/uploadImg/uploadImg'
import { formatDate } from '@/libs/util'
import makeColums from './data/sales'
export default {
  name: 'settle',
  components: {
    UploadImg
  },
  data() {
    return {
      isShowActive: false,
      isShow: false,
      show: false,
      currentPage: 1,
      pageSize: 20,
      totalCounts: 0,
      year: '',
      date: '',
      date1: '',
      url: '',
      bill_uuid: '',
      partnerType: '',
      partnerName: '',
      state: '',
      imgList: [],
      editID: null, // 发票的id
      ID: null, // 账单的id
      params: makeColums.call(this),
      data: []
    }
  },

  created() {
    this.getAll()
  },
  methods: {
    getAll() {
      let startTime = formatDate(this.date[0], 'yyyy-MM')
      let ecdTime = formatDate(this.date[1], 'yyyy-MM')
      monthBillList({
        billNo: this.bill_uuid,
        userId: this.$store.state.user.userId,
        roleId: this.$store.state.user.roleId,
        partnerName: this.partnerName,
        state: this.state,
        partnerType: this.partnerType,
        startTime: startTime,
        endTime: ecdTime,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (res.data) {
          this.data = res.data.list
          this.totalCounts = res.data.total
        } else {
          this.data = []
          this.totalCounts = 0
        }
        this.updateArray()
      })
    },
    updateArray() {
      this.data.forEach(item => {
        if (item.bill_no === 0) {
          item.ttstatus = '待审核'
        } else if (item.bill_no === 1) {
          item.ttstatus = '已打款'
        } else if (item.bill_no === 2) {
          item.ttstatus = '审核不通过'
        } else if (item.bill_no === -1) {
          item.ttstatus = '未提现'
        }
        if (item.role_id === 1) {
          item.partnerstatus = '城市合伙人'
        } else {
          item.partnerstatus = '渠道合伙人'
        }
      })
    },
    getpage(page) {
      this.currentPage = page
      this.getAll()
    },
    changePageSize(size) {
      this.pageSize = size
      this.getAll()
    }
  }
}
</script>
