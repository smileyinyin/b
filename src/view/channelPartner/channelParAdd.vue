<template>
  <div>
    <bread-crumb :data="[
      {path: '/channelParList', title: '合伙人管理'},
      {title: isEdit ? '渠道合伙人编辑' : '渠道合伙人添加'}
    ]"></bread-crumb>

    <Card>
      <Form :label-width="120" ref="formValidate" :model="salesMan" :rules="ruleValidate">
        <Row :gutter="20">
          <i-col span="12">
            <formItem label="渠道合伙人名称" prop="partner_name">
              <Input v-model="salesMan.partner_name" placeholder="请输入渠道合伙人名称" />
            </formItem>
            <formItem label="联系人" prop="name">
              <Input v-model="salesMan.name" placeholder="请输入联系人" />
            </formItem>
            <formItem label="手机号" prop="mobile">
              <Input v-model="salesMan.mobile" placeholder="请输入手机号" />
            </formItem>
            <formItem label="身份证号" prop="identity_card">
                <Input v-model="salesMan.identity_card" placeholder="请输入身份证号" />
              </formItem>
              <formItem label="开户名" prop="account_name">
                <Input v-model="salesMan.account_name" placeholder="请输入开户名" />
              </formItem>
              <formItem label="开户总行">
                <Select v-model="salesMan.bank_code" placeholder="请选择开户总行" :label-in-value="true" clearable @on-change="changeBank">
                  <Option v-for="(item, index) in generalLineList" :key="index" :value="item.id">{{ item.name }}</Option>
                </Select>
              </formItem>
              <formItem label="开户支行">
                <span style="margin-right: 20px;" v-if="salesMan.bank_branch_name">{{salesMan.bank_branch_name}}</span>
                <Button type="primary" @click="isShow = true" :disabled="!salesMan.bank_code">选择支行</Button>
              </formItem>
              <formItem label="银行卡号" prop="bank_front_number">
                <Input v-model="salesMan.bank_front_number" placeholder="请输入银行卡号" />
              </formItem>
          </i-col>
          <i-col span="12">
            <!-- <formItem label="允许提现">
              <RadioGroup v-model="salesMan.settleType">
                <Radio :label="2">允许提现</Radio>
                <Radio :label="1">不允许提现</Radio>
              </RadioGroup>
            </formItem> -->
            <!-- <formItem label="联系地址" prop="address">
              <Input v-model="salesMan.address" placeholder="请输入联系地址" />
            </formItem> -->
            <Row :gutter="10" class-name="form-item">
              <formItem label="所在地" prop="address" required>
                <i-col span="8">
                  <Select v-model="salesMan.merc_area" placeholder="选择省份" label-in-value inline clearable @on-change="changeProvince">
                    <Option v-for="item in provinceList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
                  </Select>
                </i-col>
                <i-col span="8">
                  <Select v-model="salesMan.merc_city" placeholder="选择市/区" label-in-value inline clearable @on-change="changeCity">
                    <Option v-for="item in cityList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
                  </Select>
                </i-col>
                <i-col span="8">
                  <Select v-model="salesMan.merc_prov" placeholder="选择区/县" label-in-value inline clearable @on-change="changeArea">
                    <Option v-for="item in areaList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
                  </Select>
                </i-col>
              </formItem>
            </Row>
            <formItem label="POS分润比例" prop="posRate" required>
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
            <formItem label="商户商品分润比例" prop="goodsRate" required>
              <InputNumber
                style="width: 100%;"
                placeholder="请输入商户商品分润比例"
                v-model="salesMan.goodsRate"
                :max="1"
                :min="0"
                :step="0.01"
                :formatter="value => `${+(value*100).toFixed(10)}%`"
                :parser="value => String(value.replace('%', '')/100)"></InputNumber>
            </formItem>
            <!-- <Row :gutter="10" class-name="form-item">
              <formItem label="POS分润比例" prop="posRate">
                <i-col span="20">
                  <Select placeholder="请选择分润比例" clearable v-model="salesMan.posRate">
                    <Option v-for="item in posRateArr" :key="item" :value="item">{{item}}</Option>
                  </Select>
                </i-col>
                <i-col span="4">
                  <span @click="selfDefine('pos')" style="cursor:pointer;color:#57a3f3">自定义</span>
                </i-col>
              </formItem>
            </Row>
            <Row :gutter="10" class-name="form-item">
              <formItem label="商户商品分润比例" prop="goodsRate">
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
            <FormItem label="法人身份证" required prop="identityImg">
              <div style="color:#d6d6d6">每张照片建议大小为<span style="color: red;">500KB</span>，格式可以为PNG、JPG、JPEG</div>
              <upload-img title="法人身份证正面"
                :noTips="true"
                v-model="identityFrontImgList"
                :needImg="1"></upload-img>
              <upload-img title="法人身份证反面"
                :noTips="true"
                v-model="identityBackImgList"
                :needImg="1"></upload-img>
            </FormItem>
            <FormItem label="银行卡正面图" required prop="bankFrontImg">
              <upload-img title="银行卡正面图"
                v-model="bankFrontImgList"
                :needImg="1"></upload-img>
            </FormItem>
          </i-col>
          <!-- <i-col span="12">
            <Row :gutter="10">
              <formItem label="供应链商品分润比例">
                <i-col span="20">
                  <Select placeholder="请选择供应链商品分润比例" clearable v-model="salesMan.goodsRate">
                    <Option v-for="item in goodsRateArr" :key="item" :value="item">{{item}}</Option>
                  </Select>
                </i-col>
                <i-col span="4">
                  <span @click="selfDefine('goods')" style="cursor:pointer;color:#57a3f3">自定义</span>
                </i-col>
              </formItem>
            </Row>
          </i-col> -->
        </Row>
      </Form>
    </Card>
    <Row type="flex" justify="end" class="mt30 mr30">
      <template v-if="isEdit">
        <Button class="btn-add w120" @click="update">确认修改</Button>
      </template>
      <template v-else>
        <Button class="btn-add w120" @click="submit">确认添加</Button>
      </template>
    </Row>
    <Modal title="自定义比例"
      v-model="isShowModal"
      @on-ok="addSelfRate">
      <Input placeholder="请输入自定义比例" v-model="selfRate" />
    </Modal>
    <Modal v-model="isShow" @on-ok="chooseBranchBank" :closable="true" title="选择支行" width="800" class-name="vertical-center-modal">
      <Row>
        <i-col span="24" align="right">
          <Input placeholder="请输入支行名称" v-model="params.name" class="w120 mr20" />
          <Select placeholder="省" :label-in-value="true" clearable class="w120 mr20 tl" v-model="params.provinceId" @on-change="changeProvince1">
              <Option v-for="(item, index) in provinceList" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
          <Select placeholder="市" :label-in-value="true" clearable  class="w120 mr20 tl" v-model="params.cityId">
              <Option v-for="(item, index) in modalCityList" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
          <Button type="primary" @click="getBranchList">查询</Button>
        </i-col>
      </Row>
      <Table border :columns="columns" :data="tableData" class="mt20" @on-selection-change="changeSelect" ref="selection"></Table>
      <Page :total="params.totalCounts" show-sizer :page-size="params.size" :current.sync="params.page" @on-change="getpage" @on-page-size-change="changePageSize" class="mt20 tr"> </Page>
    </Modal>
  </div>
</template>

<script>
import breadCrumb from '_c/breadCrumb/breadCrumb'
import uploadImg from '_c/uploadImg/uploadImg'
import { getSalesManInfo, addSalesMan, activeSalesMan } from '@/api/salesMan'
import { updateChannel } from '@/api/channelPartner'
import { getProvinceInfo, getCityInfo, getAreaInfo, getSxoBanksInfo, getSxoBanksBranchInfoByFuzzyQuery } from '@/api/common'

export default {
  name: 'channelParAdd',
  data() {
    const validAdress = (rule, value, callback) => {
      if (this.salesMan.merc_prov === '') {
        callback(new Error())
      } else {
        callback()
      }
    }

    const validIdentityImg = (rule, value, callback) => {
      if (!this.identityFrontImgList.length || !this.identityBackImgList.length) {
        callback(new Error())
      } else {
        callback()
      }
    }

    const validBankImg = (rule, value, callback) => {
      if (!this.bankFrontImgList.length) {
        callback(new Error('银行卡正面图必须上传'))
      } else {
        callback()
      }
    }

    return {
      isEdit: false,
      isShowModal: false,
      selfRate: '', // 自定义比例
      provinceList: [], // 省列表
      cityList: [], // 市列表
      areaList: [], // 区列表
      posRateArr: [ 0.30, 0.35, 0.40, 0.45, 0.50, 0.55, 0.60, 0.65 ],
      goodsRateArr: [ 0.30, 0.35, 0.40, 0.45, 0.50, 0.55, 0.60, 0.65 ],
      identityFrontImgList: [],
      identityBackImgList: [],
      bankFrontImgList: [],
      salesMan: {
        id: '',
        name: '', // 联系人
        partner_name: '', // 合伙人名称
        mobile: '',
        address: '',
        posRate: 0,
        goodsRate: 0,
        status: '',
        settleType: 2, // 是否结算，现在默认给 2
        type: 1, // 1渠道合伙人 2 业务员
        roleId: this.$store.state.user.roleId,
        userId: this.$store.state.user.userId,
        merc_area: '', // 省编码,
        merc_city: '', // 市编码,
        merc_prov: '', // 区编码,
        province: '', // 省中文
        city: '', // 市中文
        district: '', // 区中文

        identity_card: '', // 身份证号
        identity_front_img: '', // 身份证正面
        identity_back_img: '', // 身份证反面
        bank_name: '', // 银行名
        bank_front_number: '', // 银行卡号
        bank_code: '', // 银行总行 code
        bank_front_img: '', // 银行卡正面照
        bank_branch_code: '', // 支行code
        bank_branch_name: '', // 支行名称
        account_name: '' // 开户名
      },
      ruleValidate: {
        name: [{ required: true, message: '联系人必须填写', trigger: 'blur' }],
        partner_name: [{ required: true, message: '合伙人名称必须填写', trigger: 'blur' }],
        mobile: [
          { required: true, message: '手机号必须填写', trigger: 'blur' },
          { pattern: /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/, message: '请填写合法手机号', trigger: 'blur' }
        ],
        address: [{ required: true, message: '所在地必须填写', trigger: 'blur', validator: validAdress }],
        posRate: [{ required: true, type: 'number', message: 'POS分润比例必须填写', trigger: 'blur' }],
        goodsRate: [{ required: true, type: 'number', message: '商户商品分润比例必须填写', trigger: 'blur' }],
        identityImg: [{ required: true, message: '身份证正反图必须上传', trigger: 'blur', validator: validIdentityImg }],
        bankFrontImg: [{ required: true, message: '银行卡正面图必须上传', trigger: 'blur', validator: validBankImg }],
        identity_card: [
          { required: true, message: '身份证号必须填写', trigger: 'blur' },
          { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请填写合法身份证', trigger: 'blur' }
        ],
        account_name: [
          { required: true, message: '开户名必须填写', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{2,45}$/, message: '开户名必须2-45位中文、字母或数字，不含特殊字符', trigger: 'blur' },
          { pattern: /\D+/, message: '开户名不能全为数字', trigger: 'blur' }
        ],
        bank_front_number: [
          { required: true, message: '银行卡号必须填写', trigger: 'blur' }
        ]
      },

      isShow: false,
      generalLineList: [],
      modalCityList: [],
      params: {
        bankId: '',
        provinceId: '',
        cityId: '',
        name: '',
        page: 1,
        size: 10
      },
      totalCounts: 1,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        }, {
          title: '支行名称',
          key: 'name'
        }, {
          title: 'id',
          key: 'id'
        }
      ],
      tableData: [],
      selectionList: []
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
    getSxoBanksInfo().then(res => {
      this.generalLineList = res
    })
  },
  watch: {
    identityFrontImgList(value) {
      this.salesMan.identity_front_img = value.map(v => v.url).join(',')
    },
    identityBackImgList(value) {
      this.salesMan.identity_back_img = value.map(v => v.url).join(',')
    },
    bankFrontImgList(value) {
      this.salesMan.bank_front_img = value.map(v => v.url).join(',')
    }
  },
  methods: {
    getBranchList() {
      if (!this.params.provinceId || !this.params.cityId) {
        this.$Message.error('请选择省、市')
        return
      }
      this.params.bankId = this.salesMan.bank_code
      debugger
      getSxoBanksBranchInfoByFuzzyQuery(this.params).then(res => {
        this.tableData = res.data
        this.totalCounts = res.objectotalNumber
      })
    },
    changeProvince1(value) {
      this.params.cityId = ''
      if (!value) return
      this.salesMan.bank_branch_code = ''
      this.salesMan.bank_branch_name = ''
      debugger
      var pid = value.value
      return getCityInfo(pid).then(res => (this.modalCityList = res))
    },
    changeSelect(li) {
      this.selectionList = li
    },
    chooseBranchBank() {
      if (!this.selectionList.length) {
        this.$Message.error('请选择一个支行')
        return
      }
      if (this.selectionList.length > 1) {
        this.$Message.error('只能选择一个支行')
        return
      }
      this.salesMan.bank_branch_code = this.selectionList[0].id
      this.salesMan.bank_branch_name = this.selectionList[0].name
    },
    changeBank(value) {
      this.salesMan.bank_branch_code = ''
      this.salesMan.bank_branch_name = ''
      if (!value) return
      this.salesMan.bank_name = value.label
    },
    getpage(val) {
      this.params.page = val
      this.getBranchList()
    },
    changePageSize(val) {
      this.params.page = 1
      this.params.size = val
      this.getBranchList()
    },
    selfDefine(type) {
      this.isShowModal = true
      this.selfRate = ''
      this.selfType = type
    },
    addSelfRate() {
      if (this.selfType === 'pos') {
        this.posRateArr.push(Number(this.selfRate))
        this.salesMan.posRate = Number(this.selfRate)
      } else if (this.selfType === 'goods') {
        this.goodsRateArr.push(Number(this.selfRate))
        this.salesMan.goodsRate = Number(this.selfRate)
      }
    },
    submit() {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          addSalesMan(this.salesMan).then(res => this.$router.push({name: 'channelParList'}))
        } else {
          this.$Message.error('请检查表单填写!')
        }
      })
    },
    update() {
      debugger
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          updateChannel(this.salesMan).then(res => {
            console.log(this.salesMan.status)
            if (this.salesMan.status === 4) { // 审核不通过时 编辑完成改为待审核
              activeSalesMan({ status: 1, id: this.salesMan.id }).then(res => {
                this.$router.push({name: 'channelParList'})
              })
            } else {
              this.$router.push({name: 'channelParList'})
            }
          })
        } else {
          this.$Message.error('请检查表单填写!')
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
        this._handleCascade() // 处理编辑时级联下拉
      })
    },
    _handleCascade() {
      if (!this.provinceList.length || !this.salesMan.merc_area) return
      let proObj = this.provinceList.find(item => item.identity === this.salesMan.merc_area)
      getCityInfo(proObj.id).then(res => {
        this.cityList = res
        let cityObj = this.cityList.find(item => item.identity === this.salesMan.merc_city)
        getAreaInfo(cityObj.id).then(res => (this.areaList = res))
      })
    },
    _getSalesManInfo(id) {
      getSalesManInfo({id}).then(res => {
        let data = res.data
        this.salesMan = data
        this.salesMan.bank_code = +data.bank_code

        if (data.identity_front_img) {
          this.identityFrontImgList = [{name: '身份证正面', url: data.identity_front_img}]
        }
        if (data.identity_back_img) {
          this.identityBackImgList = [{name: '身份证反面', url: data.identity_back_img}]
        }
        if (data.bank_front_img) {
          this.bankFrontImgList = [{name: '银行卡正面照', url: data.bank_front_img}]
        }

        this._handleCascade() // 处理编辑时级联下拉
      })
    }
  },
  components: {
    breadCrumb,
    uploadImg
  }
}
</script>

<style lang="less" scoped>
.form-item /deep/ .ivu-form-item-content::after {
  content: '';
  display: block;
  clear: both;
}
</style>
