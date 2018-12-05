<template>
     <div>
        <bread-crumb :data="[
      { title: '体验店订单管理'},
      {title: '查看订单详情'}
    ]"></bread-crumb>
          <Card>
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
                     <span v-if="isShow" style="font-size:12px;color:red;display:inline-block">您需要在24小时之内处理退货订单，否则将自动退款</span>
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
              <Table :columns="columns" :data="params.sonOrderModelList" stripe border></Table>
              <br>
               <div class="foot" v-if="params.status === 1">
                   <span style="fontsize:16px;float:left">订单备注:</span>
                   <Input  :rows="4" style="width: 800px" type="textarea" v-model="order_note"></Input>
               </div>
               <br>
                <div  v-if="params.status === 1" >
                    <Button type="success"  style="width:120px;" @click="modal1=true">确认核销</Button>
                    <Button type="success"  style="width:120px;margin-left:100px;" @click="modal2=true">取消订单</Button>
                </div>
                <Modal
                   v-model="modal1"
                   title="确认提示"
                   @on-ok="ok1"
                   @on-cancel="cancel">
                  <p style="font-size:14px">请输入这笔订单的核销码</p>
                   核销码： <Input  style="width: 200px" v-model="account_code"></Input>
               </Modal>
               <Modal
                   v-model="modal2"
                   title="确认提示"
                   @on-ok="ok2"
                   @on-cancel="cancel">
                  <p style="font-size:14px">确认取消这笔订单?</p>
                  <p style="font-size:16px;color:#ADADAD">确认会将费用退还给用户，并取消这笔订单</p>
               </Modal>
               <Modal
                   v-model="modal3"
                   title="确认提示"
                   @on-ok="ok3"
                   @on-cancel="cancel"
                   ok-text="同意"
                   cancel-text="不同意">
                  <p style="font-size:14px">是否同意用户的申请退款?</p>
                  <p style="font-size:16px;color:#ADADAD">温馨提示：为了避免不必要的麻烦，不同意申请退款的订单请主动与用户电话沟通。</p>
               </Modal>
          </Card>
     </div>
</template>
<script>
import {findOrderDetailsnew, orderhexiao, ordersntuikuan} from '@/api/order'
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
      id: null,
      order_note: '',
      account_code: 123456,
      isShow: false,
      params: {},
      columns: [
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
        }
        //        {
        //            title:'操作',
        //            render: (h, params) => {
        //                 return h('div', [
        //                      h(
        //         'Button',
        //         {
        //           props: {
        //             type: 'info',
        //             size: 'small'
        //           },
        //           style: {
        //             marginRight: '5px',
        //             display:params.row.son_order_status === 3?"":'none'
        //           },
        //           on: {
        //             click: () => {
        //                this.back(params.row.id);
        //             }
        //           }
        //         },
        //         '退款'
        //       ),
        // ])
        //            }
        //        }
      ]

    }
  },
  created() {
    this.order_uuid = this.$route.query.order_uuid
    findOrderDetailsnew({order_uuid: this.order_uuid}).then(res => {
      this.params = res.data
      this.updataArray()
      if (res.data.status === 1) {
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
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.back(params.row.id)
                    }
                  }
                },
                '退款'
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
        case 0:
          str = '待付款'
          break
        case 1:
          str = '待核销'
          break
        case 2:
          str = '已核销'
          break
        case 3:
          str = '已核销(部分退款)'
          break
        case 4:
          str = '申请退款'
          break
        case 5:
          str = '已退款'
          break
        case 6:
          str = '待核算'
          break
      }
      return str
    }
  },
  methods: {
    updataArray() {
      this.params.sonOrderModelList.forEach(item => {
        if (item.son_order_status === 0) {
          item.ddstatus = '待付款'
        } else if (item.son_order_status === 1) {
          item.ddstatus = '待核销'
        } else if (item.son_order_status === 2) {
          item.ddstatus = '已核销'
        } else if (item.son_order_status === 3) {
          item.ddstatus = '申请退款'
          this.isShow = true
        } else if (item.son_order_status === 4) {
          item.ddstatus = '已退款'
        }
      })
    },
    ok1() {
      this.order_uuid = this.$route.query.order_uuid
      orderhexiao({order_uuid: this.order_uuid, account_code: 123454, order_note: this.order_note}).then(res => {
      })
    },
    ok2() {
      this.order_uuid = this.$route.query.order_uuid
      ordersntuikuan({order_uuid: this.order_uuid, type: 0}).then(res => {
      })
    },
    ok3(id) {
      ordersntuikuan({id: this.order_uuid, type: 1}).then(res => {
      })
    },
    cancel() {

    },
    back() {
      this.modal3 = true
    }
  }
}
</script>

<style scoped>
     .contont{
         width:100%;
         display: flex;

         /* justify-content: space-around; */
}
     .space{
         flex: 1;
         height: 50px;
         /* background: lightcoral; */
        /* line-height: 50px; */

     }

</style>
