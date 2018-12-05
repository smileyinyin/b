
<template>
     <div class="settle">
        <Card>
        <p slot="title">
         商家线上订单分润
        </p>
      <div>
        <div style="width:100%;overflow:hidden">
          <div style="float:right">
             <Input  placeholder="请输入交易流水号" style="width: 120px" v-model="orderSonUuid" clearable/>
           <Input placeholder="请输入商家名称" style="width:120px;margin-left:10px;" v-model="storeName" clearable/>
           <Input placeholder="请输入会员手机号" style="width:120px;margin-left:10px;" v-model="mobile" clearable/>
            <!-- <Select clearable style="width:120px;margin-left:10px;" v-model="profits">
                            <Option value="0">城市分润+渠道分润</Option>
                            <Option value="1">城市分润</Option>

            </Select> -->
            <label style="margin-left:10px">
                        <DatePicker  type="daterange" placement="bottom-end" placeholder="请选择核销时间" style="width:  120px; " v-model="date"></DatePicker>
                          </label>

             <Button type="primary"
             icon="search" @click="getAll" style="margin-left:10px">
                        搜索
              </Button>
          </div>

          </div>
          <br>
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
import { findProfitByRole } from '@/api/jy-water'
import { formatDate } from '@/libs/util'
export default {
  name: 'settle',
  data() {
    return {
      // 交易流水号
      orderSonUuid: '',
      // 商家名称
      storeName: '',
      // 会员手机号
      mobile: '',
      // 分润类型
      // profit: '',
      // 时间
      date: '',
      currentPage: 1,
      pageSize: 20,
      totalCounts: 0,
      // date: '',
      // datas: '',
      params: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '交易流水号',
          key: 'order_son_uuid'
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
          title: '分润类型',
          key: 'profits'
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
          title: '利润',
          key: 'total_profit'
        },
        {
          title: '分润',
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
    getAll() {
      let that = this
      let starttime = formatDate(this.date[0], 'yyyy-MM-dd hh:mm:ss')
      let endtime = formatDate(this.date[1], 'yyyy-MM-dd hh:mm:ss')
      findProfitByRole({
        type: 2,
        merchatType: 0,
        userId: this.$store.state.user.userId,
        roleId: this.$store.state.user.roleId,
        startTime: starttime,
        endTime: endtime,
        orderSonUuid: this.orderSonUuid,
        storeName: this.storeName,
        mobile: this.mobile,
        pageNum: this.currentPage,
        pageSize: this.pageSize
        // profit: this.profit
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
    }
    // updataArray() {
    //   this.data.forEach(item => {
    //     if (item.profit === 0) {
    //       item.profits = '城市分润'
    //     } else if (item.profit === 1) {
    //       item.profits = '城市分润+渠道分润'
    //     }
    //   })
    // }
  }
}
</script>
