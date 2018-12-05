<template>
  <div class="widthdraw-record">
    <h3 style="padding-bottom: 10px">提现记录</h3>
    <Card>
      <Row>
        <Col span="24" align="right">
          <Input placeholder="输入手机号" clearable style="width: 180px; margin-right: 20px;" />
          <Button type="primary">查询</Button>
        </Col>
      </Row>
      <Table border :columns="columns" :data="tableData" style="margin-top: 20px;"></Table>
      <Page :total="totalCounts" show-sizer :page-size="pageSize" :current.sync="currentPage" @on-change="getList" @on-page-size-change="changePageSize" style="margin-top: 20px; text-align: right;"> </Page>
    </Card>
  </div>
</template>
<script>
import { getWithDarw } from '@/api/withdrawRecord'
export default {
  data() {
    return {
      name: 'widthdraw-record',
      totalCounts: 10,
      pageSize: 20,
      currentPage: 1,
      columns: [
        {
          title: '合伙人账号',
          key: 'accountNumber'
        },
        {
          title: '合伙人名称',
          key: 'accountName'
        },
        {
          title: '申请时间',
          key: 'time'
        },
        {
          title: '金额（元）',
          key: 'money'
        },
        {
          title: '税点',
          key: 'taxPoint'
        },
        {
          title: '税额',
          key: 'taxAmount'
        },
        {
          title: '到账金额',
          key: 'accountAmount'
        },
        {
          title: '状态',
          key: 'status'
        },
        {
          title: '备注',
          key: 'remarks'
        }
      ],
      tableData: []
    }
  },
  created() {
    getWithDarw({userId: 1}).then(res => {
      console.log(res)
    })
  },
  methods: {
    getList(val) {
      this.currentPage = val
    },
    changePageSize(val) {
      this.pageSize = val
    }
  }
}
</script>
