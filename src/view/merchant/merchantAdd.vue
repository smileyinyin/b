<template>
  <div>
    <bread-crumb :data="[
      {path: '/merchantList', title: '商户管理'},
      {title: title}
    ]"></bread-crumb>
    <Card>

      <divide-line placement="bottom" class="mt10 mb20">基本信息</divide-line>
      <base-info
        ref="baseInfo"
        :type="type"
        :merchant="merchant"
      ></base-info>

      <industry-info
        ref="industryInfo"
        :type="type"
        :business="business"
        :legalPerson="legalPerson"
        @legalManChange="legalManChange"
      ></industry-info>

      <divide-line placement="bottom" class="mb20">结算信息</divide-line>
      <settle-info
        ref="settleInfo"
        :type="type"
        :account="account"
        :legalManInfo="legalManInfo"
      ></settle-info>

    </Card>
    <div class="button">
      <Button class="btn-cancel w120" @click="cancel" size="large">取 消</Button>
      <div>
        <Button class="btn-add w120 mr20" @click="handleSubmit" size="large">保 存</Button>
      </div>
    </div>
  </div>
</template>

<script>
import breadCrumb from '_c/breadCrumb/breadCrumb'
import divideLine from '_c/divideLine/divide-line'
import baseInfo from './components/baseInfo'
import industryInfo from './components/industryInfo'
import settleInfo from './components/settleInfo'
import { addMerchantsInfo, getMerchantsInfo, updateMerchants } from '@/api/merchant'
// import { getIndustryAndLegal, addIndustryAndLegal, updateIndustryAndLegal } from '@/api/merchant'

export default {
  name: 'merchantAdd',
  data() {
    return {
      // editable: true,
      title: '商户新增',
      type: 1, // 1 普通商户 2 小微商户
      legalManInfo: {
        name: '', // 法人名称
        identityCard: '', // 法人身份证号
        startTime: '', // 身份证有效期 开始时间
        identityEndDate: '', // 结束时间
        mobile: '', // 法人电话
        businessLicenseImg: '', // 执照照片 url
        identityFrontImg: '', // 身份证正面照
        identityBackImg: '', // 身份证反面照
        identityHandImg: '' // 手持身份证照，只有小微有
      }, // 结算信息同法人时， 需要传递法人信息

      merchant: {}, // 商户基本信息
      business: {}, // 工商信息
      legalPerson: {}, // 法人信息
      account: {}, // 结算信息
      bind: {} // 绑定信息
    }
  },
  created() {
    // 刷新后 vuex 状态丢失，回列表
    let merchant = this.$store.state.merchant.merchant
    if (!merchant) {
      this.$router.replace({ name: 'merchantList' })
      return
    }
    this.type = merchant.type || 1
    if (merchant.id) {
      this.title = '商户编辑'
      this._getMerchantsInfo(merchant.id)
    }
  },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    handleSubmit() {
      Promise.all([
        this.$refs['baseInfo'].submit(),
        this.$refs['industryInfo'].submit(),
        this.$refs['settleInfo'].submit()
      ]).then(([ merchantsInfo, industryInfo, sxwMerchantsAccount ]) => {
        console.log(merchantsInfo, industryInfo, sxwMerchantsAccount)
        let baseInfo = {
          userId: this.$store.state.user.userId,
          roleId: this.$store.state.user.roleId,
          merchantsInfo, // 商户信息
          merchantsBusiness: industryInfo.business, // 工商信息
          merchantsLegalPerson: industryInfo.legalPerson, // 法人信息
          sxwMerchantsAccount // 结算信息
        }

        // 商户有 id 则为编辑
        if (this.merchant.id) {
          updateMerchants({ id: this.merchant.id, ...baseInfo }).then(res => {
            this.$router.push({ name: 'merchantList' })
          })
        } else {
          addMerchantsInfo(baseInfo).then(res => {
            this.$router.push({ name: 'merchantList' })
          })
        }
      })
      // console.log('submit')
    },
    legalManChange(v) {
      this.legalManInfo = v
    },
    // 获取商户 基本信息，工商，法人，结算信息
    _getMerchantsInfo(id) {
      getMerchantsInfo(id).then(res => {
        this.merchant = res.data.merchantsInfo || {}
        this.business = res.data.merchantsBusiness || {}
        this.legalPerson = res.data.merchantsLegalPerson || {}
        this.account = res.data.sxwMerchantsAccount || {}
      })
    }
  },
  components: { breadCrumb, divideLine, baseInfo, industryInfo, settleInfo }
}
</script>

<style lang="less" scoped>
.button {
  margin: 30px 30px 0;
  display: flex;
  justify-content: space-between;
}
</style>
