<template>
    <div class="entry-editor">
        <bread-crumb :data="[{path: '/posList',title: '商户进件'}, {title: '修改进件'}]"></bread-crumb>
        <Card>
            <p class="pb20 f16">修改进件信息—{{title}}</p>
            <Form :label-width="150" class="form" ref="form" :model="posApply.apply" :rules="rules">
              <divide-line>进件基础信息</divide-line>
              <Row class="mt20">
                <i-col span="12">
                  <FormItem label="商户名称：">{{posApply.apply.marchantsName}}</FormItem>
                  <FormItem label="门店名称：">{{posApply.apply.storesName}}</FormItem>
                  <FormItem label="账户类型：" v-if="isShowType" prop="accountType">
                      <Select placeholder="请选择账户类型" v-model="posApply.apply.accountType">
                          <Option :value="0">对公</Option>
                          <Option :value="1">对私</Option>
                      </Select>
                  </FormItem>
                  <FormItem label="结算周期：" v-if="isShowStlType">
                      <Select placeholder="请选择" v-model="posApply.apply.stlType">
                          <Option value="1">T+1</Option>
                          <Option value="2" v-if="posApply.apply.accountType === 1">D+1</Option>
                      </Select>
                  </FormItem>
                  <FormItem label="结算费率：" v-if="posApply.apply.stlType === '2'">
                      <Select v-model="posApply.apply.serviceFee">
                          <Option value="0.02%">0.02</Option>
                          <Option value="0.03%">0.03</Option>
                          <Option value="0.04%">0.04</Option>
                      </Select>
                  </FormItem>
                  <FormItem label="扫码小票：" v-if="posApply.apply.type !== 22 && posApply.apply.type !== 21" prop="scanTitle">
                      <Input placeholder="请输入扫码小票(商户名称)" v-model="posApply.apply.scanTitle"/>
                  </FormItem>
                  <FormItem label="购买政策：">
                      <Select v-model="posApply.apply.posShareProfit">
                          <Option :value="1">双免</Option>
                          <Option :value="2">分期</Option>
                          <Option :value="3">买断</Option>
                      </Select>
                  </FormItem>
                  <FormItem label="进件数量：" prop="posActivationNumber">
                      <InputNumber :max="10" :min="1" v-model="posApply.apply.posActivationNumber" style="width: 100%;" placeholder="请输入进件数量" disabled></InputNumber>
                  </FormItem>
                  <FormItem label="借记卡费率：" prop="debitCardRate">
                        <Select v-model="posApply.apply.debitCardRate">
                          <Option :value="0.45">0.45</Option>
                          <Option :value="0.46">0.46</Option>
                          <Option :value="0.47">0.47</Option>
                          <Option :value="0.48">0.48</Option>
                      </Select>
                  </FormItem>
                  <FormItem label="封顶金额：" prop="capMoney">
                      <Select v-model="posApply.apply.capMoney">
                          <Option :value="18">18</Option>
                          <Option :value="19">19</Option>
                          <Option :value="20">20</Option>
                      </Select>
                  </FormItem>
                  <FormItem label="贷记卡费率：" prop="creditCardRate">
                      <Select v-model="posApply.apply.creditCardRate">
                          <Option :value="0.55">0.55</Option>
                          <Option :value="0.56">0.56</Option>
                          <Option :value="0.57">0.57</Option>
                          <Option :value="0.58">0.58</Option>
                      </Select>
                  </FormItem>
                  <FormItem label="扫码基准费率：" prop="scanBaseRate">
                      <Select v-model="posApply.apply.scanBaseRate">
                          <Option :value="0.3">0.3</Option>
                          <Option :value="0.31">0.31</Option>
                          <Option :value="0.32">0.32</Option>
                          <Option :value="0.33">0.33</Option>
                          <Option :value="0.34">0.34</Option>
                          <Option :value="0.35">0.35</Option>
                          <Option :value="0.36">0.36</Option>
                          <Option :value="0.37">0.37</Option>
                          <Option :value="0.38">0.38</Option>
                      </Select>
                  </FormItem>
                  <FormItem label="银联二维码费率：" prop="unionpayRate">
                      <InputNumber :min="0.6" v-model="posApply.apply.unionpayRate" style="width: 100%;" placeholder="请输入银联二维码费率"></InputNumber>
                  </FormItem>
                  <FormItem label="银联二维码标准费率：" prop="uniStandardRate">
                      <InputNumber :min="0.6" v-model="posApply.apply.uniStandardRate" style="width: 100%;" placeholder="请输入银联二维码标准费率"></InputNumber>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="商户照片：" prop="shopName" v-if="posApply.apply.type===12 || posApply.apply.type===11">
                      <upload-img v-model="headImg" noTips viewOnly class="vt"></upload-img>
                      <upload-img v-model="cashImg" noTips viewOnly class="vt"></upload-img>
                      <upload-img v-model="contentImg" noTips viewOnly class="vt"></upload-img>
                  </FormItem>
                  <FormItem label="协议照：" v-if="posApply.apply.type===12 || posApply.apply.type===11 || posApply.apply.type===23" prop="protocolImg">
                      <upload-img title="协议照" v-model="identityBackImgList3" :needImg="3"></upload-img>
                  </FormItem>
                </i-col>
              </Row>
              <divide-line>工商法人信息</divide-line>
              <Row class="mt20">
                <i-col span="12">
                  <FormItem label="名称：" v-if="isShowLegalPerson" prop="legalName">
                      <Input placeholder="请输入名称" v-model="posApply.apply.legalName" disabled />
                  </FormItem>
                  <FormItem label="身份证号：" v-if="isShowLegalPerson" prop="legalIdcard">
                      <Input placeholder="请输入身份证号" v-model="posApply.apply.identityCard" disabled />
                  </FormItem>
                  <FormItem label="身份证有效期：">
                      <Row>
                          <i-col span="24">
                              <DatePicker :disabled="true" style="width:100%;" v-model="identityEndTime" type="date"></DatePicker>
                          </i-col>
                      </Row>
                  </FormItem>
                  <FormItem label="注册号：" v-if="posApply.apply.type === 11">
                      <Input placeholder="注册号" v-model="zcNumber" disabled/>
                  </FormItem>
                  <FormItem label="注册号有效期：" v-if="posApply.apply.type === 11">
                      <Input placeholder="注册号有效期" v-model="zcTime" disabled/>
                  </FormItem>
                  <FormItem label="营业执照号：" v-if="posApply.apply.type === 23">
                      <Input placeholder="营业执照号" v-model="posApply.apply.businessNumber" disabled/>
                  </FormItem>
                  <FormItem label="营业执照有效期：" v-if="posApply.apply.type === 23">
                      <Row>
                          <i-col span="24">
                              <DatePicker placeholder="结束时间" style="width:100%;" v-model="licenseEndTime" type="date" disabled></DatePicker>
                          </i-col>
                      </Row>
                  </FormItem>
                  <FormItem label="出租人姓名：" v-if="posApply.apply.type === 22" prop="accountName">
                      <Input placeholder="出租人姓名" v-model="posApply.apply.accountName"/>
                  </FormItem>
                  <FormItem label="出租人身份证号：" v-if="posApply.apply.type === 22" prop="identityCard">
                      <Input placeholder="出租人身份证号" v-model="posApply.apply.identityCard"/>
                  </FormItem>
                  <FormItem label="承租人姓名：" v-if="posApply.apply.type === 22">
                      <Input placeholder="承租人姓名" v-model="posApply.apply.legalName" disabled/>
                  </FormItem>
                  <FormItem label="承租人身份证号：" v-if="posApply.apply.type === 22">
                      <Input placeholder="承租人身份证号" v-model="posApply.apply.legalIdcard" disabled/>
                  </FormItem>
                  <FormItem label="装机地址：" v-if="posApply.apply.type === 22">
                      <Row :gutter="10" style="margin:0">
                          <i-col span="8">
                              <FormItem prop="province">
                                  <Select v-model="province" placeholder="省" :label-in-value="true" @on-change="changeProvince">
                                      <Option v-for="item in proviceList" :key="item.id" :value="item.id">{{ item.name }}</Option>
                                  </Select>
                              </FormItem>
                          </i-col>
                          <i-col span="8">
                              <FormItem>
                                  <Select v-model="city" placeholder="市" :label-in-value="true" @on-change="changeCity">
                                      <Option v-for="item in cityList" :key="item.id" :value="item.id">{{ item.name }}</Option>
                                  </Select>
                              </FormItem>
                          </i-col>
                          <i-col span="8">
                              <FormItem>
                                  <Select v-model="district" placeholder="区" :label-in-value="true" @on-change="changeArea">
                                      <Option v-for="item in districtList" :key="item.id" :value="item.id">{{ item.name }}</Option>
                                  </Select>
                              </FormItem>
                          </i-col>
                      </Row>
                  </FormItem>
                  <FormItem label="详细地址：" v-if="posApply.apply.type === 22" prop="addressDetail">
                      <Input placeholder="请输入详细地址" v-model="posApply.apply.addressDetail" />
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="身份证正反面：">
                      <upload-img v-model="identityFrontImg" noTips viewOnly class="vt"></upload-img>
                      <upload-img v-model="identityBackImg" noTips viewOnly class="vt"></upload-img>
                  </FormItem>
                  <FormItem label="手持身份证照：" v-if="posApply.apply.type === 11">
                      <upload-img v-model="identityHandImg" noTips viewOnly class="vt"></upload-img>
                  </FormItem>
                  <FormItem label="营业执照：" v-if="posApply.apply.type===23 || posApply.apply.type===12">
                      <upload-img v-model="businessLicenseImg" noTips viewOnly class="vt"></upload-img>
                  </FormItem>
                  <FormItem label="租赁协议：" v-if="posApply.apply.type === 22" prop="rentImg">
                      <upload-img title="租赁协议" v-model="identityBackImgList5" :needImg="2"></upload-img>
                  </FormItem>
                  <FormItem label="商户信息表：" v-if="posApply.apply.type===12 || posApply.apply.type===11 || posApply.apply.type===23" prop="merchantsInfoImg">
                      <upload-img title="商户信息表" v-model="identityBackImgList1" :needImg="1"></upload-img>
                  </FormItem>
                </i-col>
              </Row>
              <divide-line>结算账户信息</divide-line>
              <Row class="mt20">
                <i-col span="12">
                  <FormItem label="是否同法人：" v-if="(posApply.apply.type == 12 && posApply.apply.accountType !== 0) || (posApply.apply.type == 23 && posApply.apply.accountType !== 0)" prop="isLegal">
                      <Select placeholder="请选择账户类型" v-model="posApply.apply.isLegal" @on-change="posApply.apply.isLegal ===1? posApply.apply.accountName = imgInfo.legalPerson.name : posApply.apply.accountName = ''">
                          <Option :value="1">是</Option>
                          <Option :value="2">否</Option>
                      </Select>
                  </FormItem>
                  <FormItem label="结算人姓名：" prop="accountName" v-if="isShowAuthorizedSettlementImg">
                      <Input placeholder="请输入结算人姓名" v-model="posApply.apply.accountName" />
                  </FormItem>
                  <FormItem label="结算人身份证号：" prop="identityCard" v-if="isShowAuthorizedSettlementImg">
                      <Input placeholder="请输入结算人身份证号" v-model="posApply.apply.identityCard" />
                  </FormItem>
                  <FormItem label="结算人身份证有效期：" v-if="isShowAuthorizedSettlementImg">
                      <Row>
                          <i-col span="24">
                            <FormItem prop="identityEndTime">
                              <DatePicker placeholder="结束时间" style="width:100%;" v-model="identityEndTime" type="date" @on-change="posApply.apply.identityEndTime = identityEndTime"></DatePicker>
                            </FormItem>
                          </i-col>
                      </Row>
                  </FormItem>
                  <FormItem label="开户名：" prop="accountName">
                      <Input placeholder="请输入开户名" v-model="posApply.apply.accountName" :disabled="posApply.apply.isLegal === 1" />
                  </FormItem>
                  <FormItem label="开户支行：" prop="bankBranchName">
                      <bank @getBank="getBank" :bankBranchName="posApply.apply.bankBranchName"></bank>
                  </FormItem>
                  <FormItem label="银行卡号：" prop="bankFrontNumber" v-if="isShowBank">
                      <Input placeholder="请输入银行卡号" v-model="posApply.apply.bankFrontNumber" />
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="开户许可证：" v-if="(posApply.apply.type===12 && posApply.apply.accountType===0) || (posApply.apply.type===23 && posApply.apply.accountType===0)" prop="accountLicenceImg">
                      <upload-img title="开户许可证" v-model="identityBackImgList" :needImg="1"></upload-img>
                  </FormItem>
                  <FormItem label="银行卡正面：" prop="bankFrontImg" v-if="((posApply.apply.type===12 || posApply.apply.type === 11) && posApply.apply.accountType===1)">
                      <upload-img title="银行卡正面" v-model="identityBackImgList2" :needImg="1"></upload-img>
                  </FormItem>
                  <FormItem label="授权结算书：" v-if="isShowAuthorizedSettlementImg" prop="authorizedSettlementImg">
                      <div style="color:#d6d6d6">每张照片建议大小为<span style="color: red;">500KB</span>，格式可以为PNG、JPG、JPEG</div>
                      <div style="color: red;">第二张是法人与结算人手持加盖公章非法人授权结算书合影</div>
                      <upload-img title="授权结算书" v-model="identityBackImgList4" :needImg="2" :noTips="true"></upload-img>
                  </FormItem>
                  <FormItem label="结算人身份证正反面：" v-if="isShowAuthorizedSettlementImg">
                      <div style="color:#d6d6d6">每张照片建议大小为<span style="color: red;">500KB</span>，格式可以为PNG、JPG、JPEG</div>
                      <FormItem prop="identityFrontImg" class="l mr10 mb10">
                        <upload-img title="正面" v-model="identityBackImgList6" :needImg="1" :noTips="true"></upload-img>
                      </FormItem>
                      <FormItem prop="identityBackImg" class="l">
                        <upload-img title="反面" v-model="identityBackImgList7" :needImg="1" :noTips="true"></upload-img>
                      </FormItem>
                  </FormItem>
                </i-col>
              </Row>
            </Form>
        </Card>
        <Row class="pt30 pr30 pb30">
            <i-col span="24" align="right">
                <Button type="primary" @click="updated" class="btn-add mr20">重新提交审核</Button>
                <Button type="error" @click="del">删除进件信息</Button>
            </i-col>
        </Row>
    </div>
</template>
<script>
import { findPosApplyDetail, delPosApply, updatePosApply } from '@/api/entry'
import { getStoreList as getStoresList, getMerchantsList, getIndustryAndLegal } from '@/api/merchant'
import divideLine from '_c/divideLine/divide-line'
import { formatDate } from '@/libs/util'
import { getProvinceInfo, getCityInfo, getAreaInfo } from '@/api/common'
import UploadImg from '_c/uploadImg/uploadImg'
import breadCrumb from '_c/breadCrumb/breadCrumb'
import bank from '_c/bank/bank'
export default {
  components: {
    UploadImg,
    breadCrumb,
    divideLine,
    bank
  },
  name: 'entry-editor',
  computed: {
    // 账户类型是否显示的判断条件
    isShowType() {
      return this.posApply.apply.type !== 22 && this.posApply.apply.type !== 21 && this.posApply.apply.type !== 11
    },
    // 结算周期是否显示的判断条件
    isShowStlType() {
      return this.posApply.apply.type === 12 || this.posApply.apply.type === 23 || this.posApply.apply.type === 11
    },
    // 法人信息是否显示的判断条件
    isShowLegalPerson() {
      return this.posApply.apply.type === 23 || this.posApply.apply.type === 12 || this.posApply.apply.type === 11 || this.posApply.apply.type === 21
    },
    // 结算信息是否显示的判断条件
    isShowAuthorizedSettlementImg() {
      return (this.posApply.apply.type === 23 || this.posApply.apply.type === 12) && this.posApply.apply.isLegal === 2 && this.posApply.apply.accountType === 1
    },
    isShowBank() {
      return this.posApply.apply.type === 12 || this.posApply.apply.type === 11 || (this.posApply.apply.type === 23 && this.posApply.apply.accountType === 1)
    }
  },
  data() {
    return {
      zcTime: '',
      businessLicenseImg: [{ url: '' }],
      cashImg: [{ url: '' }],
      contentImg: [{ url: '' }],
      headImg: [{ url: '' }],
      identityBackImg: [{ url: '' }],
      identityFrontImg: [{ url: '' }],
      identityHandImg: [{ url: '' }],
      imgInfo: {
        business: {
          businessLicenseImg: [{ url: '' }]
        },
        legalPerson: {
          identityFrontImg: '',
          identityBackImg: '',
          name: '',
          identityHandImg: ''
        }
      },
      posApplyId: null,
      title: '',
      shopNameList: [],
      licenseEndTime: '',
      licenseStartTime: '',
      identityCardFont: [],
      identityretImg: [],
      proviceList: [],
      cityList: [],
      districtList: [],
      marketList: [],
      branchList: [],
      mccList: [],
      province: '',
      district: '',
      city: '',
      identityBackImgList: [],
      identityBackImgList1: [],
      identityBackImgList2: [],
      identityBackImgList3: [],
      identityBackImgList4: [],
      identityBackImgList5: [],
      identityBackImgList6: [],
      identityBackImgList7: [],
      identityEndTime: '',
      identityStartTime: '',
      posApply: {
        apply: {
          posShareProfit: null,
          marchantsName: '', // 商户名称
          storesName: '', // 门店名称
          merchantsId: null, // 商户id
          headImg: '',
          operationImg: '',
          businessLicenseImg: '', // 营业执照图片
          licenseStartTime: '', // 营业执照开始时间
          licenseEndTime: '', // 营业执照结束时间
          cashImg: '',
          isLegal: 1,
          serviceFee: 0.02, // 结算费率
          stlType: '', // 结算周期
          businessNumber: '',
          merchantsStoresId: null, // 门店id
          accountLicenceImg: null, // 开户许可证（经营许可证）
          accountName: '', // 账户名
          adressDetail: '',
          accountType: 0, // 账户类型
          authorizedSettlementImg: '', // 结算授权书照
          bankBranchCode: '111', // 支行code
          bankBranchName: '', // 支行名称
          bankCode: '1111', // 总行code
          bankName: '1111', // 总行名称
          bankFrontImg: '', // 银行卡正面照
          bankFrontNumber: '', // 银行卡号
          province: '',
          scanTitle: '', // 扫码小票
          mercArea: '',
          mercCity: '',
          mercProv: '',
          city: '', // 市
          district: '', // 区
          identityBackImg: '', // 身份证背面
          identityFrontImg: '', // 身份证正面
          identityEndTime: '', // 身份证结束时间
          identityCard: '', // 身份证号
          identityStartTime: '', // 身份证开始时间
          interBankNumber: '', // 银联号
          merchantsInfoImg: '', // 商户信息表
          merchantsMobile: '', // 商户手机号
          posActivationNumber: 1, // pos激活数量
          posBrandId: 2, // pos机id
          protocolImg: '', // 协议照
          rentImg: '', // 租赁合同照
          mcc: '',
          unionpayRate: null,
          uniStandardRate: null,
          capMoney: null, // 封顶金额
          creditCardRate: null, // 贷记卡费率
          debitCardRate: null, // 借记卡费率
          scanBaseRate: null, //  扫码基准费率
          legalMobile: '', // 法人手机号
          legalName: '', // 法人名称
          // storesName: '', // 门店名称
          // marchantsName: '', // 商户名称
          type: '', // 11新小微12新企业21嘉联小微 22 嘉联租赁23嘉联法人
          userId: this.$store.state.user.userId
        }
      },
      rules: {
        unionpayRate: [
          { required: true, message: '银联二维码费率不能为空！', trigger: 'blur', type: 'number' }
        ],
        uniStandardRate: [
          { required: true, message: '银联二维码标准费率不能为空！', trigger: 'blur', type: 'number' }
        ],
        merchantsId: [
          { required: true, message: '请选择商户', trigger: 'change', type: 'number' }
        ],
        merchantsStoresId: [
          { required: true, message: '请选择门店', trigger: 'change', type: 'number' }
        ],
        accountType: [
          { required: true, message: '请选择账户类型', trigger: 'change', type: 'number' }
        ],
        scanTitle: [
          { required: true, message: '请输入扫码小票', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{1,20}$/, message: '扫码小票必须是中文、字母或数字，不含特殊字符', trigger: 'blur' }
        ],
        posActivationNumber: [
          { required: true, message: '请输入进件数量', trigger: 'blur', type: 'number' }
        ],
        accountName: [
          { required: true, message: '请输入开户名', trigger: 'blur' }
        ],
        bankBranchName: [
          { required: true, message: '请选择开户支行', trigger: 'change' }
        ],
        authorizedSettlementImg: [
          { required: true, message: '请上传授权结算书', trigger: 'blur' }
        ],
        bankFrontImg: [
          { required: true, message: '请上传银行卡正面照', trigger: 'blur' }
        ],
        merchantsInfoImg: [
          { required: true, message: '请上传商户信息表', trigger: 'blur' }
        ],
        accountLicenceImg: [
          { required: true, message: '请上传开户许可证', trigger: 'blur' }
        ],
        protocolImg: [
          { required: true, message: '请上传协议照', trigger: 'blur' }
        ],
        identityFrontImg: [
          { required: true, message: '请上传身份证正面', trigger: 'blur' }
        ],
        identityBackImg: [
          { required: true, message: '请上传身份证反面', trigger: 'blur' }
        ],
        rentImg: [
          { required: true, message: '请上传租赁协议', trigger: 'blur' }
        ],
        province: [
          { required: true, message: '请选择省', trigger: 'change' }
        ],
        city: [
          { required: true, message: '请选择市', trigger: 'change' }
        ],
        district: [
          { required: true, message: '请选择区', trigger: 'change' }
        ],
        bankFrontNumber: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.posApplyId = Number(this.$route.query.posApplyId)
    findPosApplyDetail({ posApplyId: this.posApplyId }).then(res => {
      this.posApply.apply = res.data
      // 时间转换
      this._getTime(res.data)
      // 获取进件类型
      this.getType(res.data.type)
      // 图片格式转换
      this._pictureConversion()
      // 获取门店列表
      getStoresList({ merchantId: this.posApply.apply.merchantsId }).then(res => {
        this.marketList = res.data
      })
      // 获取工商与法人信息
      this._getIndustryAndLegal(this.posApply.apply.merchantsId)
      // 获取城市列表
      this.getCityList(this.province)
      // 获取区列表
      this.getAreaList(this.city)
    })
    // 获取商户列表
    getMerchantsList({ status: 3,
      userId: this.$store.state.user.userId,
      roleId: this.$store.state.user.roleId }).then(res => {
      this.shopNameList = res.data
    })
    // 获取省列表
    getProvinceInfo().then(res => {
      this.proviceList = res
    })
  },
  watch: {
    // 开户许可证
    identityBackImgList(value) {
      this.posApply.apply.accountLicenceImg = value.map(v => v.url).join(',')
    },
    // 租赁合同
    identityBackImgList5(value) {
      this.posApply.apply.rentImg = value.map(v => v.url).join(',')
    },
    // 银行卡正面
    identityBackImgList2(value) {
      this.posApply.apply.bankFrontImg = value.map(v => v.url).join(',')
    },
    // 协议照
    identityBackImgList3(value) {
      this.posApply.apply.protocolImg = value.map(v => v.url).join(',')
    },
    // 授权结算书
    identityBackImgList4(value) {
      this.posApply.apply.authorizedSettlementImg = value.map(v => v.url).join(',')
    },
    // 工商信息表
    identityBackImgList1(value) {
      this.posApply.apply.merchantsInfoImg = value.map(v => v.url).join(',')
    },
    // 结算人身份证正面
    identityBackImgList6(value) {
      this.posApply.apply.identityFrontImg = value.map(v => v.url).join(',')
    },
    // 结算人身份证反面
    identityBackImgList7(value) {
      this.posApply.apply.identityBackImg = value.map(v => v.url).join(',')
    }
  },
  methods: {
    // 获取支行名称与联行号
    getBank(data) {
      this.posApply.apply.bankBranchCode = data[0].lbnk_nm
      this.posApply.apply.bankBranchName = data[0].lbnk_nm
      this.posApply.apply.interBankNumber = data[0].wc_lbnk_no
    },
    // 根据商户ID获取门店列表与法人信息
    getMarketList(val) {
      let pid = Number(val)
      this._clearInfo()
      getStoresList({ merchantId: pid }).then(res => {
        this.marketList = res.data
      })
      this._getIndustryAndLegal(pid)
      this.contentImg = [{ url: this.shopNameList.filter(item => val === item.id)[0].operationImg }]
    },
    // 门店切换
    changeStore(val) {
      if (val) {
        let temp = this.marketList.filter(item => val === item.id)
        this.headImg = [{ url: temp[0].headImg }]
        this.cashImg = [{ url: temp[0].cashImg }]
      }
    },
    // 改变省份
    changeProvince(val) {
      this.posApply.apply.province = val.label
      this.posApply.apply.mercProv = this.province
      this.city = null
      this.district = null
      this.getCityList(this.province)
    },
    // 获取城市列表
    getCityList(data) {
      getCityInfo(data).then(res => {
        this.cityList = res
      })
    },
    // 获取区列表
    getAreaList(data) {
      getAreaInfo(data).then(res => {
        this.districtList = res
      })
    },
    // 改变城市
    changeCity(val) {
      this.district = null
      this.posApply.apply.city = val.label
      this.posApply.apply.mercCity = this.city
      this.getAreaList(this.city)
    },
    // 改变区
    changeArea(val) {
      this.posApply.apply.mercArea = this.district
      this.posApply.apply.district = val.label
    },
    // 删除进件信息
    del() {
      this.$Modal.confirm({
        title: '删除操作',
        content: `确认要删除进件信息吗？`,
        onOk: () => {
          delPosApply({ posApplyId: this.posApplyId }).then(res => {
            if (this.$route.query.goindex === 'true') {
              this.$router.push({
                path: 'merchantEntry'
              })
            } else {
              this.$router.back(-1)
            }
          })
        }
      })
    },
    updated() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let date = new Date(this.identityStartTime)
          let date1 = new Date(this.identityEndTime)
          this.posApply.apply.identityStartTime = date.valueOf()
          this.posApply.apply.identityEndTime = date1.valueOf()
          if ((this.posApply.apply.type === 23 || this.posApply.apply.type === 12) && this.posApply.apply.isLegal === 2 && this.posApply.apply.accountType === 1) {
            if (this.identityBackImgList4.length < 2) {
              this.$Message.error('授权结算书必须是两张！')
              return false
            }
          }
          updatePosApply(this.posApply).then(res => {
            this.$router.push({ path: 'posList' })
          })
        } else {
          this.$Message.error('请将信息填写完整！')
        }
      })
    },
    _getIndustryAndLegal(pid) {
      return getIndustryAndLegal(pid).then(res => {
        this.imgInfo = res.data
        let { legalPerson, business } = res.data

        if (this.posApply.apply.isLegal === 1) {
          this.posApply.apply.accountName = legalPerson.name
        }
        this.identityFrontImg = [{ url: legalPerson.identityFrontImg }]
        this.identityBackImg = [{ url: legalPerson.identityBackImg }]

        this.posApply.apply.legalName = legalPerson.name
        this.posApply.apply.legalIdcard = legalPerson.identityCard

        if (legalPerson.identityHandImg) {
          this.identityHandImg = legalPerson.identityHandImg.split(',').map(v => ({ url: v }))
        } else {
          this.identityHandImg = [{ url: '' }]
        }
        this.businessLicenseImg = [{ url: business.businessLicenseImg }]
        this.zcNumber = legalPerson.identityCard + 'XW'
        this.zcTime = this._fuckStupidDate(legalPerson.identityEndDate)
        this.time = this._fuckStupidDate(legalPerson.identityEndDate)
        this.businessTime = formatDate(business.licenseEndTime, 'yyyy-MM-dd')
      })
    },
    _clearInfo() {
      this.posApply.apply.merchantsStoresId = null
      this.identityFrontImg = [{ url: '' }]
      this.identityBackImg = [{ url: '' }]
      this.businessLicenseImg = [{ url: '' }]
      this.cashImg = [{ url: '' }]
      this.contentImg = [{ url: '' }]
      this.headImg = [{ url: '' }]
      this.identityHandImg = [{ url: '' }]
    },
    // 获取进件类型
    getType(type) {
      if (type === 11) {
        this.title = '新大陆小微进件'
      } else if (type === 12) {
        this.title = '新大陆企业进件'
      } else if (type === 21) {
        this.title = '嘉联小微商户进件'
      } else if (type === 22) {
        this.title = '嘉联租赁合同进件'
      } else if (type === 23) {
        this.title = '嘉联法人商户进件'
      }
    },
    // 把获取到的时间转换
    _getTime(data) {
      this.zcNumber = data.identityCard + 'XW'
      this.province = Number(data.mercProv)
      this.city = Number(data.mercCity)
      this.district = Number(data.mercArea)
      this.posApply.apply.bankBranchCode = Number(data.bankBranchCode)
      this.identityEndTime = this._fuckStupidDate(data.identityEndTime)
      this.licenseEndTime = this._fuckStupidDate(data.licenseEndTime)
      this.zcTime = this.identityEndTime
    },
    // 将后台返回的数据转换成页面展示的格式
    _pictureConversion() {
      let apply = this.posApply.apply
      this.headImg = [{ url: apply.headImg }]
      this.cashImg = [{ url: apply.cashImg }]
      this.contentImg = [{ url: apply.contentImg }]
      this.identityFrontImg = [{ url: apply.identityFrontImg }]
      this.identityBackImg = [{ url: apply.identityBackImg }]
      this.identityBackImgList6 = [{ url: apply.identityFrontImg }]
      this.identityBackImgList7 = [{ url: apply.identityBackImg }]
      this.businessLicenseImg = [{ url: apply.businessLicenseImg }]
      this.identityHandImg = apply.identityHandImg.split(',').map(item => ({ url: item }))
      if (apply.accountLicenceImg) {
        this.identityBackImgList = [{ url: apply.accountLicenceImg }]
      }
      if (apply.bankFrontImg) {
        this.identityBackImgList2 = [{ url: apply.bankFrontImg }]
      }
      if (apply.protocolImg) {
        this.identityBackImgList3 = apply.protocolImg.split(',').map(item => ({ url: item }))
      }
      if (apply.authorizedSettlementImg) {
        this.identityBackImgList4 = apply.authorizedSettlementImg.split(',').map(item => ({ url: item }))
      }
      if (apply.rentImg) {
        this.identityBackImgList5 = apply.rentImg.split(',').map(item => ({ url: item }))
      }
      if (apply.merchantsInfoImg) {
        this.identityBackImgList1 = [{ url: apply.merchantsInfoImg }]
      }
    },
    _fuckStupidDate(str) {
      if (String(str).indexOf('T') > -1) { // "2020-09-22T16:00:00.000Z" 形式
        return formatDate(new Date(str), 'yyyy-MM-dd')
      } else {
        return formatDate(Number(str), 'yyyy-MM-dd')
      }
    }
  }
}
</script>
