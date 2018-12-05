<template>
     <div>
       <bread-crumb :data="[
      { title: '体验店线上订单管理'},
      {title: '查看订单详情'}
    ]"></bread-crumb>
          <Card>
            <p style="font-size:20">订单</p>
            <br>
              <div class="contont">
                  <div class="space">
                      订单号：
                     <span>{{params.order_uuid}}</span>
                  </div>
                   <div class="space">
                      会员名称：
                     <span>{{params.nickname}}</span>
                  </div>
                   <div class="space">
                      会员手机号：
                     <span>{{params.mobile}}</span>
                  </div>
                  </div>
                  <div class="contont">
                   <div class="space">
                      订单状态：
                     <span>{{params.status | getStatus(params.status)}}</span>
                    </div>
                   <div class="space">
                      支付时间:
                    <span>{{params.create_time}}</span>
                  </div>
                   <div class="space">
                     套餐数:
                      <span>{{params.taocanmumber}}</span>
                  </div>
                  </div>
                  <div class="contont" >
                   <div class="space">
                      总金额：
                      <span>￥{{params.money}}</span>
                  </div>
                   <div class="space" style="flex: 2;">
                      实付：
                      <span>￥{{params.real_money}}</span>
                  </div>
              </div>
              <br>
              <divide-line>子订单信息</divide-line>
              <!-- <Table :columns="columns" :data="params.sonOrderModelList" stripe></Table> -->
              <Table ref="selection" :columns="columns" :data="params.sonOrderModelList" @on-selection-change="change" border></Table>
              <br>
              <divide-line>收货信息</divide-line>
               <div class="foot" style="width:100%;height:110px;border-bottom:1px solid lightgray">

                   <div style="width:100%;height:50px;line-height:50px;margin-left:10px">收件人:<span>{{message.recipient_name}} {{message.recipient_mobile}}</span></div>
                   <div style="width:100%;height:50px;line-height:50px;margin-left:10px">收件地址:<span>{{message.recipient_address}}</span></div>
               </div>
               <br>
               <divide-line>快递信息</divide-line>
               <div style="width:100%;height:100px" v-if="params.status === 9">
                   <div style="width:50%;height:50px;line-height:50px">
                       选择快递公司:
                    <Select name="" id="" style="width:300px" v-model="message.logistics_company">
                     <Option value="0">顺丰</Option>
                     <Option value="1">韵达</Option>
                     <Option value="2">圆通</Option>
                     </Select>
                   </div>
                   <div style="width:50%;height:50px">
                       输入快递单号:
                       <Input style="width:300px" v-model="message.logistics_name"/>
                   </div>
               </div>
                  <br>
                   <div class="foot" v-if="params.status === 9">
                  <span style="fontsize:16px;float:left">订单备注:</span>
                   <Input  :rows="4" style="width: 800px" type="textarea" v-model="order_note"/>
               </div>
               <div>

               </div>
               <br>

                <Modal
                   v-model="modal1"
                   title="确认提示"
                   @on-ok="ok1"
                   @on-cancel="cancel">
                  <p style="font-size:14px">确认发货信息？</p>
                  <p>确认会将发货信息发送给用户</p>
               </Modal>
               <Modal
                   v-model="modal2"
                   title="确认提示"
                   @on-ok="ok2"
                   @on-cancel="cancel">
                  <p style="font-size:14px">取消发货？</p>
                  <p style="font-size:16px;color:#ADADAD">取消将停止发货，并返回订单列表</p>
               </Modal>
               <Modal
                   v-model="modal3"
                   title="查看物流"
                   @on-ok="ok3"
                   @on-cancel="cancel">
                  <!-- <p style="font-size:14px">取消发货？</p>
                  <p style="font-size:16px;color:#ADADAD">取消将停止发货，并返回订单列表</p> -->
               </Modal>
                <Modal
                   v-model="modal4"
                   title="退货理由"
                   @on-ok="ok4"
                   @on-cancel="cancel">
                  <p style="font-size:14px">有理由退货：</p>
                  <p style="font-size:16px;color:#ADADAD"></p>
               </Modal>
          </Card>
          <div v-if="params.status === 9" style="width:100%">
                    <Button type="success"  style="width:120px;float:right;margin-top:30px;margin-right:30px" @click="modal1=true">确定</Button>
                    <Button type="success"  style="width:120px;float:left;margin-top:30px;margin-left:30px" @click="modal2=true">取消</Button>
                </div>
     </div>
</template>
<script>
import { findOrderDetailsnew, insetlogistics } from '@/api/order'
import breadCrumb from '_c/breadCrumb/breadCrumb'
import divideLine from '_c/divideLine/divide-line'
export default {
  components: {
    breadCrumb,
    divideLine
  },
  data() {
    return {
      order_uuid: null,
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      id: null,
      order_note: '',
      isShow: false,
      params: {},
      message: {},
      order_son_no: '',
      // recipient_name:'',
      order_son_uuidlist: '',
      columns: [
        // {
        //     // type: 'selection',
        //     // width: 60,
        //     // align: 'center',

        // },
        {
          title: '子订单号',
          key: 'order_son_no'},
        {
          title: '套餐名称',
          key: 'goods_name'
        },
        {
          title: '规格',
          key: 'goods_sku_id'
        },
        {
          title: '数量',
          key: 'number'
        },
        {
          title: '单价',
          key: 'one_price'
        },
        {
          title: '总价',
          key: 'total_price'
        },
        {
          title: '状态',
          key: 'ddstatus'
        },
        {
          title: '快递单号',
          key: 'age'
        }
      ]
    }
  },
  created() {
    this.order_uuid = this.$route.query.order_uuid
    findOrderDetailsnew({ order_uuid: this.order_uuid }).then(res => {
      this.params = res.data
      this.message = res.data.logisticsModel
      // this.recipient_name = res.data.recipient_name
      this.updataArray()
      if (res.data.status === 9) {
        this.columns.unshift({
          type: 'selection',
          width: 60,
          align: 'center'
        })
      }
      if (
        res.data.status === 9 ||
        res.data.status === 10 ||
        res.data.status === 11
      ) {
        this.columns.push({
          title: '操作',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    display:
                      params.row.son_order_status === 8
                        ? ''
                        : params.row.son_order_status === 11 ? '' : 'none'
                  },
                  on: {
                    click: () => {
                      this.seeMessage(params.row.id)
                    }
                  }
                },
                '查看物流'
              )
            ])
          }
        })
      } else {
        this.columns.push({
          title: '退货理由',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    display:
                      params.row.son_order_status === 4
                        ? ''
                        : params.row.son_order_status === 12
                          ? ''
                          : params.row.son_order_status === 13
                            ? ''
                            : params.row.son_order_status === 14
                              ? ''
                              : params.row.son_order_status === 5 ? '' : 'none'
                  },
                  on: {
                    click: () => {
                      this.seeMessages(params.row.id)
                    }
                  }
                },
                '有理由退货'
              )
            ])
          }
        })
      }
    })
  },
  filters: {
    getStatus(status) {
      let str = ''
      switch (status) {
        case 4:
          str = '申请退款'
          break
        case 5:
          str = '已退款'
          break
        case 6:
          str = '待结算'
          break
        case 7:
          str = '结算中'
          break
        case 8:
          str = '已结算'
          break
        case 9:
          str = '待发货'
          break
        case 10:
          str = '待收货'
          break
        case 11:
          str = '已收货'
          break
        case 12:
          str = '准备退货'
          break
        case 13:
          str = '退货中'
          break
        case 14:
          str = '待退款'
          break
      }
      return str
    }
  },
  methods: {
    updataArray() {
      this.params.sonOrderModelList.forEach(item => {
        if (item.son_order_status === 0) {
          item.ddstatus = '已收货'
        } else if (item.son_order_status === 1) {
          item.ddstatus = '待付款'
        } else if (item.son_order_status === 2) {
          item.ddstatus = '已核销'
        } else if (item.son_order_status === 3) {
          item.ddstatus = '申请退款'
          this.isShow = true
        } else if (item.son_order_status === 4) {
          item.ddstatus = '已退款'
        } else if (item.son_order_status === 5) {
          item.ddstatus = '待结算'
        } else if (item.son_order_status === 6) {
          item.ddstatus = '结算中'
        } else if (item.son_order_status === 7) {
          item.ddstatus = '已结算'
        } else if (item.son_order_status === 8) {
          item.ddstatus = '已发货'
        } else if (item.son_order_status === 9) {
          item.ddstatus = '待发货'
        } else if (item.son_order_status === 10) {
          item.ddstatus = '待收货'
        } else if (item.son_order_status === 11) {
          item.ddstatus = '已收货'
        } else if (item.son_order_status === 12) {
          item.ddstatus = '准备退货'
        } else if (item.son_order_status === 13) {
          item.ddstatus = '退货中'
        } else if (item.son_order_status === 14) {
          item.ddstatus = '待退款'
        } else if (item.son_order_status === 15) {
          item.ddstatus = '申请退货'
        } else if (item.son_order_status === 16) {
          item.ddstatus = '已付款'
        } else if (item.son_order_status === 17) {
          item.ddstatus = '待付款'
        }
      })
    },
    ok1() {
      if (!this.message.logistics_company) {
        this.$Notice.error({
          title: '操作结果',
          desc: '快递公司不能为空',
          duration: 3
        })
        return false
      }
      if (!this.message.logistics_name) {
        this.$Notice.error({
          title: '操作结果',
          desc: '快递公单号不能为空',
          duration: 3
        })
        return false
      }
      this.order_uuid = this.$route.query.order_uuid
      this.order_son_uuidlist = insetlogistics({
        order_uuid: this.order_uuid,
        order_son_uuidlist: this.order_son_uuidlist,
        logistics_name: this.params.logistics_name,
        order_note: this.order_note
      }).then(res => {})
    },
    ok2() {},
    ok3() {},
    ok4() {},
    cancel() {},
    change(val) {
      let order = []
      val.forEach(item => {
        order.push(
          item.order_son_no
        )
      })
      this.order_son_uuidlist = order.join(',')
    },
    seeMessage(id) {
      this.modal3 = true
      this.order_uuid = id
    },
    seeMessages(id) {
      this.modal4 = true
      this.order_uuid = id
    }
  }
}
</script>

<style scoped>
.contont {
  width: 100%;
  display: flex;
  /* justify-content: space-around; */
}
.space {
  flex: 1;
  height: 50px;
  /* background: lightcoral; */
  /* line-height: 50px; */
}
</style>
