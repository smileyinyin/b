<template>
  <Layout class="main" :class="{'mobile': isMobile, 'opened': isOpened}">
    <Header class="header-con">
      <header-bar :collapsed="collapsed">
        <user :user-avator="userAvator"/>
        <span style="margin-right: 20px;">HELLO, {{ mobile }}! </span>
        <router-link to="/help">
          <Tooltip content="查看帮助"  class="pl20 pr20">
            <img src="../../assets/help/help.png"/>
          </Tooltip>
        </router-link>
        <sider-trigger :collapsed="collapsed" icon="navicon-round" @on-change="handleCollapsedChange"></sider-trigger>
      </header-bar>
    </Header>
    <div class="layer" @click="closeLayer"></div>
    <Layout style="overflow:hidden;">
      <Sider hide-trigger collapsible :width="220" :collapsed-width="64" v-model="collapsed" class="sider">
        <transition name="fade-transform" mode="out-in">
          <div class="left-side" v-show="isMenuShow" :class="{'collapsed': collapsed }" :style="{transition: !collapsed ? undefined : 'width .4s' }">
            <side-menu accordion :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList">
              <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
              <!-- <div class="logo-con" v-show="!collapsed">
                <p>{{ currentRole }}</p>
              </div> -->
            </side-menu>
          </div>
        </transition>
      </Sider>
      <Content class="content-wrapper" :style="{marginLeft: isMobile ? '' : collapsed ? '64px' : '220px'}">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="cacheList">
            <router-view :key="key"/>
          </keep-alive>
        </transition>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import siderTrigger from './components/header-bar/sider-trigger'
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import User from './components/user'
import './main.less'

const WIDTH = 1024
const RATIO = 3

export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    siderTrigger,
    User
  },
  data () {
    return {
      isMobile: false,
      isOpened: false,
      isMenuShow: true,
      // : false,
      isFullscreen: false
    }
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    },
    collapsed() {
      return this.$store.state.app.collapsed
    },
    userName () {
      return this.$store.state.user.userName
    },
    mobile () {
      return this.$store.state.user.mobile
    },
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    tagRouter () {
      return this.$store.state.app.tagRouter
    },
    userAvator () {
      return this.$store.state.user.avatorImgPath
    },
    cacheList () {
      return this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []
    },
    menuList () {
      return this.$store.getters.menuList
    },
    local () {
      return this.$store.state.app.local
    },
    accessList() {
      return this.$store.state.user.accessList
    },
    currentRoleCode() {
      let access = this.$store.state.user.access
      return access ? access[0] : ''
    },
    currentRole() {
      if (this.currentRoleCode) {
        return this.accessList.find(v => v.code === this.currentRoleCode).name
      }
      return this.accessList[0].name
    }
  },
  watch: {
    menuList() {
      this.isMenuShow = false
      setTimeout(() => {
        this.isMenuShow = true
      }, 350)
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    const isMobile = this.isNowMobile()
    this.isMobile = isMobile
  },

  methods: {
    isNowMobile() {
      const rect = document.body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isNowMobile()
        this.isMobile = isMobile
        if (isMobile) {
          // this.collapsed = false
          this.$store.commit('setCollapsed', false)
        }
      }
    },

    turnToPage (name) {
      this.isOpened = false
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name: name
      })
    },
    handleCollapsedChange (state) {
      // this.collapsed = state
      if (!this.isMobile) {
        this.$store.commit('setCollapsed', state)
        // this.collapsed = state
      } else {
        this.isOpened = !this.isOpened
      }
    },
    closeLayer() {
      this.isOpened = !this.isOpened
    }
  }
}
</script>

<style>
/*fade-transform*/
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .4s!important;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
<style lang="less" scoped>
/* .logo-con .ivu-dropdown {
  text-align: center;
  overflow: hidden;
  align-self: stretch;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.logo-con .ivu-dropdown /deep/ .ivu-dropdown-rel {
  width: 154px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
} */

.main {
  width: 100%;
  height: 100%;

  .sider {
    position: fixed;
    top: 64px;
    bottom: 0px;
    left: 0px;
    z-index: 9;
    box-shadow: 0 2px 10px 0 rgba(7, 17, 27, 0.1);
  }

  .logo-con .ivu-dropdown {
    text-align: center;
    overflow: hidden;
  }

  .left-side {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    width: 240px;

    &.collapsed {
      width: 84px;
    }
  }
  .ivu-layout-sider {
    align-self: stretch;
  }
  .ivu-layout-sider /deep/ .ivu-layout-sider-children {
    overflow-x: hidden;
  }

  &.mobile {
    /deep/ .header-bar {
      padding: 0;
      p {
        display: none;
      }
    }

    .sider {
      position: fixed;
      top: 64px;
      bottom: 0px;
      left: -240px;
      z-index: 9;

      &.collapsed {
        left: 0px;
      }
    }

    &.opened {
      .layer {
        background: #000;
        height: 100%;
        opacity: .3;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 8;
      }
      .sider {
        left: 0px;
      }
    }
  }
}
// .left-side {
//   height: 100%;
//   overflow-x: hidden;
//   overflow-y: scroll;
// }
// .ivu-layout-sider {
//   align-self: stretch;
// }
// .ivu-layout-sider /deep/ .ivu-layout-sider-children {
//   overflow-x: hidden;
// }
</style>
