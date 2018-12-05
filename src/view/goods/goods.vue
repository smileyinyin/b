
<template>

    <div class="settle height-100">
        <Card>
            <p slot="title">
               商品管理
            </p>
            <div  style="width:100%">
                <div style="float:right">
                     <Input  placeholder="请输入商品名称" style="width: 200px" v-model="names"></Input>
                        <Select clearable style="width:100px;margin-left:10px;" v-model="status">
                            <Option value="0" key="1">审核中</Option>
                            <Option value="1" key="2">审核通过</Option>
                            <Option value="2" key="3">审核不通过</Option>
                        </Select>
                  <label style="margin-left:10px">
                         <DatePicker v-model="date1" type="daterange" placement="bottom-end" placeholder="请选择更新时间" style="width:  200px; "></DatePicker>
                     </label>
                     <label style="margin-left:10px;margin-right:10px">
                        <DatePicker v-model="date2" type="daterange" placement="bottom-end" placeholder="请选择创建时间" style="width:  200px; "></DatePicker>
                          </label>
                     <label>
                         <Button type="primary" :loading="loading" icon="search" @click="getAll">
                            <span v-if="!loading">搜索</span>
                            <span v-else>搜索中</span>
                        </Button>
                     </label>
                     </div>
                      <div >
                       <label>
                         <Button class="btn-add" @click="confirm" style="width:120px" icon="plus">添加</Button>
                     </label>
                </div>
            </div>
            <br>
            <div class="tr">
                 <Table :loading="loading" :columns="params" :data="data" stripe border></Table>
                 <Row type="flex" justify="end" align="middle" style="margin-top: 10px" border>
        <Page :total="totalCounts" show-sizer
              :page-size="pageSize" :current.sync="pageNum"
              @on-change="getpage"
              @on-page-size-change="changePageSize"
        > </Page>
      </Row></div>
             <Spin size="large" fix v-if="loading"></Spin>
              <Modal v-model="modal" title="添加商品库存" @on-ok="ok1" @on-cancel="cancel">
          <div class="flex">商品名称 :<Input  disabled style="width: 200px" :value="name"></Input></div>
          <br>
           <div class="flex">库存总量 :<Input  disabled style="width: 200px" :value="num"></Input></div>
            <br>
              <div class="flex">库存状态 :<Input  disabled style="width: 200px" :value="shop_status===0?'库存不足': shop_status===1?'库存充足':shop_status===2?'库存预警':''"></Input></div>
             <br>
             <div>
              单规格商品数量:
             <span v-for="(item, index) in inventorylist" :key="index" >
               <span style="display:inline-block;width:60%;margin-left:115px;">{{item.name}}:{{item.store_number}}</span></span>
             </div>
            <br>
             <div class="flex">添加规格商品库存 :
             <Input style="width: 200px" v-model="number"></Input>
             <Select style="width:100px;margin-left:10px;" v-model="skuname">
             <Option v-for="(item, index) in inventorylist" :key="index" :value="item.name">{{item.name}}</Option>
             </Select>
             </div>
             </Modal>
        </Card>
    </div>

</template>
<script>
import { goodsList, kcList, addkcList } from '@/api/good'
import { formatDate } from '@/libs/util'
// import { getSxoIndustryInfo } from '@/api/common'
export default {
  name: 'settle',
  data() {
    return {
      modal: false,
      // id: '',
      totalCounts: 0,
      pageNum: 1,
      names: '',
      pageSize: 20,
      number: null,
      name: '', //
      num: '',
      shop_status: '',
      sku_title: '',
      inventorylist: [],
      skuname: '',
      status: '',
      date1: '',
      date2: '',
      datas: {},
      params: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '商品名称',
          key: 'name'
        },
        {
          title: '规格数',
          key: 'ggnumber'
        },
        {
          title: '库存状态',
          key: 'kcstatus'
        },
        {
          title: '审核状态',
          key: 'shstatus'
        },
        {
          title: '是否上架',
          key: 'sxstatus'
        },
        {
          title: '更新时间',
          key: 'modify_time',
          render: (h, params) => {
            return h('span', null, formatDate(new Date(params.row.modify_time), 'yyyy-MM-dd hh:mm:ss'))
          }
        },
        {
          title: '创建时间',
          key: 'create_time',
          render: (h, params) => {
            return h('span', null, formatDate(new Date(params.row.create_time), 'yyyy-MM-dd hh:mm:ss'))
          }
        },
        {
          title: '操作',
          key: 'control',
          width: 200,
          align: 'left',
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
                    display: params.row.status === 0 ? '' : 'none'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: 'see-goods',
                        query: {
                          id: params.row.id
                        }
                      })
                    }

                    // this.seegoods(params.row.id)
                  }
                },
                '查看'
              ),
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
                      params.row.status === 2 || params.row.status === 4 || params.row.status === 3
                        ? ''
                        : 'none'
                  },
                  on: {
                    click: () => {
                      // this.editgoods(params.row)
                      if (params.row.status === 2) {
                        this.$router.push({
                          name: 'no-edit-goods',
                          query: {
                            id: params.row.id
                          }
                        })
                      } else if (params.row.status === 4 || params.row.status === 3) {
                        this.$router.push({
                          name: 'edit-goods',
                          query: {
                            id: params.row.id
                          }
                        })
                      }
                    }
                  }
                },
                '修改'
              ),
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
                      params.row.status === 2
                        ? 'none'
                        : params.row.status === 0 ? 'none' : ''
                  },
                  on: {
                    click: () => {
                      this.adds(params.row.id)
                    }
                  }
                },
                '添加库存'
              )
            ])
          }
        }
      ],
      data: []
    }
  },
  computed: {
    loading() {
      return !!this.$store.state.app.loading
    }
  },
  created() {
    // this.datas = JSON.parse(localStorage.getItem('cp_userInfo'))
    // console.log(this.datas)
    this.getAll()
  },
  methods: {
    confirm() {
      this.$router.push({
        name: 'add-goods'
      })
    },

    updateArray() {
      this.data.forEach(item => {
        if (item.status === 0) {
          item.shstatus = '待审核'
          item.sxstatus = ''
        } else if (item.status === 1) {
          item.shstatus = '审核通过'
          item.sxstatus = ''
        } else if (item.status === 2) {
          item.shstatus = '审核不通过'
          item.sxstatus = ''
        } else if (item.status === 3) {
          item.shstatus = '审核通过'
          item.sxstatus = '上架'
        } else if (item.status === 4) {
          item.shstatus = '审核通过'
          item.sxstatus = '下架'
        }

        if (item.number_status === 0) {
          item.kcstatus = '库存不足'
        } else if (item.number_status === 1) {
          item.kcstatus = '库存充足'
        } else if (item.number_status === 2) {
          item.kcstatus = '库存预警'
        }
      })
    },
    ok() {
      this.$Message.info('添加成功')
    },
    cancel() {
      this.$Message.info('已取消')
    },
    getAll() {
      let that = this
      let starttime = formatDate(this.date1[0], 'yyyy-MM-dd hh:mm:ss')
      let endtime = formatDate(this.date1[1], 'yyyy-MM-dd hh:mm:ss')
      let starttime1 = formatDate(this.date2[0], 'yyyy-MM-dd hh:mm:ss')
      let endtime1 = formatDate(this.date2[1], 'yyyy-MM-dd hh:mm:ss')
      goodsList({
        userId: this.$store.state.user.userId,
        roleId: this.$store.state.user.roleId,
        name: this.names,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        status: this.status,
        modifyStartTime: starttime,
        modifyEndTime: endtime,
        createStartTIme: starttime1,
        createEndTIme: endtime1
      }).then(res => {
        that.data = res.data.list
        that.pageNum = res.data.pageNum
        that.pageSize = res.data.pageSize
        that.totalCounts = res.data.total
        // that.totalCounts = res.totalCounts
        that.updateArray()
      })
    },
    getpage(page) {
      this.currentPage = page
      this.getAll()
    },
    changePageSize(size) {
      this.pageSize = size
      this.getAll()
    },
    adds(id) {
      let that = this
      this.id = id
      this.modal = true
      // let query = Object.assign({}, { id: id })
      kcList({id: id, is_flag: 0}).then(res => {
        that.inventorylist = res.data.returnInventory.inventorylist
        that.name = res.data.returnInventory.name
        that.shop_status = res.data.returnInventory.number_status
        that.num = res.data.returnInventory.sum
        that.updateArray()
      })
    },
    ok1(id) {
      addkcList({
        goods_id: this.id,
        number: this.number,
        skuName: this.skuname
      }).then(res => {
        // debugger
        this.number = null
        // this.skuname = null
        this.getAll()
      })
    }
  }
}
</script>
