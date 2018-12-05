<template>
  <div class="pos-terminal-list">
    <h3 class="pb10">pos终端列表</h3>
    <Card>
      <Row>
        <i-col span="24" align="right">
          <Select class="w120 mr20 tl" placeholder="请选择pos机品牌" v-model="params.brandId" clearable>
            <Option :value="1">新大陆</Option>
            <Option :value="2">嘉联</Option>
          </Select>
          <Input placeholder="请输入终端号" class="w120 mr20" clearable v-model="params.terminalNumber" />
          <Input placeholder="请输入商户名称" class="w120 mr20" clearable v-model="params.merchantsName" v-if="this.$store.state.user.roleId !== 4"/>
          <Input placeholder="请输入门店名称" class="w120 mr20" clearable v-model="params.storesName" v-else/>
          <Input placeholder="请输入激活码" clearable class="w120 mr20" v-model="params.activeCode" />
          <Input placeholder="请输入CSN号" clearable class="w120 mr20" v-model="params.posCsn" />
          <!-- <Input placeholder="请输入合伙人名称" clearable class="w180 mr20" v-model="params.code" />
          <Input placeholder="请输入商户名称" clearable class="w180 mr20" v-model="params.code" /> -->
          <DatePicker type="datetimerange" placement="bottom-end" placeholder="选择创建时间" class="w300 mr20" v-model="createTime"></DatePicker>
          <Button type="primary" icon="ios-search" @click="getAll">查询</Button>
        </i-col>
      </Row>
      <Table border :columns="columns" :data="tableData" class="mt20"></Table>
      <Page :total="totalCounts" show-sizer :page-size="params.pageSize" :current.sync="params.currentPage" @on-change="getEntryList" @on-page-size-change="changePageSize" class="mt20 tr"> </Page>
    </Card>
    <Modal v-model="isShowActive" :mask-closable="false" :closable="true" :title="title" class-name="vertical-center-modal">
        <div slot="footer">
            <Button type="text" size="large" @click="isShowActive = false">取消</Button>
            <Button type="primary" size="large" @click="sureActive">确定</Button>
        </div>
        <Form :label-width="80">
          <FormItem label="CSN号：">
            <span>{{ycsn}}</span>
          </FormItem>
          <FormItem label="备注：">
            <Input type="textarea" :rows="4" placeholder="请输入备注" v-model="text"/>
          </FormItem>
        </Form>
    </Modal>
    <Modal v-model="show" :mask-closable="false" :closable="true" :title="title" class-name="vertical-center-modal">
        <div slot="footer">
            <Button type="text" size="large" @click="isShowActive = false">取消</Button>
            <Button type="primary" size="large" @click="sure">确定</Button>
        </div>
        <Form :label-width="80">
          <FormItem label="原CSN号：">
            <span>{{ycsn}}</span>
          </FormItem>
          <FormItem label="新CSN号：">
            <Input  placeholder="请输入新CSN号" class="w200 mr20" v-model="hcsn"/>
            <!-- <Button type="primary" @click="find">查询</Button> -->
          </FormItem>
          <FormItem label="备注：">
            <Input type="textarea" :rows="4" placeholder="请输入备注" v-model="text"/>
          </FormItem>
        </Form>
    </Modal>
    <Modal v-model="isShow" :mask-closable="false" :closable="true" title="未达标原因" class-name="vertical-center-modal">
        <div slot="footer">
            <Button type="primary" size="large" @click="isShow = false">确定</Button>
        </div>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
           <tr style="text-align:center">
             <td style="border:1px solid #6C6C6C;border-bottom:none">CSN</td>
             <td style="border:1px solid #6C6C6C;border-bottom:none;border-left:none">所在商户</td>
             <td style="border:1px solid #6C6C6C;border-bottom:none;border-left:none">购买政策</td>
             <td style="border:1px solid #6C6C6C;border-bottom:none;border-left:none">未达标的原因</td>
           </tr>
           <tr>
            <td style="border:1px solid #6C6C6C">{{data.csn}}</td>
            <td style="border:1px solid #6C6C6C;border-left:none">{{data.store}}</td>
            <td style="border:1px solid #6C6C6C;border-left:none">{{data.shop}}</td>
            <td style="color:red;border:1px solid #6C6C6C;border-left:none">{{data.isStandard}}</td>
           </tr>
        </table>
    </Modal>
  </div>
</template>

<script>
import { formatDate } from '@/libs/util'
import { findCityStorePosList,
  removeStoresPos, changeStoresPos
} from '@/api/entry'
import makeColumn from './column'
export default {
  name: 'pos-terminal-list',
  data() {
    return {
      createTime: [],
      isShow: false, // 未达标原因弹框
      isShowActive: false,
      show: false,
      id: null,
      status: null,
      activeCode: null,
      // 原csn
      ycsn: '',
      // 当前每条的id
      posId: null,
      // 备注
      text: '',
      // 换的csn
      hcsn: '',
      data: {
        csn: '',
        store: '',
        shop: '',
        isStandard: ''
      },
      params: {
        userId: this.$store.state.user.userId,
        roleId: this.$store.state.user.roleId,
        startTime: '',
        endTime: '',
        posCsn: null,
        activeCode: '',
        brandId: null,
        terminalNumber: null,
        currentPage: 1,
        pageSize: 20,
        storesName: '',
        merchantsName: ''
      },
      title: '',
      currentPage: 1,
      posAppStatus: '',
      totalCounts: 0,
      pageSize: 20,
      date: '',
      posApply: '',
      num: null,
      terminalNumber: '', // 终端号
      merchantUUID: '', // 商户号
      posCsn: '', // csn
      tableDataT: [],
      columns: makeColumn.call(this, this.$store.state.user.access[0]),
      tableData: []
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    getAll() {
      if (this.createTime.length === 2) {
        this.params.startTime = formatDate(this.createTime[0], 'yyyy-MM-dd hh:mm:ss')
        this.params.endTime = formatDate(this.createTime[1], 'yyyy-MM-dd hh:mm:ss')
      }
      this.params.posCsn = this.params.posCsn ? this.params.posCsn : null
      findCityStorePosList(this.params).then(res => {
        if (res.data) {
          this.tableData = res.data.list
          this.totalCounts = res.data.total
        } else {
          this.tableData = []
          this.totalCounts = 0
        }
      })
    },
    // 分页改变
    getEntryList(val) {
      this.params.currentPage = val
      this.getAll()
    },
    // 每页显示列表条数
    changePageSize(val) {
      this.params.pageSize = val
      this.getAll()
    },
    // 解绑
    sureActive() {
      // if (!this.text) {
      //   this.$Message.error('请将信息填写完整！')
      // }
      removeStoresPos({ id: this.posId, posCsn: this.ycsn, context: this.text }).then(res => {
        this.getAll()
        this.isShowActive = false
      })
    },
    // 换绑
    sure() {
      // if (!this.text) {
      //   this.$Message.error('请将信息填写完整！')
      // }
      changeStoresPos({ id: this.posId, posCsn: this.hcsn, context: this.text }).then(res => {
        this.getAll()
        this.show = false
      })
    },
    find() {}
  }
}
</script>
