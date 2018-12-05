
<template>
    <div class="settle height-100">
       <bread-crumb :data="[
      { title: '商品管理'},
      {title: '修改商品(审核不通过)'}
    ]"></bread-crumb>
        <Card >

            <br>
            <div  style="height:100px;width:800px;border:1px solid lightgray">审核不通过的原因:{{datas.reason}}</div>
            <br>
  <div style="width:100%; display: flex;
    justify-content: space-around">
                 <div class="contont" style="width:50%;margin-left:20px">

                  <div  >商品名称:<Input  placeholder="请输入商品名称" style="width: 300px;" v-model="datas.name" disabled></Input></div>
              <div style="margin-top:20px">一级分类:
                <Select name="" id="" style="width:300px" v-model="submitGoodsAudit.category">
                  <Option v-for="(item, index) in categoryList" :key="index" :value="item.name">{{item.name}}</Option>
                </Select>
                     </div>
                     <div  style="margin-top:20px">商家认证:
                       <Select name="" id="" style="width:300px" v-model=" submitGoodsAudit.certification_body">
                     <Option v-for="(item, index) in certification_bodyList" :key="index" :value="item.auth_name">{{item.auth_name}}</Option>
                     </Select>
                     </div>
              <div  style="margin-top:20px">商品描述:<Input  type="textarea" :rows="4" style="width: 300px" v-model=" datas.describe"></Input></div>
            </div>
              <div style="width:50%">
                <div >

                    <span style="float:left"> 商品封面图:</span>
                      <upload-img title="商品封面图" v-model="goodFaceList" :needImg="3"></upload-img>
                 </div>
                 <br>
                  <div>
                   <span style="float:left">商品相册图:</span>
                     <upload-img title="商品相册图" v-model="goodPhotoList" :needImg="8"></upload-img>
                 </div>
                 <br>
                  <div >

                      <span style="float:left">商品详情图:</span>
                    <upload-img title="商品详情图" v-model="goodXqList" :needImg="40"></upload-img>
                 </div>
                    <!-- <div >

                    <span style="float:left"> 商品封面图:</span>
                      <upload-img title="商品封面图" v-model="goods_imgddList" :needImg="3"></upload-img>
                 </div>
                 <br>
                  <div>
                   <span style="float:left">商品相册图:</span>
                     <upload-img title="商品相册图" v-model="goods_thumb_xiang_ceList" :needImg="8"></upload-img>
                 </div>
                 <br>
                  <div >

                      <span style="float:left">商品详情图:</span>
                    <upload-img title="商品详情图" v-model="goods_thumb_xiang_qingList" :needImg="40"></upload-img>
                 </div> -->
              </div>
            </div>
                 <br>
              <divide-line>商品基础信息</divide-line>
                <br>
                <div style="overflow:hidden;padding-top:5px;padding-bottom:5px">
                        <Form :label-width="80" v-for="(item, index) in submitGoodsAudit.submitSkuAudits" :key="index" style="float:left">
                            <FormItem label="规格:">
                               <InputNumber type="text" placeholder="请输入规格" style="width: 200px" v-model="item.name"></InputNumber>
                            </FormItem>
                            <FormItem label="供应价:">
                               <InputNumber type="text" :min="0.01"  placeholder="请输入供应价" style="width: 200px" v-model="item.supply_price"></InputNumber>
                            </FormItem>

                            <FormItem label="规格图:">
                                <upload-img v-model="list[index]"></upload-img>
                            </FormItem>

                            <FormItem label="库存:">
                                <Input type="text" :min="0.01" placeholder="请输入库存" style="width: 200px" v-model="item.store_number"></Input>
                            </FormItem>
                            <!-- <FormItem label="是否启用:">
                               <Select name="" id="" style="width:200px">
                                   <Option :value="5">启用</Option>
                                   <Option :value="6">停用</Option>
                               </Select>
                            </FormItem> -->
                     </Form>
                     <div class="addgoods" @click="addgoods" style="cursor:pointer;float:left">
                         +添加规格
                     </div>

                </div>

                <br>

                 <Modal

                   v-model="modal"
                   title="确认提示"
                   @on-ok="ok"
                   @on-cancel="cancel">
                  <p style="font-size:20px">确认修改完成?</p>
                  <p style="font-size:16px;color:#ADADAD">确认会将商品信息提交给上下网进行审核</p>
               </Modal>
               <Modal

                   v-model="modal1"
                   title="确认提示"
                   @on-ok="ok1"
                   @on-cancel="cancel1">
                  <p style="font-size:20px">确认删除?</p>
                  <p style="font-size:16px;color:#ADADAD">确认会将商品删除</p>
               </Modal>
            </Card>
             <div style="width:100%">
                    <Button type="primary"  style="width:120px;float:left;margin-top:30px;margin-left:30px" @click="modal=true">修改完成</Button>
                    <Button type="primary"  style="width:120px;float:right;margin-top:30px;margin-right:30px" @click="modal1=true">删除商品</Button>
                </div>
    </div>
</template>
<script>
import UploadImg from '_c/uploadImg/uploadImg'
import { getSxoIndustryInfo, getSxoGoodsAuth } from '@/api/common'
import {findAudit, updateAudit} from '@/api/good'
import breadCrumb from '_c/breadCrumb/breadCrumb'
import divideLine from '_c/divideLine/divide-line'
export default {
  name: 'settle',
  components: {
    UploadImg,
    breadCrumb,
    divideLine
  },
  data() {
    return {
      modal: false,
      modal1: false,
      id: null,
      datas: {},
      categoryList: [],
      certification_bodyList: [],
      MerchantsInfo: [],
      MerchantsStores: [],
      goodFaceList: [], // 封面图数组
      goodPhotoList: [], // 相册数组
      goodXqList: [], // 详情数组
      list: [
        // 动态 规格里的 图片数组
        []
      ],
      submitGoodsAudit: {
        submitInfoAudit: {
          id: ''
        },
        submitStoAudit: {
          merchants_stores_id: ''
        },
        merchants_stores_id: '',
        id: '',
        name: '',
        category: '',
        certification_body: '',
        describe: '',
        goods_imgdd: [],
        submitSkuAudits: [
          {
            name: '',
            goods_sku_img: '',
            supply_price: '',
            store_number: ''
          }
        ],
        submitAlbumAudit: {
          goods_thumb_xiang_ce: [],
          goods_thumb_xiang_qing: []
        }
      }
    }
  },
  created() {
    this.id = this.$route.query.id
    getSxoIndustryInfo().then(res => {
      this.categoryList = res
    })
    getSxoGoodsAuth().then(res => {
      this.certification_bodyList = res
    })
    findAudit({ id: this.id }).then(res => {
      this.datas = res.data
      for (let key in this.submitGoodsAudit) {
        this.submitGoodsAudit[key] = this.datas[key]
      }
      // 坑 数据字典返回的是 int, 后台返回的是 string
      // this.submitGoodsAudit.category = Number(data.category)
      if (this.datas.submitAlbumAudit.img) {
        // 相册 和 详情在 img 字段，由 & 分割
        let imgArr = this.datas.submitAlbumAudit.img.split('&')
        // 相册
        this.goodPhotoList = imgArr[0]
          .split(',')
          .filter(v => v)
          .map(v => ({ name: '相册图', url: v }))
        // 详情
        this.goodXqList = imgArr[1]
          .split(',')
          .filter(v => v)
          .map(v => ({ name: '详情图', url: v }))
      }
      // 封面
      if (this.datas.goods_img) {
        this.goodFaceList = this.datas.goods_img
          .split(',')
          .filter(v => v)
          .map(v => ({ name: '封面图', url: v }))
      }
      // 动态规格 里的图片 的 v-model 推进 list 里面
      this.submitGoodsAudit.submitSkuAudits.forEach((v, i) => {
        this.list.splice(i, 1, [{ name: '', url: v.goods_sku_img }])
      })
    })
  },

  methods: {

    addgoods() {
      this.list.push([])
      this.datas.submitSkuAudits.push({
        name: '',
        status: 5,
        goods_sku_img: '',
        supply_price: '',
        store_number: ''
      })
    },
    removeall(index) {
      if (this.list.length > 1) {
        this.list.splice(index, 1)
        this.datas.submitSkuAudits.splice(index, 1)
      } else {
        this.$Notice.error({
          title: '必须要添加一条规格',

          duration: 3
        })
      }
    },
    ok() {
      if (!this.submitGoodsAudit.name) {
        this.$Message.warning('商品名称不能为空')
        return false
      }
      // console.log(this.submitGoodsAudit.category)
      if (!this.submitGoodsAudit.category) {
        this.$Message.warning('一级分类不能为空')
        return false
      }
      if (!this.submitGoodsAudit.certification_body) {
        this.$Message.warning('商户认证不能为空')
        return false
      }
      if (!this.submitGoodsAudit.describe) {
        this.$Message.warning('商品描述不能为空')
        return false
      }
      for (let i = 0; i < this.submitGoodsAudit.submitSkuAudits.length; i++) {
        if (!this.submitGoodsAudit.submitSkuAudits[i].name) {
          this.$Message.warning('规格名称不能为空')
          return false
        } else if (!this.submitGoodsAudit.submitSkuAudits[i].goods_sku_img) {
          console.log(this.submitGoodsAudit.submitSkuAudits[i].goods_sku_img)
          this.$Message.warning('规格图不能为空')
          return false
        } else if (!this.submitGoodsAudit.submitSkuAudits[i].supply_price) {
          this.$Message.warning('供应价不能为空')
          return false
        } else if (!this.submitGoodsAudit.submitSkuAudits[i].store_number) {
          this.$Message.warning('库存不能为空')
          return false
        }
      }
      // 上传之前把 图片数组 处理
      this.datas.goods_imgdd = this.goodFaceList.map(v => v.url)
      this.datas.submitAlbumAudit.goods_thumb_xiang_ce = this.goodPhotoList.map(
        v => v.url
      )
      this.datas.submitAlbumAudit.goods_thumb_xiang_qing = this.goodXqList.map(
        v => v.url
      )

      // debugger
      // 动态规格里的图片按索引赋给 goods_sku_img 字段
      this.list.forEach((v, i) => {
        // debugger
        this.datas.submitSkuAudits[i].goods_sku_img = v[0].url
      })
      // debugger
      updateAudit(this.datas).then(res => {
        this.$Message.info('提交成功')
        this.$router.push({
          name: 'goods'
        })
      })
    },
    cancel() {
      this.$Message.info('已取消')
    }
  }
}
</script>
<style scoped>
.ivu-form .ivu-form-item-label {
  padding: 10px 0;
}
.addgoods{
  border: 2px solid lightgrey;
  width: 380px;
  height:400px;
  line-height: 420px;
  text-align: center;
}
</style>
