<template>
  <div class="wrapper">
    <Form :label-width="100" class="form" label-position="left">
      <div class="left">
        <FormItem label="营业执照名称">{{ info.businessName }}</FormItem>
        <FormItem label="营业执照号">{{ info.businessNumber }}</FormItem>
        <FormItem label="执照有效期">{{ goodTime }}</FormItem>
      </div>
      <div class="right">
        <FormItem label="营业执照">
          <upload-img v-if="info.businessLicenseImg" v-model="licenseImg" viewOnly></upload-img>
          <span v-else>无</span>
        </FormItem>
      </div>
    </Form>
  </div>
</template>

<script>
import uploadImg from '_c/uploadImg/uploadImg'
import { formatDate } from '@/libs/util'

export default {
  name: 'checkIndustry',
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  computed: {
    goodTime() {
      return `${formatDate(new Date(this.info.licenseEndTime), 'yyyy/MM/dd')}`
    },
    establishTime() {
      return formatDate(new Date(this.info.establishTime), 'yyyy.MM.dd')
    },
    licenseImg() {
      return [{url: this.info.businessLicenseImg}]
    }
  },
  components: {uploadImg}
}
</script>
