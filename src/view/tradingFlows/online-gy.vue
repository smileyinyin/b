
<template>
     <div class="settle">
        <Card>
        <p slot="title">
          线上供应链流水
        </p>
      <div>
        <div style="width:100%;overflow:hidden">
          <div class="r">
              <Input placeholder="请输入订单号" style="width: 120px" v-model="orderSn" clearable/>
           <Input placeholder="请输入会员手机号" style="width:120px;margin-left:10px;" v-model="mobile" clearable/>
           <Input placeholder="请输入商家名称" style="width:120px;margin-left:10px;" v-model="storeName" clearable/>
           <Input placeholder="请输入商品名称" style="width:120px;margin-left:10px;" v-model="goods_name" clearable/>
            <label style="margin-left:10px">
                        <DatePicker  type="daterange" placement="bottom-end" placeholder="请选择核销时间" style="width:  200px; " v-model="date"></DatePicker>
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
import { flowList } from '@/api/jy-water'
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
      goods_name: '',
      //
      currentPage: 1,
      pageSize: 20,
      totalCounts: 0,
      date: '',
      datas: '',
      params: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '订单号',
          key: 'order_son_no'
        },
        {
          title: '会员ID',
          key: 'user_id'
        },
        {
          title: '供应商',
          key: 'name'
        },
        {
          title: '商品名称',
          key: 'goods_name'
        },
        {
          title: '商品数',
          key: 'number'
        },
        {
          title: '应收',
          key: 'total_price'
        },
        {
          title: '实收',
          key: 'total_price'
        },
        {
          title: '核销时间',
          key: 'create_time',
          render: (h, params) => {
            return h('span', null, formatDate(new Date(params.row.create_time), 'yyyy-MM-dd hh:mm:ss'))
          }
        }
      ],
      data: []
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    // fmtDate(obj) {
    //   let date = new Date(obj)
    //   let y = 1900 + date.getYear()
    //   let m = '0' + (date.getMonth() + 1)
    //   let d = '0' + date.getDate()
    //   return (
    //     y +
    //     '-' +
    //     m.substring(m.length - 2, m.length) +
    //     '-' +
    //     d.substring(d.length - 2, d.length)
    //   )
    // },
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
      flowList({
        orderType: 1,
        userId: this.$store.state.user.userId,
        roleId: this.$store.state.user.roleId,
        mobile: this.mobile,
        orderSn: this.orderSn,
        storeName: this.storeName,
        goodName: this.goods_name,
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
