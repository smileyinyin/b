<template>
  <div>
    <h3 style="margin-bottom: 10px">供应商管理</h3>

    <Card>
      <Row style="margin-bottom: 20px;" :gutter="10">
        <i-col span="6">
          <i-button type="primary" @click="addSupply">添加商户</i-button>
        </i-col>
        <i-col span="14">
          <Row :gutter="20" type="flex" justify="end" align="middle" style="margin-bottom: 10px;">
            <i-col span="12">
              <Select v-model="searchForm.status" placeholder="状态" clearable style="margin-right: 20px;">
                <Option value="1" key="1">待审核</Option>
                <Option value="2" key="2">正常</Option>
                <Option value="3" key="3">审核失败</Option>
                <Option value="4" key="4">未启用</Option>
              </Select>
            </i-col>
            <i-col span="12">
              <Input placeholder="供应商名称" v-model="searchForm.name"/>
            </i-col>
          </Row>
          <Row :gutter="20" type="flex" justify="end" align="middle" style="margin-bottom: 10px;">
            <i-col span="12"></i-col>
            <i-col span="12">
              <DatePicker v-model="searchForm.date" type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 100%;margin-right: 20px;"></DatePicker>
            </i-col>
          </Row>
        </i-col>
        <i-col span="4">
          <i-button type="primary" @click="getSupplyList">查 询</i-button>
        </i-col>
      </Row>
      <Table border :columns="columns" :data="tableData"></Table>
      <Row type="flex" justify="end" align="middle" style="margin-top: 10px">
        <Page :total="pager.totalCounts" show-sizer
              :page-size="pager.pageSize" :current.sync="pager.currentPage"
              @on-change="getSupplyList"
              @on-page-size-change="changePageSize"
        > </Page>
      </Row>
    </Card>
  </div>
</template>

<script>
import { getSupplyList, activeSupply } from '@/api/supply'
import { formatDate } from '@/libs/util'

export default {
  name: 'supplyChain',
  data() {
    return {
      searchForm: {
        name: '',
        status: '', // 状态
        date: ''
      },
      pager: {
        currentPage: 1,
        pageSize: 20,
        totalCounts: 0
      },
      columns: [
        {
          title: 'id',
          key: 'id'
        },
        {
          title: '供应商名称',
          key: 'name'
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '联系人',
          key: 'linkMan'
        },
        {
          title: '联系电话',
          key: 'mobile'
        },
        {
          title: '余额（元）',
          key: 'count'
        },
        {
          title: '状态',
          key: 'status'
        },
        {
          title: '在售商品数',
          key: 'goodsCount'
        },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            let str = ''
            let type = 'primary'
            let onClick = null
            switch (params.row.status) {
              case 1:
                str = '审核'
                type = 'warning'
                onClick = () => this.$router.push({ name: 'supplyCheck', query: { id: params.row.id } })
                break
              case 2:
                str = '停用'
                type = 'error'
                onClick = () => activeSupply({ status: 4, id: params.row.id }).then(res => this.getSupplyList())
                break
              case 3:
                str = '审核结果'
                type = 'primary'
                onClick = () => this.$router.push({ name: 'supplyCheck', query: { id: params.row.id } })
                break
              case 4:
                str = '启用'
                type = 'success'
                onClick = () => activeSupply({ status: 2, id: params.row.id }).then(res => this.getSupplyList())
                break
              default:
                break
            }
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push({ name: 'supplyAdd', query: { id: params.row.id } })
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: type,
                  size: 'small'
                },
                on: {
                  click: onClick
                }
              }, str)
            ])
          }
        }
      ],
      tableData: []
    }
  },
  created() {
    this.getSupplyList()
  },
  methods: {
    addSupply() {
      this.$router.push({ name: 'supplyAdd' })
    },
    getSupplyList() {
      let query = Object.assign(
        {},
        this.searchForm,
        this.pager,
        {
          startTime: formatDate(this.searchForm.date[0], 'yyyy-MM-dd'),
          endTime: formatDate(this.searchForm.date[1], 'yyyy-MM-dd')
        }
      )
      getSupplyList(query).then(res => {
        this.tableData = res.data
        this.pager.totalCounts = res.totalCounts
      })
    },
    changePageSize(size) {
      this.pager.size = size
      this.getSupplyList()
    }
  }
}
</script>
