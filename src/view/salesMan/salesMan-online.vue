
<template>
     <div class="settle">
        <Card>
        <p slot="title">
          线上商家分润
        </p>
      <div>
        <div style="width:100%">
          <div class="tr">
 <Input  placeholder="请输入交易流水号" style="width: 120px" v-model="orderSn" clearable/>
           <Input  placeholder="请输入业务员名称或手机号" style="width: 120px;margin-left:10px;" v-model="roleName" clearable/>
           <Input  placeholder="请输入商家名称" style="width: 120px;margin-left:10px;" v-model="storeName" clearable/>
           <Input  placeholder="请输入会员手机号" style="width: 120px;margin-left:10px;" v-model="mobile" clearable/>
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
import { findProfitByRole } from '@/api/jy-water'
import { formatDate } from '@/libs/util'
export default {
  name: 'settle',
  data() {
    return {
      // 订单号
      orderSn: '',
      // 手机号
      mobile: '',
      // 商家姓名
      storeName: '',
      //
      roleName: '',
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
          title: '交易流水号',
          key: 'order_son_uuid'
        },
        {
          title: '业务员名称或手机号',
          key: 'roleName'
        },
        {
          title: '商家名称',
          key: 'goods_name'
        },

        {
          title: '会员手机号',
          key: 'mobile'
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
          key: 'real_money'
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
    },
    changePageSize(size) {
      this.pageSize = size
    },
    getAll() {
      let that = this
      let starttime = formatDate(this.date[0], 'yyyy-MM-dd hh:mm:ss')
      let endtime = formatDate(this.date[1], 'yyyy-MM-dd hh:mm:ss')
      findProfitByRole({
        orderType: 0,
        type: 2,
        merchatType: 0,
        userId: this.$store.state.user.userId,
        roleId: this.$store.state.user.roleId,
        mobile: this.mobile,
        orderSn: this.orderSn,
        storeName: this.storeName,
        roleName: this.roleName,
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
      })
    }
  }
}
</script>
