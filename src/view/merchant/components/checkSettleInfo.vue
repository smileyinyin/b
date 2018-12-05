<template>
  <Form :label-width="100" class="form pb30" label-position="left">
    <Row :gutter="30" style="width: 100%;">
      <i-col span="12">
        <FormItem label="账户类型">{{ settleInfo.accountType === 0 ? '对公' : '对私' }}</FormItem>
        <FormItem label="开户名">{{ settleInfo.accountName }}</FormItem>
        <FormItem label="身份证号" v-if="settleInfo.identityCard">{{ settleInfo.identityCard }}</FormItem>
        <FormItem label="身份证有效期" v-if="settleInfo.identityEndTime">{{ formatCreateTime }}</FormItem>
        <FormItem label="开户账户">{{ settleInfo.accountNumber }}</FormItem>
        <!-- <FormItem label="开户总行">{{ settleInfo.bankName }}</FormItem> -->
        <FormItem label="开户地区">{{ `${settleInfo.province || ''}-${settleInfo.city || ''}-${settleInfo.area || ''}` }}</FormItem>
        <FormItem label="支行名称">{{ settleInfo.bankBranchName }}</FormItem>
        <FormItem label="预留手机">{{ settleInfo.bankMobile }}</FormItem>
        <FormItem label="联行号">{{ settleInfo.interBankNumber }}</FormItem>
        <FormItem label="商户信息表照" v-if="settleInfo.operationImg">
          <upload-img v-model="operationImg" viewOnly></upload-img>
        </FormItem>
      </i-col>
      <i-col span="12">
        <FormItem label="身份证正反照" v-if="settleInfo.identityFrontImg || settleInfo.identityBackImg">
          <upload-img v-if="settleInfo.identityFrontImg" v-model="identityFrontImg" viewOnly></upload-img>
          <upload-img v-if="settleInfo.identityBackImg" v-model="identityBackImg" viewOnly></upload-img>
        </FormItem>
        <FormItem label="开户许可证" v-if="settleInfo.accountLicenceImg">
          <upload-img v-model="accountLicenceImg" viewOnly></upload-img>
        </FormItem>
        <FormItem label="银行卡正面" v-if="settleInfo.bankFrontImg">
          <upload-img v-model="bankFrontImg" viewOnly></upload-img>
        </FormItem>
        <FormItem label="授权结算书" v-if="settleInfo.authorizedSettlementImg">
          <upload-img v-model="authorizedSettlementImg" viewOnly></upload-img>
        </FormItem>
        <FormItem label="协议照" v-if="settleInfo.protocolImg">
          <upload-img v-model="protocolImg" viewOnly></upload-img>
        </FormItem>
      </i-col>
    </Row>
  </Form>
</template>

<script>
import uploadImg from '_c/uploadImg/uploadImg'
import { formatDate } from '@/libs/util'
export default {
  name: 'checkSettleInfo',
  props: {
    settleInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    identityFrontImg() {
      return [{ url: this.settleInfo.identityFrontImg }]
    },
    identityBackImg() {
      return [{ url: this.settleInfo.identityBackImg }]
    },
    accountLicenceImg() {
      return [{ url: this.settleInfo.accountLicenceImg }]
    },
    bankFrontImg() {
      return [{ url: this.settleInfo.bankFrontImg }]
    },
    authorizedSettlementImg() {
      return [{ url: this.settleInfo.authorizedSettlementImg }]
    },
    protocolImg() {
      return this.settleInfo.protocolImg.split(',').map(v => ({ url: v }))
    },
    formatCreateTime() {
      if (!this.settleInfo.identityEndTime) {
        return ''
      }
      return formatDate(new Date(this.settleInfo.identityEndTime), 'yyyy年MM月dd日')
    }
  },
  components: { uploadImg }
}
</script>
