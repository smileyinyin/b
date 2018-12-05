<template>
  <div>
    <bread-crumb :data="[
      {path: '/channelParList', title: '渠道合伙人管理'},
      {title: title}
    ]"></bread-crumb>

    <Card>
      <Form :label-width="120">
        <Row :gutter="20">
          <i-col span="12">
            <formItem label="渠道合伙人名称">{{ salesMan.partner_name }}</formItem>
            <formItem label="联系人">{{ salesMan.name }}</formItem>
            <formItem label="手机号">{{ salesMan.mobile }}</formItem>
            <formItem label="联系地址">
              {{ salesMan.address }}
            </formItem>
            <formItem label="身份证号">{{ salesMan.identity_card }}</formItem>
            <formItem label="开户名">{{ salesMan.account_name }}</formItem>
            <formItem label="开户总行">{{ salesMan.bank_name }}</formItem>
            <formItem label="开户支行">{{ salesMan.bank_branch_name }}</formItem>
            <formItem label="银行卡号">{{ salesMan.bank_front_number }}</formItem>
          </i-col>
          <i-col span="12">
            <!-- <formItem label="允许提现">
              {{ salesMan.settleType === 2 ? '允许提现' : '不允许提现' }}
            </formItem>
            <formItem label="POS分润比例">
              {{ salesMan.posRate }}
            </formItem>
            <formItem label="商户商品分润比例">
              {{ salesMan.goodsRate }}
            </formItem> -->
            <!-- <formItem label="供应链商品分润比例">
              {{ salesMan.name }}
            </formItem> -->
            <formItem label="添加时间">
              {{ formatCreateTime }}
            </formItem>
            <!-- <formItem label="更新时间">
              {{ formatUpdateTime }}
            </formItem> -->
            <formItem label="身份证照">
              <upload-img v-if="frontImg" viewOnly v-model="frontImg"></upload-img>
              <upload-img v-if="backImg" viewOnly v-model="backImg"></upload-img>
            </formItem>
            <formItem label="银行卡正面图">
              <upload-img v-if="bankFrontImg" viewOnly v-model="bankFrontImg"></upload-img>
            </formItem>
          </i-col>
        </Row>
      </Form>
    </Card>
    <!-- <Row type="flex" justify="end" class="mt30 mr30">
      <Button v-if="salesMan.status === 3" type="primary" style="width:200px" @click="active(2)">启用</Button>
      <Button v-else-if="salesMan.status === 2" type="primary" style="width:200px" @click="active(3)">禁用</Button>
      <template v-else-if="salesMan.status === 1">
        <Button type="success" class="w120 mr20" @click="active(2)">审核通过</Button>
        <Button type="error" class="w120" @click="active(4)">审核不通过</Button>
      </template>
      <template v-else-if="salesMan.status === 4">
        <Button type="info" class="w120" @click="update">修改合伙人信息</Button>
        <Button type="error" style="width:200px" @click="del">删除合伙人信息</Button>
      </template>
    </Row> -->
  </div>
</template>

<script>
import breadCrumb from '_c/breadCrumb/breadCrumb'
import uploadImg from '_c/uploadImg/uploadImg'
// import { getSalesManInfo, activeSalesMan } from '@/api/salesMan'
import { getSalesManInfo } from '@/api/salesMan'
import { formatDate } from '@/libs/util'

export default {
  name: 'channelParCheck',
  data() {
    return {
      salesMan: {
        id: '',
        name: '',
        mobile: '',
        address: '',
        posRate: '',
        goodsRate: '',
        settleType: 2,
        status: 0,
        createTime: '',
        updatTime: '',

        account_name: '',
        bank_branch_name: '',
        bank_front_number: '',
        bank_name: '',
        bank_front_img: '',
        identity_back_img: '',
        identity_front_img: '',
        identity_card: ''
      }
    }
  },
  created() {
    let id = this.$route.query.id
    this.salesMan.id = id
    this._getInfo(id)
  },
  computed: {
    bankFrontImg() {
      if (this.salesMan.bank_front_img) {
        return [{ url: this.salesMan.bank_front_img }]
      }
      return null
    },
    frontImg() {
      if (this.salesMan.identity_front_img) {
        return [{ url: this.salesMan.identity_front_img }]
      }
      return null
    },
    backImg() {
      if (this.salesMan.identity_back_img) {
        return [{ url: this.salesMan.identity_back_img }]
      }
      return null
    },
    title() {
      let status = this.salesMan.status
      if (status === 1) {
        return '渠道合伙人审核'
      } else {
        return '渠道合伙人详情'
      }
    },
    formatCreateTime() {
      if (!this.salesMan.createTime) {
        return ''
      }
      return formatDate(new Date(this.salesMan.createTime), 'yyyy年MM月dd日 hh:mm:ss')
    },
    formatUpdateTime() {
      if (!this.salesMan.updatTime) {
        return ''
      }
      return formatDate(new Date(this.salesMan.updatTime), 'yyyy年MM月dd日 hh:mm:ss')
    }
  },
  methods: {
    // active(status) {
    //   activeSalesMan({ status, id: this.salesMan.id }).then(res => this.$router.push({ name: 'channelParList' }))
    // },
    // update() {
    //   this.$router.push({ name: 'channelParAdd', query: { id: this.salesMan.id } })
    // },
    // del() {},
    _getInfo(id) {
      getSalesManInfo({ id }).then(res => {
        this.salesMan = res.data
      })
    }
  },
  components: { breadCrumb, uploadImg }
}
</script>
