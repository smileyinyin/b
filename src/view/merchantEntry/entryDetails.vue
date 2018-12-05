<template>
    <div class="entry-details">
        <bread-crumb :data="[{path: '/posList',title: '商户进件'}, {title: '查看进件详情'}]"></bread-crumb>
        <Card>
            <p class="pb20 f16">{{title}}</p>
            <Alert :type="type" v-bind:style="{color: color[0], borderColor: color[1], backgroundColor: color[2]}" class="mb20">{{text}}</Alert>
            <Form :label-width="150">
                <divide-line>进件基础信息</divide-line>
                <Row class="mt20">
                    <i-col span="12">
                        <FormItem label="商户名称：">{{info.marchantsName}}</FormItem>
                        <FormItem label="门店名称：">{{info.storesName}}</FormItem>
                        <FormItem label="账户类型：" v-if="info.type !== 11 && info.type !== 22 && info.type !== 21">{{info.accountType === 0?'对公':'对私'}}</FormItem>
                        <FormItem label="结算周期：">{{info.stlType === '1'? 'T+1':'D+1'}}</FormItem>
                        <FormItem label="结算费率："  v-if="info.stlType === '2'">{{info.serviceFee}}</FormItem>
                        <FormItem label="是否同法人：" v-if="(info.type === 12 && info.accountType === 1) || (info.type === 23 && info.accountType === 1)">{{info.isLegal === 1? '同法人': '非法人'}}</FormItem>
                        <!-- <FormItem label="是否结算：">{{info.settlementType=== 0?'结算': '不结算'}}</FormItem> -->
                        <FormItem label="扫码小票：">{{info.scanTitle}}</FormItem>
                        <FormItem label="购买政策：">{{info.posShareProfit === 1 ? '双免' : (info.posShareProfit === 2 ? '分期' : (info.posShareProfit === 3 ? '买断' : ''))}}</FormItem>
                        <FormItem label="进件数量：">{{info.posActivationNumber}}</FormItem>
                        <FormItem label="借记卡费率：">{{info.debitCardRate}}</FormItem>
                        <FormItem label="封顶金额：">{{info.capMoney}}</FormItem>
                        <FormItem label="贷记卡费率：">{{info.creditCardRate}}</FormItem>
                        <FormItem label="扫码基准费率：">{{info.scanBaseRate}}</FormItem>
                        <FormItem label="银联二维码费率：">{{info.unionpayRate}}</FormItem>
                        <FormItem label="银联二维码标准费率：">{{info.uniStandardRate}}</FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="商户照片：" v-if="info.type === 11 || info.type === 12">
                            <upload-img v-model="info.headImg" noTips viewOnly class="vt"></upload-img>
                            <upload-img v-model="info.cashImg" noTips viewOnly class="vt"></upload-img>
                            <upload-img v-model="info.contentImg" noTips viewOnly class="vt"></upload-img>
                        </FormItem>
                        <FormItem label="协议照：" v-if="info.type === 11 || info.type === 23 || info.type === 12">
                            <upload-img v-model="info.protocolImg" noTips viewOnly class="vt"></upload-img>
                        </FormItem>
                    </i-col>
                </Row>
                <divide-line>工商法人信息</divide-line>
                <Row class="mt20">
                    <i-col span="12">
                        <FormItem label="名称：" v-if="info.type !== 22">{{info.legalName}}</FormItem>
                        <FormItem label="身份证号：" v-if="info.type !== 22">{{info.identityCard}}</FormItem>
                        <FormItem label="身份证有效期：">{{info.identityEndTime}}</FormItem>
                        <FormItem label="注册号：" v-if="info.type === 11">{{info.identityCard}}XW</FormItem>
                        <FormItem label="注册号有效期：" v-if="info.type === 11">{{info.identityEndTime}}</FormItem>
                        <FormItem label="营业执照号：" v-if="info.type === 23 || info.type === 12">{{info.businessNumber}}</FormItem>
                        <FormItem label="营业执照有效期：" v-if="info.type === 23 || info.type === 12">{{info.licenseEndTime}}</FormItem>
                        <FormItem label="出租人姓名：" v-if="info.type === 22">{{info.accountName}}</FormItem>
                        <FormItem label="出租人身份证号：" v-if="info.type === 22">{{info.identityCard}}</FormItem>
                        <FormItem label="承租人姓名：" v-if="info.type === 22">{{info.legalName}}</FormItem>
                        <FormItem label="承租人身份证号：" v-if="info.type === 22">{{info.legalIdcard}}</FormItem>
                        <FormItem label="装机地址：" v-if="info.type === 22">{{info.province}}{{info.city}}{{info.district}}</FormItem>
                        <FormItem label="详细地址：" v-if="info.type === 22">{{info.adressDetail}}</FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="身份证正反面：">
                            <upload-img v-model="info.identityFrontImg" noTips viewOnly class="vt"></upload-img>
                            <upload-img v-model="info.identityBackImg" noTips viewOnly class="vt"></upload-img>
                        </FormItem>
                        <FormItem label="手持身份证照：" v-if="info.type === 11">
                            <upload-img v-model="info.identityHandImg" noTips viewOnly class="vt"></upload-img>
                        </FormItem>
                        <FormItem label="营业执照：" v-if="info.type === 12 || info.type === 23">
                            <upload-img v-model="info.businessLicenseImg" noTips viewOnly class="vt"></upload-img>
                        </FormItem>
                        <FormItem label="租赁协议：" v-if="info.type === 22">
                            <upload-img v-model="info.rentImg" noTips viewOnly class="vt"></upload-img>
                        </FormItem>
                        <FormItem label="商户信息表：" v-if="info.type === 11 || info.type === 12 || info.type === 23">
                            <upload-img v-model="info.merchantsInfoImg" noTips viewOnly class="vt"></upload-img>
                        </FormItem>
                    </i-col>
                </Row>
                <divide-line>结算账户信息</divide-line>
                <Row class="mt20">
                    <i-col span="12">
                        <FormItem label="结算人姓名：" v-if="(info.type === 23 || info.type === 12) && info.isLegal === 2 && info.accountType === 1">{{info.accountName}}</FormItem>
                        <FormItem label="结算人身份证号：" v-if="(info.type === 23 || info.type === 12) && info.isLegal === 2 && info.accountType === 1">{{info.identityCard}}</FormItem>
                        <FormItem label="结算人身份证有效期：" v-if="(info.type === 23 || info.type === 12) && info.isLegal === 2 && info.accountType === 1">{{info.identityEndTime}}</FormItem>
                        <FormItem label="开户名：">{{info.accountName}}</FormItem>
                        <FormItem label="开户支行：">{{info.bankBranchName}}</FormItem>
                        <FormItem label="联行号：">{{info.interBankNumber}}</FormItem>
                        <FormItem label="银行卡号：">{{info.bankFrontNumber}}</FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="开户许可证：" v-if="(info.type === 23 && info.accountType === 0) || (info.type === 12 && info.accountType === 0)">
                            <upload-img v-model="info.accountLicenceImg" noTips viewOnly class="vt"></upload-img>
                        </FormItem>
                        <FormItem label="银行卡正面：" v-if="(info.type === 12 && info.accountType === 1) || info.type === 11">
                            <upload-img v-model="info.bankFrontImg" noTips viewOnly class="vt"></upload-img>
                        </FormItem>
                        <FormItem label="授权结算书：" v-if="(info.type === 23 || info.type === 12) && info.isLegal === 2 && info.accountType === 1">
                            <upload-img v-model="info.authorizedSettlementImg" noTips viewOnly class="vt"></upload-img>
                        </FormItem>
                        <FormItem label="结算人身份证正反面：" v-if="(info.type === 23 || info.type === 12) && info.isLegal === 2 && info.accountType === 1">
                            <upload-img v-model="info.identityFrontImg" noTips viewOnly class="vt"></upload-img>
                            <upload-img v-model="info.identityBackImg" noTips viewOnly class="vt"></upload-img>
                        </FormItem>
                    </i-col>
                </Row>
            </Form>
            <Modal v-model="isShow" title="加机操作">
                <div slot="footer">
                    <Button type="text" size="large" @click="isShow = false">取消</Button>
                    <Button type="primary" size="large" @click="addPos">确定</Button>
                </div>
                <label>数量：
                    <InputNumber :min="1" :max="10" v-model="num" style="width: 300px;"></InputNumber>
                </label>
            </Modal>
        </Card>
        <Row class="pt30 pr30 pb30">
            <i-col span="24" align="right">
                <Button type="primary" size="large" v-if="status === 5" @click="isShow = true; num = null" class="w120">加机</Button>
                <Button type="primary" class="w120 mr20" size="large" v-if="status === 2 || status === 4" @click="editor">修改进件信息</Button>
                <Button type="error" size="large" v-if="status === 2 || status === 4" @click="del" class="w120">删除进件信息</Button>
                <!-- <Button type="primary" size="large" v-if="status === 0" @click="Auditing" class="w120">审核通过</Button>
                <Button type="primary" size="large" v-if="status === 0" @click="noAuditing" class="w120">审核不通过</Button> -->
            </i-col>
        </Row>
         <Modal v-model="Show" title="审核不用过的原因">
           <div slot="footer">
                    <Button type="text" size="large" @click="Show = false">取消</Button>
                    <Button type="primary" size="large" @click="through">确定</Button>
                </div>
                <label>
                    <Input v-model="content" style="width: 300px;"/>
                </label>
        </Modal>
    </div>
</template>

<script>
import { addPosApplyNum, delPosApply, findPosApplyDetail, aduitPosApply } from '@/api/entry'
import breadCrumb from '_c/breadCrumb/breadCrumb'
import { formatDate } from '@/libs/util'
import divideLine from '_c/divideLine/divide-line'
import UploadImg from '_c/uploadImg/uploadImg'

export default {
  components: {
    breadCrumb,
    divideLine,
    UploadImg
  },
  name: 'entry-details',
  data() {
    return {
      // 1、新大陆小微进件11 2、新大陆企业进件12 3、嘉联小微商户21 4、嘉联租赁合同22 5、嘉联法人商户23
      isShow: false,
      Show: false,
      status: null,
      num: null,
      type: 'info',
      text: '',
      posApplyId: null,
      color: [],
      info: {},
      title: '',
      // 审核不通过的原因
      content: ''
    }
  },
  created() {
    this.status = Number(this.$route.query.status)
    this.posApplyId = Number(this.$route.query.posApplyId)
    findPosApplyDetail({ posApplyId: this.posApplyId }).then(res => {
      this.info = res.data
      this._getImg()
      this._getType()
      this._getStatus()
    })
  },
  methods: {
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
    // 状态是审核不通过的时候跳转到编辑页
    editor() {
      this.$router.push({
        path: 'entryEditor',
        query: {
          status: this.status,
          posApplyId: this.posApplyId
        }
      })
    },
    // 审核
    Auditing() {
      aduitPosApply({ posApplyId: this.posApplyId, status: 3 }).then(res => {
        this.$router.push({ path: 'posList' })
      })
    },
    noAuditing() { this.Show = true },
    through() {
      aduitPosApply({ content: this.content, posApplyId: this.posApplyId, status: 0 }).then(res => {
        this.$router.push({ path: 'posList' })
      })
    },
    // 加机
    addPos() {
      // let params = {
      //   posApplyId: this.posApplyId,
      //   num: this.num,
      //   userId: this.$store.state.user.userId
      // }
      if (!this.num) {
        this.$Message.error('请填写加机数量！')
        return
      }
      if (this.num < 0) {
        this.$Message.error('不能为负数！')
        return
      }
      if (this.num > 10) {
        this.$Message.error('进件数量不能超过十台！')
        return
      }
      addPosApplyNum({ posApplyId: this.posApplyId,
        num: this.num,
        userId: this.$store.state.user.userId }).then(res => {
        this.info.posActivationNumber = Number(this.num) + Number(this.info.posActivationNumber)
        this.isShow = false
      })
    },
    _getImg() {
      // 协议照
      this.info.protocolImg = this.info.protocolImg.split(',').map(item => ({ url: item }))
      // 手持身份证照
      this.info.identityHandImg = this.info.identityHandImg.split(',').map(item => ({ url: item }))
      // 授权结算书
      this.info.authorizedSettlementImg = this.info.authorizedSettlementImg.split(',').map(item => ({ url: item }))
      // 租赁协议
      this.info.rentImg = this.info.rentImg.split(',').map(item => ({ url: item }))
      // 营业执照有效期
      this.info.licenseEndTime = formatDate(this.info.licenseEndTime, 'yyyy-MM-dd')
      // 法人身份证有效期
      this.info.identityEndTime = formatDate(this.info.identityEndTime, 'yyyy-MM-dd')
      // 门头照
      this.info.headImg = [{ url: this.info.headImg }]
      // 收银台照
      this.info.cashImg = [{ url: this.info.cashImg }]
      // 经营内容照
      this.info.contentImg = [{ url: this.info.contentImg }]
      // 开户许可证
      this.info.accountLicenceImg = [{ url: this.info.accountLicenceImg }]
      // 身份证正面照
      this.info.identityFrontImg = [{ url: this.info.identityFrontImg }]
      // 身份证背面照
      this.info.identityBackImg = [{ url: this.info.identityBackImg }]
      // 经营许可证
      this.info.businessLicenseImg = [{ url: this.info.businessLicenseImg }]
      // 商户信息表
      this.info.merchantsInfoImg = [{ url: this.info.merchantsInfoImg }]
      // 银行卡正面照
      this.info.bankFrontImg = [{ url: this.info.bankFrontImg }]
    },
    // 进件类型
    _getType() {
      if (this.info.type === 11) {
        this.title = '新大陆小微进件'
      } else if (this.info.type === 12) {
        this.title = '新大陆企业进件'
      } else if (this.info.type === 21) {
        this.title = '嘉联小微进件'
      } else if (this.info.type === 22) {
        this.title = '嘉联租赁合同'
      } else if (this.info.type === 23) {
        this.title = '嘉联法人商户'
      }
    },
    // 进件状态
    _getStatus() {
      if (this.status === 1 || this.status === 3) {
        this.type = 'info'
        if (this.status === 1) {
          this.text = '待审核'
          this.color = ['#1c4a89', '#b4d6fa', '#cbe4fe'] // 文字颜色、边框颜色、背景色
        } else {
          this.text = '审核通过进件中'
          this.color = ['#1c4a89', '#b4d6fa', '#cbe4fe']
        }
      } else if ([ 2, 4, 7, 8, 9 ].includes(this.status)) {
        this.type = 'error'
        if (this.status === 2) {
          this.text = '审核不通过'
          this.color = ['#841a56', '#f5c6cb', '#f8d7da']
        } else {
          this.text = '进件失败'
          this.color = ['#841a56', '#f5c6cb', '#f8d7da']
        }
      } else if (this.status === 5) {
        this.type = 'success'
        this.text = '进件成功'
        this.color = ['#446935', '#c3e6cb', '#d4edda']
      }
    }
  }
}
</script>
