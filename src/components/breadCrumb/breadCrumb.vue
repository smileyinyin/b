<template>
  <Breadcrumb class="mb10">
    <span @click="goBack" style="margin-right: 10px;padding-right:10px; border-right: 1px solid #88b7e0; color: #88b7e0; cursor:pointer;">
      <span><Icon type="chevron-left"></Icon> 返回 </span>
    </span>
    <BreadcrumbItem v-for="item in data" :key="item.path"
      :to="item.path">{{ item.title }}</BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
export default {
  name: 'breadCrumb',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
