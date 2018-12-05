<template>
  <div class="binding-phone">
    <h3 style="padding-bottom: 10px">绑定手机</h3>
    <Card>
      <Row>
        <Col span="24" style="margin-top: 200px;" align="center">
          <Form :label-width="120" class="form" style="width:520px;" ref="form" :model="params" :rules="rules">
            <FormItem label="原绑定手机号：" prop="oldmobile">
              <Input placeholder="请输入原绑定手机号（确保真实有效）" style="width: 400px;" v-model="params.oldmobile" disabled />
            </FormItem>
            <FormItem label="短信验证码：" prop="volieCode">
              <Input placeholder="请输入短信验证码" style="width: 400px;" v-model="params.volieCode">
                <Button slot="append" @click="countDown" v-if="!disableds">{{text}}</Button>
                <Button slot="append" disabled v-else style="color: #808695">{{text}}</Button>
              </Input>
            </FormItem>
            <FormItem label="新绑定手机号：" prop="mobile">
              <Input placeholder="请输入新绑定手机号" clearable style="width: 400px;" v-model="params.mobile"></Input>
            </FormItem>
            <FormItem label="">
              <Button type="primary" style="width: 400px; margin-bottom: 370px;" @click="update">确认修改</Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import { validateCode, updateMobile, checkValidate } from '@/api/withdrawRecord'
export default {
  name: 'binding-phone',
  data() {
    return {
      data: {},
      text: '获取验证码',
      disableds: false,
      params: {
        mobile: '',
        volieCode: '',
        oldmobile: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '原密码不能为空', trigger: 'blur' }
        ],
        volieCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '新手机号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.data = JSON.parse(localStorage.getItem('cp_userInfo'))
    this.params.oldmobile = this.data.mobile
  },
  methods: {
    countDown() {
      let time = 60
      if (this.text === '获取验证码') {
        this.disableds = true
        validateCode({phoneNum: this.params.oldmobile, type: '5'}).then(res => {})
        let timeCountDown = setInterval(() => {
          time--
          if (time === 0) {
            this.disableds = false
            this.text = '获取验证码'
            clearInterval(timeCountDown)
          } else {
            this.text = time + 'S后重新获取'
          }
        }, 1000)
      }
    },
    update() {
      let that = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          checkValidate({phoneNum: that.params.oldmobile, verCode: that.params.volieCode, type: '5'}).then(res => {
            updateMobile(that.params).then(res => {
              localStorage.setItem('cp_userInfo', JSON.stringify(that.data))
              that.$store.commit('setUserInfo', JSON.stringify(that.data))
              that.params.volieCode = ''
              that.params.oldmobile = that.params.mobile
              that.params.mobile = ''
            })
          })
        } else {
          this.$Message.error('请将信息填写完整！')
        }
      })
    }
  }
}
</script>
