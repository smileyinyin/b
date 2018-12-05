<template>
  <div class="update-password">
    <h3 class="pb20">修改密码</h3>
    <Card>
      <Row>
        <Col span="24">
          <Form :label-width="100" label-position="left" class="form" style="width: 400px; margin: 200px auto" ref="form" :model="params" :rules="rules">
            <!-- <FormItem label="原密码：" prop="oldPassword">
              <Input placeholder="请输入原密码" clearable v-model="params.oldPassword" type="password" />
            </FormItem> -->
            <FormItem label="新密码：" prop="newPassword">
              <Input placeholder="请输入新密码" clearable v-model="params.newPassword" type="password" />
            </FormItem>
            <FormItem label="确认新密码：" prop="againNewPassword">
              <Input placeholder="确认新密码" clearable v-model="againNewPassword" type="password" @on-blur="params.againNewPassword = againNewPassword" />
            </FormItem>
            <FormItem label="验证码：" prop="vertifyCode">
              <Input placeholder="验证码" clearable v-model="params.vertifyCode" >
                <Button slot="append" @click="sendCode" :disabled="!!countdownNum">{{ countdownNum || '发送验证码' }}</Button>
              </Input>
            </FormItem>
            <FormItem label="">
              <Button type="primary" @click="update">确认修改</Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </Card>
  </div>
</template>
<script>
import { sendCode, updatePasswordByCode } from '@/api/personalCenter'
import md5 from 'md5'

export default {
  name: 'update-password',
  data() {
    return {
      countdownNum: '',
      againNewPassword: null,
      params: {
        // oldPassword: null,
        newPassword: null,
        againNewPassword: null,
        vertifyCode: ''
      },
      rules: {
        // oldPassword: [
        //   { required: true, message: '请填写原密码', trigger: 'blur' }
        // ],
        newPassword: [
          { required: true, message: '请填写新密码', trigger: 'blur' }
        ],
        againNewPassword: [
          { required: true, message: '请填写新密码', trigger: 'blur' },
          {
            message: '两次填写密码不一致，请重新填写!',
            trigger: 'blur',
            validator: (value, rule, callback) => {
              if (this.againNewPassword !== this.params.newPassword) {
                callback(new Error())
              } else {
                callback()
              }
            }
          }
        ],
        vertifyCode: [
          { required: true, message: '请填写验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

    // 发送验证码
    sendCode() {
      this.countdown()

      // type: 1 修改密码， 0 注册
      sendCode({ type: 1, phoneNum: this.$store.state.user.mobile })
    },

    // 倒计时
    countdown(num = 10) {
      this.countdownNum = num ? num + 's后重试' : ''
      num && setTimeout(() => {
        this.countdown(num - 1)
      }, 1000)
    },

    update() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          updatePasswordByCode({
            // oldPassword: md5(this.params.oldPassword),
            // newPassword: md5(this.params.newPassword),
            password: md5(this.params.newPassword),
            phoneNum: this.$store.state.user.mobile,
            code: this.params.vertifyCode
          }).then(data => {
            this.$store.dispatch('handleLogOut').then(() => {
              this.$router.push({ name: 'login' })
            })
          })
        } else {
          this.$Message.error('请将信息填写完整')
        }
      })
    }
  }
}
</script>
