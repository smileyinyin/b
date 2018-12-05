
<template>
    <div class="settle height-100">
        <Card >
            <p slot="title" style="font-size:20px">
                查看商品
            </p>
                   <div style="width:100%; display: flex;
    justify-content: space-around">
                 <div class="contont" style="width:50%;margin-left:20px">
              <div >商品名称: <span>{{params.name}}</span></div>
              <div style="margin-top:20px">一级分类:
                <span>{{params.category}}</span>
                </div>
                     <div  style="margin-top:20px">商家认证:
                       <span>{{params.certification_body}}</span>
                     </div>
              <div  style="margin-top:20px">商品描述:
                <span>{{params.describe}}</span>
               </div>
            </div>
              <div style="width:50%">
                      <div >
                    商品封面图:
                    <div>
                      <span v-for="(item, index) in goods_imgList" :key="index"><img :src="item" alt="" width="200" height="150" @click="imgShow(goods_imgList)"> </span>
                    </div>
                 </div>
                 <br>
                  <div >
                   商品相册图:
                        <div>
                  <span v-for="(item, index) in goods_thumb_xiang_ceList" :key="index"><img :src="item" alt="" width="200" height="150" @click="imgShow(goods_thumb_xiang_ceList)"> </span>
                    </div>
                 </div>
                 <br>
                  <div >
                    商品详情图:
                       <div>
                  <span v-for="(item, index) in goods_thumb_xiang_qingList" :key="index"><img :src="item" alt="" width="200" height="150" @click="imgShow(goods_thumb_xiang_qingList)"> </span>
                    </div>
                 </div>
              </div>
            </div>
                 <br>
               <divide-line>商品基础信息</divide-line>
                <br>
                <Form :label-width="80" v-for="(item, index) in params.submitSkuAudits" :key="index" style="display: inline-block;">
                  <FormItem label="规格:">
                    {{ item.name }}
                  </FormItem>
                  <FormItem label="供应价:">
                    {{ item.supply_price }}
                  </FormItem>
                  <FormItem label="规格图:">
                    <img :src="item.goods_sku_img" alt="" width="200" height="150" @click="imgShow(item.goods_sku_img)">
                  </FormItem>
                  <FormItem label="库存:">
                    {{ item.store_number }}
                  </FormItem>
                  <!-- <FormItem label="是否启用:">
                    {{ getStatus(item.is_flag) }}
                  </FormItem> -->
                </Form>

            </Card>
            <Modal title="图片预览" v-model="isShowBigImg">
                <img :src="bigImg" style="width: 100%">
            </Modal>
    </div>
</template>
<script>

import {findAudit} from '@/api/good'
import divideLine from '_c/divideLine/divide-line'
// findAudit
export default {
  name: 'settle',
  components: {
    divideLine
  },
  data() {
    return {
      id: null,
      modal: false,
      modal1: false,
      isShow: false,
      isShowBigImg: false,
      bigImg: '',
      reason: '',
      params: {},
      goods_imgList: [], // 封面图列表
      goods_thumb_xiang_ceList: [], // 相册图列表
      goods_thumb_xiang_qingList: [] // 详情图列表
    }
  },
  created() {
    this.id = this.$route.query.id
    findAudit({id: this.id, is_flag: 0}).then(res => {
      let data = res.data
      this.params = data

      // 封面图
      this.goods_imgList = data.goods_img.split(',').filter(v => v)
      if (data.submitAlbumAudit.img) { // 相册 和 详情在 img 字段，由 & 分割
        let imgArr = data.submitAlbumAudit.img.split('&')
        // 相册
        this.goods_thumb_xiang_ceList = imgArr[0].split(',').filter(v => v)
        // 详情
        this.goods_thumb_xiang_qingList = imgArr[1].split(',').filter(v => v)
      }
    })
  },

  methods: {
    // getStatus(is_flag) {
    //   if (is_flag === 0) {
    //     return '已启用'
    //   } else if (is_flag === 1) {
    //     return '已禁用'
    //   }
    // },
    imgShow(img) {
      this.isShowBigImg = true
      this.bigImg = img
    }

  }
}
</script>
