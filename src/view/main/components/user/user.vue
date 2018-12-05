<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick" placement="bottom-end">
      <Avatar :src="userAvator"/>
      <Icon :size="12" type="arrow-down-b"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem v-for="(item) in accessList" :key="item.code" :name="item.code" >
          <commonIcon :type="getIcon(item.code)" :color="getColor(item.code)" :size="34"></commonIcon>
          <span>{{ item.name }}</span>
        </DropdownItem>
        <DropdownItem name="logout" divided>
          <commonIcon type="svg_log-out" :size="14"></commonIcon>
          <span>退出</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'
import commonIcon from '_c/common-icon'
import iconMap from '../iconMap'

export default {
  name: 'User',
  props: {
    userAvator: {
      type: String,
      default: ''
    }
  },
  computed: {
    accessList() {
      return this.$store.state.user.accessList
    }
  },
  created() {
    let role = this.$store.state.user.access[0]
    if (iconMap[role]) {
      document.title = iconMap[role][2]
    }
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    getIcon(code) {
      return iconMap[code] ? iconMap[code][0] : 'user'
    },
    getColor(code) {
      return iconMap[code] ? iconMap[code][1] : ''
    },
    changeRole(code) {
      console.log(code)
    },
    handleClick (name) {
      switch (name) {
        case 'logout':
          this.handleLogOut().then(() => {
            this.$router.push({
              name: 'login'
            })
            location.reload() // In order to re-instantiate the vue-router object to avoid bugs
          })
          break
        default:
          if (iconMap[name]) {
            document.title = iconMap[name][2]
          }
          this.$store.dispatch('handleAccess', name)
          this.$router.push({ name: 'home' })
          break
      }
    }
  },
  components: {
    commonIcon
  }
}
</script>

<style lang="less" scoped>
.user-avator-dropdown {
  /deep/ .ivu-dropdown-menu {
    display: flex;
    flex-flow: wrap;
    width: 240px;
    .ivu-dropdown-item:not(:last-of-type) {
      flex: 0 1 50%;
      flex-direction: column;
      text-align: center;

      span {
        display: block;
      }
    }
    .ivu-dropdown-item:last-of-type {
      flex: 1 1 100%;
      text-align: center;
      span {
        vertical-align: middle;
      }
    }
  }
}
</style>
