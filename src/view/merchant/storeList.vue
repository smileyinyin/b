<template>
  <!-- <div>门店列表 {{ $route.params.id }}</div> -->
  <div class="store-list">
    <bread-crumb :data="[
      {path: merchantPath, title: '商户管理'},
      {title: '门店管理'}
    ]"></bread-crumb>

    <Card>
      <Row class="pb20" type="flex">
        <i-col>
          <Button type="primary" @click="addStore" icon="plus" class="btn-add mb20" v-permission="['SXR001']" v-if="merchant && merchant.mold !== 0">新增门店</Button>
        </i-col>
        <i-col style="flex:1">
          <Row :gutter="20" type="flex" justify="end" align="middle">
            <!-- <i-input v-model="searchForm.storename" placeholder="门店名称" clearable style="width: 150px; margin-right: 20px;"></i-input> -->
            <!-- <i-input v-model="searchForm.name" placeholder="门店店长" clearable style="width: 150px; margin-right: 20px;"></i-input> -->
            <!-- <Select v-model="searchForm.status" placeholder="全部状态" clearable style="width: 120px; margin-right: 20px;">
              <Option value="1" key="1">草稿</Option>
              <Option value="2" key="2">提交</Option>
              <Option value="3" key="3">正常</Option>
              <Option value="4" key="4">审核失败</Option>
              <Option value="5" key="5">停业</Option>
            </Select> -->
          </Row>
        </i-col>
        <i-col>
          <i-button type="primary" icon="search" @click="getStoreList(1)">
            查 询
          </i-button>
        </i-col>
      </Row>
      <Table border :columns="columns" :data="tableData"></Table>
      <Row type="flex" justify="end" align="middle" style="margin-top: 10px">
        <Page :total="pager.totalCounts" show-sizer
              :page-size="pager.pageSize" :current.sync="pager.currentPage"
              @on-change="getStoreList"
              @on-page-size-change="changePageSize"
        > </Page>
      </Row>
    </Card>
  </div>
</template>

<script>
import breadCrumb from '_c/breadCrumb/breadCrumb'
import { mapMutations } from 'vuex'
import { unique } from '@/libs/util'
import { getStoreList, getStoresActive } from '@/api/merchant'

export default {
  name: 'storeList',
  data() {
    return {
      merchant: '', // 所属的商户对象
      merchantPath: '/merchantList',
      searchForm: {
        storename: '',
        name: '',
        status: ''
      },
      pager: {
        pageSize: 20,
        currentPage: 1,
        totalCounts: 0
      },
      columns: [
        {
          title: '序号',
          type: 'index'
        },
        {
          title: '门店名称',
          key: 'name'
        },
        {
          title: '门店地址',
          key: 'addressDetail'
        },
        {
          title: '门店电话',
          key: 'storesTelephone'
        },
        // {
        //   title: '商品数',
        //   key: 'goodsNumber',
        //   render: (h, params) => {
        //     return h(
        //       'span',
        //       {
        //         // class: 'link',
        //         on: {
        //           click: () => this.goStoreList(params.row)
        //         }
        //       },
        //       params.row.goodsNumber
        //     )
        //   }
        // },
        // {
        //   title: '会员数目',
        //   key: 'memberNumber',
        //   render: (h, params) => {
        //     return h(
        //       'span',
        //       {
        //         // class: 'link',
        //         on: {
        //           click: () => this.goMemberList(params.row)
        //         }
        //       },
        //       params.row.memberNumber
        //     )
        //   }
        // },
        {
          title: 'POS数目',
          key: 'posNumber',
          render: (h, params) => {
            return h(
              'span',
              {
                // class: 'link',
                on: {
                  click: () => this.goPosList(params.row)
                }
              },
              params.row.posNumber
            )
          }
        },
        {
          title: '状态',
          key: 'status', // 1启用  2 停用
          render: (h, params) => {
            return h('span', null, params.row.status === 1 ? '启用' : '停用')
          }
        },
        {
          title: '操作',
          key: 'action',
          // width: 250,
          align: 'center',
          render: (h, params) => {
            // var status = params.row.status
            var btn = [
              h(
                'Button',
                {
                  props: { size: 'small', type: 'primary' },
                  style: { marginRight: '5px' },
                  on: {
                    click: () => {
                      this.setStore(params.row)
                      this.$router.push({ name: 'storeAdd' })
                    }
                  }
                },
                '查看'
              ),
              // h(
              //   'Button',
              //   {
              //     props: { type: status === 2 ? 'success' : 'error', size: 'small' },
              //     style: { marginRight: '5px' },
              //     on: {
              //       click: () => {
              //         // debugger
              //         this.useOrStop(params.row.id, status)
              //       }
              //     }
              //   },
              //   status === 2 ? '启用' : '停用'
              // )
              // h(
              //   'Button',
              //   {
              //     props: { size: 'small', type: 'primary' },
              //     style: { marginRight: '5px' },
              //     on: {
              //       click: () => {
              //         this.setStore(params.row)
              //         this.$router.push({ name: 'storeAdd' })
              //       }
              //     }
              //   },
              //   '修改'
              // )
              h( // B端无进件
                'Button',
                {
                  props: { type: 'info', size: 'small' },
                  style: { marginRight: '5px' },
                  directives: [ // 只有城市合伙人 拥有 编辑操作
                    { name: 'permission', value: ['SXR001'] }
                  ],
                  on: {
                    click: () => {
                      this.$router.push({ name: 'posList', params: { fromStore: true } })
                    }
                  }
                },
                '进件'
              )
            ]
            return h('div', btn)
          }
        }
      ],
      tableData: []
    }
  },
  computed: {
    isCitypartner() {
      return this.$store.state.user.access && this.$store.state.user.access[0] === 'SXR001'
    },
    isStoreRole() { // 判断当前用户是否商户角色
      return this.$store.state.user.access && this.$store.state.user.access[0] === 'SXR004'
    }
  },
  watch: {
    '$store.state.user.storesId': {
      immediate: true,
      handler(value) {
        // debugger
        if (this.isStoreRole) { // 商户角色
          this.merchant = { id: String(unique(value)) }
          this.getStoreList()
        }
      }
    }
  },
  created() {
    // debugger
    // 商户角色可直接进入此页面; 其他角色只允许从 商户列表进入，若商户 为空，弹回商户列表
    if (this.isStoreRole) {
      this.merchantPath = undefined
      return
    }
    this.merchant = this.$store.state.merchant.merchant
    if (!this.merchant || !this.merchant.id) {
      this.$router.replace({ name: 'merchantList' })
      return
    }
    this.getStoreList()
  },
  methods: {
    ...mapMutations([
      'setStore'
    ]),
    addStore() {
      // debugger
      this.setStore(null)
      this.$router.push({ name: 'storeAdd' })
    },
    getStoreList(page) {
      if (!this.merchant.id) {
        return
      }
      this.pager.currentPage = page || this.pager.currentPage
      let query = Object.assign({}, this.pager, this.searchForm, { merchantId: this.merchant.id })
      getStoreList(query).then(res => {
        this.tableData = res.data
        this.pager.totalCounts = res.totalCounts
      })
    },
    useOrStop(makertId, marketStatus) {
      if (marketStatus === 1) {
        // console.log('即将 停用。。。')
        this.$Modal.confirm({
          title: '确认停用',
          content: '<p>确定要停用吗？</p><br/>',
          onOk: () => {
            getStoresActive({ makertId, marketStatus: 2 }).then(res => {
              this.getStoreList()
            })
          }
        })
      } else if (marketStatus === 2) {
        this.$Modal.confirm({
          title: '确认启用',
          content: '<p>确定要启用吗？</p><br/>',
          onOk: () => {
            getStoresActive({ makertId, marketStatus: 1 }).then(res => {
              this.getStoreList()
            })
          }
        })
        // console.log('即将 启用。。。')
      }
    },
    goStoreList() {},
    goMemberList() {},
    goPosList() {},
    changePageSize(size) {
      this.pager.size = size
      this.getStoreList()
    }
  },
  components: {
    breadCrumb
  }
}
</script>

<style lang="less" scoped>
.store-list {
  /deep/ .link {
    padding: 5px;
    cursor: pointer;
    color: #2d8cf0;
  }
}
</style>
