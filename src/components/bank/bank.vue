<template>
  <div class="bank">
    <span class="mr20" v-if="bankBranchName">{{bankBranchName}}</span>
    <Button type="primary" @click="select">选择支行</Button>
    <Modal v-model="isShow" :mask-closable="false" :closable="true" title="选择支行" width="800" class-name="flex-between">
        <div slot="footer">
            <Button type="text" size="large" @click="isShow = false; params.LBNK_CD_NM = ''; provinceId = ''; cityId = '';">取消</Button>
            <Button type="primary" size="large" @click="posDown">确定</Button>
        </div>
        <Row>
          <Col span="24" align="right">
            <Input placeholder="请输入总行名称" v-model="params.LBNK_CD_NM" class="w180 mr20" />
            <Select placeholder="省" :label-in-value="true" clearable class="w180 mr20 tl" v-model="provinceId" @on-change="selectProvice">
                <Option v-for="(item, index) in proviceList" :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
            <Select placeholder="市" :label-in-value="true" clearable  class="w180 mr20 tl" v-model="cityId" @on-change="selectCity">
                <Option v-for="(item, index) in cityList" :key="index" :value="item.name">{{item.name}}</Option>
            </Select>
            <Button type="primary" @click="getAll">查询</Button>
          </Col>
        </Row>
        <Table border :columns="columns" :data="tableData" class="mt20" @on-selection-change="changeSelect" ref="selection"></Table>
        <Row type="flex" justify="end" align="middle" style="margin-top: 10px">
        <Page :total="params.totalCounts" show-sizer
              :page-size="params.pageSize" :current.sync="params.currentPage"
              @on-change="getAll"
              @on-page-size-change="changePageSize"
        > </Page>
      </Row>
    </Modal>
  </div>
</template>

<script>
import { getProvinceInfo, getBankCode, getCityInfo } from '@/api/common'
export default {
  name: 'bank',
  props: {
    bankBranchName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isShow: false,
      tableData: [],
      list: [],
      provinceId: '',
      cityId: '',
      params: {
        LBNK_CD_NM: '', // 总行名称
        PROV_NM: '', // 省
        CITY_NM: '', // 市
        currentPage: 1,
        pageSize: 20,
        totalCounts: 0
      },
      proviceList: [],
      cityList: [],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        }, {
          title: '支行名称',
          key: 'lbnk_NM'
        }, {
          title: '联行号',
          key: 'lbnk_NO'
        }
      ]
    }
  },
  methods: {
    select() {
      this.isShow = true
      getProvinceInfo().then(res => {
        this.proviceList = res
      })
    },
    selectProvice(value) {
      this.cityId = null
      if (!value) return
      this.params.PROV_NM = value.label
      getCityInfo(this.provinceId).then(res => {
        this.cityList = res
      })
    },
    selectCity(value) {
      if (!value) return
      this.params.CITY_NM = value.label
    },
    changeSelect(val) {
      this.list = val
    },
    changePageSize(size) {
      this.params.pageSize = size
      this.getAll()
    },
    getAll() {
      if (!this.provinceId) {
        this.$Message.error('请选择省！')
        return
      }
      if (!this.cityId) {
        this.$Message.error('请选择市！')
        return
      }
      if (!this.params.LBNK_CD_NM) {
        this.$Message.error('请输入总行！')
        return
      }
      getBankCode(this.params).then(res => {
        this.tableData = res.data
        this.params.totalCounts = res.objectotalNumber
        this.list = []
      })
    },
    posDown() {
      if (!this.list.length) {
        this.$Message.error('请选择一个支行')
        return
      }
      if (this.list.length > 1) {
        this.$Message.error('只能选择一个支行')
        return
      }
      this.$emit('getBank', this.list)
      this.isShow = false
    }
  }

}
</script>

<style>
  .bank .flex-between {
    flex-direction: column;
    justify-content: space-between;
  }

  .bank .flex-between:before, .flex-between:after {
      content: '';
      display: inline-block;
  }
</style>
