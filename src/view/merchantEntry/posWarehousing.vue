<template>
  <div class="pos-warehousing">
    <h3 class="pb10">机具库存</h3>
    <Card>
      <Row>
        <Col span="24" align="right">
          <Select class="w180 mr20 tl" placeholder="请选择pos机品牌" v-model="params.pos_brand_id">
            <Option value="">所有品牌</Option>
            <Option :value="1">新大陆</Option>
            <Option :value="2">嘉联</Option>
          </Select>
          <Input clearable placeholder="请输入CSN号" class="w180 mr20" v-model="params.pos_csn" />
          <Input clearable placeholder="请输入批次号" class="w180 mr20" v-model="params.batch_number" />
          <DatePicker type="datetimerange" placement="bottom-end" placeholder="请选择调拨时间" class="w300 mr20" v-model="create_time"></DatePicker>
          <Button type="primary" icon="ios-search" @click="getAll">查询</Button>
        </Col>
      </Row>
      <Table border :columns="columns" :data="tableData" class="mt20"></Table>
      <Page :total="totalCounts" show-sizer :page-size="params.pageSize" :current.sync="params.pageNum" @on-change="getpage" @on-page-size-change="changePageSize" class="mt20 tr"> </Page>
    </Card>
  </div>
</template>

<script>
import { findPosInputInfo } from '@/api/entry'
import { formatDate } from '@/libs/util'
export default {
  name: 'posWarehousing',
  data () {
    return {
      totalCounts: 0,
      create_time: '',
      params: {
        pos_csn: '',
        pos_brand_id: null,
        batch_number: '', // 批次号
        create_time: '',
        end_time: '',
        pageNum: 1,
        pageSize: 20
      },
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
              h('span', params.row.pos_brand_id === 1 ? '新大陆' : '嘉联')
            ])
          }
        },
        {
          title: '机具型号',
          key: 'model_number'
        },
        {
          title: '批次号',
          key: 'batch_number'
        },
        {
          title: '调拨人',
          key: 'create_user'
        },
        {
          title: '调拨时间',
          key: 'balance',
          render: (h, params) => {
            return h('div', [
              h('span', formatDate(params.row.create_time, 'yyyy-MM-dd hh:mm:ss'))
            ])
          }
        },
        {
          title: '备注',
          key: 'storage_number'
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
      this.params.create_time = formatDate(this.create_time[0], 'yyyy-MM-dd hh:mm:ss')
      this.params.end_time = formatDate(this.create_time[1], 'yyyy-MM-dd hh:mm:ss')
      findPosInputInfo(this.params).then(res => {
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
