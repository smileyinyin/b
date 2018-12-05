
<template>
     <div class="settle">
        <Card>
        <p slot="title">
         供应链分润
        </p>
      <div>
        <div style="width:100%">
          <div class="tr">
             <Input  placeholder="请输入订单号号" style="width: 120px" v-model="orderSonUuid" clearable/>
           <Input placeholder="请输入渠道合伙人名称" style="width:120px;margin-left:10px;" v-model="roleName" clearable/>
           <Input placeholder="请输入商家名称" style="width:120px;margin-left:10px;" v-model="storeName" clearable/>
           <Input placeholder="请输会员手机号" style="width:120px;margin-left:10px;" v-model="mobile" clearable/>
           <Input placeholder="请输商品名称" style="width:120px;margin-left:10px;" v-model="goods_name" clearable/>
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
      // userId: '',
      // roleId: '',
      // 订单号
      orderSonUuid: '',
      // 商家名称
      storeName: '',
      // 商品名称
      goods_name: '',
      // 会员手机号
      mobile: '',
      roleName: '',
      currentPage: 1,
      pageSize: 20,
      totalCounts: 0,
      date: '',
      // datas: {},
      params: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '订单号',
          key: 'order_son_uuid'
        },
        {
          title: '渠道合伙人名称',
          key: 'roleName'
        },
        {
          title: '供应商',
          key: 'name'
        },

        {
          title: '会员手机号',
          key: 'mobile'
        },
        // {
        //   title: '商品',
        //   key: 'goods_name'
        // },
        {
          title: '商品数',
          key: 'number'
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
          title: '返利',
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
    // console.log(this.datas)
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
        merchatType: 1,
        userId: this.$store.state.user.userId,
        roleId: this.$store.state.user.roleId,
        // roleId: this.datas.roleId,
        startTime: starttime,
        endTime: endtime,
        orderSonUuid: this.orderSonUuid,
        goods_name: this.goods_name,
        storeName: this.storeName,
        mobile: this.mobile,
        roleName: this.roleName,
        // profit: this.profit,
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
      })
    }
  }
}
</script>
