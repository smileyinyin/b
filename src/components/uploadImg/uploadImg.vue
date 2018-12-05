<template>
  <div style="display:inline-block;vertical-align:middle;">
    <div v-if="!noTips && !viewOnly" style="color:#d6d6d6">每张照片建议大小为<span style="color: red;">500KB</span>，格式可以为PNG、JPG、JPEG</div>
    <div class="demo-upload-list" v-for="(item, index) in value" :key="index">
        <div v-if="item.url">
            <img :src="item.url" v-preview>
            <div class="demo-upload-list-cover" v-if="!viewOnly" @click="handleRemove(index)">
                <!-- <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon> -->
                <Icon type="ios-trash-outline"></Icon>
            </div>
        </div>
        <!-- <div v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </div> -->
    </div>

    <Upload v-if="!viewOnly && value.length < needImg"
        ref="upload"
        :on-success="handleSuccess"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        :format="['jpg','jpeg','png','webp']"
        :show-upload-list="false"
        :max-size="500"
        multiple
        type="drag"
        action="//upload.qiniup.com/"
        :data="{token: token}"
        style="display: inline-block;width:100px;vertical-align:middle;">
        <div style="width: 100px;height:100px;">
            <Icon type="plus" size="20" style="margin-top: 26px;"></Icon>
            <p >{{ title }}</p>
        </div>
    </Upload>
    <!-- <Modal title="View Image" v-model="visible">
        <img :src="imgUrl" v-if="visible" style="width: 100%">
    </Modal> -->
  </div>
</template>

<script>
import { simpleUpload } from '@/api/upload'

if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value: function(callback, type, quality) {
      var binStr = atob(this.toDataURL(type, quality).split(',')[1])
      var len = binStr.length
      var arr = new Uint8Array(len)

      for (var i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i)
      }

      callback(new Blob([arr], { type: type || 'image/png' }))
    }
  })
}

const blobToFile = (theBlob, fileName) => {
  // A Blob() is almost a File() - it's just missing the two properties below which we will add
  theBlob.lastModifiedDate = new Date()
  theBlob.name = fileName
  return new File([theBlob], fileName)
}

export default {
  name: 'uploadImg',
  props: {
    value: {
      type: Array,
      default: function() {
        return []
      }
    },
    title: {
      type: String,
      default: '上传图片'
    },
    needImg: {
      type: Number,
      default: 1
    },
    noTips: {
      type: Boolean,
      default: false
    },
    viewOnly: {
      type: Boolean,
      required: false
    }
  },
  data() {
    // 缩放图片需要的canvas
    var canvas = document.createElement('canvas')
    var context = canvas.getContext('2d')
    return {
      token: '',
      // visible: false,
      reader: null,
      img: null,
      canvas: canvas,
      context: context,
      fileType: null
    }
  },
  methods: {
    // handleView(imgUrl) {
    //   this.imgUrl = imgUrl
    //   this.visible = true
    // },
    handleRemove(index) {
      this.$emit('input', this.value.filter((v, i) => i !== index))
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件类型不正确',
        desc: '文件 ' + file.name + ' 的类型不正确, 请选择 jpg 或 png 的文件。'
      })
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '文件超出允许的大小',
        desc: '文件  ' + file.name + ' 太大了, 不建议超过 500KB 哦。'
      })
    },
    handleBeforeUpload(file) {
      // debugger
      // 选择的文件是图片
      this.file = file
      this.fileType = file.type
      return new Promise((resolve, reject) => {
        return this.handleReader(file).then(blob => {
          return simpleUpload().then(res => {
            this.token = res.data
            let theFile = !blob ? file : blobToFile(blob, this.file.name)
            // debugger
            resolve(theFile)
          })
        })
      })
    },
    handleSuccess(res, file) {
      // let url = 'http://pa4v40i17.bkt.clouddn.com/'
      let url = 'http://img.sxwhome.com/'
      let imgUrl = url + res.key

      this.$emit('input', this.value.concat([{ name: file.name, url: imgUrl }]))
      // this.uploadList.push({
      //   status: 'finish',
      //   url: this.imgUrl,
      //   name: file.name
      // })
      // if (this.needImg === 1) {
      //   this.$emit(this.name, this.uploadList[0].url)
      // } else {
      //   this.$emit(this.name, this.uploadList)
      // }
    },
    handleReader(file) {
      return new Promise((resolve, reject) => {
        let that = this
        this.reader = new FileReader()
        this.img = new Image()
        this.img.onload = function() {
          // 图片原始尺寸
          var originWidth = this.width
          var originHeight = this.height
          // 最大尺寸限制
          var maxWidth = 600
          var maxHeight = 600
          // 目标尺寸
          var targetWidth = originWidth
          var targetHeight = originHeight
          // 图片尺寸超过400x400的限制
          if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > maxWidth / maxHeight) {
              // 更宽，按照宽度限定尺寸
              targetWidth = maxWidth
              targetHeight = Math.round(maxWidth * (originHeight / originWidth))
            } else {
              targetHeight = maxHeight
              targetWidth = Math.round(maxHeight * (originWidth / originHeight))
            }
          }
          // canvas对图片进行缩放
          that.canvas.width = targetWidth
          that.canvas.height = targetHeight
          // 清除画布
          that.context.clearRect(0, 0, targetWidth, targetHeight)
          // 图片压缩
          that.context.drawImage(that.img, 0, 0, targetWidth, targetHeight)
          // canvas转为blob并上传
          that.canvas.toBlob(function(blob) {
            // debugger
            resolve(blob)
          }, that.fileType || 'image/png')
        }
        // 文件base64化，以便获知图片原始尺寸
        this.reader.onload = function(e) {
          that.img.src = e.target.result
        }
        if (file.type.indexOf('image') === 0) {
        //   this.reader.readAsDataURL(file)
        // } else {
          resolve()
        }
      })
    }
  }
}
</script>

<style scoped>
.demo-upload-list {
  display: inline-block;
  vertical-align: middle;
  width: 102px;
  height: 102px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}

.demo-upload-list img {
  width: 102px;
  height: 102px;
}

.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  /* bottom: 0;
  left: 0; */
  right: 0;
  width: 26px;
  height: 26px;
  border-bottom-left-radius: 26px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.6);
}

.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}

.demo-upload-list-cover i {
  position: absolute;
  transform: translate3d(-25%, 0, 0);
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  /* margin: 0 6px;
  line-height: 100px;
  padding: 0 10px; */
}
</style>
