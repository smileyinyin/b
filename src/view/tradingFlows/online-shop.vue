
<template>
     <div class="settle">
        <Card>
        <p slot="title">
          线上商家流水
        </p>
      <div>
        <div style="width:100%;overflow:hidden">
          <div style="float:right">
           <Input  placeholder="请输入交易流水号" style="width: 200px" v-model="orderSn" clearable/>
           <Input placeholder="请输入会员手机号" style="width:200px;margin-left:10px;" v-model="mobile" clearable/>
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
      goodName: '',
      //
      currentPage: 1,
      pageSize: 20,
      totalCounts: 0,
      date: '',
      datas: '',
      data: []
    }
  },
  computed: {
    params() {
      return [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '交易流水号',
          key: 'order_son_no'
        },
        {
          title: '会员ID',
          key: 'user_id'
        },
        {
          title: '商家',
          key: 'name',
          _hidden: this.$store.state.user.access.includes('SXR004')
        },
        // {
        //   title: '商品名称',
        //   key: 'goods_name'
        // },
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
      ].filter(v => !v._hidden)
    }
  },
  created() {
    this.getAll()
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
      flowList({
        orderType: 0,
        // storeId: 2,
        // storeId:this.datas.storeId,
        userId: this.$store.state.user.userId,
        roleId: this.$store.state.user.roleId,
        mobile: this.mobile,
        orderSn: this.orderSn,
        storeName: this.storeName,
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
