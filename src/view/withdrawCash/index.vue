
<template>
     <div class="settle">
      <h3 class="pb10">我的结算</h3>
        <Card>
        <Row>
          <i-col span="24" align="right">
             <Input  placeholder="请输入账单号" style="width: 100px" v-model="bill_uuid" clearable />
             <!-- <Input  placeholder="请输入用户名" style="width: 100px;margin-left:10px;" v-model="partnerName" clearable /> -->
             <!-- <Select clearable style="width:100px;margin-left:10px;" v-model="partnerType" >
                            <Option value="1" key="1">城市合伙人</Option>
                            <Option value="2" key="2">渠道合伙人</Option>
             </Select> -->
             <Select clearable style="width:100px;margin-left:10px;" v-model="state" placeholder="请选择状态">
                            <Option value="0" key="0">待审核</Option>
                            <Option value="1" key="1">已打款</Option>
                            <Option value="-1" key="-1">未提现</Option>
                            <Option value="2" key="2">审核不通过</Option>
             </Select>
             <DatePicker  type="daterange" placement="bottom-end" placeholder="请选择生成时间" style="width:200px;margin-left:10px " v-model="date" ></DatePicker>
             <Button type="primary" icon="search" @click="getAll" style="margin-left:10px" >查询</Button>
          </i-col>
        </Row>
        <Table  :columns="params" :data="data" stripe border class="mt20"></Table>
        <Page :total="totalCounts" show-sizer :page-size="pageSize" :current.sync="currentPage" @on-change="getpage" @on-page-size-change="changePageSize" class="mt20 tr"> </Page>
        </Card>
        <Modal v-model="isShowActive" :mask-closable="false" :closable="true" title="上传发票" >
        <div slot="footer">
            <Button type="error" size="large" @click="isShowActive = false">取消</Button>
            <Button type="primary" size="large" @click="sureActive">确定</Button>
        </div>
        <Form :label-width="100" class="form" ref="form" :model="paramsT" :rules="rules">
          <FormItem label="发票金额：" prop="invoiceAmount">
            <InputNumber placeholder="请输入发票金额" :min="0.1" v-model="paramsT.invoiceAmount" style="width: 200px" clearable/>
          </FormItem>
          <FormItem label="发票税额：" prop="invoiceTax">
            <InputNumber placeholder="请输入发票税额" :min="0.1" v-model="paramsT.invoiceTax" style="width: 200px" clearable/>
          </FormItem>
          <FormItem label="发票张数：" prop="numbers">
            <InputNumber placeholder="请输入发票张数" :min="0.1" v-model="paramsT.numbers" style="width: 200px" clearable/>
          </FormItem>
          <FormItem label="价税合计：" prop="totalAdValorem">
            <InputNumber placeholder="请输入价税合计" :min="0.1" v-model="paramsT.totalAdValorem" style="width: 200px" clearable/>
          </FormItem>
          <FormItem label="开票单位：" prop="issuingOffice">
            <Input placeholder="请输入开票单位"  v-model="paramsT.issuingOffice" clearable/>
          </FormItem>
          <FormItem label="开票时间：" >
             <DatePicker type="datetime" placeholder="请选择开票时间" style="width: 200px" v-model="date1" clearable></DatePicker>
          </FormItem>
          <FormItem label="物流公司：" prop="logisticsCompany">
            <Input placeholder="请输入物流公司" v-model="paramsT.logisticsCompany" clearable/>
          </FormItem>
          <FormItem label="快递单号：" prop="courierNumber">
            <Input placeholder="请输入快递单号：" v-model="paramsT.courierNumber" clearable/>
          </FormItem>
          <FormItem label="发票号：" prop="invoiceNumber">
            <Input placeholder="请输入发票号（发票号，多张连号时用;分隔开）" type="textarea" :rows="4" v-model="paramsT.invoiceNumber" clearable/>
          </FormItem>
          <FormItem label="上传发票：">
            <upload-img title="发票" v-model="imgList" :needImg="5"></upload-img>
          </FormItem>
        </Form>
    </Modal>
     <!-- 修改 发票-->
     <Modal v-model="show" :mask-closable="false" :closable="true" title="上传发票" >
        <div slot="footer">
            <Button type="text" size="large" @click="show = false">取消</Button>
            <Button type="primary" size="large" @click="update">确定</Button>
        </div>
        <Form :label-width="80" class="form" ref="form" :model="paramsT" :rules="rules">
          <FormItem label="审核不通过的原因：">
            <Input placeholder="请输入发票金额"  v-model="paramsT.invoiceAmount" disabled  />
          </FormItem>
          <FormItem label="发票金额：">
            <InputNumber placeholder="请输入发票金额" :min="1" v-model="paramsT.invoiceAmount"/>
          </FormItem>
          <FormItem label="发票税额：">
            <InputNumber placeholder="请输入发票税额" :min="1" v-model="paramsT.invoiceTax"/>
          </FormItem>
          <FormItem label="发票张数：">
            <InputNumber placeholder="请输入发票张数" :min="1" v-model="paramsT.numbers"/>
          </FormItem>
          <FormItem label="价税合计：">
            <InputNumber placeholder="请输入价税合计" :min="0.1" v-model="paramsT.totalAdValorem"/>
          </FormItem>
          <FormItem label="开票单位：">
            <Input placeholder="请输入开票单位"  v-model="paramsT.issuingOffice"/>
          </FormItem>
          <FormItem label="开票时间：">
             <DatePicker type="datetime" placeholder="请选择开票时间" style="width: 200px" v-model="date1"></DatePicker>
          </FormItem>
          <FormItem label="物流公司：">
            <Input placeholder="请输入物流公司" v-model="paramsT.logisticsCompany"/>
          </FormItem>
          <FormItem label="快递单号：">
            <Input placeholder="请输入快递单号：" v-model="paramsT.courierNumber"/>
          </FormItem>
          <FormItem label="发票号：">
            <Input placeholder="请输入发票号（发票号，多张连号时用;分隔开）" type="textarea" :rows="4" v-model="paramsT.invoiceNumber"/>
          </FormItem>
          <FormItem label="上传发票：">
            <upload-img title="发票" v-model="imgList" :needImg="5"></upload-img>
          </FormItem>
        </Form>
    </Modal>

    <Modal v-model="isShow" :mask-closable="false" :closable="true" title="打款信息" class-name="vertical-center-modal">
        <Form :label-width="80">
          <FormItem label="分公司：">
              <i-Input> </i-Input>
          </FormItem>
          <FormItem label="打款卡号：">
            <i-Input> </i-Input>
          </FormItem>
          <FormItem label="打款金额：">
            <i-Input> </i-Input>
          </FormItem>
          <FormItem label="绑定手机：">
            <i-Input> </i-Input>
          </FormItem>
          <FormItem label="手续费：">
            <Input placeholder="请输入手续费" />
          </FormItem>
          <FormItem label="流水号：">
            <Input placeholder="请输入打款流水号" />
          </FormItem>
          <FormItem label="凭证号：">
            <upload-img title="凭证号" ></upload-img>
          </FormItem>
        </Form>
    </Modal>

       </div>
</template>
<script>
import {
  monthBillList,
  uploadInvoice,
  invoice,
  updateInvoiceNo
} from '@/api/money/index'
import { formatDate } from '@/libs/util'
import UploadImg from '_c/uploadImg/uploadImg'
export default {
  name: 'settle',
  components: {
    UploadImg
  },
  data() {
    return {
      isShowActive: false,
      isShow: false,
      show: false,
      currentPage: 1,
      pageSize: 20,
      totalCounts: 0,
      year: '',
      date: '',
      date1: '',
      url: '',
      bill_uuid: '',
      partnerType: '',
      partnerName: '',
      state: '',
      imgList: [],
      // editID: null, // 发票的id
      ID: null, // 账单的id
      paramsT: {
        id: null, // 账单id
        invoiceAmount: null, // 发票金额
        invoiceTax: null, // 发票税额
        numbers: null, // 发票张数
        totalAdValorem: null, // 价税合计
        issuingOffice: '', // 开票单位
        logisticsCompany: '', // 物流公司
        courierNumber: null, // 快递单号
        invoiceNumber: null, // 发票号
        courierNumberPics: '', // 图片地址
        issuingTime: '' // 时间
      },
      params: [
        {
          title: '序号',
          type: 'index'
          // key: 'id'
        },
        {
          title: '账单号',
          key: 'billUuid'
        },
        // {
        //   title: '用户名称',
        //   key: 'username'
        // },
        // {
        //   title: '合伙人类型',
        //   key: 'partnerstatus'
        // },
        {
          title: '年月',
          key: 'billStartDate',
          render: (h, params) => {
            return h(
              'span',
              null,
              formatDate(
                new Date(params.row.billStartDate),
                'yyyy-MM'
              )
            )
          }
        },
        {
          title: '可结算金额',
          key: 'biiMSumMoney'
        },
        {
          title: '手续费',
          key: 'serviceCharge'
        },
        {
          title: '到账金额',
          key: '',
          render: (h, params) => {
            return h(
              'span',
              (params.row.biiMSumMoney * 100 -
                params.row.serviceCharge * 100) /
                100
            )
          }
        },
        {
          title: '审核状态',
          key: 'ttstatus'
        },
        {
          title: '打款状态',
          key: 'ddstatus'
        },
        {
          title: '结算状态',
          key: 'jjstatus'
        },
        {
          title: '生成时间',
          key: 'createTime',
          render: (h, params) => {
            return h(
              'span',
              null,
              formatDate(
                new Date(params.row.createTime),
                'yyyy-MM-dd hh:mm:ss'
              )
            )
          }
        }
        // {
        //   title: '操作',
        //   width: 200,
        //   key: 'control',
        //   render: (h, params) => {
        //     return h('div', [
        //       h(
        //         'Button',
        //         {
        //           props: {
        //             type: 'info',
        //             size: 'small'
        //           },
        //           style: {
        //             marginRight: '5px',
        //             display: params.row.billNo === -1 ? '' : 'none'
        //           },
        //           on: {
        //             click: () => {
        //               this.addfp(params.row)
        //             }
        //           }
        //         },
        //         '上传发票'
        //       ),
        //       h(
        //         'Button',
        //         {
        //           props: {
        //             type: 'info',
        //             size: 'small'
        //           },
        //           style: {
        //             marginRight: '5px',
        //             display: params.row.review === 2 ? '' : 'none'
        //           },
        //           on: {
        //             click: () => {
        //               this.edit(params.row)
        //             }
        //           }
        //         },
        //         '修改发票'
        //       )
        // h(
        //   'Button',
        //   {
        //     props: {
        //       type: 'info',
        //       size: 'small'
        //     },
        //     style: {
        //       marginRight: '5px',
        //       display: params.row.bill_no === 1 ? '' : 'none'
        //     },
        //     on: {
        //       click: () => {
        //         this.seeMessage(params.row)
        //       }
        //     }
        //   },
        //   '打款信息'
        // ),
        // h(
        //   'Button',
        //   {
        //     props: {
        //       type: 'info',
        //       size: 'small'
        //     },
        //     style: {},
        //     on: {
        //       click: () => {
        //         this.$router.push({
        //           path: 'tixian-record',
        //           query: {
        //             zdId: params.row.id,
        //             zdUrl: params.row.bill_address
        //           }
        //         })
        //       }
        //     }
        //   },
        //   '账单明细'
        // )
        // ])
        // }
        // }
      ],
      data: [],
      rules: {
        invoiceAmount: [
          {
            required: true,
            message: '发票金额不能为空！',
            trigger: 'blur',
            type: 'number'
          }
        ],
        invoiceTax: [
          {
            required: true,
            message: '发票税额不能为空！',
            trigger: 'blur',
            type: 'number'
          }
        ],
        numbers: [
          {
            required: true,
            message: '发票张数不能为空！',
            trigger: 'blur',
            type: 'number'
          }
        ],
        totalAdValorem: [
          {
            required: true,
            message: '价税合计不能为空！',
            trigger: 'blur',
            type: 'number'
          }
        ],
        issuingOffice: [
          { required: true, message: '开票单位不能为空！', trigger: 'blur' }
        ],
        issuingTime: [
          { required: true, message: '开票时间不能为空！', trigger: 'blur' }
        ],
        logisticsCompany: [
          { required: true, message: '物流公司不能为空！', trigger: 'blur' }
        ],
        courierNumber: [
          { required: true, message: '快递单号不能为空！', trigger: 'blur' }
        ],
        invoiceNumber: [
          { required: true, message: '发票号不能为空！', trigger: 'blur' }
        ],
        courierNumberPics: [
          { required: true, message: '发票照不能为空！', trigger: 'blur' }
        ]
      }
    }
  },

  created() {
    this.getAll()
  },
  watch: {
    imgList(value) {
      this.paramsT.courierNumberPics = value.map(v => v.url).join(';')
    }
  },
  methods: {
    getAll() {
      let startTime = formatDate(this.date[0], 'yyyy-MM')
      let ecdTime = formatDate(this.date[1], 'yyyy-MM')
      monthBillList({
        billNo: this.bill_uuid,
        userId: this.$store.state.user.userId,
        roleId: this.$store.state.user.roleId,
        partnerName: this.partnerName,
        state: this.state,
        partnerType: this.partnerType,
        startTime: startTime,
        endTime: ecdTime,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (res.data) {
          this.data = res.data.list
          this.totalCounts = res.data.total
        } else {
          this.data = []
          this.totalCounts = 0
        }
        this.updateArray()
      })
    },
    updateArray() {
      this.data.forEach(item => {
        if (item.review === 0) {
          item.ttstatus = '待审核'
        } else if (item.review === 1) {
          item.ttstatus = '审核通过'
        } else if (item.review === 2) {
          item.ttstatus = '审核不通过'
        }
        if (item.billNo === -1) {
          item.jjstatus = '未结算'
        } else if (item.billNo === 1) {
          item.jjstatus = '已结算'
        } else if (item.billNo === 0) {
          item.jjstatus = '结算中'
        }
        if (item.moneyType === 0) {
          item.ddstatus = '未打款'
        } else if (item.moneyType === 1) {
          item.ddstatus = '已打款'
        }
      })
    },
    getpage(page) {
      this.currentPage = page
      this.getAll()
    },
    changePageSize(size) {
      this.pageSize = size
      this.getAll()
    },
    addfp(row) {
      // debugger
      this.isShowActive = true
      this.paramsT.id = row.id
    },
    sureActive() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.paramsT.issuingTime = formatDate(
            this.date1,
            'yyyy-MM-dd hh:mm:ss'
          )
          uploadInvoice(this.paramsT).then(res => {
            this.getAll()
            this.isShowActive = false
          })
        } else {
          this.$Message.error('请将信息填写完整！')
        }
      })
    },
    edit(row) {
      // debugger
      this.show = true
      // this.editID = row.invoice_id
      this.ID = row.id
      invoice({ invoice_id: this.editID }).then(res => {
        this.paramsT = res.data
        this.imgList = res.data.courierNumberPics
          .split(',')
          .map(item => ({ url: item }))
        this.date1 = formatDate(res.data.issuingTime, 'yyyy-MM-dd hh:mm:ss')
      })
    },
    update() {
      // this.paramsT.invoice_id = this.editID
      this.paramsT.id = this.ID
      updateInvoiceNo(this.paramsT).then(res => {
        this.getAll()
        this.show = false
      })
    },
    seeMessage() {
      this.isShow = true
    }
  }
}
</script>
