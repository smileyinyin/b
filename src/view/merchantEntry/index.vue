<template>
  <div class="entry">
    <h3 class="pb20">商户进件</h3>
    <Card>
      <Row>
        <i-col span="6">
          <Button type="success" @click="isShowEntry = true" class="btn-add w120" icon="plus">新增进件</Button>
        </i-col>
        <i-col span="18" align="right">
          <Input placeholder="请输入CSN号" v-model="posCsn" clearable class="w180 mr20" />
          <Select class="w180 mr20 tl" placeholder="请选择pos机品牌" v-model="brandId" clearable>
            <Option :value="1">新大陆</Option>
            <Option :value="2">嘉联</Option>
          </Select>
          <!-- <Select placeholder="进件状态" v-model="posAppStatus" clearable class="w180 mr20 tl">
            <Option :value="1">待审核</Option>
            <Option :value="2">审核不通过</Option>
            <Option :value="3">审核通过（进件中）</Option>
            <Option :value="4">进件失败</Option>
            <Option :value="5">进件成功</Option>
          </Select> -->
          <DatePicker v-model="date" type="daterange" placement="bottom-end" placeholder="选择日期" class="w180 mr20"></DatePicker>
          <Button type="primary" icon="ios-search" @click="getAll">查询</Button>
        </i-col>
      </Row>
      <Table border :columns="columns" :data="tableData" class="mt20"></Table>
      <Page :total="totalCounts" show-sizer :page-size="pageSize" :current.sync="currentPage" @on-change="getEntryList" @on-page-size-change="changePageSize" class="mt20 tr"></Page>
    </Card>
    <Modal v-model="isShow" title="加机操作">
      <div slot="footer">
          <Button type="text" size="large" @click="isShow = false">取消</Button>
          <Button type="primary" size="large" @click="addPos">确定</Button>
      </div>
      <label>数量：
        <InputNumber :min="1" v-model="num" style="width: 300px;"></InputNumber>
      </label>
    </Modal>
    <Modal v-model="isShowEntry" title="新增进件操作" @on-ok="addEntery" class-name="vertical-center-modal" scrollable>
      <add-entry-type v-model="radio"></add-entry-type>
      <!-- <div class="mt30 mb60">
        <img :src="img2" alt="" class="mr20 vm">
        <RadioGroup v-model="radio">
            <Radio label="1" class="f14">小微进件</Radio>
            <Radio label="2" class="f14">企业进件</Radio>
        </RadioGroup>
      </div> -->
      <!-- <div>
        <img :src="img1" alt="" class="mr20 vm">
        <RadioGroup v-model="radio">
            <Radio label="3" class="f14">小微商户</Radio>
            <Radio label="4" class="f14">租赁合同</Radio>
            <Radio label="5" class="f14">法人商户</Radio>
        </RadioGroup>
      </div> -->
    </Modal>
    <Modal v-model="isShowPosStatus" :mask-closable="false" :closable="true" title="审核列表" width="800" class-name="flex-vertical-center">
        <div slot="footer">
            <Button type="text" size="large" @click="isShowPosStatus = false">取消</Button>
            <Button type="primary" size="large" @click="isShowPosStatus = false">确定</Button>
        </div>
        <Table border :columns="listTitle" :data="table" class="mt20"></Table>
    </Modal>
    <Modal v-model="isShowActive" :mask-closable="false" :closable="true" title="激活操作" class-name="vertical-center-modal">
        <div slot="footer">
            <Button type="text" size="large" @click="isShowActive = false">取消</Button>
            <Button type="primary" size="large" @click="sureActive">确定</Button>
        </div>
        <Form :label-width="80">
          <FormItem label="CSN号：">
            <Input placeholder="请输入CSN号" v-model="paramsT.posCsn" />
          </FormItem>
          <FormItem label="激活码：">
            <Input placeholder="请输入激活码" v-model="paramsT.activeCode" />
          </FormItem>
           <FormItem label="终端号：">
            <Input  v-model="paramsT.terminalNumber" disabled/>
          </FormItem>
        </Form>
    </Modal>
    <Modal v-model="isShows" :mask-closable="false" :closable="true" title="换机操作" class-name="vertical-center-modal">
        <div slot="footer">
            <Button type="text" size="large" @click="isShows = false">取消</Button>
            <Button type="primary" size="large" @click="sureChange">确定</Button>
        </div>
        <Form :label-width="80">
          <FormItem label="CSN号：">
            <Input placeholder="请输入CSN号" v-model="paramsF.posCsn" />
          </FormItem>
          <FormItem label="终端号：">
            <Input placeholder="请输入终端号" v-model="paramsF.terNum" />
          </FormItem>
        </Form>
    </Modal>
  </div>
</template>

<script>
import img1 from '../../assets/images/11.png'
import img2 from '../../assets/images/22.png'
import { findPosApplyList, addPosApplyNum, delPosApply, getAuditInfo, changeStoresPos } from '@/api/entry'
import { updateStoresPos } from '@/api/posManager'
import { formatDate } from '@/libs/util'
import addEntryType from './components/addEntryType'

export default {
  name: 'entry',
  data() {
    return {
      table: [],
      passType: '',
      isShows: false, // 换机操作
      listTitle: [
        {
          title: '审核类型',
          key: 'itemStatus'
        },
        {
          title: '审核内容',
          key: 'comment'
        }
      ],
      paramsF: {
        merchantsId: null,
        merchantsStoresId: null,
        posCsn: '',
        posApplyId: null,
        terNum: null
      },
      paramsT: {
        merchantsId: null,
        merchantsStoresId: null,
        posCsn: '',
        activeCode: null,
        id: null,
        terminalNumber: ''
      },
      isShowActive: false,
      posCsn: null,
      activeCode: null,
      isShow: false, // 加机弹框是否显示
      isShowEntry: false, // 新增进件的弹框的显示
      isShowPosStatus: false,
      radio: '1',
      img1: img1,
      img2: img2,
      currentPage: 1,
      telphone: '',
      brandId: '',
      // posAppStatus: '',
      totalCounts: 0,
      pageSize: 20,
      date: '',
      posApply: '',
      num: null,
      color: '',
      columns: [
        {
          title: '序号',
          width: 60,
          type: 'index'
        },
        {
          title: 'CSN',
          key: 'posCsn'
        },
        {
          title: '激活码',
          key: 'activeCode'
        },
        {
          title: '终端号',
          key: 'terminalNumber'
        },
        {
          title: '品牌',
          key: 'brandId',
          render: (h, params) => {
            return h('span', [
              h('span', params.row.brandId === 1 ? '新大陆' : (params.row.brandId === 2 ? '嘉联' : ''))
            ])
          }
        },
        {
          title: '合伙人',
          key: 'merchantParentName'
        },
        {
          title: '商户',
          key: 'merchantsName',
          ellipsis: true,
          render: (h, params) => {
            return h('Tooltip', {
              props: { placement: 'top' }
            }, [
              params.row.merchantsName,
              h('span', { slot: 'content', style: { whiteSpace: 'normal', wordBreak: 'break-all' } }, params.row.merchantsName)
            ])
          }
        },
        {
          title: '门店',
          key: 'merchantStoreName'
        },
        {
          title: '状态',
          key: 'currentStatus',
          render: (h, params) => {
            return h('span', [
              h('span', {
                style: {
                  color: params.row.color
                }
              }, params.row.currentStatus)
            ])
          }
        },
        {
          title: '创建时间',
          key: 'createTime',
          width: 150,
          render: (h, params) => {
            return h('div', [
              h('span', formatDate(params.row.createTime, 'yyyy-MM-dd hh:mm:ss'))
            ])
          }
        },
        {
          title: '操作',
          key: 'time',
          width: 250,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: 'entryDetails',
                        query: { status: params.row.status, posApplyId: params.row.posApplyId }
                      })
                    }
                  }
                },
                '查看'
              ),
              (params.row.status === 5 || params.row.status === 6) && h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.isShow = true
                      this.posApplyId = params.row.posApplyId
                      this.num = 1
                    }
                  }
                },
                '加机'
              ),
              (params.row.status === 2 || params.row.status === 4 || params.row.status === 7 || params.row.status === 8 || params.row.status === 9 || params.row.status === 0) && h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: 'entryEditor',
                        query: { status: params.row.status, posApplyId: params.row.posApplyId }
                      })
                    }
                  }
                },
                '编辑'
              ),
              params.row.status !== 1 && h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.isShowPosStatus = true
                      getAuditInfo({ posApplyId: params.row.posApplyId }).then(res => {
                        this.table = res.data
                        this.updated()
                      })
                    }
                  }
                },
                '审核详情'
              ),
              // params.row.status === 1 && h(
              //   'Button',
              //   {
              //     props: {
              //       type: 'primary',
              //       size: 'small'
              //     },
              //     style: {
              //       marginRight: '5px'
              //     },
              //     on: {
              //       click: () => {
              //         this.$router.push({
              //           path: 'entryDetails',
              //           query: { status: params.row.status, posApplyId: params.row.posApplyId }
              //         })
              //       }
              //     }
              //   },
              //   '审核'
              // ),
              // (params.row.status === 2 || params.row.status === 4) && h(
              //   'Button',
              //   {
              //     props: {
              //       type: 'error',
              //       size: 'small'
              //     },
              //     style: {
              //       marginRight: '5px'
              //     },
              //     on: {
              //       click: () => {
              //         this.delete(params.row)
              //       }
              //     }
              //   },
              //   '删除'
              // ),
              //  (params.row.status === 5 && params.row.posActivationNumber > (params.row.posActNumber ? params.row.posActNumber : 0))
              (params.row.status === 5) && h(
                'Button',
                {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.isShowActive = true
                      this.paramsT.posCsn = null
                      this.paramsT.activeCode = null
                      this.paramsT.terminalNumber = params.row.terminalNumber
                      // this.paramsT.merchantsId = Number(params.row.merchantsId)
                      // this.paramsT.merchantsStoresId = params.row.merchantsStoresId
                      this.paramsT.id = params.row.id
                    }
                  }
                },
                '激活'
              ),
              (params.row.posActNumber > 0) && h(
                'Button',
                {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.isShows = true
                      this.paramsF.posCsn = null
                      this.paramsF.merchantsId = Number(params.row.merchantsId)
                      this.paramsF.merchantsStoresId = params.row.merchantsStoresId
                      this.paramsF.posApplyId = params.row.posApplyId
                    }
                  }
                },
                '换机'
              )
            ])
          }
        }
      ],
      tableData: []
    }
  },
  created() {
    if (this.$route.params.fromStore) { // 从门店列表点击进件按钮过来的
      this.isShowEntry = true
    }
    this.getAll()
  },
  methods: {
    // 激活
    sureActive() {
      if (!this.paramsT.posCsn) {
        this.$Message.error('请输入pos机CSN号！')
        return
      }
      if (!this.paramsT.activeCode) {
        this.$Message.error('请输入激活码！')
        return
      }
      updateStoresPos(this.paramsT).then(res => {
        this.getAll()
        this.isShowActive = false
      })
    },
    // 换机
    sureChange() {
      if (!this.paramsF.posCsn) {
        this.$Message.error('请输入pos机CSN号！')
        return
      }
      if (!this.paramsF.terNum) {
        this.$Message.error('请输入终端号！')
        return
      }
      changeStoresPos(this.paramsF).then(res => {
        this.getAll()
        this.isShows = false
      })
    },
    updated() {
      this.table.forEach((item) => {
        if (item.status === 1) {
          item.itemStatus = '待审核'
        } else if (item.status === 2) {
          item.itemStatus = '审核不通过'
        } else if (item.status === 3) {
          item.itemStatus = '审核通过（进件中）'
        } else if (item.status === 4) {
          item.itemStatus = '进件失败'
        } else if (item.status === 5) {
          item.itemStatus = '进件成功'
        } else if (item.status === 6) {
          item.itemStatus = '已激活'
        }
      })
    },
    getAll() {
      let params = {
        startTime: formatDate(this.date[0], 'yyyy-MM-dd hh:mm:ss'),
        endTime: formatDate(this.date[1], 'yyyy-MM-dd hh:mm:ss'),
        telphone: this.telphone,
        posAppStatus: this.posAppStatus,
        posCsn: this.posCsn ? this.posCsn : null,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        brandId: this.brandId,
        userId: this.$store.state.user.userId,
        roleId: this.$store.state.user.roleId
      }
      findPosApplyList(params).then(res => {
        if (res.data) {
          this.tableData = res.data.list
          this.totalCounts = res.data.total
          this.updateArray()
        } else {
          this.tableData = []
          this.totalCounts = 0
        }
      })
    },
    // 确定加机
    addPos() {
      // let params = {
      //   posApplyId: this.posApplyId,
      //   num: this.num
      // }
      if (!this.num) {
        this.$Message.error('请填写加机数量！')
        return
      }
      if (Number(this.num) > 10) {
        this.$Message.error('进件数量不能超过10台！')
        return
      }
      if (Number(this.num) < 1) {
        this.$Message.error('进件数量不能少于1台！')
        return
      }
      addPosApplyNum({ posApplyId: this.posApplyId,
        num: this.num,
        userId: this.$store.state.user.userId }).then(res => {
        this.isShow = false
        this.getAll()
        this.num = null
      })
    },
    // 分页改变
    getEntryList(val) {
      this.currentPage = val
      this.getAll()
    },
    // 每页显示列表条数
    changePageSize(val) {
      this.pageSize = val
      this.getAll()
    },
    // 新增进件
    addEntery() {
      let name = null
      this.radio = Number(this.radio)
      if (this.radio === 1 || this.radio === 2) {
        name = this.radio === 1 ? '小微进件' : '企业进件'
        this.$router.push({
          path: 'addEntry',
          query: {
            name: name,
            id: this.radio
          }
        })
      } else {
        name =
          this.radio === 3
            ? '小微商户'
            : this.radio === 4 ? '租赁合同' : '法人商户'
        this.$router.push({
          path: 'addEntryT',
          query: {
            name: name,
            id: this.radio
          }
        })
      }
    },
    // 删除进件信息
    delete(row) {
      this.$Modal.confirm({
        title: '删除操作',
        content: `确认要删除商户<span style="font-weight: bold;">${
          row.marchantsName
        }</span>的进件信息吗？`,
        onOk: () => {
          delPosApply({ posApplyId: row.posApplyId }).then(res => {
            this.getAll()
          })
        }
      })
    },
    // 表格状态更新
    updateArray() {
      this.tableData.forEach(item => {
        if (item.status === 1) {
          item.currentStatus = '待审核'
          item.color = '#495060'
        } else if (item.status === 0) {
          item.currentStatus = '审核不通过'
          item.color = '#ed4014'
        } else if (item.status === 3) {
          item.currentStatus = '进件中'
          item.color = '#2d8cf0'
        } else if (item.status === 2 || item.status === 4 || item.status === 7 || item.status === 8 || item.status === 9) {
          item.currentStatus = '进件失败'
          item.color = '#ed4014'
        } else if (item.status === 5) {
          item.currentStatus = '进件成功'
          item.color = '#19be6b'
        } else if (item.status === 6) {
          item.currentStatus = '已激活'
          item.color = '#19be6b'
        }
      })
    }
  },
  components: { addEntryType }
}
</script>
