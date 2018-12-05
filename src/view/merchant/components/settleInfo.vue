<template>
  <Form ref="formInline" class="settle-info" :model="formItem" :rules="ruleValidate" :label-width="100" label-position="left">
    <Row :gutter="30">
      <i-col span="12">
        <FormItem label="账户类型" required>
          <Select placeholder="请选择账户类型" v-model="formItem.accountType" :disabled="type === 2">
              <Option :value="0">对公</Option>
              <Option :value="1">对私</Option>
          </Select>
        </FormItem>
        <FormItem label="开户名" prop="accountName">
          <Row type="flex">
            <i-col style="flex:1">
              <Input placeholder="请填写开户名" v-model="formItem.accountName" :disabled="isEqualLegalman"/>
            </i-col>
            <i-col>
              <Checkbox v-if="!isDuigong" v-model="isEqualLegalman" :disabled="type === 2" style="margin-left: 10px;">同法人</Checkbox>
            </i-col>
          </Row>
        </FormItem>
        <FormItem label="身份证号" prop="identityCard" v-if="!isDuigong">
          <Input placeholder="请填写身份证号" v-model="formItem.identityCard" />
        </FormItem>
        <FormItem label="身份证有效期" prop="identityEndTime" v-if="!isDuigong">
          <DatePicker placeholder="结束时间" v-model="formItem.identityEndTime" type="date" style="width:100%;" ></DatePicker>
        </FormItem>
        <FormItem label="开户账户" prop="accountNumber">
          <Input placeholder="请填写开户账户" v-model="formItem.accountNumber" />
        </FormItem>
        <!-- <FormItem label="开户总行" required prop="bank_code">
          <Select v-model="formItem.bank_code" placeholder="请选择开户总行" :label-in-value="true" clearable>
            <Option v-for="(item, index) in generalLineList" :key="index" :value="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem> -->
        <FormItem label="开户地区" required prop="kaihudiqu">
          <pro-city-area
            :p="formItem.mercProv"
            :c="formItem.mercCity"
            :a="formItem.mercArea"
            @on-change="changePro"
          ></pro-city-area>
          <!-- <Row :gutter="10" style="margin:0">
            <i-col span="8" style="padding-left:0">
              <Select v-model="formItem.mercProv" placeholder="省" :label-in-value="true" clearable @on-change="changeProvince"  :disabled="!editable || !requiredEditable">
                <Option v-for="item in proviceList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
              </Select>
            </i-col>
            <i-col span="8">
              <Select v-model="formItem.mercCity" placeholder="市" :label-in-value="true" clearable @on-change="changeCity"  :disabled="!editable || !requiredEditable">
                <Option v-for="item in cityList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
              </Select>
            </i-col>
            <i-col span="8">
              <Select v-model="formItem.mercArea" placeholder="区" clearable :label-in-value="true" @on-change="changeArea"  :disabled="!editable || !requiredEditable">
                <Option v-for="item in districtList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
              </Select>
            </i-col>
          </Row> -->
        </FormItem>
        <FormItem label="开户支行：" prop="bankBranchName">
          <bank @getBank="getBank" :bankBranchName="formItem.bankBranchName"></bank>
        </FormItem>
        <FormItem label="预留手机" prop="bankMobile">
          <Input placeholder="请填写预留手机" v-model="formItem.bankMobile" />
        </FormItem>
        <FormItem label="联行号" prop="interBankNumber">
          <Input placeholder="" v-model="formItem.interBankNumber" disabled />
        </FormItem>
        <FormItem label="商户信息表照" prop="merchantsInfoListImg">
          <upload-img
            title="商户信息表照"
            :needImg="1"
            v-model="xinxibiaoList"
            :viewOnly="!editable || !requiredEditable"
          ></upload-img>
        </FormItem>
      </i-col>
      <i-col span="12" class="right">
        <FormItem label="身份证正反照" prop="idFrontBackImg" v-if="!isDuigong">
          <div style="color:#d6d6d6">每张照片建议大小为<span style="color: red;">500KB</span>，格式可以为PNG、JPG、JPEG</div>
          <upload-img
            title="身份证正面"
            noTips
            :needImg="1"
            v-model="idFrontList"
            :viewOnly="!editable || !requiredEditable"
          ></upload-img>
          <upload-img
            title="身份证反面"
            noTips
            :needImg="1"
            v-model="idBackList"
            :viewOnly="!editable || !requiredEditable"
          ></upload-img>
        </FormItem>
        <FormItem label="开户许可证" prop="accountLicenceImg" v-if="isDuigong">
          <upload-img
            title="开户许可证"
            :needImg="1"
            v-model="xukezhengList"
            :viewOnly="!editable || !requiredEditable"
          ></upload-img>
        </FormItem>
        <FormItem label="银行卡正面" prop="bankFrontImg" v-if="!isDuigong">
          <upload-img
            title="银行卡正面"
            :needImg="1"
            v-model="bankCardFrontList"
            :viewOnly="!editable || !requiredEditable"
          ></upload-img>
        </FormItem>
        <FormItem label="授权结算书" prop="authorizedSettlementImg" v-if="!isDuigong && !isEqualLegalman">
          <upload-img
            title="授权结算书"
            :needImg="1"
            v-model="shouquanjiesuanList"
            :viewOnly="!editable || !requiredEditable"
          ></upload-img>
        </FormItem>
        <FormItem label="协议照" prop="protocolImg">
          <upload-img
            title="协议照"
            :needImg="3"
            v-model="xieyizhaoList"
            :viewOnly="!editable || !requiredEditable"
          ></upload-img>
        </FormItem>

      </i-col>
    </Row>
  </Form>
</template>

<script>
import UploadImg from '_c/uploadImg/uploadImg'
// import { getProvinceInfo, getCityInfo, getAreaInfo } from '@/api/common'
import bank from '_c/bank/bank'
import proCityArea from '_c/proCityArea'

export default {
  name: 'settleInfo',
  props: {
    type: {
      type: Number,
      required: true
    },
    legalManInfo: {
      type: Object
    },
    account: {
      type: Object,
      required: true
    }
  },
  data() {
    const createValid = (...prop) => {
      return (rule, value, callback) => {
        if (prop.some(v => !this.formItem[v])) {
          callback(new Error())
        } else {
          callback()
        }
      }
    }

    return {
      editable: true,
      requiredEditable: true,
      isEqualLegalman: false,
      // generalLineList: [], // 总行列表
      formItem: {
        accountType: 0, // 账户类型
        accountName: '', // 开户名
        identityCard: '', // 身份证号
        identityEndTime: '', // 身份证有效期
        accountNumber: '', // 开户账号
        bankCode: '', // 总行code
        bankName: '', // 总行名称
        bankBranchCode: '', // 支行code
        bankBranchName: '', // 支行名称
        interBankNumber: '', // 银联号
        bankMobile: '', // 预留手机

        province: '', // 省
        mercProv: '', // 省 编码
        city: '', // 市
        mercCity: '', // 市 编码
        area: '', // 区
        mercArea: '', // 区 编码

        identityFrontImg: '', // 身份证正面照
        identityBackImg: '', // 身份证反面照
        accountLicenceImg: '', // 开户许可证照
        bankFrontImg: '', // 银行卡正面照
        authorizedSettlementImg: '', // 授权结算书
        protocolImg: '', // 协议照
        merchantsInfoListImg: '' // 商户信息表
      },
      ruleValidate: {
        accountName: [{ required: true, message: '开户名不能为空', trigger: 'blur' }],
        identityCard: [{ required: true, message: '身份证号不能为空', trigger: 'blur' }],
        accountNumber: [{ required: true, message: '开户账号不能为空', trigger: 'blur' }],
        bankCode: [{ required: true, message: '开户总行不能为空', trigger: 'blur' }],
        bankMobile: [{ required: true, message: '预留手机不能为空', trigger: 'blur' }],
        interBankNumber: [{ required: true, message: '联行号不能为空', trigger: 'blur' }],

        kaihudiqu: [{ required: true, message: '开户地区不能为空', validator: createValid('mercArea', 'mercCity', 'mercProv') }],
        idFrontBackImg: [{ required: true, message: '身份证正面照必须上传', validator: createValid('identityFrontImg', 'identityBackImg') }], // 身份证正面照
        identityEndTime: [{ required: true, message: '身份证有效期不能为空', validator: createValid('identityEndTime') }],
        bankBranchName: [{ required: true, message: '支行名称不能为空', validator: createValid('bankBranchName') }],
        accountLicenceImg: [{ required: true, message: '开户许可证照必须上传', validator: createValid('accountLicenceImg') }], // 开户许可证照
        bankFrontImg: [{ required: true, message: '银行卡正面照必须上传', validator: createValid('bankFrontImg') }], // 银行卡正面照
        authorizedSettlementImg: [{ required: true, message: '授权结算书照必须上传', validator: createValid('authorizedSettlementImg') }], // 授权结算书
        protocolImg: [
          { required: true, message: '协议照必须上传', validator: createValid('protocolImg') },
          {
            required: true,
            message: '协议照必须上传两张及以上',
            validator: (rile, value, callback) => {
              if (!this.formItem.protocolImg || this.formItem.protocolImg.split(',').length < 2) {
                callback(new Error())
              } else {
                callback()
              }
            }
          }
        ], // 协议照
        merchantsInfoListImg: [{ required: true, message: '商户信息表照必须上传', validator: createValid('merchantsInfoListImg') }] // 商户信息表
      },

      // 上传照片列表
      idFrontList: [], // 身份证正反照
      idBackList: [], // 身份证反面
      xukezhengList: [], // 开户许可证
      bankCardFrontList: [], // 银行卡正面
      shouquanjiesuanList: [], // 授权结算书
      xieyizhaoList: [], // 协议照
      xinxibiaoList: [], // 商户信息表照

      proviceList: [], // 省列表
      cityList: [], // 市列表
      districtList: [] // 區列表
    }
  },
  computed: {
    isDuigong() { // 对公
      return this.formItem.accountType === 0
    }
  },
  created() {
    if (this.type === 2) { // 小微商户 只有同法人
      this.formItem.accountType = 1
      this.isEqualLegalman = true
    }
  },
  watch: {
    account: {
      handler(v) {
        if (v.id) {
          let form = this.formItem
          for (let key in form) {
            form[key] = v[key]
          }
          form.id = v.id
          form.identityEndTime = v.identityEndTime ? new Date(v.identityEndTime) : '' // 返回的是 时间戳

          debugger
          // 处理图片
          form.identityFrontImg && (this.idFrontList = form.identityFrontImg.split(',').map(v => ({ url: v })))
          form.identityBackImg && (this.idBackList = form.identityBackImg.split(',').map(v => ({ url: v })))
          form.accountLicenceImg && (this.xukezhengList = form.accountLicenceImg.split(',').map(v => ({ url: v })))
          form.bankFrontImg && (this.bankCardFrontList = form.bankFrontImg.split(',').map(v => ({ url: v })))
          form.authorizedSettlementImg && (this.shouquanjiesuanList = form.authorizedSettlementImg.split(',').map(v => ({ url: v })))
          form.protocolImg && (this.xieyizhaoList = form.protocolImg.split(',').map(v => ({ url: v })))
          form.merchantsInfoListImg && (this.xinxibiaoList = form.merchantsInfoListImg.split(',').map(v => ({ url: v })))
        }
      },
      immediate: true
    },
    legalManInfo: {
      handler(v) {
        console.log(v)
        if (this.isEqualLegalman && !this.isDuigong) {
          this.asyncBussinussInfo(v)
        }
      },
      deep: true
    },
    isEqualLegalman(v) {
      if (v) {
        this.asyncBussinussInfo(this.legalManInfo)
      }
    },
    idFrontList(value) {
      this.formItem.identityFrontImg = value.map(v => v.url).join(',')
    },
    idBackList(value) {
      this.formItem.identityBackImg = value.map(v => v.url).join(',')
    },
    xukezhengList(value) {
      this.formItem.accountLicenceImg = value.map(v => v.url).join(',')
    },
    bankCardFrontList(value) {
      this.formItem.bankFrontImg = value.map(v => v.url).join(',')
    },
    shouquanjiesuanList(value) {
      this.formItem.authorizedSettlementImg = value.map(v => v.url).join(',')
    },
    xieyizhaoList(value) {
      this.formItem.protocolImg = value.map(v => v.url).join(',')
    },
    xinxibiaoList(value) {
      this.formItem.merchantsInfoListImg = value.map(v => v.url).join(',')
    }
  },
  methods: {
    submit() {
      return new Promise((resolve, reject) => {
        this.$refs['formInline'].validate(valid => {
          if (valid) {
            resolve(this.formItem)
          } else {
            this.$Message.error('结算信息不完整，请检查表单填写！')
            /* eslint-disable */
            reject('结算信息不完整！')
          }
        })
      })
    },

    // bank 弹窗回调
    getBank(data) {
      this.formItem.bankBranchCode = data[0].lbnk_NO
      this.formItem.bankBranchName = data[0].lbnk_NM
      this.formItem.interBankNumber = data[0].lbnk_NO
    },

    // 同法人时 同步法人信息 
    asyncBussinussInfo(data) {
      this.formItem.accountName = data.name
      this.formItem.identityCard = data.identityCard
      this.formItem.identityEndTime = data.identityEndDate
      this.formItem.bankMobile = data.mobile
      this.idFrontList = data.identityFrontImg.split(',').filter(v => v).map(v => ({ url: v }))
      this.idBackList = data.identityBackImg.split(',').filter(v => v).map(v => ({ url: v }))
    },

    // 省市区回调
    changePro({ proCode, province, cityCode, city, areaCode, area }) {
      console.log(proCode, province, cityCode, city, areaCode, area)
      this.formItem.mercProv = proCode
      this.formItem.province = province
      this.formItem.mercCity = cityCode
      this.formItem.city = city
      this.formItem.mercArea = areaCode
      this.formItem.area = area
    }
  },
  components: {
    UploadImg,
    proCityArea,
    bank
  }
}
</script>

<style lang="less" scoped>
.right {
  .ivu-form-item {
    margin-bottom: 8px;
  }
}
</style>
