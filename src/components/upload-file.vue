<style lang="less">
</style>
<template>
    <div class="upload-common">
      <div class="flex vertical">
        <div class="align">{{titleName}} {{titleName?': &nbsp;':''}}</div>
        <div class="abs">
          <Button type="ghost" icon="ios-cloud-upload" class="margin-bottom-10" @click="uploadCardImg1">{{buttonName}}</Button>
          <input type="file" class="display-none" :id="id" @change="uploadImage1" accept="image/gif, image/jpeg, image/jpg, image/bmp, image/svg, image/png" />
        </div>
      </div>
      <div class="flex">
          <div class="align visibi"></div>
          <Card class="h_container">
              <Spin fix v-show="isShowLoading">
                  <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
                  <div>上传中...</div>
              </Spin>
              <img class="pic_wrapper" v-show="childValue" :src="childValue">
              <div class="demo-upload-list-cover" v-if="childValue">
                  <Icon type="ios-trash-outline" @click.native="removeImg"></Icon>
              </div>
          </Card>
      </div>
    </div>
</template>
<script>
export default {
  name: 'upload',
  props: ['buttonName', 'childName', 'titleName', 'id'],
  data() {
    return {
      childValue: '',
      isShowLoading: false
    }
  },
  methods: {
    removeImg() {
      this.childValue = ''
      this.$emit(this.childName, this.childValue)
    },
    uploadCardImg1() {
      document.getElementById(this.id).click()
    },
    uploadImage1(event) {
      let that = this
      let file = event.target.files[0]
      this.isShowLoading = true
      event.preventDefault()
      if (file) {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function() {
          var data = this.result
          if (data.lastIndexOf('data:base64') !== -1) {
            data = data.replace('data:base64', 'data:image/jpeg;base64')
          } else if (data.lastIndexOf('data:,') !== -1) {
            data = data.replace('data:,', 'data:image/jpeg;base64,')
          }
          that
            .ajax({
              method: 'POST',
              url: that.uploadImgUrl + '/fileUpload',
              data: { base64Data: data },
              transformRequest: [
                function(data) {
                  let ret = ''
                  for (let it in data) {
                    ret +=
                      encodeURIComponent(it) +
                      '=' +
                      encodeURIComponent(data[it]) +
                      '&'
                  }
                  return ret
                }
              ],
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(function(res) {
              event.target.value = null
              that.isShowLoading = false
              that.childValue = 'http://img.sxwvc.com/' + res.data.data
              that.$emit(that.childName, that.childValue)
            })
            /* eslint-disable */
            .catch(function (err) {
              that.$Notice.warning({
                title: '操作结果',
                desc: '图片上传失败',
                duration: 3
              })
            })
        }
      }
    }
  }
}
</script>
