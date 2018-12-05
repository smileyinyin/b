<template>
  <div>
    <breadCrumb :data="[
      { title: '商户管理'},
      {path: '/storeList', title: '门店管理'},
      {title: title}
    ]"></breadCrumb>
    <Card>
      <h3 class="pb20">添加门店</h3>

      <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="90" class="form">
        <div class="left">
          <p class="tips">提示：门店名称请以"省+市+门店名称"都形式输入</p>
          <FormItem required label="门店名称" prop="name">
            <Input v-model="formItem.name" placeholder="请输入省、市加门店名称" :disabled="!isCitypartner"/>
          </FormItem>
          <FormItem required label="经营类型">
            <Select v-model="formItem.categoryCode" placeholder="经营类型" :disabled="true">
              <Option v-for="item in businessTypeList" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem required label="门店联系人" prop="contactName">
            <Input v-model="formItem.contactName" placeholder="请输入门店联系人" :disabled="!isCitypartner"/>
          </FormItem>
          <FormItem label="联系人邮箱" prop="contactEmail">
            <Input v-model="formItem.contactEmail" placeholder="请输入联系人邮箱" :disabled="!isCitypartner" />
          </FormItem>
          <FormItem required label="联系人电话" prop="storesTelephone">
            <Input v-model="formItem.storesTelephone" placeholder="请输入联系人电话"  :disabled="!isCitypartner" />
          </FormItem>
          <FormItem label="门店简介" prop="briefIntroduction">
            <Input v-model="formItem.briefIntroduction" placeholder="请输入门店简介"  :disabled="!isCitypartner"/>
          </FormItem>
          <FormItem label="门店详情" prop="detailInfo">
            <Input type="textarea" v-model="formItem.detailInfo" placeholder="请输入门店详情"  :disabled="!isCitypartner"/>
          </FormItem>
          <FormItem label="门店服务" prop="service">
            <Input v-model="formItem.service" placeholder="请输入门店服务"  :disabled="!isCitypartner"/>
          </FormItem>
          <FormItem label="营业时间" prop="_marketOpenTime">
            <TimePicker v-model="formItem._marketOpenTime" type="timerange" style="width:100%;" placeholder="请选择营业时间" :disabled="!isCitypartner"></TimePicker>
            <!-- <Input  placeholder="请输入营业时间" /> -->
          </FormItem>
          <p class="tips" style="color:red">提示：商户第一家门店的地区请保持与商户营业执照地区一致</p>
          <FormItem label="门店地区" required prop="area">
            <pro-city-area
              :disabled="!isCitypartner"
              :p="formItem.mercProv"
              :c="formItem.mercCity"
              :a="formItem.mercArea"
              @on-change="changePro"
            ></pro-city-area>
          </FormItem>
          <FormItem required label="门店地址" prop="addressDetail">
            <Input v-model="formItem.addressDetail" placeholder="请输入门店地址"  :disabled="true"/>
          </FormItem>
          <FormItem label="经纬度" prop="_location">
            <Input v-model="formItem._location" placeholder="请输入经纬度" icon="location"  :disabled="true"/>
          </FormItem>
        </div>
        <div class="right">
          <FormItem label="门店LOGO" required prop="logo">
            <upload-img title="门店LOGO" v-model="logoImgList" :viewOnly="!isCitypartner"></upload-img>
          </FormItem>
          <FormItem label="门头照" required prop="head">
            <upload-img title="门头照" v-model="headImgList" :viewOnly="!isCitypartner"></upload-img>
          </FormItem>
          <FormItem label="收银台照" required prop="cash">
            <upload-img title="收银台照" v-model="cashImgList" :viewOnly="!isCitypartner"></upload-img>
          </FormItem>
          <FormItem label="经营内容照" required prop="operImg">
            <!-- <Input v-model="formItem.shopContentImg" placeholder="经营内容照" /> -->
            <upload-img title="经营内容照" :needImg="1" v-model="operationImgList"  :viewOnly="!isCitypartner"></upload-img>
          </FormItem>
        </div>
      </Form>
    </Card>
    <div class="button" v-if="isCitypartner">
      <Button class="w120 btn-cancel" @click="cancel">取 消</Button>
      <Button type="primary" class="w120 btn-add" @click="save">保 存</Button>
    </div>
    <b-map :isShow.sync="modal"
      @location="location"
    ></b-map>
  </div>
</template>

<script>
import BMap from '_c/b-map'
import UploadImg from '_c/uploadImg/uploadImg'
import breadCrumb from '_c/breadCrumb/breadCrumb'
import proCityArea from '_c/proCityArea'
import { addStores, updateStore, getStoresInfo } from '@/api/merchant'
import { getSxoIndustryInfo } from '@/api/common'
import { createValid } from '@/libs/util'

export default {
  name: 'storeAdd',
  data() {
    return {
      title: '添加门店',
      modal: false,
      headImgList: [], // 门头照 数组
      logoImgList: [], // 门店 logo 数组
      cashImgList: [], // 收银台照 数组
      operationImgList: [], // 经营内容照
      formItem: {
        id: '', // 门店 id
        merchantsId: '', // 所属商户 ID
        name: '', // 门店名称
        categoryCode: '', // 经营类型编码, 从商户获取
        contactName: '', // 门店联系人
        contactEmail: '', // 联系人邮箱
        storesTelephone: '', // 门店电话
        briefIntroduction: '', // 门店简介
        detailInfo: '', // 门店详情
        service: '', // 门店服务
        openTime: '', // 营业时间
        addressDetail: '', // 门店地址
        longitude: '', // 经度
        latitude: '', // 维度
        headImg: '', // 门头照
        logoImg: '', // 门店logo
        cashImg: '', // 收银台照
        contentImg: '', // 经营内容照
        mercProv: '', // 省code
        province: '', // 省中文
        mercCity: '', // 市code
        city: '', // 市中文
        mercArea: '', // 区code
        district: '', // 区

        isSupplier: 4,

        _marketOpenTime: ['00:00:00', '23:59:59'],
        _location: '' // 经纬度
      },
      ruleValidate: {
        name: [
          { required: true, message: '门店名称不能为空', trigger: 'blur' },
          { pattern: /\D+/, message: '门店名称不能全为数字', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{8,20}$/, message: '门店名称为8-20个字母、汉字或数字，不含特殊字符', trigger: 'blur' }
        ],
        storesTelephone: [
          { required: true, message: '门店电话不能为空', trigger: 'blur' },
          { pattern: /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/, message: '请填写合法手机号', trigger: 'blur' }
        ],
        addressDetail: [
          { required: true, message: '门店地址不能为空', trigger: 'blur' }
        ],
        contactName: [
          { required: true, message: '门店联系人不能为空', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{2,10}$/, message: '联系人必须2-10位中文、字母或数字，不含特殊字符', trigger: 'blur' },
          { pattern: /\D+/, message: '联系人不能全为数字', trigger: 'blur' }
        ],
        contactEmail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '错误的邮箱格式', trigger: 'blur' }
        ],
        area: [{ required: true, message: '门店地区必须填写', trigger: 'change', validator: createValid.call(this, 'formItem.mercProv', 'formItem.mercCity', 'formItem.mercArea') }],
        logo: [{ required: true, message: '门店 logo 照必须上传', trigger: 'blur', validator: createValid.call(this, 'formItem.logoImg') }],
        head: [{ required: true, message: '门头照必须上传', trigger: 'blur', validator: createValid.call(this, 'formItem.headImg') }],
        cash: [{ required: true, message: '收银台照必须上传', trigger: 'blur', validator: createValid.call(this, 'formItem.cashImg') }],
        operImg: [{ required: true, message: '经营内容照必须上传', trigger: 'blur', validator: createValid.call(this, 'formItem.contentImg') }]
        // briefIntroduction: [{ required: true, message: '门店简介不能为空', trigger: 'blur' }],
        // detailInfo: [{ required: true, message: '门店详情不能为空', trigger: 'blur' }],
        // service: [{ required: true, message: '门店服务不能为空', trigger: 'blur' }],
        // _marketOpenTime: [{ required: true, type: 'array', min: 1, message: '营业时间不能为空', trigger: 'blur', validator: isEmptyArr }],
        // _location: [{ required: true, message: '经纬度不能为空', trigger: 'blur' }]
      },
      businessTypeList: []
    }
  },

  computed: {
    isCitypartner() {
      return this.$store.getters.getCurRole === 'SXR001'
    },
    isStoreRole() { // 判断当前用户是否商户角色
      return this.$store.getters.getCurRole === 'SXR004'
    }
  },

  created() {
    // let { id, merchantId, categoryName, categoryCode } = this.$route.params
    let merchant = this.$store.state.merchant.merchant
    if (!this.isStoreRole && !merchant) {
      this.$router.replace({ name: 'merchantList' })
      return
    }
    let { id } = this.$store.state.merchant.store || {}
    debugger

    if (!id) { // 没有 id 是新增门店
      let { id: merchantId, categoryName, categoryCode, adressDetail,
        alias, briefIntroduction, detail, service, longitude, latitude, isSupplier } = merchant || {}
      // 商户已有的字段带过来
      this.formItem.categoryName = categoryName
      this.formItem.categoryCode = Number(categoryCode)
      this.formItem.name = alias
      this.formItem.briefIntroduction = briefIntroduction
      this.formItem.detailInfo = detail
      this.formItem.service = service
      this.formItem.addressDetail = adressDetail
      this.formItem.longitude = longitude
      this.formItem.latitude = latitude
      this.formItem.isSupplier = isSupplier
      if (longitude && latitude) {
        this.formItem._location = `${longitude}, ${latitude}`
      }
      this.formItem.merchantsId = merchantId
    } else { // 有 merchantId 则是编辑门店
      this.title = '编辑门店'
      this.formItem.id = id
      this._getStoreInfo(id)
      if (!this.isCitypartner) {
        this.title = '查看门店'
      }
    }

    this._getBusinessTypeList()
  },
  watch: {
    logoImgList(value) {
      this.formItem.logoImg = value.map(v => v.url).join(',')
    },
    headImgList(value) {
      this.formItem.headImg = value.map(v => v.url).join(',')
    },
    cashImgList(value) {
      this.formItem.cashImg = value.map(v => v.url).join(',')
    },
    operationImgList(value) {
      this.formItem.contentImg = value.map(v => v.url).join(',')
    }
  },
  methods: {
    changePro({ proCode, province, cityCode, city, areaCode, area }) {
      console.log(proCode, province, cityCode, city, areaCode, area)
      this.formItem.mercProv = proCode
      this.formItem.province = province
      this.formItem.mercCity = cityCode
      this.formItem.city = city
      this.formItem.mercArea = areaCode
      this.formItem.district = area
    },
    cancel() {
      this.$router.go(-1)
    },
    location(loc) {
      this.formItem.longitude = loc.lng
      this.formItem.latitude = loc.lat
      this.formItem._location = loc.lng + ',' + loc.lat
    },
    selectLocation() {
      this.modal = true
    },
    save() {
      // 保存门店。。
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          let query = Object.assign({}, this.formItem, {
            openTime: this.formItem._marketOpenTime.join('-')
          })
          if (this.formItem.id) { // 有 id 则是更新
            updateStore(query).then(res => {
              this.$Message.success('修改成功')
              this.$router.push({
                name: 'storeList',
                params: {
                  id: this.formItem.merchantsId,
                  categoryName: this.formItem.categoryName,
                  categoryCode: this.formItem.categoryCode
                }
              })
            })
          } else { // 没有 id 则是新增
            addStores(query).then(res => {
              this.$Message.success('保存成功')
              this.$router.push({
                name: 'storeList',
                params: {
                  id: this.formItem.merchantsId,
                  categoryName: this.formItem.categoryName,
                  categoryCode: this.formItem.categoryCode
                }
              })
            })
          }
        } else {
          this.$Message.error('请检查表单填写!')
        }
      })
    },
    _getBusinessTypeList() {
      return getSxoIndustryInfo().then(res => {
        this.businessTypeList = res
      })
    },
    _getStoreInfo(marketId) {
      // console.log(marketId)
      getStoresInfo({ marketId }).then(res => {
        // ...
        // console.log(res)
        let data = res.data
        this.formItem.id = data.id
        this.formItem.merchantsId = data.merchantsId
        this.formItem.name = data.name
        this.formItem.contactName = data.contactName
        this.formItem.contactEmail = data.contactEmail
        this.formItem.storesTelephone = data.storesTelephone
        this.formItem.briefIntroduction = data.briefIntroduction
        this.formItem.detailInfo = data.detailInfo
        this.formItem.service = data.service
        this.formItem.openTime = data.openTime
        this.formItem.addressDetail = data.addressDetail
        this.formItem.longitude = data.longitude
        this.formItem.latitude = data.latitude
        this.formItem.headImg = data.headImg
        this.formItem.logoImg = data.logoImg
        this.formItem.cashImg = data.cashImg
        this.formItem.contentImg = data.contentImg

        this.formItem.mercProv = data.mercProv
        this.formItem.mercCity = data.mercCity
        this.formItem.mercArea = data.mercArea

        this.formItem._marketOpenTime = data.openTime && data.openTime.split('-')
        this.formItem._location = data.longitude + ',' + data.latitude

        if (data.headImg) {
          this.headImgList = data.headImg.split(',').map((v, i) => ({ name: '门头照' + i, url: v }))
        }
        if (data.logoImg) {
          this.logoImgList = data.logoImg.split(',').map((v, i) => ({ name: 'logo照' + i, url: v }))
        }
        if (data.cashImg) {
          this.cashImgList = data.cashImg.split(',').map((v, i) => ({ name: '收银台照' + i, url: v }))
        }
        if (data.contentImg) {
          this.operationImgList = [{ name: '经营内容照', url: data.contentImg }]
        }
      })
    }
  },
  components: { breadCrumb, UploadImg, BMap, proCityArea }
}
</script>

<style lang="less" scoped>
.form {
  display: flex;
  padding-bottom: 20px;

  .left,
  .right {
    flex: 1;
  }

}
.button {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  padding: 0 30px 0;
}
.tips {
  margin-left: 90px;
  color: #ccc;
  font-size: 12px;
}
</style>
