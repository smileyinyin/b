<template>
    <div class="add-entry">
      <bread-crumb :data="[{path: '/posList', title: '商户进件'}, {title: '新增进件'}]"></bread-crumb>
        <Card>
            <p class="pb20 f16">新大陆-{{name}}</p>
            <Form :label-width="150" class="form" ref="form" :model="posApply.apply" :rules="rules">
                  <divide-line>进件基础信息</divide-line>
                  <Row class="mt20">
                    <i-col span="12">
                      <FormItem label="商户名称：" prop="merchantsId">
                          <Select v-model="posApply.apply.merchantsId" @on-change="getMarketList">
                              <Option v-for="(item, index) in shopNameList" :key="index" :value="item.id">{{item.name}}</Option>
                          </Select>
                      </FormItem>
                      <FormItem label="门店名称：" prop="merchantsStoresId">
                          <Select v-model="posApply.apply.merchantsStoresId" @on-change="getImg" label-in-value ref="marketSelect">
                              <Option v-for="item in marketList" :key="item.id" :value="item.id">{{ item && item.name}}</Option>
                          </Select>
                      </FormItem>
                      <FormItem label="账户类型：" v-if="id === 2" prop="accountType">
                          <Select placeholder="请选择账户类型" v-model="posApply.apply.accountType">
                              <Option :value="0">对公</Option>
                              <Option :value="1">对私</Option>
                          </Select>
                      </FormItem>
                      <FormItem label="结算周期：" prop="stlType">
                          <Select placeholder="请选择" v-model="posApply.apply.stlType">
                              <Option value="1">T+1</Option>
                              <Option value="2" v-if="posApply.apply.accountType === 1">D+1</Option>
                          </Select>
                      </FormItem>
                      <FormItem label="结算费率：" v-if="posApply.apply.stlType === '2'">
                          <Select v-model="posApply.apply.serviceFee">
                              <Option value="0.02">0.02</Option>
                              <Option value="0.03">0.03</Option>
                              <Option value="0.04">0.04</Option>
                          </Select>
                      </FormItem>
                      <FormItem label="扫码小票：" prop="scanTitle">
                          <Input placeholder="请输入扫码小票(商户名称)" v-model="posApply.apply.scanTitle" />
                      </FormItem>
                      <FormItem label="购买政策：">
                          <Select v-model="posApply.apply.posShareProfit">
                              <Option :value="1">双免</Option>
                              <Option :value="2">分期</Option>
                              <Option :value="3">买断</Option>
                          </Select>
                      </FormItem>
                      <FormItem label="进件数量：" prop="posActivationNumber">
                          <InputNumber v-model="posApply.apply.posActivationNumber" style="width: 100%" placeholder="请输入进件数量" disabled></InputNumber>
                      </FormItem>
                      <FormItem label="借记卡费率：">
                          <Select v-model="posApply.apply.debitCardRate">
                              <Option :value="0.45">0.45</Option>
                              <Option :value="0.46">0.46</Option>
                              <Option :value="0.47">0.47</Option>
                              <Option :value="0.48">0.48</Option>
                          </Select>
                      </FormItem>
                      <FormItem label="封顶金额：">
                          <Select v-model="posApply.apply.capMoney">
                              <Option :value="18">18</Option>
                              <Option :value="19">19</Option>
                              <Option :value="20">20</Option>
                          </Select>
                      </FormItem>
                      <FormItem label="贷记卡费率：">
                          <Select v-model="posApply.apply.creditCardRate">
                              <Option :value="0.55">0.55</Option>
                              <Option :value="0.56">0.56</Option>
                              <Option :value="0.57">0.57</Option>
                              <Option :value="0.58">0.58</Option>
                          </Select>
                      </FormItem>
                      <FormItem label="扫码基准费率：">
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
                      <FormItem label="商户照片：" :label-width="190">
                        <upload-img v-model="headImg" noTips viewOnly class="vt"></upload-img>
                        <upload-img v-model="cashImg" noTips viewOnly class="vt"></upload-img>
                        <upload-img v-model="contentImg" noTips viewOnly class="vt"></upload-img>
                      </FormItem>
                      <FormItem label="协议照：" :label-width="190" prop="protocolImg">
                          <upload-img title="协议照" v-model="identityBackImgList3" :needImg="3"></upload-img>
                      </FormItem>
                    </i-col>
                  </Row>
                  <divide-line>工商法人信息</divide-line>
                  <Row class="mt20">
                    <i-col span="12">
                      <FormItem label="法人名称：">
                          <Input placeholder="法人名称" v-model="imgInfo.legalPerson.name" disabled/>
                      </FormItem>
                      <FormItem label="法人身份证：">
                          <Input placeholder="法人身份证" v-model="imgInfo.legalPerson.identityCard" disabled/>
                      </FormItem>
                      <FormItem label="身份证有效期：">
                          <Input placeholder="身份证有效期" v-model="time" disabled/>
                      </FormItem>
                      <FormItem label="注册号：" v-if="id === 1">
                          <Input placeholder="注册号" v-model="zcNumber" disabled/>
                      </FormItem>
                      <FormItem label="注册号有效期：" v-if="id === 1">
                          <Input placeholder="注册号有效期" v-model="time" disabled/>
                      </FormItem>
                      <FormItem label="营业执照号：" v-if="id === 2">
                          <Input placeholder="营业执照号" v-model="imgInfo.business.businessNumber" disabled />
                      </FormItem>
                      <FormItem label="营业执照有效期：" v-if="id === 2">
                          <Input placeholder="营业执照有效期" v-model="businessTime" disabled />
                      </FormItem>
                    </i-col>
                    <i-col span="12">
                      <FormItem label="法人身份证正反面：" :label-width="190">
                          <upload-img v-model="identityFrontImg" noTips viewOnly class="vt"></upload-img>
                          <upload-img v-model="identityBackImg" noTips viewOnly class="vt"></upload-img>
                      </FormItem>
                      <FormItem label="手持身份证照：" :label-width="190" v-if="id === 1">
                          <upload-img v-model="identityHandImg" noTips viewOnly class="vt"></upload-img>
                      </FormItem>
                      <FormItem label="营业执照：" :label-width="190" v-if="id === 2">
                          <upload-img v-model="imgInfo.business.businessLicenseImg" noTips viewOnly class="vt"></upload-img>
                      </FormItem>
                      <FormItem label="商户信息表：" :label-width="190" prop="merchantsInfoImg">
                          <upload-img title="商户信息表" v-model="identityBackImgList1" :needImg="1"></upload-img>
                      </FormItem>
                    </i-col>
                  </Row>
                  <divide-line>结算账户信息</divide-line>
                  <Row class="mt20">
                    <i-col span="12">
                      <FormItem label="同法人：" v-if="id === 2 && posApply.apply.accountType === 1" prop="isLegal">
                          <Select v-model="posApply.apply.isLegal" @on-change="isLegalChange">
                              <Option :value="1">是</Option>
                              <Option :value="2">否</Option>
                          </Select>
                      </FormItem>
                      <!-- <FormItem label="是否结算：" prop="settlementType">
                          <Select placeholder="请选择结算类型" v-model="posApply.apply.settlementType">
                              <Option :value="0">是</Option>
                              <Option :value="1">否</Option>
                          </Select>
                      </FormItem> -->
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
                          <Input v-model="posApply.apply.accountName" disabled v-if="posApply.apply.isLegal === 1" />
                          <Input placeholder="请输入开户名" v-model="posApply.apply.accountName" v-else />
                      </FormItem>
                      <FormItem label="开户支行：" prop="bankBranchName">
                          <bank @getBank="getBank" :bankBranchName="posApply.apply.bankBranchName"></bank>
                      </FormItem>
                      <FormItem label="银行卡号：" prop="bankFrontNumber">
                        <Input placeholder="请输入银行卡号" v-model="posApply.apply.bankFrontNumber" />
                      </FormItem>
                    </i-col>
                    <i-col span="12">
                      <FormItem label="结算人身份证正反面：" :label-width="190" v-if="isShowAuthorizedSettlementImg">
                        <div style="color:#d6d6d6">每张照片建议大小为<span style="color: red;">500KB</span>，格式可以为PNG、JPG、JPEG</div>
                        <FormItem prop="identityFrontImg" class="l mr5">
                          <upload-img title="正面" v-model="identityBackImgList5" :needImg="1" :noTips="true"></upload-img>
                        </FormItem>
                        <FormItem prop="identityBackImg" class="l">
                          <upload-img title="反面" v-model="identityBackImgList6" :needImg="1" :noTips="true"></upload-img>
                        </FormItem>
                      </FormItem>
                      <FormItem label="授权结算书：" :label-width="190" prop="authorizedSettlementImg" v-if="isShowAuthorizedSettlementImg">
                          <div style="color:#d6d6d6">每张照片建议大小为<span style="color: red;">500KB</span>，格式可以为PNG、JPG、JPEG</div>
                          <div style="color: red;">第二张是法人与结算人手持加盖公章非法人授权结算书合影或者法人手持授权书合影，</div>
                          <upload-img title="授权结算书" v-model="identityBackImgList4" :needImg="2" :noTips="true"></upload-img>
                      </FormItem>
                      <FormItem label="开户许可证：" :label-width="190" v-if="id === 2 && posApply.apply.accountType===0" prop="accountLicenceImg">
                        <upload-img title="开户许可证" v-model="identityBackImgList" :needImg="1"></upload-img>
                      </FormItem>
                      <FormItem label="银行卡正面：" :label-width="190" prop="bankFrontImg" v-if="posApply.apply.accountType === 1">
                        <upload-img title="银行卡正面" v-model="identityBackImgList2" :needImg="1"></upload-img>
                      </FormItem>
                    </i-col>
                  </Row>
            </Form>
        </Card>
        <Row class="pt30 pr30 pb30">
            <i-col span="24" align="right">
                <Button type="primary" size="large" @click="submit" class="w120 btn-add">提交审核</Button>
            </i-col>
        </Row>
    </div>
</template>

<script>
import UploadImg from '_c/uploadImg/uploadImg'
import breadCrumb from '_c/breadCrumb/breadCrumb'
import divideLine from '_c/divideLine/divide-line'
import bank from '_c/bank/bank'
import {
  getStoreList as getStoresList,
  getMerchantsList,
  getIndustryAndLegal
  // jugdeStore
} from '@/api/merchant'
import { addPosApply } from '@/api/common1'
import { formatDate } from '@/libs/util'
export default {
  components: {
    UploadImg,
    breadCrumb,
    divideLine,
    bank
  },
  name: 'add-entry',
  computed: {
    // 结算人信息是否显示的条件
    isShowAuthorizedSettlementImg() {
      return this.id === 2 && this.posApply.apply.accountType === 1 && this.posApply.apply.isLegal === 2
    }
  },
  data() {
    return {
      zcNumber: '',
      type: '1',
      identityBackImg: [{ url: '' }], // 身份证背面
      identityFrontImg: [{ url: '' }],
      identityHandImg: [{ url: '' }], // 手持身份证照
      name: '',
      id: null,
      bankId: null,
      businessTime: '',
      time: '',
      shopNameList: [],
      marketList: [],
      identityBackImgList: [],
      identityBackImgList1: [],
      identityBackImgList2: [],
      identityBackImgList3: [],
      identityBackImgList4: [],
      identityBackImgList5: [],
      identityBackImgList6: [],
      identityStartTime: '',
      identityEndTime: '',
      imgList: [], // 结算人手持身份证站收银台照
      branchList: [],
      generalLineList: [],
      headImg: [{ url: '' }], // 门头照
      cashImg: [{ url: '' }], // 收银台照
      contentImg: [{ url: '' }], // 经营内容照
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
      posApply: {
        apply: {
          posShareProfit: 1, // 购买政策
          merchantsId: null, // 商户id
          merchantsStoresId: null, // 门店id
          accountLicenceImg: null, // 开户许可证（经营许可证）
          accountName: '', // 账户名
          stlType: '', // 结算周期
          serviceFee: '0.02', // 结算费率
          accountNumber: '', // 开户账号
          accountType: 0, // 账户类型
          authorizedSettlementImg: '', // 结算授权书照
          bankMobile: null, // 预留手机
          isLegal: 2,
          bankBranchCode: '', // 支行code
          bankBranchName: '', // 支行名称
          bankCode: '111', // 总行code
          bankName: '111', // 总行名称
          bankFrontImg: '', // 银行卡正面照
          bankFrontNumber: '', // 银行卡号
          scanTitle: '', // 扫码小票
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
          posActivationNumber: 1, // pos进件数量
          posBrandId: 1, // pos机id
          protocolImg: '', // 协议照
          rentImg: '', // 租赁合同照
          capMoney: 20, // 封顶金额
          creditCardRate: 0.58, // 贷记卡费率
          debitCardRate: 0.48, // 借记卡费率
          scanBaseRate: 0.38, //  扫码基准费率
          unionpayRate: 0.6,
          uniStandardRate: 0.6,
          // settlementType: null, // 是否结算 0、结算 1、不结算
          type: '', // 11新小微12新企业21嘉联小微 22 嘉联租赁23嘉联法人
          legalMobile: '', // 法人手机号
          legalName: '', // 法人名称
          marchantsName: '', // 商户名称
          createUserId: this.$store.state.user.userId,
          roleId: this.$store.state.user.roleId
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
        // settlementType: [
        //   { required: true, message: '请选择结算类型', trigger: 'change', type: 'number' }
        // ],
        scanTitle: [
          { required: true, message: '请输入扫码小票', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{1,20}$/, message: '扫码小票必须是1-20位中文、字母或数字，不含特殊字符', trigger: 'blur' }
        ],
        posActivationNumber: [
          { required: true, message: '请输入进件数量', trigger: 'blur', type: 'number' }
        ],
        accountName: [
          { required: true, message: '请输入结算人名', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{2,45}$/, message: '开户名必须是2-45位中文、字母或数字，不含特殊字符', trigger: 'blur' }
        ],
        stlType: [
          { required: true, message: '请选择结算周期', trigger: 'change' }
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
        identityCard: [
          { required: true, message: '请输入结算人身份证号', trigger: 'blur' },
          { pattern: /(^\d{17}(\d|X)$)/, message: '请填写合法身份证号', trigger: 'blur' }
        ],
        identityStartTime: [
          { required: true, message: '请选择身份证开始时间', trigger: 'change', type: 'date' }
        ],
        identityEndTime: [
          { required: true, message: '请选择身份证结束时间', trigger: 'change', type: 'date' }
        ],
        bankFrontNumber: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.name = this.$route.query.name
    this.id = Number(this.$route.query.id)
    if (this.id === 1) {
      // 小微企业只有对私
      this.posApply.apply.accountType = 1
      this.posApply.apply.type = 11
      this.type = '2'
    } else {
      this.posApply.apply.type = 12
      this.type = '1'
    }
    // 获取商户列表
    getMerchantsList({ status: 3,
      type: this.type,
      userId: this.$store.state.user.userId,
      roleId: this.$store.state.user.roleId }).then(res => {
      this.shopNameList = res.data.list
    })
  },
  watch: {
    // 开户许可证
    identityBackImgList(value) {
      this.posApply.apply.accountLicenceImg = value.map(v => v.url).join(',')
    },
    // 工商信息表
    identityBackImgList1(value) {
      this.posApply.apply.merchantsInfoImg = value.map(v => v.url).join(',')
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
    // 结算人身份证正面
    identityBackImgList5(value) {
      this.posApply.apply.identityFrontImg = value.map(v => v.url).join(',')
    },
    // 结算人身份证反面
    identityBackImgList6(value) {
      this.posApply.apply.identityBackImg = value.map(v => v.url).join(',')
    }

  },
  methods: {
    isLegalChange() {
      if (this.posApply.apply.isLegal === 1) {
        this.posApply.apply.accountName = this.imgInfo.legalPerson.name
      } else {
        this.posApply.apply.accountName = ''
        this.identityBackImgList4 = []
        this.identityBackImgList5 = []
        this.identityBackImgList6 = []
        this.identityEndTime = ''
        this.posApply.apply.identityCard = ''
        this.posApply.apply.accountName = ''
      }
    },
    getBank(data) {
      this.posApply.apply.bankBranchCode = data[0].lbnk_NO
      this.posApply.apply.bankBranchName = data[0].lbnk_NM
      this.posApply.apply.interBankNumber = data[0].lbnk_NO
    },
    // 根据商户ID获取门店列表与法人信息
    getMarketList(val) {
      let pid = Number(val)
      this._clearInfo()
      // 根据商户id获取门店列表
      getStoresList({ merchantId: pid }).then(res => {
        this.marketList = res.data
      })
      // 根据商户id获取工商与法人信息
      getIndustryAndLegal(pid).then(res => {
        let {
          business = {},
          legalPerson = {},
          merchantId,
          merchantStatus,
          merchantsAccount
        } = res.data
        this.imgInfo = {
          business: business || {},
          legalPerson: legalPerson || {},
          merchantId,
          merchantStatus,
          merchantsAccount
        }
        this._getLegalInfo(this.imgInfo)
        this._setAccountInfo(this.imgInfo)
      })
      // this.contentImg = [{ url: this.shopNameList.filter(item => item.id === val)[0].contentImg }]
    },
    // 根据门店id获取门头照与收银台照
    getImg(val) {
      if (!val) return
      let temp = this.marketList.filter(item => val.value === item.id)
      this.headImg = [{ url: temp[0].headImg }]
      this.cashImg = [{ url: temp[0].cashImg }]
      this.contentImg = [{ url: temp[0].contentImg }]
      // 判断该商户下是否已有门店在进件，如果有 弹窗提示
      // let name = val.label
      // jugdeStore({ name }).then(res => {
      //   if (res.data === '1') {
      //     this.$Modal.warning({
      //       title: '请稍后进件',
      //       content: '该商户首个门店正在进件中，请等待进件完成后再次进件，谢谢。',
      //       onOk: () => {
      //         this.$router.push({ name: 'posList' })
      //       }
      //     })
      //   }
      // })
    },
    // 提交审核
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.id === 1) {
            this.posApply.apply.accountType = 1
          }
          if (this.posApply.apply.isLegal === 1) {
            this.posApply.apply.identityFrontImg = ''
            this.posApply.apply.identityBackImg = ''
          }
          if (this.id === 2 && this.posApply.apply.accountType === 1 && this.posApply.apply.isLegal === 2) {
            if (this.identityBackImgList4.length < 2) {
              this.$Message.error('授权结算书必须是两张！')
              return false
            }
          }
          addPosApply(this.posApply).then(res => {
            if (this.$route.query.goindex === 'true') {
              this.$router.push({
                path: 'merchantEntry'
              })
            } else {
              this.$router.back(-1)
            }
          })
        } else {
          this.$Message.error('请将信息填写完整！')
        }
      })
    },
    // 切换门店时清空之前门店的数据
    _clearInfo() {
      this.posApply.apply.merchantsStoresId = null
      this.identityFrontImg = [{ url: '' }]
      this.identityBackImg = [{ url: '' }]
      this.imgInfo.business.businessLicenseImg = [{ url: '' }]
      this.cashImg = [{ url: '' }]
      this.contentImg = [{ url: '' }]
      this.headImg = [{ url: '' }]
      this.identityHandImg = [{ url: '' }]
    },
    // 把获取到的工商与法人的信息赋值
    _getLegalInfo(imgInfo) {
      if (this.posApply.apply.isLegal === 1) {
        this.posApply.apply.accountName = imgInfo.legalPerson.name
      }
      if (imgInfo.legalPerson) {
        this.identityFrontImg = [{ url: imgInfo.legalPerson.identityFrontImg }]
        this.identityBackImg = [{ url: imgInfo.legalPerson.identityBackImg }]
        this.identityHandImg = (imgInfo.legalPerson.identityHandImg || '').split(',').map(item => ({ url: item }))
        this.zcNumber = imgInfo.legalPerson.identityCard + 'XW'
        this.time = formatDate(imgInfo.legalPerson.identityEndDate, 'yyyy-MM-dd')
      }
      if (imgInfo.business) {
        this.imgInfo.business.businessLicenseImg = [{ url: imgInfo.business.businessLicenseImg }]
        this.businessTime = formatDate(imgInfo.business.licenseEndTime, 'yyyy-MM-dd')
      }
    },
    // 赋值结算账户信息
    _setAccountInfo({ merchantsAccount }) {
      // console.log(info)
      let apply = this.posApply.apply
      apply.accountName = merchantsAccount.accountName // 结算人姓名
      apply.identityCard = merchantsAccount.identityCard // 身份证号
      apply.identityEndTime = formatDate(merchantsAccount.identityEndTime, 'yyyy-MM-dd') // 身份证有效期

      apply.bankBranchCode = merchantsAccount.bankBranchCode // 支行code
      apply.bankBranchName = merchantsAccount.bankBranchName // 支行名
      apply.interBankNumber = merchantsAccount.interBankNumber // 联行号
      apply.accountNumber = merchantsAccount.accountNumber // 银行卡号 ？ 开户账号？
      apply.bankFrontNumber = merchantsAccount.accountNumber // 银行卡号

      // 开户许可证
      this.identityBackImgList = this._toArray(merchantsAccount.accountLicenceImg)
      // 商户信息表
      this.identityBackImgList1 = this._toArray(merchantsAccount.merchantsInfoListImg)
      // 银行卡正面
      this.identityBackImgList2 = this._toArray(merchantsAccount.bankFrontImg)
      // 协议照
      this.identityBackImgList3 = this._toArray(merchantsAccount.protocolImg)
      // 授权结算书
      this.identityBackImgList4 = this._toArray(merchantsAccount.authorizedSettlementImg)
      // 身份证正面
      this.identityBackImgList5 = this._toArray(merchantsAccount.identityFrontImg)
      // 身份证反面
      this.identityBackImgList6 = this._toArray(merchantsAccount.identityBackImg)
    },
    _toArray(imgUrl) {
      return imgUrl ? imgUrl.split(',').map(v => ({ url: v })) : []
    }
  }
}
</script>
