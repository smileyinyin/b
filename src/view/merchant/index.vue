<template>
  <div class="merchant">
    <h3 class="pb10">商户管理</h3>
    <Card>
      <Row class="pb20" type="flex">
        <i-col>
          <i-button @click="modal = true" icon="plus" class="btn-add" v-if="$store.state.user.access[0] === 'SXR001'">
            添加商户
          </i-button>
        </i-col>
        <i-col style="flex:1">
          <Row :gutter="20" type="flex" justify="end" align="middle">
            <Select v-model="searchForm.status" placeholder="全部状态" clearable style="width: 120px; margin-right: 20px;">
              <!-- <Option value="1" key="1">草稿</Option> -->
              <!-- <Option value="2" key="2">提交</Option> -->
              <Option value="3" key="3">正常</Option>
              <!-- <Option value="4" key="4">审核失败</Option> -->
              <Option value="5" key="5">停业</Option>
            </Select>
            <!-- <Select v-model="searchForm.categoryCode" placeholder="经营类型" clearable style="width: 120px; margin-right: 20px;">
              <Option v-for="item in businessTypeList" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select> -->
            <!-- <Select v-model="searchForm.type" placeholder="商户类型" clearable style="width: 120px; margin-right: 20px;">
              <Option value="1" key="1">普通商户</Option>
              <Option value="2" key="2">小微商户</Option>
            </Select> -->
            <i-input v-model="searchForm.name" placeholder="商户名称" clearable style="width: 150px; margin-right: 20px;"></i-input>
            <DatePicker v-model="searchForm.date" type="datetimerange" placement="bottom-end" placeholder="选择日期" style="width: 300px; margin-right: 20px;"></DatePicker>
            <!-- <Checkbox v-model="searchForm.isSupplier"
              :true-value="6"
              :false-value="4"
              style="width: 100px; margin-right: 20px;">筛选供应商</Checkbox> -->
          </Row>
          <!-- <Row :gutter="20" type="flex" justify="end" align="middle" style="margin-bottom: 10px;">
          </Row> -->
        </i-col>
        <i-col>
          <i-button type="primary" @click="getMerchantList(1)" icon="search">
            查 询
          </i-button>
        </i-col>
      </Row>
      <Table border :columns="columns" :data="tableData"></Table>
      <Row type="flex" justify="end" align="middle" style="margin-top: 10px">
        <Page :total="pager.totalCounts" show-sizer
              :page-size="pager.pageSize" :current.sync="pager.pageNum"
              @on-change="getMerchantList"
              @on-page-size-change="changePageSize"
        > </Page>
      </Row>
    </Card>
    <Modal
        scrollable
        class-name="modal"
        v-model="modal"
        title="选择商户类型"
        @on-ok="goMerchant">
        <merchant-type @select="chooseMerchantType"></merchant-type>
    </Modal>
  </div>
</template>

<script>
/**
 * 基本信息 和 认证信息：
 * 草稿状态(1) 可编辑 基本信息 和 工商信息，
 * 待审核(2) 全都不能改，
 * 审核通过(3) 后 基本信息必填项不可改。
 * 审核失败(4) 后全都可以改。
 * 停业(5) 全都不能改。
 * ---------
 * 账号信息：
 * 审核通过之前(1)(2) 灰色
 * 正常营业(3) 可添加，已添加后 只能查看不可编辑
 * ---------
 * 小微商户：
 * 没有工商信息
 * ---------
 * status: 1, // 1 草稿  2提交(带审核) 3正常(审核通过) 4审核失败  5  停业
   industryStatus / legalStatus: 1, //  1 未认证 2 认证
   accountStatus: 0, //  0 未添加 1 已添加
   type: 1 普通商户 2 小微商户
 */
import { mapMutations } from 'vuex'
import merchantType from './components/merchantType'
import { formatDate } from '@/libs/util'
import { getMerchantsList } from '@/api/merchant'
import { getSxoIndustryInfo } from '@/api/common'
import makeColumns from './data/merchant-list-column'

export default {
  name: 'merchant',
  data() {
    return {
      modal: false,
      selectedMerchantType: '', // 弹出框选择的 商户类型
      searchForm: { // 搜索条件
        status: '',
        categoryCode: '',
        type: '',
        name: '',
        storeName: '',
        date: '',
        isSupplier: 4, // 1城市合伙人 2渠道合伙人 3业务员 4商户 5运营商 6供应商 7体验店 8自主供应商 9总公司 10普通消费者 11分公司
        userId: this.$store.state.user.userId,
        roleId: undefined
      },
      pager: {
        pageNum: 1,
        pageSize: 20,
        totalCounts: 0
      },
      businessTypeList: [ // 经营类型
        // { id: 5, code: '5', dataValue: '经营类型' }
      ],
      columns: makeColumns.call(this),
      tableData: []
    }
  },

  created() {
    // this.getMerchantList() // watch immediate 查询了一次
    // this._getBusinessTypeList()
  },

  watch: {
    '$store.state.user.roleId': {
      handler(value) {
        this.searchForm.roleId = value
        this.getMerchantList()
      },
      immediate: true
    }
  },

  methods: {
    ...mapMutations([
      'setMerchant'
    ]),

    // 选择商户类型
    chooseMerchantType(type) {
      this.selectedMerchantType = type
    },

    goMerchant() {
      this.setMerchant({ type: this.selectedMerchantType, status: 1 })
      this.$router.push({ name: 'merchantAdd' })
    },

    // goLegalInfo(params) {
    //   this.setMerchant(params)
    //   this.$router.push({ name: 'legalInfo' })
    // },

    // 绑定信息
    goAccountInfo(params) {
      this.setMerchant(params)
      this.$router.push({ name: 'accountInfo' })
    },

    // 门店数
    goStoreList(params) {
      this.setMerchant(params)
      this.$router.push({ name: 'storeList' })
    },

    // 商户列表查询
    getMerchantList(page) {
      this.pager.pageNum = page || this.pager.pageNum
      let query = Object.assign(
        {},
        this.searchForm,
        this.pager,
        {
          userId: this.$store.state.user.userId,
          roleId: this.$store.state.user.roleId
        },
        {
          startTime: formatDate(this.searchForm.date[0], 'yyyy-MM-dd hh:mm:ss'),
          endTime: formatDate(this.searchForm.date[1], 'yyyy-MM-dd hh:mm:ss')
        }
      )
      getMerchantsList(query).then(res => {
        this.tableData = res.data.list
        this.pager.totalCounts = res.data.total
      })
    },

    // 选择页面条数
    changePageSize(size) {
      this.pager.pageSize = size
      this.getMerchantList()
    },

    // 经营类型(公共接口)
    _getBusinessTypeList() {
      getSxoIndustryInfo().then(res => {
        this.businessTypeList = res
      })
    }
    // 操作 查看
    // _getAction(h, params, btnArr, status) {
    //   var oper = this._getOperations(status)
    //   oper.name && btnArr.push(
    //     h(
    //       'Button',
    //       {
    //         props: {
    //           size: 'small',
    //           type: status === 3 ? 'error' : status === 4 ? 'warning' : 'success'
    //         },
    //         on: {
    //           click: () => oper.action(params.row)
    //         }
    //       },
    //       oper.name
    //     )
    //   )
    //   return btnArr
    // },
    // // 状态
    // _getOperations(status) {
    //   var oper = {}
    //   switch (status) {
    //     case 1:
    //       oper = { originName: '草稿' }
    //       break
    //     case 2:
    //       oper = {
    //         originName: '待审核'
    //         // name: '审核',
    //         // action: (params) => {
    //         //   // B端没有审核
    //         //   this.setMerchant(params)
    //         //   this.$router.push({ name: 'checkInfo' })
    //         // }
    //       }
    //       break
    //     case 3:
    //       oper = {
    //         originName: '正常',
    //         name: '停业',
    //         action: (params) => {
    //           this.$Modal.confirm({
    //             title: '确认停业',
    //             content: '<p>确定要停业吗？</p><br/>',
    //             onOk: () => {
    //               getMerchantsActive({ shopId: params.id, shopStatus: 5 }).then(res => {
    //                 this.getMerchantList()
    //               })
    //             }
    //           })
    //         }
    //       }
    //       break
    //     case 4:
    //       oper = {
    //         originName: '审核失败',
    //         name: '审核结果',
    //         action: (params) => {
    //           // ...
    //           this.setMerchant(params)
    //           this.$router.push({ name: 'checkInfo' })
    //         }
    //       }
    //       break
    //     case 5:
    //       oper = {
    //         originName: '停业',
    //         name: '恢复',
    //         action: (params) => {
    //           // ...
    //           this.$Modal.confirm({
    //             title: '确认恢复',
    //             content: '<p>确定要恢复吗？</p><br/>',
    //             onOk: () => {
    //               getMerchantsActive({ shopId: params.id, shopStatus: 3 }).then(res => {
    //                 this.getMerchantList()
    //               })
    //             }
    //           })
    //         }
    //       }
    //       break
    //     default:
    //       break
    //   }
    //   return oper
    // }
  },

  components: {
    merchantType
  }
}
</script>

<style lang="less" scoped>
.merchant {
  /deep/ .link {
    padding: 5px;
    cursor: pointer;
    color: #2d8cf0;
  }
}
</style>
