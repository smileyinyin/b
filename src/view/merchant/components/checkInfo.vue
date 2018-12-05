<template>
  <div class="wrapper">
    <bread-crumb :data="[
      {path: '/merchantList', title: '商户管理'},
      {title: '商户详情'}
    ]"></bread-crumb>
    <Card class="checkinfo">
      <!-- <Alert :type="alertType" class="alert">{{ alertStatus }} <span v-if="status === 4" class="desc">{{ auditContent || '请完善信息，再次提交'}}</span></Alert> -->
      <divide-line>商户基本信息</divide-line>
      <check-baseinfo :baseInfo="baseInfo" :categoryName="categoryName"></check-baseinfo>
      <divide-line v-if="type !== 2">工商信息</divide-line>
      <check-industry v-if="type !== 2" :info="industryAndLegal.business"></check-industry>
      <divide-line>法人信息</divide-line>
      <check-legalman :info="industryAndLegal.legalPerson"></check-legalman>
      <divide-line>结算信息</divide-line>
      <check-settle-info :settleInfo="settleInfo"></check-settle-info>

    </Card>

    <div class="button" v-if="status === 2">
      <Button class="w120 btn-cancel" @click="cancel">取 消</Button>
      <div class="button-right">
        <Button type="primary" class="w120 mr20" @click="audit(3)">审核通过</Button>
        <Button type="error" class="w120" @click="audit(4)">审核不通过</Button>
      </div>
    </div>

    <Modal
        title="审核不通过"
        v-model="modal"
        @on-ok="_audit(4)"
        class-name="checkInfo-modal">
        <Input type="textarea" v-model="content" :autofocus="true" :rows="5" placeholder="请输入审核不通过原因"/>
    </Modal>
  </div>
</template>

<script>
import breadCrumb from '_c/breadCrumb/breadCrumb'
import divideLine from '_c/divideLine/divide-line'
import checkBaseinfo from './checkBaseinfo'
import checkIndustry from './checkIndustry'
import checkLegalman from './checkLegalman'
import checkSettleInfo from './checkSettleInfo'
import { getMerchantsInfo, getIndustryAndLegal, auditMerchants } from '@/api/merchant'

export default {
  name: 'checkInfo',
  data() {
    return {
      modal: false, // 弹窗
      shopId: '', // 所属商户 ID
      status: '', // 商户状态
      type: '', // 商户是小微还是普通
      auditContent: '', // 审核不通过内容
      categoryName: '', // 经营类型名称
      baseInfo: {}, // 商户基本信息
      industryAndLegal: {
        business: {},
        legalPerson: {}
      }, // 工商、法人 信息
      settleInfo: {}, // 结算信息
      content: '' // 审核不通过填写审核内容
    }
  },
  created() {
    let merchant = this.$store.state.merchant.merchant
    if (!merchant) {
      this.$router.replace({ name: 'merchantList' })
      return
    }
    let { id, type, status, auditContent, categoryName } = merchant
    // debugger
    this.shopId = id
    this.status = status
    this.type = type
    this.auditContent = auditContent
    this.categoryName = categoryName
    this._getMerchantsInfo()
    this._getIndustryAndLegal()
  },
  computed: {
    alertType() {
      return this.status === 4 ? 'error' : 'success'
    },
    alertStatus() {
      let str = ''
      if (this.status === 2) {
        str = '待审核'
      } else if (this.status === 4) {
        str = '审核失败'
      } else if (this.status === 3) {
        str = '审核通过'
      }
      return str
    }
  },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    audit(status) {
      if (status === 4) { // 审核不通过时 填写意见
        this.modal = true
      } else if (status === 3) {
        this.content = ''
        this._audit(status)
      }
    },
    _audit(status) {
      auditMerchants({
        status,
        merchantsId: this.shopId,
        content: this.content
      }).then(res => {
        console.log('审核成功。。')
        this.$router.push({ name: 'merchantList' })
      })
    },
    _getIndustryAndLegal() {
      getIndustryAndLegal(this.shopId).then(res => {
        this.industryAndLegal = res.data
      })
    },
    _getMerchantsInfo() {
      getMerchantsInfo(this.shopId).then(res => {
        this.baseInfo = res.data.merchantsInfo || {}
        this.auditContent = res.data.auditContent
        this.settleInfo = res.data.sxwMerchantsAccount || {}
      })
    }
  },
  components: { divideLine, checkBaseinfo, checkIndustry, checkLegalman, checkSettleInfo, breadCrumb }
}
</script>

<style lang="less" scoped>
.wrapper {

  .checkinfo {
    padding: 0 20px;
    /deep/ .form{
      display: flex;
      align-items: stretch;
      margin: 20px 0;
      .left, .right {
        flex: 1
      }
      .right {
        display: flex;
        flex-direction: column;
        > div {
          flex: 0 0 50%;
          margin-bottom: 0;
        }
      }
    }

    .alert {
      font-weight: bold;
      .desc {
        margin-left: 40px;
        font-weight: normal;
      }
    }
  }
  .button {
    margin: 20px 30px 0;
    display: flex;
    justify-content: space-between;

    button {
      width: 120px;
    }
    .button-right {
      width: 120px;
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
// <style lang="less">
// .checkInfo-modal {
//   .ivu-modal-header {
//     border-bottom: 0
//   }
//   .ivu-modal-footer {
//     border-top: 0;
//   }
//   textarea {
//     border: none;
//   }
// }
// </style>
