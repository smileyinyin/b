<template>
  <div class="modal-content">
    <div ref="left" class="left" @click.stop="choose(2)">小微商户<Icon type="checkmark-round"></Icon></div>
    <div ref="right" class="right" @click.stop="choose(1)">普通商户<Icon type="checkmark-round"></Icon></div>
  </div>
</template>

<script>
const activeClass = 'actived'

export default {
  name: 'merchantType',
  mounted() {
    this.choose(1)
  },
  methods: {
    choose(type) {
      this.changeActive(type)
      this.$emit('select', type)
    },
    changeActive(type) {
      if (type === 2) {
        this.$refs.right.classList.remove(activeClass)
        this.$refs.left.classList.add(activeClass)
      } else {
        this.$refs.left.classList.remove(activeClass)
        this.$refs.right.classList.add(activeClass)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.modal-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .left {
    background: #28b6f6 url("../../../assets/images/qiye.png");
    background-size: contain;
  }
  .right {
    background: #9ccc66 url("../../../assets/images/xiaowei.png");
    background-size: contain;
  }
  .left, .right {
    position: relative;
    font-size: 20px;
    cursor: pointer;
    width: 160px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    // background-color: #e9eaec;
    background-size: 200% 200%;
    background-position: 50% 30%;
    color: #fff;

    i {
      display: none;
    }

    &.actived i {
      // border: 1px solid #57a3f3;
      font-size: 26px;
      position: absolute;
      right: 10px;
      bottom: 10px;
      display: initial;
    }
  }
}
</style>
