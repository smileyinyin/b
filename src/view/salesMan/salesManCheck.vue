<template>
  <div>
    <bread-crumb :data="[
      {path: '/salesManList', title: '业务员管理'},
      {title: title}
    ]"></bread-crumb>

    <Card>
      <Form :label-width="120">
        <!-- <formItem label="用户名">{{ salesMan.name }}</formItem> -->
        <formItem label="手机号">{{ salesMan.mobile }}</formItem>
        <formItem label="业务员名称">{{ salesMan.partner_name }}</formItem>
        <!-- <formItem label="联系地址">{{ salesMan.address }}</formItem> -->
        <!-- <formItem label="允许提现">
          {{ salesMan.settleType === 2 ? '允许提现' : '不允许提现' }}
        </formItem> -->
        <formItem label="POS分润比例">{{ salesMan.posRate }}</formItem>
        <!-- <formItem label="商户商品分润比例">{{ salesMan.goodsRate }}</formItem> -->
        <!-- <formItem label="供应链商品分润比例">
          {{ salesMan.name }}
        </formItem> -->
        <formItem label="添加时间">{{ formatCreateTime }}</formItem>
        <formItem label="更新时间">{{ formatUpdateTime }}</formItem>
      </Form>
    </Card>
    <!-- <Row type="flex" justify="end" class="mt30 mr30">
      <Button v-if="salesMan.status === 3" type="success" class="w120 mr20" @click="active(2)">启 用</Button>
      <Button v-else-if="salesMan.status === 2" type="error" class="w120" @click="active(3)">禁 用</Button>
      <template v-else-if="salesMan.status === 1">
        <Button type="success" class="w120 mr20" @click="active(2)">审核通过</Button>
        <Button type="error" class="w120" @click="active(4)">审核不通过</Button>
      </template>
      <template v-else-if="salesMan.status === 4">
        <Button type="primary" class="w120" @click="update">修改业务员信息</Button>
        <Button type="error" style="width:200px" @click="del">删除合伙人信息</Button>
      </template>
    </Row> -->
  </div>
</template>

<script>
import breadCrumb from '_c/breadCrumb/breadCrumb'
import { getSalesManInfo, activeSalesMan } from '@/api/salesMan'
import { formatDate } from '@/libs/util'

export default {
  name: 'salesManCheck',
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
        status: 1,
        createTime: '',
        updatTime: ''
      }
    }
  },
  created() {
    let id = this.$route.query.id
    this.salesMan.id = id
    this._getInfo(id)
  },
  computed: {
    title() {
      let status = this.salesMan.status
      if (status === 1) {
        return '业务员审核'
      } else {
        return '业务员详情'
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
    active(status) {
      activeSalesMan({ status, id: this.salesMan.id }).then(res => this.$router.push({ name: 'salesManList' }))
    },
    update() {
      this.$router.push({ name: 'salesManAdd', query: { id: this.salesMan.id } })
    },
    del() {},
    _getInfo(id) {
      getSalesManInfo({ id }).then(res => {
        this.salesMan = res.data
      })
    }
  },
  components: { breadCrumb }
}
</script>
