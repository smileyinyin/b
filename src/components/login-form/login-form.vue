<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit" class="login-form">
    <FormItem prop="userName">
      <Input v-model.trim="form.userName" placeholder="账号：" />
      <img src="../../assets/account.png" class="input-icon"/>
    </FormItem>
    <FormItem prop="password" style="margin-bottom: 10px">
      <Input type="password" v-model="form.password" placeholder="密码：" />
      <img src="../../assets/password.png" class="input-icon"/>
    </FormItem>
    <FormItem style="margin-bottom: 10px">
      <Checkbox v-model="isRemember"> 记住密码</Checkbox>
    </FormItem>
    <FormItem style="margin-bottom: 10px">
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        userName: '',
        password: ''
      },
      isRemember: false
    }
  },
  created() {
    var loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
    if (loginInfo) {
      this.isRemember = true
      this.form.userName = loginInfo.userName
      this.form.password = loginInfo.password
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      if (this.isRemember) {
        localStorage.setItem('loginInfo', JSON.stringify(this.form))
      } else {
        localStorage.removeItem('loginInfo')
      }
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-form {
  /deep/ .ivu-input {
    padding-left: 32px;
  }
  .input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translate3d(-50%,-50%,0);
  }
}
</style>
