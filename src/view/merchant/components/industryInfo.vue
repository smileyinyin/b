<template>
  <div class="wrapper">
    <Form ref="formInline" :model="formItem" :rules="ruleValidate" :label-width="100" label-position="left">
      <div class="industry-wrapper" v-if="type === 1">

        <divide-line placement="bottom" class="title">工商信息</divide-line>

        <div class="industry">
          <div class="left">
            <FormItem label="营业执照名称" prop="businessName" required>
              <Input v-model="formItem.businessName" placeholder="请输入营业执照名称" clearable :disabled="!editable"/>
            </FormItem>
            <FormItem label="营业执照号" prop="businessNumber" required>
              <Input v-model="formItem.businessNumber" placeholder="请输入营业执照号" clearable :disabled="!editable"/>
            </FormItem>
            <FormItem prop="licenseEndTime" label="营业有效期" required>
              <DatePicker
                type="date"
                v-model="formItem.licenseEndTime"
                :disabled="!editable"
                :options="dateOptions"
                placement="bottom-end"
                placeholder="到期时间"
                style="width: 100%;" ></DatePicker>
            </FormItem>
            <!-- <FormItem label="成立时间" prop="establishTime" required>
              <DatePicker v-model="formItem.establishTime" type="date" split-panels placeholder="请输入成立时间" style="width: 100%;"  :disabled="!editable"></DatePicker>
            </FormItem> -->
          </div>
          <div class="right">
            <FormItem label="营业执照" required prop="licenseImg">
              <div style="color:#d6d6d6">每张照片建议大小为<span style="color: red;">500KB</span>，格式可以为PNG、JPG、JPEG</div>
              <upload-img
                title="营业执照"
                v-model="lisenceImgList"
                :needImg="1"
                :noTips="true"
                :viewOnly="!editable"></upload-img>
            </FormItem>
          </div>
        </div>
      </div>

      <div class="legalman-wrapper">

        <divide-line placement="bottom" class="title">法人信息</divide-line>

        <div class="legalperson">
          <div class="left">
            <FormItem label="法人名称" prop="name" required>
              <Input v-model="formItem.name" placeholder="请输入法人名称" clearable :disabled="!editable"/>
            </FormItem>
            <FormItem label="法人身份证号" prop="identityCard" required>
              <Input v-model="formItem.identityCard" placeholder="请输入法人身份证号" clearable :disabled="!editable"/>
            </FormItem>
            <FormItem label="法人邮箱" prop="email" required>
              <Input v-model="formItem.email" placeholder="请输入法人邮箱" clearable :disabled="!editable"/>
            </FormItem>
            <FormItem label="身份证有效期" required prop='identityEndDate'>
              <DatePicker
                type="date"
                v-model="formItem.identityEndDate"
                :disabled="!editable"
                :options="dateOptions"
                placement="bottom-end"
                placeholder="到期时间"
                style="width:100%;"></DatePicker>
            </FormItem>
            <FormItem label="法人联系电话" prop="mobile" required>
              <Input v-model="formItem.mobile" placeholder="请输入法人联系电话" clearable :disabled="!editable"/>
            </FormItem>
          </div>
          <div class="right">
            <FormItem label="法人身份证" required prop="idImg">
              <div v-if="editable" style="color:#d6d6d6">每张照片建议大小为<span style="color: red;">500KB</span>，格式可以为PNG、JPG、JPEG</div>
              <upload-img title="法人身份证正面"
                :noTips="true"
                :viewOnly="!editable"
                v-model="identityFrontImgList"
                :needImg="1"></upload-img>
              <upload-img title="法人身份证反面"
                :noTips="true"
                :viewOnly="!editable"
                v-model="identityBackImgList"
                :needImg="1"></upload-img>
            </FormItem>
            <FormItem label="手持身份证" required prop="handImg" v-if="type === 2">
              <div style="color:#d6d6d6">每张照片建议大小为<span style="color: red;">500KB</span>，格式可以为PNG、JPG、JPEG</div>
              <upload-img title="手持身份证照"
                style="margin: 0 10px 10px 0;"
                noTips
                :viewOnly="!editable"
                v-model="identityHandImgList"
                :needImg="2"
                ></upload-img>
            </FormItem>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
// import breadCrumb from '_c/breadCrumb/breadCrumb'
import UploadImg from '_c/uploadImg/uploadImg'
import divideLine from '_c/divideLine/divide-line.vue'
import { debounce, createValid } from '@/libs/util'
// import { getIndustryAndLegal, addIndustryAndLegal, updateIndustryAndLegal } from '@/api/merchant'

export default {
  name: 'industryInfo',
  props: {
    type: { // 1 普通商户 2 小微商户，小微商户没有 工商信息
      type: Number,
      required: true
    },
    business: {
      type: Object,
      required: true
    },
    legalPerson: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // isUpdate: false, // 提交时提交给 新增 还是 更新 接口
      // legalStatus: 1, // 1 未认证，2 已认证
      // type: 1, // 1 普通商户 2 小微商户，小微商户没有 工商信息
      editable: true, // 标记可否编辑
      lisenceImgList: [], // 编辑时传入已经上传的 图片
      identityFrontImgList: [], // 编辑时传入已经上传的 图片
      identityBackImgList: [], // 编辑时传入已经上传的 图片
      identityHandImgList: [], // 手持身份证照数组
      formItem: {
        shopId: '', // 所属的商户 ID
        status: '', // 所属商户 状态
        businessName: '', // 营业执照名称
        businessAddress: '', // 营业执照地址
        businessNumber: '', // 执照号
        licenseStartTime: '', // 执照有效期 开始时间
        licenseEndTime: '', // 执照有效期 结束时间
        establishTime: '', // 成立时间
        name: '', // 法人名称
        identityCard: '', // 法人身份证号
        email: '', // 法人邮箱
        startTime: '', // 身份证有效期 开始时间
        identityEndDate: '', // 结束时间
        mobile: '', // 法人电话
        businessLicenseImg: '', // 执照照片 url
        identityFrontImg: '', // 身份证正面照
        identityBackImg: '', // 身份证反面照
        identityHandImg: '' // 手持身份证照，只有小微有
      },
      ruleValidate: {
        businessName: [
          { required: true, message: '营业执照名称不能为空', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/, message: '营业执照名为中文、字母或数字', trigger: 'blur' },
          { type: 'string', max: 36, min: 1, message: '营业执照名为1-36个字符', trigger: 'blur' }
        ],
        businessAddress: [
          { required: true, message: '营业执照地址不能为空', trigger: 'blur' },
          { pattern: /\D+/, message: '营业执照地址不能全为数字', trigger: 'blur' }
        ],
        businessNumber: [
          { required: true, message: '营业执照号不能为空', trigger: 'blur' },
          { pattern: /^[\d\w]+$/, message: '营业执照号必须为字母或数字', trigger: 'blur' },
          { type: 'string', max: 27, min: 1, message: '营业执照号为1-27个字符', trigger: 'blur' }
        ],
        // licenseStartTime: [{ required: true, type: 'date', message: '营业有效期不能为空', trigger: 'blur' }],
        licenseEndTime: [{ required: true, type: 'date', message: '结束时间必须大于开始时间', trigger: 'blur' }],
        establishTime: [{ required: true, type: 'date', message: '成立时间不能为空', trigger: 'blur' }],
        identityEndDate: [{ required: true, type: 'date', message: '身份证有效期不能为空', trigger: 'blur' }],
        name: [
          { required: true, message: '法人名称不能为空', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/, message: '法人名称为中文、字母或数字', trigger: 'blur' },
          { pattern: /\D+/, message: '法人名称不能全为数字', trigger: 'blur' },
          { type: 'string', max: 10, min: 2, message: '法人名称为2-10个字符', trigger: 'blur' }
        ],
        // startTime: [{ required: true, type: 'date', message: '身份证有效期不能为空', trigger: 'blur' }],
        mobile: [
          { required: true, message: '法人联系电话不能为空', trigger: 'blur' },
          { pattern: /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/, message: '请填写合法联系电话', trigger: 'blur' }
        ],
        identityCard: [
          { required: true, message: '法人身份证号不能为空', trigger: 'blur' },
          { pattern: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请填写合法身份证', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '法人邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '请填写正确的邮箱格式', trigger: 'blur' }
        ],
        idImg: [{ required: true, message: '法人身份证正反照必须上传', validator: createValid.call(this, 'formItem.identityFrontImg', 'formItem.identityBackImg') }],
        licenseImg: [{ required: true, message: '营业执照必须上传', validator: createValid.call(this, 'formItem.businessLicenseImg') }],
        handImg: [{ required: true, message: '手持身份证照必须上传', validator: createValid.call(this, 'formItem.identityHandImg') }]
      },
      dateOptions: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      }
    }
  },

  watch: {
    business: {
      immediate: true,
      handler(v) {
        if (v && v.id) {
          this._initFormItem(this.business, this.legalPerson)
        }
      }
    },
    formItem: {
      handler: debounce(function(v) {
        // console.log(v, v)
        this.$emit('legalManChange', v)
      }, 300),
      deep: true
    },
    lisenceImgList(value) {
      this.formItem.businessLicenseImg = value.map(v => v.url).join(',')
    },
    identityFrontImgList(value) {
      this.formItem.identityFrontImg = value.map(v => v.url).join(',')
    },
    identityBackImgList(value) {
      this.formItem.identityBackImg = value.map(v => v.url).join(',')
    },
    identityHandImgList(value) {
      this.formItem.identityHandImg = value.map(v => v.url).join(',')
    }
  },
  methods: {
    submit() {
      return new Promise((resolve, reject) => {
        this.$refs['formInline'].validate(valid => {
          if (valid) {
            let params = this._dealData()
            resolve(params)
          } else {
            this.$Message.error('工商法人信息不完整，请检查表单填写！')
            /* eslint-disable */
            reject('工商法人信息不完整！')
          }
        })
      })
    },

    _initFormItem(business, legalPerson) {
      this.formItem.businessName = business.businessName
      this.formItem.businessAddress = business.businessAddress
      this.formItem.businessNumber = business.businessNumber
      this.formItem.businessLicenseImg = business.businessLicenseImg
      // this.formItem.licenseStartTime = new Date(Number(business.licenseStartTime))
      this.formItem.licenseEndTime = new Date(Number(business.licenseEndTime))
      this.formItem.establishTime = new Date(Number(business.establishTime))
      this.formItem.businessId = business.id

      this.formItem.name = legalPerson.name
      this.formItem.identityCard = legalPerson.identityCard
      this.formItem.email = legalPerson.email
      // this.formItem.startTime = new Date(Number(legalPerson.identityStartDate))
      this.formItem.identityEndDate = new Date(legalPerson.identityEndDate)
      this.formItem.mobile = legalPerson.mobile
      this.formItem.identityFrontImg = legalPerson.identityFrontImg
      this.formItem.identityBackImg = legalPerson.identityBackImg
      this.formItem.legalPersonId = legalPerson.id

      if (legalPerson.identityFrontImg) {
        this.identityFrontImgList = [{name: '身份证正面', url: legalPerson.identityFrontImg}]
      }
      if (legalPerson.identityBackImg) {
        this.identityBackImgList = [{name: '身份证反面', url: legalPerson.identityBackImg}]
      }
      if (business.businessLicenseImg) {
        this.lisenceImgList = [{name: '经营执照', url: business.businessLicenseImg}]
      }
      if (legalPerson.identityHandImg) {
        this.identityHandImgList = legalPerson.identityHandImg.split(',').map(v => {
          return {name: '手持身份证照', url: v}
        })
      }
    },
    _dealData() {
      let form = this.formItem
      let obj = {
        business: { // 工商
          businessAddress: form.businessAddress,
          businessName: form.businessName,
          businessNumber: form.businessNumber,
          businessLicenseImg: form.businessLicenseImg,
          licenseStartTime: form.licenseStartTime,
          licenseEndTime: form.licenseEndTime,
          establishTime: form.establishTime,
          id: form.businessId
        },
        legalPerson: { // 法人
          name: form.name,
          identityCard: form.identityCard,
          email: form.email,
          identityStartDate: form.startTime,
          identityEndDate: form.identityEndDate,
          mobile: form.mobile,
          identityFrontImg: form.identityFrontImg,
          identityBackImg: form.identityBackImg,
          identityHandImg: form.identityHandImg,
          id: form.legalPersonId
        }
      }
      return obj
    }
  },
  components: {
    UploadImg,
    divideLine
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  margin: 0 0px 20px;
  padding: 10px 0;
  .title {
    margin-bottom: 20px;
    padding: 10px 0;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  .industry, .legalperson {
    display: flex;

    .left, .right {
      flex: 1
    }
    .left {
      padding-right: 30px;
    }
  }
  .industry {
    margin-bottom: 40px;
  }
}
</style>
