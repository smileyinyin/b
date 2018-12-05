
<template>
  <div class="account-statement">
    <h3 class="pb20">对账单</h3>
    <Card>
      <Row type="flex" justify="end">
        <Col>
          <!-- <Select v-model="searchForm.bcFlag" class="dib w140 mr20 tl">
            <Option :value="1">银行对账单</Option>
            <Option :value="2">商户对账单</Option>
          </Select> -->
          <Input v-model="searchForm.keyword" placeholder="活动id/活动名称" class="w180 mr20" clearable/>
          <Button type="primary" icon="ios-search" @click="getAccountStatementList">查询</Button>
        </Col>
      </Row>
      <Table border :columns="columns" :data="tableData" class="mt20"></Table>
      <Page :total="searchForm.totalCounts" show-sizer :page-size="searchForm.pageSize" :current.sync="searchForm.pageNum" @on-change="getAccountStatementList" @on-page-size-change="changePageSize" class="mt20 tr"></Page>
    </Card>
  </div>
</template>

<script>
import { getAccountStatementList } from '@/api/bank/bank'

/**
 //账单号
private String billNo;
//账单日期
private String billDate;
//生成日期
@JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
private Date billCreateDate;
//交易门店数
private Integer storeCount;
//交易笔数
private Integer transactionCount;
//支付总额
private BigDecimal payTotalAmount;
//门店获得补贴
private BigDecimal subsidyStoreTotalAmount;
//银行补贴总数
private BigDecimal bankSubsidyTotalAmount;
//交易总额
private BigDecimal transactionTotalAmount;
//活动ID
private String activityId;
//活动名称
private String activityName;
//下载路径
private String downloadUrl;
 */
export default {
  data() {
    return {
      tableData: [],
      searchForm: {
        bcFlag: 2, // 商户只能看商户对账单
        // TODO 商户ID从登陆时获取
        merchant_id: String(this.$store.state.user.storesId), // '1,2', // 商户ID
        keyword: '',
        pageNum: 1,
        pageSize: 20,
        totalCounts: 0
      },
      columns: [
        {
          title: '账单号',
          key: 'billNo'
        },
        {
          title: '账单日期',
          key: 'billDate'
        },
        {
          title: '生成日期',
          key: 'billCreateDate'
        },
        {
          title: '活动ID',
          key: 'activityId'
        },
        {
          title: '活动名称',
          key: 'activityName'
        },
        {
          title: '交易笔数',
          key: 'transactionCount'
        },
        {
          title: '支付总额',
          key: 'payTotalAmount'
        },
        {
          title: '获得补贴总额',
          key: 'subsidyStoreTotalAmount'
        },
        {
          title: '交易总额',
          key: 'transactionTotalAmount'
        },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('Button', {
              props: { type: 'primary', size: 'small' },
              on: { click: () => this.downLoad(params.row.downloadUrl) }
            }, '下载详情')
          }
        }
      ]
    }
  },
  created() {
    this.getAccountStatementList()
  },
  methods: {
    downLoad(url) {
      console.log(url)
      const funDownload = function (url, filename) {
        // 创建隐藏的可下载链接
        var eleLink = document.createElement('a')
        eleLink.download = filename
        eleLink.style.display = 'none'
        // 字符内容转变成blob地址
        // var blob = new Blob([content])
        eleLink.href = url // URL.createObjectURL(blob)
        // 触发点击
        document.body.appendChild(eleLink)
        eleLink.click()
        // 然后移除
        document.body.removeChild(eleLink)
      }
      funDownload(url, '账单详情')
    },
    getAccountStatementList() {
      getAccountStatementList(this.searchForm).then(res => {
        if (res.data) {
          this.tableData = res.data.list
          this.searchForm.totalCounts = res.data.total
        } else {
          this.tableData = []
          this.searchForm.totalCounts = 0
        }
      })
    },
    changePageSize(size) {
      this.searchForm.pageSize = size
      this.getAccountStatementList()
    }
  }
}
</script>
