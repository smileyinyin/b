<style lang="less" scoped>
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="header-bar">
      <img src="../../assets/LOGO1.png" alt="上下网">
      <div class="sxw">上下科技</div>
      <div class="title">合伙人 - {{ city }}</div>
    </div>
    <div class="login-con">
      <!-- <img src="../../assets/images/logo.png" alt="上下网" style="margin-bottom:10px"> -->
      <Card icon="log-in" :bordered="false">
        <p class="mt20 mb20 title">合伙人业务处理平台</p>
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">
            版权所有(c) 2013-2018. All rights reserved.
            <br/>
            上下科技 版权所有
            <!-- <CommonIcon type="locked"/>
            <span @click="forget" style="color: #57a3f3;cursor: pointer;">忘记密码？</span> -->
          </p>
        </div>
      </Card>
    </div>
    <Modal v-model="modal" title="选择一个角色登录" @on-ok="ok" class-name="login-roleModal">
      <RadioGroup v-model="roleRadio">
        <Radio v-for="item in roleList" :key="item.id" :label="item.code" >{{ item.name }}</Radio>
      </RadioGroup>
    </Modal>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import CommonIcon from '_c/common-icon'
import { mapActions } from 'vuex'
import md5 from 'md5'

const CITY = {
  'wuxi': '无锡'
}[process.env.VUE_APP_MODE] || '杭州'

export default {
  components: {
    LoginForm,
    CommonIcon
  },
  data() {
    return {
      modal: false,
      roleList: [],
      roleRadio: '',
      city: CITY
    }
  },
  methods: {
    ...mapActions([
      'handleLogin'
    ]),
    ok() {
      this.$store.dispatch('handleAccess', this.roleRadio)
      this.$router.push({ name: 'home' })
    },
    handleSubmit ({ userName, password }) {
      password = md5(password)
      this.handleLogin({ userName, password }).then(res => {
        let roleList = res.businessRole
        if (roleList.length > 1) {
          this.modal = true
          this.roleList = roleList
          this.roleRadio = roleList[0].code
        } else {
          this.roleRadio = roleList[0].code
          this.$router.push({ name: 'home' })
        }
      })
    },
    forget() {
      console.log('忘记密码')
    }
  }
}
</script>

<style>
  .login-roleModal .ivu-modal-body {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
