<template>
  <div class="pos-back-record">
    <h3 class="mb10">回拨记录</h3>
    <Card>
      <Row>
        <Col span="24" align="right">
          <Select class="w180 mr20 tl" placeholder="请选择pos机品牌" v-model="params.pos_brand_id">
            <Option value="">所有品牌</Option>
            <Option :value="1">新大陆</Option>
            <Option :value="2">嘉联</Option>
          </Select>
          <Input clearable placeholder="请输入CSN号" class="w180 mr20" v-model="params.pos_csn" />
          <Input clearable placeholder="请输入批次号" class="w180 mr20" v-model="params.mobile" />
          <!-- <Input clearable placeholder="请输入合伙人名称" class="w180 mr20" v-model="params.handlers_name" /> -->
          <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择调拨时间" class="w300 mr20" v-model="createTime"></DatePicker>
          <Button type="primary" icon="ios-search" @click="getAll">查询</Button>
        </Col>
      </Row>
      <Table border :columns="columns" :data="tableData" class="mt20"></Table>
      <Page :total="totalCounts" show-sizer :page-size="params.pageSize" :current.sync="params.pageNum" @on-change="getpage" @on-page-size-change="changePageSize" class="mt20 tr"> </Page>
    </Card>
  </div>
</template>

<script>
import { findPosBackList } from '@/api/entry'
import { formatDate } from '@/libs/util'
export default {
  name: 'pos-back-record',
  data () {
    return {
      createTime: [],
      params: {
        pos_brand_id: null,
        pos_csn: '',
        handlers_name: '',
        pageSize: 20,
        pageNum: 1,
        create_time: '',
        end_time: ''
      },
      totalCounts: 0,
      columns: [
        {
          title: '序号',
          key: 'id'
        },
        {
          title: 'CSN',
          key: 'pos_csn'
        },
        {
          title: '品牌',
          key: 'pos_brand_id',
          render: (h, params) => {
            return h('div', [
              h('span', params.row.pos_brand_id === 1 ? '新大陆' : (params.row.pos_brand_id === 2 ? '嘉联' : ''))
            ])
          }
        },
        {
          title: '机具类型（型号）',
          key: 'model_number'
        },
        {
          title: '批次号',
          key: 'batch_number'
        },
        {
          title: '合伙人名称',
          key: 'merchantParentName'
        },
        {
          title: '所在商户',
          key: 'merchantsName'
        },
        {
          title: '回拨状态',
          key: 'status',
          render: (h, params) => {
            return h('div', [
              h('span', params.row.status === 2 ? '解绑' : (params.row.status === 3 ? '换绑' : ''))
            ])
          }
        },
        {
          title: '回拨人',
          key: 'handlers_name'
        },
        {
          title: '回拨时间',
          key: 'create_time',
          render: (h, params) => {
            return h('div', [
              h('span', formatDate(params.row.create_time, 'yyyy-MM-dd hh:mm:ss'))
            ])
          }
        },
        {
          title: '备注',
          key: 'cause'
        }
      ],
      tableData: []
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    getAll() {
      if (this.createTime.length === 2) {
        this.params.create_time = formatDate(this.createTime[0], 'yyyy-MM-dd hh:mm:ss')
        this.params.end_time = formatDate(this.createTime[1], 'yyyy-MM-dd hh:mm:ss')
      }
      findPosBackList(this.params).then(res => {
        if (res.data) {
          this.tableData = res.data.list
          this.totalCounts = res.data.total
        } else {
          this.tableData = []
          this.totalCounts = 0
        }
      })
    },
    // 分页切换
    getpage(val) {
      this.params.pageNum = val
      this.getAll()
    },
    // 页面条数切换
    changePageSize(val) {
      this.params.pageSize = val
      this.getAll()
    }
  }
}
</script>
