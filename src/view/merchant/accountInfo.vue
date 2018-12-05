<template>
  <!-- <div>账号信息 {{ $route.params.id }}</div> -->
  <div v-if="accountStatus !== 1">
    <bread-crumb :data="[
      {path: '/merchantList', title: '商户管理'},
      {title: '添加账号信息'}
    ]"></bread-crumb>
    <Card>
      <p style="padding-bottom: 20px;">添加账号信息</p>

      <div class="wrapper">
        <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="100" class="form">
          <Row :gutter="10">
            <i-col span="12">
              <FormItem label="账号名" prop="merchantsName" required>
                <Input placeholder="请输入账号名" v-model="formItem.merchantsName"/>
              </FormItem>
            </i-col>
            <i-col span="12">
              <FormItem label="登录手机号" prop="mobile" required>
                <Row :gutter="10" style="margin-left:0;">
                  <i-col span="16">
                    <Input v-model="formItem.mobile" placeholder="请输入登录手机号" clearable inline />
                  </i-col>
                  <i-col span="8">
                    <Select v-model="formItem.personType" :label-in-value="true" >
                      <Option :value="1">老板</Option>
                      <Option :value="2">店员</Option>
                    </Select>
                  </i-col>
                </Row>
              </FormItem>
            </i-col>
            <i-col span="12">
              <FormItem label="选择业务员" prop="salesmanId">
                <Select v-model="formItem.salesmanId" clearable>
                  <Option v-for="item in salesManList" :key="item.id" :value="item.id">{{ item.partner_name }}</Option>
                </Select>
              </FormItem>
            </i-col>
          </Row>
        </Form>
      </div>
    </Card>
    <div class="button">
      <Button class="w120 btn-cancel" size="large" @click="cancel">取消</Button>
      <Button class="w120" size="large" type="primary" @click="handleSubmit" v-if="accountStatus !== 1">提交</Button>
    </div>
  </div>

  <div v-else>
    <bread-crumb :data="[
      {path: '/merchantList', title: '商户管理'},
      {title: '账号信息详情'}
    ]"></bread-crumb>
    <Card>
      <h3 slot="title">账号信息详情</h3>
      <Form :label-width="120">
        <formItem label="账号名">{{ formItem.accountName }}</formItem>
        <formItem label="账号角色">{{ formItem.accountRole }}</formItem>
        <!-- <formItem label="商户角色">{{ getRole }}</formItem> -->
        <formItem label="手机号">{{ formItem.mobile }}</formItem>
        <formItem label="绑定的城市合伙人" v-if="formItem.cityParent">{{ formItem.cityParent }}</formItem>
        <formItem label="绑定的合伙人" v-if="formItem.parent">{{ formItem.parent }}</formItem>
        <formItem label="绑定的业务员" v-if="formItem.sale">{{ formItem.sale }}</formItem>
      </Form>
    </Card>
    <div class="button">
      <Button class="w120 btn-cancel" size="large" @click="cancel">返回</Button>
    </div>
  </div>
</template>

<script>
import breadCrumb from '_c/breadCrumb/breadCrumb'
import { loginBsinessByCity, merchantSignUpDetail, findNameByRole } from '@/api/user'
import { getIndustryAndLegal } from '@/api/merchant'

export default {
  name: 'accountInfo',
  data() {
    return {
      accountStatus: 0, // 1 已添加则不可编辑
      formItem: {
        merchantsId: '', // 商户ID
        merchantsName: '', // 商户注册名
        mobile: '', // 手机号
        personType: 1, // 商户人员 1 老板 2 店员
        salesmanId: '', // 业务员ID
        cityPartnerId: this.$store.state.user.userId // 当前登录人的 userId
      },
      ruleValidate: {
        merchantsName: [{ required: true, message: '账号名不能为空', trigger: 'blur' }],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/, message: '请填写合法手机号', trigger: 'blur' }
        ],
        salesmanId: [{ required: true, type: 'number', message: '业务员不能为空', trigger: 'change' }]
      },
      salesManList: []
    }
  },

  created() {
    let merchant = this.$store.state.merchant.merchant
    if (!merchant) {
      this.$router.push({ name: 'merchantList' })
      return
    }
    let { accountStatus, id, name } = merchant
    this.formItem.merchantsId = id
    this.accountStatus = accountStatus
    this.formItem.merchantsName = name

    if (accountStatus === 1) { // 已添加
      this._getAccountInfoDetail()
    } else {
      this._getLegalmanMobile() // 拉取法人电话
      this._getSalesManList()
    }
  },

  computed: {
    getRole() { // 1城市合伙人 2渠道合伙人 3业务员 4商户 5运营商 6供应商 7体验店 8自主供应商 9总公司 10普通消费者 11分公司
      let role = this.formItem.isSupplier
      if (role === 1) {
        return '城市合伙人'
      } else if (role === 2) {
        return '渠道合伙人'
      } else if (role === 3) {
        return '业务员'
      } else if (role === 4) {
        return '商户'
      } else if (role === 5) {
        return '运营商'
      } else if (role === 6) {
        return '供应商'
      } else if (role === 7) {
        return '体验店'
      } else if (role === 8) {
        return '自主供应商'
      } else if (role === 9) {
        return '总公司'
      } else if (role === 10) {
        return '普通消费者'
      } else if (role === 11) {
        return '分公司'
      }
    },
    curRole() {
      let role = this.$store.state.user.access[0]
      if (role === 'SXR001') { // 城市合伙人
        return 1
      } else if (role === 'SXR002') { // 渠道合伙人
        return 2
      } else if (role === 'SXR003') { // 业务员
        return 3
      }
    }
  },

  methods: {
    cancel() {
      this.$router.go(-1)
    },
    handleSubmit() {
      this.$refs['formValidate'].validate(valid => {
        if (valid) {
          this.$Modal.confirm({
            title: '确认保存',
            content: '<p>确定要提交吗？</p><br/><p style="color:red">提交后无法更改。</p>',
            onOk: () => {
              this._submit()
            }
          })
        } else {
          this.$Message.error('请检查表单填写!')
        }
      })
    },

    // 获取城市合伙人下的 业务员列表
    _getSalesManList() {
      findNameByRole({ // 查询合伙人吓的业务员
        roleId: 3,
        parentId: this.$store.state.user.userId,
        parentRoleId: 1
      }).then(res => {
        this.salesManList = res.data
      })
    },

    _submit() {
      // 提交表单
      loginBsinessByCity(this.formItem).then(res => {
        console.log(res)
        this.$Message.success('提交成功')
        this.$router.push({ name: 'merchantList' })
      }).catch(err => console.log(err))
    },
    _getAccountInfoDetail() {
      merchantSignUpDetail({ merchantsId: this.formItem.merchantsId }).then(res => {
        this.formItem = res.data
      })
    },
    _getLegalmanMobile() {
      getIndustryAndLegal(this.formItem.merchantsId).then(res => {
        let legalPerson = res.data.legalPerson
        if (legalPerson) {
          this.formItem.mobile = legalPerson.mobile
        }
      })
    }
  },

  components: {
    breadCrumb
  }
}
</script>

<style lang="less" scoped>
.button {
  margin: 30px 30px 0;
  display: flex;
  justify-content: space-between;
}
</style>
