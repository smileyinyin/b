<template>
  <div>
    <h3 style="margin-bottom:10px">业务员管理</h3>

    <Card>
      <Row :gutter="10" type="flex" class="mb20">
        <!-- <Form :labelWidth="100"> -->
          <i-col>
            <Button class="btn-add" @click="addSalesMan" icon="plus">添加业务员</Button>
          </i-col>
          <i-col style="flex: 1; display: flex; justify-content: flex-end;">
            <Input v-model="searchForm.mobile" placeholder="输入手机号码" class="w160 mr20" clearable/>
            <!-- <formItem label="业务员账号">
            </formItem> -->
            <!-- <Select v-model="searchForm.status" class="w160" placeholder="请选择业务员状态" clearable>
              <Option :value="1">待认证</Option>
              <Option :value="2">启用</Option>
              <Option :value="3">禁用</Option>
            </Select> -->
          </i-col>
          <!-- <i-col span="8">
            <formItem label="业务员状态">
            </formItem>
          </i-col> -->
          <i-col>
            <!-- <formItem> -->
              <Button type="primary" @click="getPartnerList" icon="search">查询</Button>
            <!-- </formItem> -->
          </i-col>
        <!-- </Form> -->
      </Row>
      <Table :data="tableData" :columns="columns" border></Table>
      <Row type="flex" justify="end" style="margin-top: 20px">
        <Page :total="pager.totalCounts" show-sizer
              :page-size="pager.pageSize" :current.sync="pager.currentPage"
              @on-change="getPartnerList"
              @on-page-size-change="changePageSize"
        > </Page>
      </Row>
    </Card>
  </div>
</template>

<script>
import { getSalesManList } from '@/api/salesMan'
// import { getPartnerList } from '@/api/salesMan'
import { formatDate } from '@/libs/util'

export default {
  name: 'salesManList',
  data() {
    return {
      searchForm: {
        mobile: '',
        status: '',

        roleId: 3,
        userId: this.$store.state.user.userId
      },
      pager: {
        currentPage: 1,
        pageSize: 20,
        totalCounts: 0
      },
      columns: [
        {
          type: 'index',
          width: 60,
          title: '序号',
          align: 'center'
        },
        {
          title: '手机号',
          key: 'mobile'
        },
        {
          title: '姓名',
          key: 'partnerName'
        },
        {
          title: '添加时间',
          key: 'createTime',
          render: (h, params) => {
            return h('span', null, formatDate(new Date(params.row.createTime), 'yyyy-MM-dd hh:mm:ss'))
          }
        },
        // {
        //   title: '地址',
        //   key: 'address'
        // },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            let status = params.row.status
            let str = ''
            let color = ''
            switch (status) {
              case 1:
                str = '待审核'
                color = '#BFBFBF'
                break
              case 2:
                str = '已启用'
                color = '#0099FF'
                break
              case 3:
                str = '已禁用'
                color = '#FF0000'
                break
              case 4:
                str = '审核不通过'
                color = '#FF0000'
                break
              default:
                break
            }
            return h('span', [
              h('Icon', {
                props: { type: 'record' },
                style: { color: color }
              }),
              h('span', null, str)
            ])
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          render: (h, params) => {
            // let status = params.row.status
            // let str = ''
            // let type = 'primary'
            // if (status === 1) {
            //   str = '审核'
            //   type = 'info'
            // } else if (status === 2) {
            //   str = '禁用'
            //   type = 'error'
            // } else if (status === 3) {
            //   str = '启用'
            // }
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: { marginRight: '5px' },
                on: {
                  click: () => { this.$router.push({ name: 'salesManCheck', query: { id: params.row.id } }) }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => { // 编辑
                    this.eidt(params.row.id)
                  }
                }
              }, '编辑')
              //       str && h('Button', {
              //         props: {
              //           type: type,
              //           size: 'small'
              //         },
              //         style: {
              //           marginRight: '5px'
              //         },
              //         on: {
              //           click: () => { // 激活、禁用、审核
              //             this.active(params.row)
              //           }
              //         }
              //       }, str),
              //       false && h('Button', { // 删除先不做了
              //         props: {
              //           type: 'error',
              //           size: 'small'
              //         },
              //         on: {
              //           click: () => {
              //             this.remove(params.row.id)
              //           }
              //         }
              //       }, '删除')
            ])
          }
        }
      ],
      tableData: [
        // {
        //   'id': 1,
        //   'mobile': 123,
        //   'name': '大牛A',
        //   'createTime': '2018-07-05',
        //   'address': '北京市海淀区西二旗',
        //   'status': 1
        // },
        // {
        //   'id': 2,
        //   'mobile': 123,
        //   'name': '大牛A',
        //   'createTime': '2018-07-05',
        //   'address': '上海市浦东新区世纪大道',
        //   'status': 2
        // },
        // {
        //   'id': 3,
        //   'mobile': 123,
        //   'name': '大牛A',
        //   'createTime': '2018-07-05',
        //   'address': '深圳市南山区深南大道',
        //   'status': 3
        // }
      ]
    }
  },
  created() {
    this.getPartnerList()
  },
  methods: {
    eidt(id) {
      this.$router.push({ name: 'salesManAdd', query: { id } })
    },
    active(row) {
      if (row.status === 1) {
        this.$router.push({ name: 'salesManCheck', query: { id: row.id } })
        return
      }
      let oper = row.status === 2 ? '禁用' : '启用'
      this.$Modal.confirm({
        title: `确认${oper}`,
        content: `<p>确定要${oper}吗？`,
        onOk: () => {
          activeSalesMan({ status: row.status === 2 ? 3 : 2, id: row.id }).then(res => {
            this.getPartnerList()
          })
        }
      })
    },
    remove(id) {
      deleteSalesMan({ id }).catch(err => console.log(err))
    },
    changePageSize(size) {
      this.pager.pageSize = size
      this.getPartnerList()
    },
    getPartnerList() {
      getSalesManList({ mobile: this.searchForm.mobile,
        status: this.searchForm.status,
        roleId: 3,
        userId: this.searchForm.userId,
        pageNum: this.pager.currentPage,
        parentRoleId: this.$store.state.user.roleId,
        pageSize: this.pager.pageSize }).then(res => {
        this.tableData = res.data.list
        this.pager.totalCounts = res.data.total
      })
    },
    addSalesMan() {
      this.$router.push({ name: 'salesManAdd' })
    }
  }
}
</script>
