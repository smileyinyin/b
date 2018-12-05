
<template>

    <div class="settle height-100">
      <bread-crumb :data="[
      { title: '商户管理'},
      {title: '商户商品列表'},
    ]"></bread-crumb>
        <Card>
            <p slot="title">
               商户商品列表
            </p>
            <div style="width:100%;overflow:hidden">
                <div style="float:right">
                     <Input  placeholder="请输入商品名称" style="width: 180px" v-model="name"></Input>

                        <Select clearable style="width:180px;margin-left:10px;" v-model="status">
                            <Option value="0" key="1">审核中</Option>
                            <Option value="1" key="2">审核通过</Option>
                            <Option value="2" key="3">审核不通过</Option>
                        </Select>
                  <label style="margin-left:10px">
                         <DatePicker v-model="date1" type="daterange" placement="bottom-end" placeholder="请选择更新时间" style="width:  180px; "></DatePicker>
                     </label>

                     <label style="margin-left:10px">
                        <DatePicker v-model="date2" type="daterange" placement="bottom-end" placeholder="请选择创建时间" style="width:  180px; "></DatePicker>
                          </label>
                     <label style="margin-left:10px">
                         <Button type="primary" :loading="loading" icon="search" @click="getAll">
                            <span v-if="!loading">搜索</span>
                            <span v-else>搜索中</span>
                        </Button>
                     </label>

                </div>
            </div>
            <br>
            <div class="tr">
                 <Table :loading="loading" :columns="params" :data="data" stripe border></Table>
                 <Row type="flex" justify="end" align="middle" style="margin-top: 10px">
        <Page :total="totalCounts" show-sizer
              :page-size="pageSize" :current.sync="currentPage"
              @on-change="getpage"
              @on-page-size-change="changePageSize"
        > </Page>
      </Row></div>

        </Card>
    </div>

</template>
<script>
import { findList } from '@/api/gy-store'
import { formatDate } from '@/libs/util'
import breadCrumb from '_c/breadCrumb/breadCrumb'
// import { getSxoIndustryInfo } from '@/api/common'
export default {
  name: 'settle',
  components: {
    breadCrumb
  },
  data() {
    return {
      modal: false,
      id: '',
      totalCounts: 0,
      currentPage: 1,
      pageSize: 20,
      name: '',
      status: '',
      date1: '',
      date2: '',
      params: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '商家',
          key: 'name'
        },
        {
          title: '规格数',
          key: 'skuNumber'
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
          key: 'sfstatus'
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
    this.getAll()
  },
  methods: {
    //  fmtDate1(obj) {
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
    //  fmtDate2(obj) {
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
    updateArray() {
      this.data.forEach(item => {
        // item.modify_time = this.fmDate1(item.modify_time)
        // item.create_time = this.fmDate2(item.create_time)
        if (item.status === 0) {
          item.shstatus = '审核中'
        } else if (item.status === 1) {
          item.shstatus = '审核通过'
        } else if (item.status === 2) {
          item.shstatus = '审核不通过'
        } else if (item.status === 3) {
          item.sfstatus = '上架'
        } else if (item.status === 4) {
          item.sfstatus = '下架'
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
    getAll() {
      let that = this
      let starttime = formatDate(this.date1[0], 'yyyy-MM-dd hh:mm:ss')
      let endtime = formatDate(this.date1[1], 'yyyy-MM-dd hh:mm:ss')
      let starttime1 = formatDate(this.date2[0], 'yyyy-MM-dd hh:mm:ss')
      let endtime1 = formatDate(this.date2[1], 'yyyy-MM-dd hh:mm:ss')
      findList({
        userId: this.$store.state.user.userId,
        roleId: this.$store.state.user.roleId,
        is_merchants: 0,
        name: this.name,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        status: this.status,
        modifyStartTime: starttime,
        modifyEndTime: endtime,
        createStartTIme: starttime1,
        createEndTIme: endtime1
      }).then(res => {
        that.data = res.data.list
        that.name = res.data.name
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
    }
  }
}
</script>
