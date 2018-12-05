<template>
  <div>
    <h3 style="margin-bottom: 10px">供应商详情</h3>

    <Card>
      <Form>
        <formItem label="供应商名称">{{ supply.name }}</formItem>
        <formItem label="联系人">{{ supply.linkMan }}</formItem>
        <formItem label="联系方式">{{ supply.mobile }}</formItem>
        <formItem label="供应商简介">{{ supply.summary }}</formItem>
        <formItem label="证件">
          <img :src="this.supply.license" alt="证件照">
        </formItem>
        <formItem label="地区">{{ supply.province + supply.city + supply.area }}</formItem>
      </Form>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'supplyCheck',
  data() {
    return {
      supply: {
        id: '',
        name: '', // 供应商名称
        provinceCode: '', // 省 编码
        cityCode: '', // 市 编码
        areaCode: '', // 区 编码
        province: '', // 省 中文
        city: '', // 市 中文
        area: '', // 区 中文
        linkMan: '', // 联系人
        mobile: '', // 联系方式
        summary: '', // 简介
        license: '', // 证件照
        longitude: '', // 经纬度
        latitude: ''
      }
    }
  },
  created() {
    let id = this.$route.query.id
    this.supply.id = id
    this._getSupply(id)
  },
  methods: {
    _getSupply(id) {
      getSupply({id}).then(res => {
        this.supply = res.data
      })
    }
  }
}
</script>
