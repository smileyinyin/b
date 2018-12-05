<template>
    <Row type="flex" :gutter="10">
        <i-col :span="span">
            <Select v-model="proCode" placeholder="省" :disabled="disabled" :label-in-value="false" clearable @on-change="changeProvince">
                <Option v-for="item in proList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
            </Select>
        </i-col>
        <i-col :span="span" v-if="!onlyProvince">
            <Select v-model="cityCode" placeholder="市" :disabled="disabled" :label-in-value="false" clearable @on-change="changeCity">
                <Option v-for="item in cityList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
            </Select>
        </i-col>
        <i-col :span="span" v-if="!onlyProvince && !noArea">
            <Select v-model="areaCode" placeholder="区" :disabled="disabled" :label-in-value="false" clearable @on-change="changeArea">
                <Option v-for="item in areaList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
            </Select>
        </i-col>
    </Row>
</template>

<script>
import { getProvinceInfo, getCityInfo, getAreaInfo } from '@/api/common'

export default {
  name: 'proCityArea',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    onlyProvince: {
      type: Boolean,
      default: false
    },
    noArea: {
      type: Boolean,
      default: false
    },
    p: {
      type: String,
      default: ''
    },
    c: {
      type: String,
      default: ''
    },
    a: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      proCode: '',
      province: '',
      cityCode: '',
      city: '',
      areaCode: '',
      area: '',

      proList: [],
      cityList: [],
      areaList: [],

      provinceLoading: false,
      cityLoading: false,
      cityLoadingCallback: null,
      areaLoading: false,
      areaLoadingCallback: null
    }
  },
  computed: {
    span() {
      return this.onlyProvince ? 24 : this.noArea ? 12 : 8
    }
  },
  created() {
    this.provinceLoading = true
    getProvinceInfo().then(res => {
      this.proList = res
      this.provinceLoading = false
      this._handleCascade() // 处理编辑时级联下拉
    })
  },
  watch: {
    p: {
      handler(v) {
        if (this.proCode === v) return
        this.proCode = v
        // debugger
        this._handleCascade()
      },
      immediate: true
    },
    c: {
      handler(v) {
        if (this.cityCode === v) return
        if (this.provinceLoading || this.cityLoading) {
          // debugger
          this.cityLoadingCallback = () => {
            this.cityCode = v
            // debugger
            this._handleCityCascade()
          }
        } else {
          this.cityCode = v
          // debugger
          this._handleCityCascade()
        }
      },
      immediate: true
    },
    a: {
      handler(v) {
        if (this.areaCode === v) return
        if (this.provinceLoading || this.cityLoading || this.areaLoading) {
          // debugger
          this.areaLoadingCallback = () => {
            this.areaCode = v
            // debugger
          }
        } else {
          this.areaCode = v
          // debugger
        }
      },
      immediate: true
    }
  },
  methods: {
    emit(type) {
      this.$emit('on-change', {
        proCode: this.proCode,
        province: this.province,
        cityCode: this.cityCode,
        city: this.city,
        areaCode: this.areaCode,
        area: this.area,
        type
      })
    },
    changeProvince(v) {
      // debugger
      this.cityCode = ''
      this.areaCode = ''
      this.city = ''
      this.area = ''
      if (!v) {
        this.proCode = ''
        this.province = ''
        this.emit('province')
        return
      }
      let proObj = this.proList.find(item => item.identity === v)
      if (proObj) {
        this._handleCascade(proObj)
      }
      // this.province = v.label
      // let pid = this.proList.find(item => item.identity === v.value).id
      // getCityInfo(pid).then(res => (this.cityList = res))
      this.emit('province')
    },
    changeCity(v) {
      // debugger
      this.areaCode = ''
      this.area = ''
      if (!v) {
        this.cityCode = ''
        this.city = ''
        this.emit('city')
        return
      }
      let cityObj = this.cityList.find(item => item.identity === v)
      if (cityObj) {
        this._handleCityCascade(cityObj)
      }
      // this.city = v.label
      // let pid = this.cityList.find(item => item.identity === v.value).id
      // getAreaInfo(pid).then(res => (this.areaList = res))
      this.emit('city')
    },
    changeArea(v) {
      // debugger
      if (!v) {
        this.areaCode = ''
        this.area = ''
        this.emit('area')
        return
      }
      let areaObj = this.areaList.find(item => item.identity === v)
      if (areaObj) {
        this.area = areaObj.name
      }
      // this.area = v.label
      this.emit('area')
    },
    _handleCascade(proObj) {
      // debugger
      if (!this.proList.length || !this.proCode) return
      proObj = proObj || this.proList.find(item => item.identity === this.proCode)
      if (proObj) {
        this.province = proObj.name

        this.cityLoading = true
        getCityInfo(proObj.id).then(res => {
          this.cityList = res

          this.cityLoadingCallback && this.cityLoadingCallback()

          this.cityLoading = false

          // this._handleCityCascade()
        }).catch(e => {
          this.cityLoading = false
        })
      }
    },
    _handleCityCascade(cityObj) {
      // debugger
      if (!this.cityList.length || !this.cityCode) return
      cityObj = cityObj || this.cityList.find(
        item => item.identity === this.cityCode
      )
      if (cityObj) {
        this.city = cityObj.name

        this.areaLoading = true
        getAreaInfo(cityObj.id).then(res => {
          this.areaList = res

          this.areaLoadingCallback && this.areaLoadingCallback()

          this.areaLoading = false

          let areaObj = res.find(item => item.identity === this.areaCode)
          if (areaObj) {
            this.area = areaObj.name
          }
        }).catch(e => {
          this.areaLoading = false
        })
      }
    }
  }
}
</script>
