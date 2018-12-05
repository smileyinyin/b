<template>
  <Card>
    <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="120">
      <Row :gutter="10">
        <i-col span="12">
          <formItem label="供应商名称" required prop="name">
            <Input v-model="formItem.name" placeholder="请输入供应商名称" />
          </formItem>
        </i-col>
        <i-col span="12">
          <formItem label="地区" required prop="area">
            <Row :gutter="10" style="margin:0">
              <i-col span="8" style="padding-left:0">
                <Select v-model="formItem.provinceCode" placeholder="省" :label-in-value="true" clearable @on-change="changeProvince" >
                  <Option v-for="item in proviceList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
                </Select>
              </i-col>
              <i-col span="8">
                <Select v-model="formItem.cityCode" placeholder="市" :label-in-value="true" clearable @on-change="changeCity" >
                  <Option v-for="item in cityList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
                </Select>
              </i-col>
              <i-col span="8">
                <Select v-model="formItem.areaCode" placeholder="区" clearable :label-in-value="true" @on-change="changeArea" >
                  <Option v-for="item in districtList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
                </Select>
              </i-col>
            </Row>
          </formItem>
        </i-col>
        <i-col span="12">
          <formItem label="联系人" required prop="linkMan">
            <Input v-model="formItem.linkMan" placeholder="请输入联系人" />
          </formItem>
        </i-col>
        <i-col span="12">
          <formItem label="联系方式" required prop="mobile">
            <Input v-model="formItem.mobile" placeholder="请输入联系方式" />
          </formItem>
        </i-col>
        <i-col span="12">
          <formItem label="简介" required prop="summary">
            <Input v-model="formItem.summary" placeholder="请输入简介" type="textarea" :autosize="{minRows: 6,maxRows: 6}" />
          </formItem>
        </i-col>
        <i-col span="12">
          <formItem label="上传证件" required prop="license">
            <upload-img></upload-img>
          </formItem>
        </i-col>
        <i-col span="12">
          <formItem label="经纬度" required>
            <Input :value="formItem.longitude ? `${formItem.longitude}, ${formItem.latitude}` : ''" placeholder="经纬度" icon="location" @click.native="selectLocation"/>
          </formItem>
        </i-col>
      </Row>
    </Form>
    <Row type="flex" justify="space-between">
      <Button @click="cancel">取消</Button>
      <Button type="primary" @click="update" v-if="this.formItem.id">提 交</Button>
      <Button type="primary" @click="submit" v-else>提 交</Button>
    </Row>
    <b-map :isShow.sync="modal"
      @location="location"
      :initPoint="formItem.longitude ? {lng: formItem.longitude, lat: formItem.latitude} : null"></b-map>
  </Card>
</template>

<script>
import { getSupply, addSupply, updateSupply } from '@/api/supply'
import uploadImg from '_c/uploadImg/uploadImg'
import bMap from '_c/b-map'
import { getProvinceInfo, getCityInfo, getAreaInfo } from '@/api/common'

export default {
  name: 'supplyAdd',
  data() {
    const validArea = (rule, value, callback) => {
      if (!this.formItem.areaCode) {
        callback(new Error('地区必须选择'))
      } else {
        callback()
      }
    }

    const validLicense = (rule, value, callback) => {
      if (!this.formItem.license) {
        callback(new Error('证件必须选择'))
      } else {
        callback()
      }
    }

    return {
      modal: false,
      proviceList: [],
      cityList: [],
      districtList: [],
      formItem: {
        id: '',
        name: '', // 供应商名称
        provinceCode: '', // 省 编码
        cityCode: '', // 市 编码
        areaCode: '', // 区 编码
        province: '', // 省 中文
        city: '', // 市 中文
        area: '', // 区 中文
        linkMan: '', // 联系人
        mobile: '', // 联系方式
        summary: '', // 简介
        license: '', // 证件照
        longitude: '', // 经纬度
        latitude: ''
      },
      ruleValidate: {
        name: [{ required: true, message: '供应商不能为空', trigger: 'blur' }],
        area: [{ required: true, message: '供应商不能为空', trigger: 'blur', validator: validArea }],
        linkMan: [{ required: true, message: '联系人不能为空', trigger: 'blur' }],
        mobile: [{ required: true, message: '联系方式不能为空', trigger: 'blur' }],
        summary: [{ required: true, message: '简介不能为空', trigger: 'blur' }],
        license: [{ required: true, message: '证件不能为空', trigger: 'blur', validator: validLicense }]
      }
    }
  },
  created() {
    let id = this.$route.query.id
    if (id) {
      this.formItem.id = id
      this._getSupply(id)
    }

    this._getProvinceList()
  },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    update() {
      updateSupply(this.formItem).then(res => this.$router.push({ name: 'supplyList' }))
    },
    submit() {
      addSupply(this.formItem).then(res => this.$router.push({ name: 'supplyList' }))
    },
    selectLocation() {
      this.modal = true
    },
    location(loc) {
      this.formItem.longitude = loc.lng
      this.formItem.latitude = loc.lat
    },
    changeProvince(value) {
      console.log(value)
      if (!value) return
      this.formItem.province = value.label
      this.formItem.cityCode = ''
      this.formItem.areaCode = ''
      var pid = this.proviceList.find(item => item.identity === value.value).id
      return getCityInfo(pid).then(res => (this.cityList = res))
    },
    changeCity(value) {
      if (!value) return
      this.formItem.city = value.label
      this.formItem.areaCode = ''
      let pid = this.cityList.find(item => item.identity === value.value).id
      return getAreaInfo(pid).then(res => (this.districtList = res))
    },
    changeArea(value) {
      if (!value) return
      console.log(value)
      this.formItem.area = value.label
    },
    _getProvinceList() {
      return getProvinceInfo().then(res => {
        this.proviceList = res
        this._handleCascade() // 处理编辑时级联下拉
      })
    },
    _getSupply(id) {
      getSupply({id}).then(res => {
        this.formItem = res.data

        this._handleCascade()
      })
    },
    _handleCascade() {
      if (!this.proviceList.length || !this.formItem.provinceCode) return
      let proObj = this.proviceList.find(item => item.identity === this.formItem.provinceCode)
      getCityInfo(proObj.id).then(res => {
        this.cityList = res
        let cityObj = this.cityList.find(item => item.identity === this.formItem.cityCode)
        getAreaInfo(cityObj.id).then(res => (this.districtList = res))
      })
    }
  },
  components: {
    uploadImg,
    bMap
  }
}
</script>
