
<template>
    <div class="settle height-100">
       <bread-crumb :data="[
      { title: '商品管理'},
      {title: '添加商品'}
    ]"></bread-crumb>
        <Card >

            <div style="width:100%; display: flex;
    justify-content: space-around">
                 <div class="contont" style="width:50%;margin-left:20px">
              <div  >商品名称:<Input  placeholder="请输入商品名称" style="width: 300px;" v-model=" submitGoodsAudit.name"/></div>
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
              <div  style="margin-top:20px">商品描述:<Input  type="textarea" :rows="4" style="width: 300px" v-model=" submitGoodsAudit.describe"/></div>
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
              </div>
            </div>
                <br>
                <divide-line>商品基础信息</divide-line>
                <br>
                <div style="overflow:hidden;padding-top:5px;padding-bottom:5px">
                        <Form :label-width="80" v-for="(item, index) in submitGoodsAudit.submitSkuAudits" :key="index" style="float:left">
                            <FormItem label="规格:" prop="passwd">
                               <Input type="text" placeholder="请输入规格" style="width: 200px" v-model="item.name"/>
                            </FormItem>

                            <FormItem label="规格图:">
                               <upload-img v-model="list[index]"></upload-img>
                               <!-- <upload-img @sku="arg => sku(index, arg)" name="sku" :needImg="1" title="规格图:"></upload-img> -->
                            </FormItem>
                            <FormItem label="供应价:" prop="passwdCheck">
                               <InputNumber :min="0.01" type="text"  placeholder="请输入供应价" style="width: 200px" v-model="item.supply_price"></InputNumber>
                            </FormItem>
                            <FormItem label="库存:" prop="age">
                                <InputNumber :min="0.01" type="text" placeholder="请输入库存" style="width: 200px" v-model="item.store_number"></InputNumber>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="removeall(index)">删除规格</Button>
                            </FormItem>
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
                  <p style="font-size:20px">确认提交审核?</p>
                  <p style="font-size:16px;color:#ADADAD">确认会将商品信息提交给上下网进行审核</p>
               </Modal>
            </Card>
                 <div style="width:100%">
                    <Button type="primary"  style="width:120px;float:right;margin-top:30px;margin-right:30px" @click="modal=true">提交审核</Button>
                </div>
    </div>
</template>
<script>
import UploadImg from '_c/uploadImg/uploadImg'
import { addList } from '@/api/good'
import breadCrumb from '_c/breadCrumb/breadCrumb'
import divideLine from '_c/divideLine/divide-line'
// 认证
import { getSxoIndustryInfo, getSxoGoodsAuth } from '@/api/common'
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
      goods_imgdd_type_id: '',
      categoryList: [],
      certification_bodyList: [],
      goodFaceList: [],
      goodPhotoList: [],
      goodXqList: [],
      list: [
        // 动态 规格里的 图片数组
        []
      ],
      submitGoodsAudit: {
        name: '',
        category: '',
        submitRelation: {
          user_id: this.$store.state.user.userId,
          role_id: this.$store.state.user.roleId
        },
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
    getSxoIndustryInfo().then(res => {
      this.categoryList = res
    })
    getSxoGoodsAuth().then(res => {
      this.certification_bodyList = res
    })
  },
  watch: {
    // 商品封面图
    goodFaceList(value) {
      this.submitGoodsAudit.goods_imgdd = value.map(v => v.url)
    },
    // 商品相册图
    goodPhotoList(value) {
      this.submitGoodsAudit.submitAlbumAudit.goods_thumb_xiang_ce = value.map(
        v => v.url
      )
    },
    // 商品详情图
    goodXqList(value) {
      this.submitGoodsAudit.submitAlbumAudit.goods_thumb_xiang_qing = value.map(
        v => v.url
      )
    },
    list(value) {
      this.list.forEach((v, i) => {
        // debugger
        this.submitGoodsAudit.submitSkuAudits[i].goods_sku_img = v[0].url
      })
    }
  },
  methods: {
    addgoods() {
      this.list.push([])
      this.submitGoodsAudit.submitSkuAudits.push({
        name: '',
        goods_sku_img: '',
        supply_price: '',
        store_number: ''
      })
    },
    removeall(index) {
      if (this.submitGoodsAudit.submitSkuAudits.length > 1) {
        this.submitGoodsAudit.submitSkuAudits.splice(index, 1)
      } else {
        this.$Message.warning('必须添加一条规格')
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
      // debugger
      // let query = Object.assign({}, this.submitGoodsAudit)
      this.submitGoodsAudit.category = '' + this.submitGoodsAudit.category
      addList(this.submitGoodsAudit).then(res => {
        this.$Message.info('已提交')
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
