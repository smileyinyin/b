<template>
  <div>
    <bread-crumb :data="[
      {path: '/salesManList', title: '业务员管理'},
      {title: isEdit ? '业务员编辑' : '业务员添加'}
    ]"></bread-crumb>

    <Card>
      <Form ref="formValidate" :model="salesMan" :label-width="100" :rules="ruleValidate">
        <Row :gutter="20">
          <!-- <i-col span="12">
            <formItem label="用户名" prop="name">
              <Input v-model="salesMan.name" placeholder="请输入用户名" />
            </formItem>
          </i-col> -->
          <i-col span="12">
            <formItem label="合伙人姓名" prop="partner_name">
              <Input v-model="salesMan.partner_name" placeholder="请输入合伙人姓名" />
            </formItem>
          </i-col>
        </Row>
        <Row :gutter="20">
          <i-col span="12">
            <formItem label="手机号" prop="mobile">
              <Input v-model="salesMan.mobile" placeholder="请输入手机号"/>
            </formItem>
          </i-col>
          <i-col span="12">
            <formItem label="POS分润比例">
              <InputNumber
                  style="width: 100%;"
                  placeholder="请输入POS分润比例"
                  v-model="salesMan.posRate"
                  :max="1"
                  :min="0"
                  :step="0.01"
                  :formatter="value => `${+(value*100).toFixed(10)}%`"
                  :parser="value => String(value.replace('%', '')/100)"></InputNumber>
            </formItem>
          </i-col>
          <!-- <i-col span="12">
            <formItem label="所在地" prop="province">
              <Row :gutter="10" style="margin:0;">
                <i-col span="8" style="padding-left:0">
                  <Select v-model="salesMan.merc_area" placeholder="选择省份" label-in-value inline clearable @on-change="changeProvince">
                    <Option v-for="item in provinceList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
                  </Select>
                </i-col>
                <i-col span="8">
                  <Select v-model="salesMan.merc_city" placeholder="选择市/区" label-in-value inline clearable @on-change="changeCity">
                    <Option v-for="item in cityList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
                  </Select>
                </i-col>
                <i-col span="8" style="padding-right:0">
                  <Select v-model="salesMan.merc_prov" placeholder="选择区/县" label-in-value inline clearable @on-change="changeArea">
                    <Option v-for="item in areaList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
                  </Select>
                </i-col>
              </Row>
            </formItem>
          </i-col> -->
        </Row>
        <Row :gutter="20">
          <!-- <i-col span="12">
            <formItem label="联系地址" prop="address">
              <Input v-model="salesMan.address" placeholder="请输入联系地址" />
            </formItem>
          </i-col> -->

          <!-- <Row :gutter="10">
            <formItem label="POS分润比例">
              <i-col span="20">
                <Select placeholder="请选择分润比例" clearable v-model="salesMan.posRate">
                  <Option v-for="item in posRateArr" :key="item" :value="item">{{item}}</Option>
                </Select>
              </i-col>
              <i-col span="4">
                <span @click="selfDefine('pos')" style="cursor:pointer;color:#57a3f3">自定义</span>
              </i-col>
            </formItem>
          </Row> -->
          <!-- <i-col span="12">
            <formItem label="商户商品分润比例">
              <InputNumber
                  style="width: 100%;"
                  placeholder="请输入POS分润比例"
                  v-model="salesMan.goodsRate"
                  :max="1"
                  :min="0"
                  :step="0.01"
                  :formatter="value => `${+(value*100).toFixed(10)}%`"
                  :parser="value => String(value.replace('%', '')/100)"></InputNumber>
            </formItem>
          </i-col> -->
            <!-- <Row :gutter="10">
              <formItem label="商户商品分润比例">
                <i-col span="20">
                  <Select placeholder="请选择商户商品分润比例" clearable v-model="salesMan.goodsRate">
                    <Option v-for="item in goodsRateArr" :key="item" :value="item">{{item}}</Option>
                  </Select>
                </i-col>
                <i-col span="4">
                  <span @click="selfDefine('goods')" style="cursor:pointer;color:#57a3f3">自定义</span>
                </i-col>
              </formItem>
            </Row> -->
        </Row>
      </Form>
    </Card>
    <Row type="flex" justify="end" class="mt30 mr30">
      <Button v-if="isEdit" @click="update" class="w120 btn-add">确认修改</Button>
      <Button v-else @click="submit" class="w120 btn-add">提 交</Button>
    </Row>
    <!-- <Modal title="自定义比例"
      v-model="isShowModal"
      @on-ok="addSelfRate">
      <Input placeholder="请输入自定义比例" v-model="selfRate" />
    </Modal> -->
  </div>
</template>

<script>
import breadCrumb from '_c/breadCrumb/breadCrumb'
import { getSalesManInfo, addSalesMan, updateSalesMan, activeSalesMan } from '@/api/salesMan'
import { getProvinceInfo, getCityInfo, getAreaInfo } from '@/api/common'

export default {
  name: 'salesManAdd',
  data() {
    const validProvince = (value, rule, callback) => {
      if (!this.salesMan.merc_prov || !this.salesMan.merc_area || !this.salesMan.merc_city) {
        callback(new Error())
      } else {
        callback()
      }
    }

    return {
      isEdit: false,
      // isShowModal: false,
      selfRate: '', // 自定义比例
      provinceList: [],
      cityList: [],
      areaList: [],
      // posRateArr: [ 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65 ],
      // goodsRateArr: [ 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65 ],
      salesMan: {
        id: '',
        name: '',
        partner_name: '', // 合伙人姓名
        mobile: '',
        address: '',
        posRate: 0,
        goodsRate: 0,
        // proviceCode: '',
        merc_area: '', // 省编码
        province: '',
        merc_city: '',
        city: '',
        // districCode: '',
        merc_prov: '', // 区编码
        district: '',
        status: '2', // 状态 默认已启用
        settleType: 2, // 是否结算，现在默认给 2
        type: 2, // 1渠道合伙人 2 业务员
        roleId: this.$store.state.user.roleId,
        userId: this.$store.state.user.userId
      },
      ruleValidate: {
        mobile: [
          { required: true, message: '门店电话不能为空', trigger: 'blur' },
          { pattern: /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/, message: '请填写合法手机号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        partner_name: [
          { required: true, message: '合伙人姓名不能为空', trigger: 'blur' }
        ],
        province: [
          { required: true, message: '所在地不能为空', validator: validProvince }
        ],
        address: [
          { required: true, message: '联系地址不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    let id = this.$route.query.id
    if (id) {
      this.isEdit = true
      this.salesMan.id = id
      this._getSalesManInfo(id)
    }
    this._getProvinceInfo()
  },
  computed: {
  },
  methods: {
    // selfDefine(type) {
    //   this.isShowModal = true
    //   this.selfRate = ''
    //   this.selfType = type
    // },
    // addSelfRate() {
    //   if (this.selfType === 'pos') {
    //     this.posRateArr.push(Number(this.selfRate))
    //     this.salesMan.posRate = Number(this.selfRate)
    //   } else if (this.selfType === 'goods') {
    //     this.goodsRateArr.push(Number(this.selfRate))
    //     this.salesMan.goodsRate = Number(this.selfRate)
    //   }
    // },
    submit() {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          addSalesMan(this.salesMan).then(res => this.$router.push({name: 'salesManList'}))
        }
      })
    },
    update() {
      debugger
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          updateSalesMan(this.salesMan).then(res => {
            if (this.salesMan.status === 4) { // 审核不通过时 编辑完成改为待审核
              activeSalesMan({ status: 1, id: this.salesMan.id }).then(res => {
                this.$router.push({name: 'salesManList'})
              })
            } else {
              this.$router.push({name: 'salesManList'})
            }
          })
        }
      })
    },
    changeProvince(value) {
      console.log(value)
      if (!value) return
      this.salesMan.merc_city = ''
      this.salesMan.merc_prov = ''
      this.salesMan.province = value.label
      var pid = this.provinceList.find(item => item.identity === value.value).id
      return getCityInfo(pid).then(res => (this.cityList = res))
    },
    changeCity(value) {
      if (!value) return
      this.salesMan.merc_prov = ''
      this.salesMan.city = value.label
      let pid = this.cityList.find(item => item.identity === value.value).id
      return getAreaInfo(pid).then(res => (this.areaList = res))
    },
    changeArea(value) {
      if (!value) return
      this.salesMan.district = value.label
    },
    _getProvinceInfo() {
      getProvinceInfo().then(res => {
        this.provinceList = res
        debugger
        this._handleCascade()
      })
    },
    _getSalesManInfo(id) {
      getSalesManInfo({id}).then(res => {
        this.salesMan = res.data
        // this.salesMan.name = data.name
        // this.salesMan.status = data.status
        // this.salesMan.mobile = data.mobile
        // this.salesMan.address = data.address
        // this.salesMan.partner_name = data.partner_name

        // if (data.posRate) {
        //   this.salesMan.posRate = data.posRate
        //   // if (this.posRateArr.indexOf(data.posRate) < 0) {
        //   //   this.posRateArr.push(data.posRate)
        //   // }
        // }
        // if (data.goodsRate) {
        //   this.salesMan.goodsRate = data.goodsRate
        //   // if (this.goodsRateArr.indexOf(data.goodsRate) < 0) {
        //   //   this.goodsRateArr.push(data.goodsRate)
        //   // }
        // }
        this._handleCascade()
      })
    },
    _handleCascade() {
      debugger
      if (!this.provinceList.length || !this.salesMan.merc_area) return
      let proObj = this.provinceList.find(item => item.identity === this.salesMan.merc_area)
      getCityInfo(proObj.id).then(res => {
        this.cityList = res
        let cityObj = this.cityList.find(item => item.identity === this.salesMan.merc_city)
        getAreaInfo(cityObj.id).then(res => (this.areaList = res))
      })
    }
  },
  components: { breadCrumb }
}
</script>
