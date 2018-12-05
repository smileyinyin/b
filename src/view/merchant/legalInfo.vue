<template>
  <!-- <div>工商信息 {{ $route.params.id }}</div> -->
  <div class="wrapper">
    <bread-crumb :data="[
      {path: '/merchantList', title: '商户管理'},
      {title: '添加认证信息'}
    ]"></bread-crumb>
    <Card>
      <p style="padding-bottom: 20px; font-size: 16px;">添加认证信息</p>

      <Form ref="formInline"
       style="padding: 10px 20px 20px;"
       :model="formItem"
       :rules="ruleValidate"
       :label-width="100"
       label-position="left">
        <div class="industry-wrapper" v-if="type === 1">
          <divide-line placement="bottom" class="title">工商信息</divide-line>
          <!-- <h3 class="title">工商信息</h3> -->
          <div class="industry">
            <div class="left">
              <FormItem label="营业执照名称" prop="businessName" required>
                <Input v-model="formItem.businessName" placeholder="请输入营业执照名称" clearable :disabled="!editable"/>
              </FormItem>
              <FormItem label="营业执照地址" prop="businessAddress" required>
                <Input v-model="formItem.businessAddress" placeholder="请输入营业执照地址" clearable :disabled="!editable"/>
              </FormItem>
              <FormItem label="营业执照号" prop="zhizhaohao" required>
                <Input v-model="formItem.zhizhaohao" placeholder="请输入营业执照号" clearable :disabled="!editable"/>
              </FormItem>
              <!-- <FormItem label="营业有效期" required>
                <Row>
                  <i-col span="12">
                    <FormItem prop="licenseStartTime">
                      <DatePicker type="date" v-model="formItem.licenseStartTime" placeholder="开始时间"  :disabled="!editable"></DatePicker>
                    </FormItem>
                  </i-col>
                  <i-col span="12">
                  </i-col>
                </Row>
              </FormItem> -->
              <FormItem prop="licenseEndTime" label="营业有效期" required>
                <DatePicker
                type="date"
                v-model="formItem.licenseEndTime"
                :disabled="!editable"
                :options="dateOptions"
                placement="bottom-end"
                placeholder="到期时间"
                style="width: 100%;"></DatePicker>
              </FormItem>
              <!-- <FormItem label="成立时间" prop="chenglishijian" required>
                <DatePicker v-model="formItem.chenglishijian" type="date" split-panels placeholder="请输入成立时间" style="width: 100%;"  :disabled="!editable"></DatePicker>
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
          <!-- <h3 class="title">法人信息</h3> -->
          <div class="legalperson">
            <div class="left">
              <FormItem label="法人名称" prop="faren" required>
                <Input v-model="formItem.faren" placeholder="请输入法人名称" clearable :disabled="!editable"/>
              </FormItem>
              <FormItem label="法人身份证号" prop="IDcard" required>
                <Input v-model="formItem.IDcard" placeholder="请输入法人身份证号" clearable :disabled="!editable"/>
              </FormItem>
              <FormItem label="身份证有效期" required prop="endTime">
                <!-- <Row>
                  <i-col span="12">
                    <FormItem prop="startTime">
                      <DatePicker type="date" v-model="formItem.startTime" placeholder="开始时间" :disabled="!editable"></DatePicker>
                    </FormItem>
                  </i-col>
                  <i-col span="12">
                  </i-col>
                </Row>
                <FormItem prop="endTime">
                </FormItem> -->
                <DatePicker type="date"
                  v-model="formItem.endTime"
                  :disabled="!editable"
                  :options="dateOptions"
                  placement="bottom-end"
                  placeholder="到期时间"
                  style="width: 100%;"></DatePicker>
              </FormItem>
              <FormItem label="法人联系电话" prop="dianhua" required>
                <Input v-model="formItem.dianhua" placeholder="请输入法人联系电话" clearable :disabled="!editable"/>
              </FormItem>
            </div>
            <div class="right">
              <FormItem label="法人身份证" required prop="idImg">
                <div v-if="editable" style="color:#d6d6d6">每张照片建议大小为<span style="color: red;">500KB</span>，格式可以为PNG、JPG、JPEG</div>
                <upload-img title="法人身份证正面"
                  style="margin: 0 10px 10px 0;"
                  :noTips="true"
                  :viewOnly="!editable"
                  v-model="identityFrontImgList"
                  :needImg="1"></upload-img>
                <upload-img title="法人身份证反面"
                  style="margin: 0 10px 10px 0;"
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
    </Card>
    <div class="button" v-if="editable">
      <Button @click="cancel" class="w120 btn-cancel">取消</Button>
      <div class="saveBtn">
        <Button type="success" class="w120" @click="save">保存</Button>
        <Button type="primary" class="w120" @click="saveAndSubmit">保存并提交</Button>
      </div>
    </div>
  </div>
</template>

<script>
import breadCrumb from '_c/breadCrumb/breadCrumb'
import UploadImg from '_c/uploadImg/uploadImg'
import divideLine from '_c/divideLine/divide-line.vue'
import { getIndustryAndLegal, addIndustryAndLegal, updateIndustryAndLegal } from '@/api/merchant'

export default {
  name: 'legalInfo',
  data() {
    // const isGtLicenseStartTime = (rule, value, callback) => {
    //   if (+new Date(value) < +new Date(this.formItem.licenseStartTime)) {
    //     callback(new Error())
    //   } else {
    //     callback()
    //   }
    // }

    // const isGtEndTime = (rule, value, callback) => {
    //   if (+new Date(value) < +new Date(this.formItem.startTime)) {
    //     callback(new Error())
    //   } else {
    //     callback()
    //   }
    // }

    const hasIdImg = (rule, value, callback) => {
      console.log(this.formItem.identityFrontImg, this.formItem.identityBackImg)
      if (!this.formItem.identityFrontImg || !this.formItem.identityBackImg) {
        callback(new Error())
      } else {
        callback()
      }
    }
    const hasLicenseImg = (rule, value, callback) => {
      if (!this.formItem.lisenceImg) {
        callback(new Error())
      } else {
        callback()
      }
    }
    const hasHandImg = (rule, value, callback) => {
      if (!this.formItem.identityHandImg) {
        callback(new Error())
      } else {
        callback()
      }
    }

    return {
      isUpdate: false, // 提交时提交给 新增 还是 更新 接口
      // legalStatus: 1, // 1 未认证，2 已认证
      type: 1, // 1 普通商户 2 小微商户，小微商户没有 工商信息
      editable: false, // 标记可否编辑
      lisenceImgList: [], // 编辑时传入已经上传的 图片
      identityFrontImgList: [], // 编辑时传入已经上传的 图片
      identityBackImgList: [], // 编辑时传入已经上传的 图片
      identityHandImgList: [], // 手持身份证照数组
      formItem: {
        shopId: '', // 所属的商户 ID
        status: '', // 所属商户 状态
        businessName: '', // 营业执照名称
        businessAddress: '', // 营业执照地址
        zhizhaohao: '', // 执照号
        licenseStartTime: '', // 执照有效期 开始时间
        licenseEndTime: '', // 执照有效期 结束时间
        chenglishijian: '', // 成立时间
        faren: '', // 法人名称
        IDcard: '', // 法人身份证号
        startTime: '', // 身份证有效期 开始时间
        endTime: '', // 结束时间
        dianhua: '', // 法人电话
        lisenceImg: '', // 执照照片 url
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
        zhizhaohao: [
          { required: true, message: '营业执照号不能为空', trigger: 'blur' },
          { pattern: /^[\d\w]+$/, message: '营业执照号必须为字母或数字', trigger: 'blur' },
          { type: 'string', max: 27, min: 1, message: '营业执照号为1-27个字符', trigger: 'blur' }
        ],
        // licenseStartTime: [{ required: true, type: 'date', message: '营业有效期不能为空', trigger: 'blur' }],
        licenseEndTime: [{ required: true, type: 'date', message: '营业执照到期时间不能为空', trigger: 'blur' }],
        chenglishijian: [{ required: true, type: 'date', message: '成立时间不能为空', trigger: 'blur' }],
        faren: [
          { required: true, message: '法人名称不能为空', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/, message: '法人名称为中文、字母或数字', trigger: 'blur' },
          { pattern: /\D+/, message: '法人名称不能全为数字', trigger: 'blur' },
          { type: 'string', max: 10, min: 2, message: '法人名称为2-10个字符', trigger: 'blur' }
        ],
        // startTime: [{ required: true, type: 'date', message: '身份证有效期不能为空', trigger: 'blur' }],
        endTime: [{ required: true, type: 'date', message: '身份证到期时间不能为空', trigger: 'blur' }],
        dianhua: [
          { required: true, message: '法人联系电话不能为空', trigger: 'blur' },
          { pattern: /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/, message: '请填写合法联系电话', trigger: 'blur' }
        ],
        IDcard: [
          { required: true, message: '商户名不能为空', trigger: 'blur' },
          { pattern: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请填写合法身份证', trigger: 'blur' }
        ],
        idImg: [{ required: true, message: '法人身份证正反照不能为空', validator: hasIdImg }],
        licenseImg: [{ required: true, message: '营业执照不能为空', validator: hasLicenseImg }],
        handImg: [{ required: true, message: '手持身份证照必须上传', validator: hasHandImg }]
      },
      dateOptions: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      }
    }
  },
  created() {
    let merchant = this.$store.state.merchant.merchant
    if (!merchant) {
      this.$router.replace({name: 'merchantList'})
      return
    }
    let { id, status, type } = merchant
    // this.legalStatus = legalStatus
    this.type = type
    this.formItem.shopId = id
    this.formItem.status = status
    if (status === 1 || status === 4) { // 草稿 和 审核失败 时可编辑
      this.editable = true
    }
    this._getInfo(id)
  },
  watch: {
    lisenceImgList(value) {
      this.formItem.lisenceImg = value.map(v => v.url).join(',')
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
    cancel() {
      this.$router.go(-1)
    },
    save() {
      this.formItem.status = 1 // 提交草稿
      this.$refs['formInline'].validate((valid) => {
        if (valid) {
          let params = this._dealData()
          if (this.isUpdate) {
            updateIndustryAndLegal(params).then(res => {
              this.$router.push({ name: 'merchantList' })
            })
          } else {
            addIndustryAndLegal(params).then(res => {
              this.$router.push({ name: 'merchantList' })
            })
          }
        } else {
          this.$Message.error('请检查表单填写!')
        }
      })
    },
    saveAndSubmit() {
      this.formItem.status = 2 // 保存并提交审核
      this.$refs['formInline'].validate((valid) => {
        if (valid) {
          let params = this._dealData()
          if (this.isUpdate) {
            updateIndustryAndLegal(params).then(res => {
              this.$router.push({ name: 'merchantList' })
            })
          } else {
            addIndustryAndLegal(params).then(res => {
              this.$router.push({ name: 'merchantList' })
            })
          }
        } else {
          this.$Message.error('请检查表单填写!')
        }
      })
    },
    _getInfo(id) {
      getIndustryAndLegal(id).then(res => {
        let business = res.data.business
        let legalPerson = res.data.legalPerson
        if (legalPerson !== null) { // 说明提交过
          this.isUpdate = true // 是更新操作，使用 update 接口

          this.formItem.businessName = business.businessName
          this.formItem.businessAddress = business.businessAddress
          this.formItem.zhizhaohao = business.businessNumber
          this.formItem.lisenceImg = business.businessLicenseImg
          this.formItem.licenseStartTime = new Date(Number(business.licenseStartTime))
          this.formItem.licenseEndTime = new Date(Number(business.licenseEndTime))
          this.formItem.chenglishijian = new Date(Number(business.establishTime))
          this.formItem.businessId = business.id

          this.formItem.faren = legalPerson.name
          this.formItem.IDcard = legalPerson.identityCard
          this.formItem.startTime = new Date(Number(legalPerson.identityStartDate))
          this.formItem.endTime = new Date(legalPerson.identityEndDate)
          this.formItem.dianhua = legalPerson.mobile
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
        }
      })
    },
    _dealData() {
      let form = this.formItem
      let obj = Object.assign(
        {
          merchantId: this.formItem.shopId,
          merchantStatus: this.formItem.status
        },
        {
          business: { // 工商
            businessAddress: form.businessAddress,
            businessName: form.businessName,
            businessNumber: form.zhizhaohao,
            businessLicenseImg: form.lisenceImg,
            licenseStartTime: form.licenseStartTime,
            licenseEndTime: form.licenseEndTime,
            establishTime: form.chenglishijian,
            id: form.businessId
          },
          legalPerson: { // 法人
            name: form.faren,
            identityCard: form.IDcard,
            identityStartDate: form.startTime,
            identityEndDate: form.endTime,
            mobile: form.dianhua,
            identityFrontImg: form.identityFrontImg,
            identityBackImg: form.identityBackImg,
            identityHandImg: form.identityHandImg,
            id: form.legalPersonId
          }
        }
      )
      console.log(obj)
      return obj
    }
  },
  components: {
    UploadImg,
    divideLine,
    breadCrumb
  }
}
</script>

<style lang="less" scoped>
.wrapper {

  .title {
    margin-bottom: 20px;
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
  .button {
    padding: 0 30px;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    button:not(:last-of-type) {
      margin-right: 20px;
    }
  }
}
</style>
