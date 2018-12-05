<template>
  <div>
    <h3 style="margin-bottom: 10px">渠道合伙人管理</h3>

    <Card>
      <Row :gutter="10" type="flex" justify="end" class="mb20">
        <!-- <Form :labelWidth="100"> -->
          <i-col>
            <!-- <Button type="success" @click="channelParAdd" icon="plus">
              添加渠道合伙人
            </Button> -->
          </i-col>
          <i-col style="flex: 1; display: flex; justify-content: flex-end">
            <!-- <Row :gutter="10">
              <formItem label="">
                <i-col span="8">
                  <Select v-model="searchForm.provice" placeholder="选择省份" inline clearable @on-change="changeProvince">
                    <Option v-for="item in provinceList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
                  </Select>
                </i-col>
                <i-col span="8">
                  <Select v-model="searchForm.city" placeholder="选择市/区" inline clearable @on-change="changeCity">
                    <Option v-for="item in cityList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
                  </Select>
                </i-col>
                <i-col span="8">
                  <Select v-model="searchForm.distric" placeholder="选择区/县" inline clearable>
                    <Option v-for="item in areaList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
                  </Select>
                </i-col>
              </formItem>
            </Row>
            <formItem label="">
              <Row :gutter="10" type="flex" justify="end">
                <i-col span="8"></i-col>
                <i-col span="8">
                  <Input placeholder="创建时间" v-model="searchForm.createTime"/>
                </i-col>
                <i-col span="8">
                  <Input placeholder="手机号" v-model="searchForm.modile"/>
                </i-col>
              </Row>
            </formItem> -->
            <Input v-model="searchForm.mobile" placeholder="输入手机号码" class="mr20 w160" clearable/>
            <Select v-model="searchForm.status" placeholder="选择合伙人状态" class="w160" clearable>
              <!-- <Option :value="1">待审核</Option> -->
              <Option :value="2">启用</Option>
              <Option :value="3">禁用</Option>
              <!-- <Option :value="4">审核不通过</Option> -->
            </Select>
            <!-- <Row :gutter="10">
              <Form :labelWidth="100">
                <i-col span="12">
                  <formItem label="合伙人账号">
                  </formItem>
                </i-col>
                <i-col span="12">
                  <formItem label="合伙人状态">
                  </formItem>
                </i-col>
              </Form>
            </Row> -->
          </i-col>
          <i-col>
            <Button type="primary" @click="getChannelParList" icon="search">
              查询
            </Button>
          </i-col>
        <!-- </Form> -->
      </Row>
      <Table :data="tableData" :columns="columns" border></Table>
      <Row type="flex" justify="end" style="margin-top: 20px">
        <Page :total="pager.totalCounts" show-sizer
              :page-size="pager.pageSize" :current.sync="pager.currentPage"
              @on-change="getChannelParList"
              @on-page-size-change="changePageSize"
        > </Page>
      </Row>
    </Card>
  </div>
</template>

<script>
import { getQuDaoList } from '@/api/channelPartner'
// import { activeSalesMan } from '@/api/salesMan'
import { getProvinceInfo, getCityInfo, getAreaInfo } from '@/api/common'
import { formatDate } from '@/libs/util'

export default {
  name: 'channelParList',
  data() {
    return {
      searchForm: {
        // provice: '',
        // city: '',
        // distric: '',
        // createTime: '',
        mobile: '',
        status: '',

        roleId: 2,
        userId: this.$store.state.user.userId
      },
      pager: {
        currentPage: 1,
        pageSize: 20,
        totalCounts: 0
      },
      columns: [
        {
          title: '序号',
          type: 'index'
        },
        {
          title: '渠道合伙人名称',
          key: 'partnerName'
        },
        {
          title: '地址',
          key: 'address'
        },
        // {
        //   title: '联系人',
        //   key: 'name'
        // },
        {
          title: '手机号',
          key: 'mobile'
        },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            let str = ''
            let color = ''
            switch (params.row.status) {
              case 1:
                str = '待审核'
                color = '#FF0000'
                break
              case 2:
                str = '启用'
                color = '#0099FF'
                break
              case 3:
                str = '禁用'
                color = '#FF0000'
                break
              case 4:
                str = '审核不通过'
                color = '#00CC00'
                break
              default:
                break
            }
            return h('span', { style: { color: color } }, str)
          }
        },
        {
          title: '创建时间',
          key: 'createTime',
          render(h, params) {
            return h('span', null, formatDate(new Date(params.row.createTime), 'yyyy-MM-dd hh:mm:ss'))
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          render: (h, params) => {
            // let status = params.row.status
            let act = ''
            let type = 'primary'
            let onclick = null
            // switch (status) {
            //   case 1:
            //     act = '审核'
            //     type = 'warning'
            //     onclick = () => this.$router.push({ name: 'channelParCheck', query: {id: params.row.id} })
            //     break
            //   case 2:
            //     act = '禁用'
            //     type = 'error'
            //     onclick = () => {
            //       this.$Modal.confirm({
            //         title: `确认禁用`,
            //         content: `<p>确定要禁用吗？`,
            //         onOk: () => {
            //           activeSalesMan({ status: 3, id: params.row.id }).then(res => this.getChannelParList())
            //         }
            //       })
            //     }
            //     break
            //   case 3:
            //     act = '启用'
            //     type = 'success'
            //     onclick = () => {
            //       this.$Modal.confirm({
            //         title: `确认启用`,
            //         content: `<p>确定要启用吗？`,
            //         onOk: () => {
            //           activeSalesMan({ status: 2, id: params.row.id }).then(res => this.getChannelParList())
            //         }
            //       })
            //     }
            //     break
            //   case 4:
            //     break
            //   default:
            //     break
            // }
            return h('div', [
              h('Button', {
                props: { type: 'primary', size: 'small' },
                style: { marginRight: '10px' },
                on: { click: () => this.$router.push({ name: 'channelParCheck', query: { id: params.row.id } }) }
              }, '查看'),
              // h('Button', {
              //   props: { type: 'success', size: 'small' },
              //   style: { marginRight: '10px' },
              //   on: { click: () => this.$router.push({ name: 'channelParAdd', query: { id: params.row.id } }) }
              // }, '编辑'),
              act && h('Button', {
                props: { type: type, size: 'small' },
                on: {
                  click: onclick
                }
              }, act)
            ])
          }
        }
      ],
      tableData: [
        // {
        //   id: 1,
        //   name: '渠道合伙人A',
        //   address: '南京路一号',
        //   parentName: '任务A',
        //   mobile: '134343577',
        //   status: 4,
        //   createTime: '2018-01-02'
        // },
        // {
        //   id: 2,
        //   name: '渠道合伙人A',
        //   address: '南京路一号',
        //   parentName: '任务A',
        //   mobile: '134343577',
        //   status: 1,
        //   createTime: '2018-01-02'
        // },
        // {
        //   id: 3,
        //   name: '渠道合伙人A',
        //   address: '南京路一号',
        //   parentName: '任务A',
        //   mobile: '134343577',
        //   status: 2,
        //   createTime: '2018-01-02'
        // },
        // {
        //   id: 4,
        //   name: '渠道合伙人A',
        //   address: '南京路一号',
        //   parentName: '任务A',
        //   mobile: '134343577',
        //   status: 3,
        //   createTime: '2018-01-02'
        // }
      ],
      provinceList: [], // 省列表
      cityList: [], // 市列表
      areaList: [] // 区列表
    }
  },
  created() {
    this.getChannelParList()
    this._getProvinceInfo()
  },
  methods: {
    channelParAdd() {
      this.$router.push({ name: 'channelParAdd' })
    },
    changePageSize(size) {
      this.pager.pageSize = size
      this.getChannelParList()
    },
    getChannelParList() {
      getQuDaoList({ mobile: this.searchForm.mobile,
        status: this.searchForm.status,
        roleId: 2,
        userId: this.searchForm.userId,
        pageNum: this.pager.currentPage,
        parentRoleId: this.$store.state.user.roleId,
        pageSize: this.pager.pageSize }).then(res => {
        this.tableData = res.data.list
        this.pager.totalCounts = res.data.total
      })
    },
    changeProvince(value) {
      console.log(value)
      if (!value) return
      this.searchForm.city = ''
      this.searchForm.distric = ''
      var pid = this.provinceList.find(item => item.identity === value).id
      return getCityInfo(pid).then(res => (this.cityList = res))
    },
    changeCity(value) {
      if (!value) return
      this.searchForm.distric = ''
      let pid = this.cityList.find(item => item.identity === value).id
      return getAreaInfo(pid).then(res => (this.areaList = res))
    },
    _getProvinceInfo() {
      getProvinceInfo().then(res => (this.provinceList = res))
    }
  }
}
</script>
