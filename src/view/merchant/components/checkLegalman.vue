<template>
  <div class="wrapper">
    <Form :label-width="100" class="form" label-position="left">
      <div class="left">
        <FormItem label="法人名称">{{ info.name }}</FormItem>
        <FormItem label="法人身份证号">{{ info.identityCard }}</FormItem>
        <FormItem label="身份证有效期">{{ cardGoodTime }}</FormItem>
        <FormItem label="法人邮箱">{{ info.email }}</FormItem>
        <FormItem label="法人联系电话">{{ info.mobile }}</FormItem>
      </div>
      <div class="right">
        <FormItem label="法人身份证">
          <upload-img viewOnly v-model="fontImg"></upload-img>
          <upload-img viewOnly v-model="backImg"></upload-img>
          <!-- <img :src="info.identityFrontImg" alt="身份证正面" width="200" height="200">
          <img :src="info.identityBackImg" alt="身份证反面" width="200" height="200"> -->
        </FormItem>
        <FormItem label="手持身份证" v-if="info.identityHandImg">
          <upload-img viewOnly v-model="handImg"></upload-img>
        </FormItem>
      </div>
    </Form>
  </div>
</template>

<script>
import uploadImg from '_c/uploadImg/uploadImg'
import { formatDate } from '@/libs/util'

export default {
  name: 'checkLegalman',
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  computed: {
    handImg() {
      return this.info.identityHandImg ? this.info.identityHandImg.split(',').map(v => ({url: v})) : []
    },
    fontImg() {
      return [{url: this.info.identityFrontImg}]
    },
    backImg() {
      return [{url: this.info.identityBackImg}]
    },
    cardGoodTime() {
      return `${formatDate(new Date(this.info.identityEndDate), 'yyyy/MM/dd')}`
    }
  },
  components: {
    uploadImg
  }
}
</script>
