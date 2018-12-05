<template>
    <div class="add-entry-t">
        <bread-crumb :data="[{title: '商户进件'}, {title: '新增进件'}]"></bread-crumb>
        <Card>
            <p class="pb20 f16">嘉联-{{name}}</p>
            <divide-line>进件基础信息</divide-line>
            <Form :label-width="150" class="form mt20" ref="form1" :model="posApply.apply" :rules="rules">
                <div class="left">
                    <FormItem label="商户名称：" prop="merchantsId">
                        <Select placeholder="请输入商户名称" filterable v-model="posApply.apply.merchantsId" @on-change="getMarketList">
                            <Option v-for="(item, index) in shopNameList" :key="index" :value="item.id">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="门店名称：" prop="merchantsStoresId">
                        <Select placeholder="请输入门店名称" v-model="posApply.apply.merchantsStoresId">
                            <Option v-for="(item, index) in marketList" :key="index" :value="item.id">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="同法人：" v-if="id === 5 && posApply.apply.accountType === 1" prop="isLegal">
                        <Select v-model="posApply.apply.isLegal">
                            <Option :value="1">是</Option>
                            <Option :value="2">否</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="账户类型：" v-if="id === 5" prop="accountType">
                        <Select placeholder="请选择账户类型" v-model="posApply.apply.accountType">
                            <Option :value="0">对公</Option>
                            <Option :value="1">对私</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="结算周期：" v-if="id === 5">
                        <Select placeholder="请选择" v-model="posApply.apply.stlTyp">
                            <Option :value="1">T+1</Option>
                            <Option :value="2" v-if="posApply.apply.accountType === 1">D+1</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="结算费率：" v-if="id === 2 && posApply.apply.stlTyp === 2">
                        <Select v-model="posApply.apply.serviceFee">
                            <Option :value="0.02">0.02</Option>
                            <Option :value="0.03">0.03</Option>
                            <Option :value="0.04">0.04</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="进件数量：" prop="posActivationNumber">
                        <InputNumber :max="10" :min="1" v-model="posApply.apply.posActivationNumber" style="width: 100%;" placeholder="请输入进件数量"></InputNumber>
                    </FormItem>
                    <FormItem label="扫码小票：" prop="scanTitle">
                        <Input placeholder="请输入扫码小票" v-model="posApply.apply.scanTitle" />
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
                </div>
                <div class="right">
                    <FormItem label="开户许可证：" v-if="id === 5 && posApply.apply.accountType === 0" :label-width="180" prop="accountLicenceImg">
                        <upload-img title="开户许可证" v-model="identityBackImgList" :needImg="1"></upload-img>
                    </FormItem>
                    <FormItem label="协议照：" v-if="id === 5" :label-width="180" prop="protocolImg">
                        <upload-img title="协议照" v-model="identityBackImgList3" :needImg="3"></upload-img>
                    </FormItem>
                </div>
            </Form>
            <divide-line>工商法人信息</divide-line>
            <Form :label-width="150" class="form mt20" ref="form2" :model="posApply.apply" :rules="rules">
              <div class="left">
                <FormItem label="姓名：" v-if="id === 3">
                    <Input placeholder="请输入姓名" v-model="imgInfo.legalPerson.name" disabled/>
                </FormItem>
                <FormItem label="身份证号：" v-if ="id === 3">
                    <Input placeholder="请输入身份证号" v-model="imgInfo.legalPerson.identityCard" disabled />
                </FormItem>
                <FormItem label="法人名称：" v-if="id === 5">
                    <Input placeholder="请输入法人名称" disabled v-model="imgInfo.legalPerson.name"/>
                </FormItem>
                <FormItem label="法人身份证号：" v-if="id === 5">
                    <Input placeholder="请输入法人身份证号" disabled v-model="imgInfo.legalPerson.identityCard" />
                </FormItem>
                <FormItem label="出租人姓名：" v-if="id === 4" prop="accountName">
                    <Input placeholder="请输入出租人姓名" v-model="posApply.apply.accountName" />
                </FormItem>
                <FormItem label="出租人身份证号：" v-if="id === 4" prop="identityCard">
                    <Input placeholder="请输入出租人身份证号" v-model="posApply.apply.identityCard"/>
                </FormItem>
                <FormItem label="承租人姓名：" v-if="id === 4">
                    <Input placeholder="请输入承租人姓名" disabled v-model="imgInfo.legalPerson.name"/>
                </FormItem>
                <FormItem label="承租人身份证号：" v-if ="id === 4">
                    <Input placeholder="请输入承租人身份证号" disabled v-model="imgInfo.legalPerson.identityCard"/>
                </FormItem>
                <FormItem label="身份证有效期：">
                    <Input placeholder="身份证有效期" v-model="cardTime" disabled />
                </FormItem>
                <FormItem label="装机地址：" v-if="id !== 3 && id !== 5">
                    <Row :gutter="10" style="margin:0">
                        <i-col span="8">
                        <FormItem prop="province">
                            <Select v-model="province" placeholder="省" :label-in-value="true" @on-change="changeProvince">
                                <Option v-for="item in proviceList" :key="item.id" :value="item.identity">{{ item.id }}</Option>
                            </Select>
                        </FormItem>
                        </i-col>
                        <i-col span="8">
                        <FormItem prop="city">
                            <Select v-model="city" placeholder="市" :label-in-value="true" @on-change="changeCity">
                                <Option v-for="item in cityList" :key="item.id" :value="item.identity">{{ item.id }}</Option>
                            </Select>
                        </FormItem>
                        </i-col>
                        <i-col span="8">
                            <FormItem prop="district">
                                <Select v-model="district" placeholder="区" :label-in-value="true" @on-change="changeDistrict">
                                    <Option v-for="item in districtList" :key="item.id" :value="item.identity">{{ item.id }}</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                    </Row>
                </FormItem>
                <FormItem label="详细地址：" v-if="id !== 3 && id !== 5" prop="adressDetail">
                    <Input placeholder="请输入详细地址" v-model="posApply.apply.adressDetail"/>
                </FormItem>
              </div>
              <div class="right">
                <FormItem label="身份证正反面：" :label-width="180" v-if="id !== 4 && id !== 5">
                    <Card class="w100 h100 l mr10">
                        <img :src="imgInfo.legalPerson.identityFrontImg" alt="" style="width: 98px; height: 98px;" @click="isShowBigImg = ture; bigImg = imgInfo.legalPerson.identityFrontImg" v-if="imgInfo.legalPerson.identityFrontImg">
                    </Card>
                    <Card class="w100 h100 l">
                        <img :src="imgInfo.legalPerson.identityBackImg" alt="" style="width: 98px; height: 98px;" @click="isShowBigImg = ture; bigImg = imgInfo.legalPerson.identityBackImg" v-if="imgInfo.legalPerson.identityBackImg">
                    </Card>
                </FormItem>
                <FormItem label="法人身份证正反面：" :label-width="180" v-if="id === 5">
                    <Card class="w100 h100 l mr10">
                        <img :src="imgInfo.legalPerson.identityFrontImg" alt="" style="width: 98px; height: 98px;" @click="isShowBigImg = ture; bigImg = imgInfo.legalPerson.identityFrontImg" v-if="imgInfo.legalPerson.identityFrontImg">
                    </Card>
                    <Card class="w100 h100 l">
                        <img :src="imgInfo.legalPerson.identityBackImg" alt="" style="width: 98px; height: 98px;" @click="isShowBigImg = ture; bigImg = imgInfo.legalPerson.identityBackImg" v-if="imgInfo.legalPerson.identityBackImg">
                    </Card>
                </FormItem>
                <FormItem label="承租人身份证正反面：" :label-width="180" v-if="id === 4">
                    <Card class="w100 h100 l mr10">
                        <img :src="imgInfo.legalPerson.identityFrontImg" alt="" style="width: 98px; height: 98px;" @click="isShowBigImg = ture; bigImg = imgInfo.legalPerson.identityFrontImg" v-if="imgInfo.legalPerson.identityFrontImg">
                    </Card>
                    <Card class="w100 h100 l">
                        <img :src="imgInfo.legalPerson.identityBackImg" alt="" style="width: 98px; height: 98px;" @click="isShowBigImg = ture; bigImg = imgInfo.legalPerson.identityBackImg" v-if="imgInfo.legalPerson.identityBackImg">
                    </Card>
                </FormItem>
                <FormItem label="营业执照：" v-if="id === 5" :label-width="180">
                    <Card class="w100 h100 l mr10">
                        <img :src="imgInfo.business.businessLicenseImg" alt="" style="width: 98px; height: 98px;" @click="isShowBigImg = ture; bigImg = imgInfo.legalPerson.businessLicenseImg" v-if="imgInfo.legalPerson.businessLicenseImg">
                    </Card>
                </FormItem>
                <FormItem label="商户信息表：" :label-width="190" v-if="id ===5" prop="merchantsInfoImg">
                    <upload-img title="商户信息表" v-model="identityBackImgList5" :needImg="1"></upload-img>
                </FormItem>
                <FormItem label="租赁合同：" v-if="id === 4" :label-width="180" prop="rentImg">
                    <upload-img title="租赁合同" v-model="identityBackImgList1" :needImg="2"></upload-img>
                </FormItem>
                <FormItem label="银行卡正面：" :label-width="180" prop="bankFrontImg" v-if="posApply.apply.accountType !== 0">
                  <upload-img title="银行卡正面" v-model="identityBackImgList2" :needImg="1"></upload-img>
                </FormItem>
              </div>
            </Form>
            <divide-line>结算账户信息</divide-line>
            <Form :label-width="150" class="form mt20" ref="form" :model="posApply.apply" :rules="rules">
              <div class="left">
                <FormItem label="是否结算：" prop="settlementType">
                    <Select placeholder="请选择结算类型" v-model="posApply.apply.settlementType">
                        <Option :value="0">是</Option>
                        <Option :value="1">否</Option>
                    </Select>
                </FormItem>
                <FormItem label="结算人姓名：" prop="accountName" v-if="id === 5 && posApply.apply.isLegal === 2 && posApply.apply.accountType === 1">
                    <Input placeholder="请输入结算人姓名" v-model="posApply.apply.accountName" />
                </FormItem>
                <FormItem label="结算人身份证号：" prop="identityCard" v-if="id === 5 && posApply.apply.isLegal === 2 && posApply.apply.accountType === 1">
                    <Input placeholder="请输入结算人身份证号" v-model="posApply.apply.identityCard" />
                </FormItem>
                <FormItem label="结算人身份证有效期：" v-if="id === 5 && posApply.apply.isLegal === 2 && posApply.apply.accountType === 1">
                    <Row>
                        <i-col span="24">
                          <FormItem prop="identityEndTime">
                            <DatePicker placeholder="结束时间" style="width:100%;" v-model="identityEndTime" type="date" @on-change="posApply.apply.identityEndTime = identityEndTime"></DatePicker>
                          </FormItem>
                        </i-col>
                    </Row>
                </FormItem>
                <FormItem label="开户名：" prop="accountName">
                    <Input placeholder="请输入开户名" v-model="posApply.apply.accountName" />
                </FormItem>
                <FormItem label="开户总行：" prop="bankCode">
                    <Select v-model="bankId" placeholder="开户总行" :label-in-value="true" clearable @on-change="changeBank" filterable>
                        <Option v-for="(item, index) in generalLineList" :key="index" :value="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="开户支行：" prop="bankBranchCode">
                    <span v-if="posApply.apply.bankBranchName" class="pr20">{{posApply.apply.bankBranchName}}</span>
                    <Button type="primary" @click="select" v-if="posApply.apply.bankCode">选择支行</Button>
                    <Button type="primary" v-else disabled>选择支行</Button>
                </FormItem>
                <FormItem label="银行卡号：" prop="bankFrontNumber">
                    <Input placeholder="请输入银行卡号" v-model="posApply.apply.bankFrontNumber" />
                </FormItem>
                <FormItem label="联行号：" prop="interBankNumber" v-if="id === 5">
                    <Input placeholder="请输入联行号" v-model="posApply.apply.interBankNumber" />
                </FormItem>
              </div>
              <div class="right">
                <FormItem label="授权结算书：" :label-width="190" v-if="id === 5 && posApply.apply.isLegal === 2 && posApply.apply.accountType === 1" prop="authorizedSettlementImg">
                    <div style="color:#d6d6d6">每张照片建议大小为<span style="color: red;">500KB</span>，格式可以为PNG、JPG、JPEG</div>
                    <div style="color: red;">第二张是法人与结算人手持加盖公章非法人授权结算书合影</div>
                    <upload-img title="授权结算书" v-model="identityBackImgList4" :needImg="2" :noTips="true"></upload-img>
                </FormItem>
                <FormItem label="结算人身份证正反面：" :label-width="190" v-if="id === 5 && posApply.apply.isLegal === 2 && posApply.apply.accountType === 1">
                    <div style="color:#d6d6d6">每张照片建议大小为<span style="color: red;">500KB</span>，格式可以为PNG、JPG、JPEG</div>
                    <FormItem prop="identityFrontImg" class="l mr20">
                      <upload-img title="正面" v-model="identityBackImgList6" :needImg="1" :noTips="true"></upload-img>
                    </FormItem>
                    <FormItem prop="identityBackImg" class="l">
                      <upload-img title="反面" v-model="identityBackImgList7" :needImg="1" :noTips="true"></upload-img>
                    </FormItem>
                </FormItem>
              </div>
            </Form>
        </Card>
        <Row class="pt30 pr30 pb30">
            <i-col span="24" align="right">
                <Button type="primary" @click="submit" class="w120 btn-add">提交审核</Button>
            </i-col>
        </Row>
        <Modal v-model="isShow" :mask-closable="false" :closable="true" title="选择支行" width="800" class-name="vertical-center-modal">
            <div slot="footer">
                <Button type="text" size="large" @click="isShow = false;params.name = '';params.provinceId = '';params.cityId = '';params.bankId = ''">取消</Button>
                <Button type="primary" size="large" @click="posDown">确定</Button>
            </div>
            <Row>
              <i-col span="24" align="right">
                <Input placeholder="请输入支行名称" v-model="params.name" class="w180 mr20" />
                <Select placeholder="省" :label-in-value="true" clearable class="tl mr20 w180" v-model="params.provinceId" @on-change="selectProvice">
                    <Option v-for="(item, index) in proviceList1" :key="index" :value="item.id">{{item.name}}</Option>
                </Select>
                <Select placeholder="市" :label-in-value="true" clearable v-model="params.cityId" class="mr20 w180 tl">
                    <Option v-for="(item, index) in cityList1" :key="index" :value="item.id">{{item.name}}</Option>
                </Select>
                <Button type="primary" @click="getAll">查询</Button>
              </i-col>
            </Row>
            <Table border :columns="columns" :data="tableData" style="margin-top: 20px;" @on-selection-change="changeSelect" ref="selection"></Table>
            <Page :total="totalCounts" show-sizer :page-size="params.size" :current.sync="params.page" @on-change="getpage" @on-page-size-change="changePageSize" style="margin-top: 20px; text-align: right"> </Page>
        </Modal>
        <Modal title="图片预览" v-model="isShowBigImg">
            <img :src="bigImg" style="width: 100%">
        </Modal>
    </div>
</template>
<script>
import { getMerchantsList, getStoreList as getStoresList, getIndustryAndLegal } from '@/api/merchant'
import { getSxoBanksInfo, getSxoBanksBranchInfoByBankId, getProvinceInfo, getCityInfo, getAreaInfo, getSxoBanksBranchInfoByFuzzyQuery } from '@/api/common'
import { addPosApply } from '@/api/common1'
import UploadImg from '_c/uploadImg/uploadImg'
import breadCrumb from '_c/breadCrumb/breadCrumb'
import divideLine from '_c/divideLine/divide-line'
import { formatDate } from '@/libs/util'
export default {
  components: {
    UploadImg,
    breadCrumb,
    divideLine
  },
  name: 'add-entry-t',
  data() {
    return {
      isShowBigImg: false,
      bigImg: '',
      isShow: false,
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
      name: '',
      id: null,
      bankId: null,
      bankBranchCode: null,
      cardTime: '',
      province: '',
      city: '',
      district: '',
      protocolImg: [],
      identityStartTime: '',
      identityEndTime: '',
      identityBackImgList: [],
      identityBackImgList1: [],
      identityBackImgList2: [],
      identityBackImgList3: [],
      identityBackImgList4: [],
      identityBackImgList5: [],
      identityBackImgList6: [],
      identityBackImgList7: [],
      generalLineList: [],
      proviceList: [],
      cityList: [],
      proviceList1: [],
      cityList1: [],
      districtList: [],
      branchList: [],
      shopNameList: [],
      marketList: [],
      rentImg: [],
      list: [],
      imgInfo: {
        business: {
          businessLicenseImg: ''
        },
        legalPerson: {
          identityFrontImg: '',
          identityBackImg: '',
          name: '',
          identityCard: ''
        }
      },
      posApply: {
        apply: {
          merchantsId: null, // 商户id
          merchantsStoresId: null, // 门店id
          accountLicenceImg: null, // 开户许可证（经营许可证）
          accountName: '', // 账户名
          accountNumber: '', // 开户账号
          adressDetail: '',
          isLegal: 1,
          accountType: 1, // 账户类型
          stlTyp: null, // 结算周期
          serviceFee: 0.02, // 结算费率
          authorizedSettlementImg: '', // 结算授权书照
          bankBranchCode: '', // 支行code
          bankBranchName: '', // 支行名称
          bankCode: '', // 总行code
          bankName: '', // 总行名称
          bankFrontImg: '', // 银行卡正面照
          bankFrontNumber: '', // 银行卡号
          bankMobile: null, // 预留手机
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
          settlementType: null, // 是否结算 0、结算 1、不结算
          capMoney: 1, // 封顶金额
          creditCardRate: 0.1, // 贷记卡费率
          debitCardRate: 0.1, // 借记卡费率
          scanBaseRate: 0.1, //  扫码基准费率
          legalMobile: '', // 法人手机号
          legalName: '', // 法人名称
          storesName: '', // 门店名称
          marchantsName: '', // 商户名称
          type: '' // 11新小微12新企业21嘉联小微 22 嘉联租赁23嘉联法人
        }
      },
      rules: {
        merchantsId: [
          { required: true, message: '请选择商户', trigger: 'change', type: 'number' }
        ],
        merchantsStoresId: [
          { required: true, message: '请选择门店', trigger: 'change', type: 'number' }
        ],
        accountType: [
          { required: true, message: '请选择账户类型', trigger: 'change', type: 'number' }
        ],
        settlementType: [
          { required: true, message: '请选择结算类型', trigger: 'change', type: 'number' }
        ],
        scanTitle: [
          { required: true, message: '请输入扫码小票', trigger: 'blur' }
        ],
        posActivationNumber: [
          { required: true, message: '请输入进件数量', trigger: 'blur', type: 'number' }
        ],
        accountName: [
          { required: true, message: '请输入开户名', trigger: 'blur' }
        ],
        bankCode: [
          { required: true, message: '请输入开户总行', trigger: 'change' }
        ],
        bankBranchCode: [
          { required: true, message: '请输入开户支行', trigger: 'change', type: 'number' }
        ],
        interBankNumber: [
          { required: true, message: '请输入联行号', trigger: 'blur' }
        ],
        bankMobile: [
          { required: true, message: '请输入预留手机号', trigger: 'blur' },
          { pattern: /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/, message: '请填写合法手机号', trigger: 'blur' }
        ],
        // debitCardRate: [
        //   { required: true, message: '请输入借记卡费率', trigger: 'blur', type: 'number' }
        // ],
        // capMoney: [
        //   { required: true, message: '请输入封顶金额', trigger: 'blur', type: 'number' }
        // ],
        // creditCardRate: [
        //   { required: true, message: '请输入贷记卡费率', trigger: 'blur', type: 'number' }
        // ],
        // scanBaseRate: [
        //   { required: true, message: '请输入扫码基准费率', trigger: 'blur', type: 'number' }
        // ],
        authorizedSettlementImg: [
          { required: true, message: '请上传授权结算书', trigger: 'blur' }
        ],
        bankFrontImg: [
          { required: true, message: '请上传银行卡正面照', trigger: 'blur' }
        ],
        merchantsInfoImg: [
          { required: true, message: '请上传工商信息表', trigger: 'blur' }
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
        adressDetail: [
          { required: true, message: '请输入地址', trigger: 'blur' }
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
        identityCard: [
          { required: true, message: '请输入结算人身份证号', trigger: 'blur' },
          { pattern: /(^\d{15}$)|(^\d{17}(\d|X)$)/, message: '请填写合法身份证号', trigger: 'blur' }
        ],
        identityStartTime: [
          { required: true, message: '请选择身份证开始时间', trigger: 'change', type: 'date' }
        ],
        identityEndTime: [
          { required: true, message: '请选择身份证结束时间', trigger: 'change', type: 'date' }
        ],
        bankFrontNumber: [
          { required: true, message: '请填写银行卡号', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    let that = this
    that.name = this.$route.query.name
    that.id = Number(that.$route.query.id)
    if (that.id === 3) {
      that.posApply.apply.type = 21
    } else if (that.id === 4) {
      that.posApply.apply.type = 22
    } else {
      that.posApply.apply.type = 23
    }
    getMerchantsList({ status: 3 }).then(res => {
      that.shopNameList = res.data
    })
    getSxoBanksInfo().then(res => {
      that.generalLineList = res
    })
    getProvinceInfo().then(res => {
      that.proviceList = res
    })
  },
  watch: {
    // 开户许可证
    identityBackImgList(value) {
      this.posApply.apply.accountLicenceImg = value.map(v => v.url).join(',')
    },
    // 租赁合同
    identityBackImgList1(value) {
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
    identityBackImgList5(value) {
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
    changeSelect(val) {
      this.list = val
    },
    getAll() {
      let that = this
      if (!that.params.provinceId) {
        that.$Message.error('请选择省')
        return
      }
      if (!that.params.cityId) {
        that.$Message.error('市')
        return
      }
      that.params.bankId = that.bankId
      getSxoBanksBranchInfoByFuzzyQuery(that.params).then(res => {
        that.tableData = res.data
        this.totalCounts = res.objectotalNumber
      })
    },
    // 选择支行
    posDown() {
      if (!this.list.length) {
        this.$Message.error('请选择一个支行')
        return
      }
      if (this.list.length > 1) {
        this.$Message.error('只能选择一个支行')
        return
      }
      this.posApply.apply.bankBranchCode = this.list[0].id
      this.posApply.apply.bankBranchName = this.list[0].name
      this.isShow = false
    },
    // 选择支行弹框显示
    select() {
      this.isShow = true
      this.tableData = []
      this.totalCounts = 1
      getProvinceInfo().then(res => {
        this.proviceList1 = res
      })
    },
    getpage(val) {
      this.params.page = val
      this.getAll()
    },
    changePageSize(val) {
      this.params.page = 1
      this.params.size = val
      this.getAll()
    },
    // 选择总行
    changeBank(val) {
      let pid = val.value
      this.posApply.apply.bankBranchCode = null
      this.posApply.apply.bankBranchName = null
      getSxoBanksBranchInfoByBankId(pid).then(res => {
        this.branchList = res
      })
      for (let i = 0; i < this.generalLineList.length; i++) {
        if (pid === this.generalLineList[i].id) {
          this.posApply.apply.bankCode = this.generalLineList[i].code
          this.posApply.apply.bankName = this.generalLineList[i].name
          return
        }
      }
    },
    // 选择省
    selectProvice() {
      getCityInfo(this.params.provinceId).then(res => {
        this.cityList1 = res
      })
      this.params.cityId = null
    },
    // 根据商户ID获取门店列表与法人信息
    getMarketList(val) {
      let pid = Number(val)
      this.posApply.apply.merchantsStoresId = null
      this.imgInfo.legalPerson.identityFrontImg = ''
      this.imgInfo.legalPerson.identityBackImg = ''
      getStoresList({ merchantId: pid }).then(res => {
        this.marketList = res.data
      })

      getIndustryAndLegal(pid).then(res => {
        this.imgInfo = res.data
        if (res.data.legalPerson.identityStartDate && res.data.legalPerson.identityEndDate) {
          this.cardTime = formatDate(new Date(res.data.legalPerson.identityEndDate), 'yyyy-MM-dd')
        } else {
          this.cardTime = ''
        }
      })
      for (let i = 0; i < this.shopNameList.length; i++) {
        if (val === this.shopNameList[i].id) {
          this.operationImg = this.shopNameList[i].operationImg
          return
        }
      }
    },
    // 省份切换
    changeProvince(val) {
      this.posApply.apply.city = null
      this.posApply.apply.district = null
      let pid = this.proviceList.find(item => item.identity === val.value).id
      this.posApply.apply.mercProv = pid
      this.posApply.apply.province = val.label
      getCityInfo(pid).then(res => {
        this.cityList = res
      })
    },
    // 市切换
    changeCity(val) {
      this.posApply.apply.district = null
      this.posApply.apply.city = val.label
      let pid = this.cityList.find(item => item.identity === val.value).id
      this.posApply.apply.mercCity = pid
      getAreaInfo(pid).then(res => {
        this.districtList = res
      })
    },
    changeDistrict(val) {
      this.posApply.apply.district = val.label
      for (let i = 0; i < this.districtList.length; i++) {
        if (val.label === this.districtList[i].name) {
          this.posApply.apply.mercArea = this.districtList[i].id
          return
        }
      }
    },
    submit() {
      let temp = 0
      this.$refs['form1'].validate((valid) => {
        if (valid) {
          temp += 1
        }
      })
      this.$refs['form2'].validate((valid) => {
        if (valid) {
          temp += 1
        }
      })
      this.$refs['form'].validate((valid) => {
        if (valid) {
          temp += 1
        }
      })
      if (temp === 3) {
        if (this.posApply.apply.isLegal) {
          this.posApply.apply.identityFrontImg = ''
          this.posApply.apply.identityBackImg = ''
        }
        for (let i = 0; i < this.districtList.length; i++) {
          if (this.district === this.districtList[i].identity) {
            this.posApply.apply.district = this.districtList[i].name
            this.posApply.apply.mercArea = this.districtList[i].id
          }
        }
        let date = new Date(this.identityStartTime)
        let date1 = new Date(this.identityEndTime)
        this.posApply.apply.identityStartTime = date.valueOf()
        this.posApply.apply.identityEndTime = date1.valueOf()
        this.posApply.apply.posActivationNumber = Number(this.posApply.apply.posActivationNumber)
        addPosApply(this.posApply).then(res => {
          if (this.$route.query.goindex === 'true') {
            this.$router.push({
              path: 'merchantEntry'
            })
          } else {
            this.$router.back(-1)
          }
        })
      }
    }
  }
}
</script>
<style>
.add-entry-t .form {
  display: flex;
  padding-bottom: 20px;
}

.add-entry-t .left,
.add-entry-t .right {
  flex: 1;
}

.add-entry-t .tips {
  color: #d6d6d6;
}

.add-entry-t .right .ivu-card-body {
  padding: 0;
}
</style>
