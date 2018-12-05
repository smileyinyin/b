<template>
  <Row>
    <Form :label-width="100" class="form" label-position="left" style="padding-bottom: 40px">
      <Col span="12">
        <FormItem label="商户名">{{ baseInfo.name }}</FormItem>
        <!-- <FormItem label="商户角色">{{ getRole }}</FormItem> -->
        <FormItem label="扫码小票">{{ baseInfo.alias }}</FormItem>
        <FormItem label="商户类型">{{ baseInfo.mold === 0 ? '个体' : '连锁店' }}</FormItem>
        <FormItem label="行业类别">{{ baseInfo.mcc }}</FormItem>
        <FormItem label="经营类型">{{ baseInfo.categoryName || categoryName }}</FormItem>
        <FormItem label="商家地址">{{ baseInfo.province + baseInfo.city + baseInfo.district + baseInfo.adressDetail }}</FormItem>
        <FormItem label="商家简介">{{ baseInfo.briefIntroduction }}</FormItem>
        <FormItem label="商家详情">{{ baseInfo.detail }}</FormItem>
        <FormItem label="商家服务">{{ baseInfo.service }}</FormItem>
        <FormItem label="门店LOGO">
          <img v-if="baseInfo.logoImg" :src="baseInfo.logoImg" alt="门店LOGO" width="100px" height="100px" v-preview>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="经纬度">
          <b-map v-if="baseInfo.longitude" :initPoint='{lng: baseInfo.longitude, lat: baseInfo.latitude}' :isAlert="false" :width="380" :height="230"></b-map>
          <span v-else>无</span>
        </FormItem>
         <FormItem label="门头照" >
            <img v-if="baseInfo.headImg" :src="baseInfo.headImg" alt="门头照" width="100px" height="100px" v-preview>
        </FormItem>
        <FormItem label="收银台照" >
          <img v-if="baseInfo.cashImg" :src="baseInfo.cashImg" alt="收银台照" width="100px" height="100px" v-preview>
        </FormItem>
        <FormItem label="经营内容照">
          <upload-img v-if="baseInfo.operationImg" v-model="operationImg" viewOnly></upload-img>
          <span v-else>无</span>
        </FormItem>
      </Col>
    </Form>
  </Row>
</template>

<script>
import uploadImg from '_c/uploadImg/uploadImg'
import bMap from '_c/b-map'

export default {
  name: 'checkBaseinfo',
  props: {
    baseInfo: {
      type: Object,
      required: true
    },
    categoryName: {
      type: String
    }
  },
  computed: {
    operationImg() {
      return [{url: this.baseInfo.operationImg}]
    },
    getRole() { // 1城市合伙人 2渠道合伙人 3业务员 4商户 5运营商 6供应商 7体验店 8自主供应商 9总公司 10普通消费者 11分公司
      let role = this.baseInfo.isSupplier
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
    }
  },
  components: {bMap, uploadImg}
}
</script>
