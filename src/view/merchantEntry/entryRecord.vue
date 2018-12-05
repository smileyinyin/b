<template>
  <div class="entry-record">
    <h3 class="pb10">进件记录</h3>
    <Card>
      <Row>
        <Col span="24" align="right">
          <Select class="w180 mr20 tl" placeholder="请选择pos机品牌" v-model="params.brandId">
            <Option value="">所有品牌</Option>
            <Option :value="1">新大陆</Option>
            <Option :value="2">嘉联</Option>
          </Select>
          <Input clearable placeholder="请输入CSN号" class="w180 mr20" v-model="params.posCsn" />
          <Input clearable placeholder="请输入批次号" class="w180 mr20" />
          <!-- <Input clearable placeholder="请输入合伙人名称" class="w180 mr20" v-model="params.merchantParentName" /> -->
          <DatePicker type="datetimerange" placeholder="请选择激活时间" class="w180 mr20" v-model="create_time"></DatePicker>
          <Button type="primary" icon="ios-search" @click="getAll">查询</Button>
        </Col>
      </Row>
      <Table border :columns="columns" :data="tableData" class="mt20"></Table>
      <Page :total="totalCounts" show-sizer :page-size="params.pageSize" :current.sync="params.currentPage" @on-change="getpage" @on-page-size-change="changePageSize" class="mt20 tr"> </Page>
    </Card>
  </div>
</template>

<script>
import { findStorePosRecordList } from '@/api/entry'
import { formatDate } from '@/libs/util'
export default {
  name: 'entry-record',
  data () {
    return {
      list: [],
      create_time: '',
      params: {
        merchantParentName: '',
        posCsn: null,
        startTime: '',
        brandId: null,
        endTime: '',
        currentPage: 1,
        pageSize: 20
      },
      totalCounts: 0,
      columns: [
        {
          title: 'ID',
          key: 'id'
        },
        {
          title: 'CSN',
          key: 'posCsn'
        },
        {
          title: 'POS终端号',
          key: 'terminalNumber'
        },
        {
          title: '品牌',
          key: 'brandId',
          render: (h, params) => {
            return h('div', [
              h('span', params.row.brandId === 1 ? '新大陆' : (params.row.brandId === 2 ? '嘉联' : ''))
            ])
          }
        },
        {
          title: '激活码',
          key: 'activeCode'
        },
        {
          title: '合伙人名称',
          key: 'merchantParentName'
        },
        {
          title: '业务员',
          key: 'salesmanName'
        },
        {
          title: '所在商户',
          key: 'merchantsName'
        },
        {
          title: '购买政策',
          key: 'posShareProfit',
          render: (h, params) => {
            return h('div', [
              h('span', params.row.posShareProfit === 1 ? '双免' : (params.row.posShareProfit === 2 ? '分期' : (params.row.posShareProfit === 3 ? '买断' : '')))
            ])
          }
        },
        {
          title: '进件人',
          key: 'createUserId'
        },
        {
          title: '进件时间',
          key: 'posApplyTime ',
          render: (h, params) => {
            return h('div', [
              h('span', formatDate(params.row.posApplyTime, 'yyyy-MM-dd hh:mm:ss'))
            ])
          }
        },
        {
          title: '激活时间',
          key: 'posActTime',
          render: (h, params) => {
            return h('div', [
              h('span', formatDate(params.row.posActTime, 'yyyy-MM-dd hh:mm:ss'))
            ])
          }
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
      if (!this.params.posCsn) {
        this.params.posCsn = null
      }
      if (this.create_time.length === 2) {
        this.params.startTime = formatDate(this.create_time[0], 'yyyy-MM-dd hh:mm:ss')
        this.params.endTime = formatDate(this.create_time[1], 'yyyy-MM-dd hh:mm:ss')
      }
      findStorePosRecordList(this.params).then(res => {
        this.tableData = res.data
        this.totalCounts = res.totalCounts
      })
    },
    // 分页切换
    getpage(val) {
      this.params.currentPage = val
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
