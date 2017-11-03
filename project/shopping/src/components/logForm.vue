<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" v-model="usernameModel" placeholder="请输入用户名">
          <span class="g-form-error">{{ userErrors.errorText }}</span>
        </div>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password" v-model="passwordModel" placeholder="请输入密码">
          <span class="g-form-error">{{ passwordErrors.errorText }}</span>
        </div>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="onLogin">登录</a>
        </div>
      </div>
      <p>{{ errorText }}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      usernameModel: '',
      passwordModel: '',
      errorText: ''
    }
  },
  computed: {
    userErrors() {
      let errorText, status

      if (this.usernameModel == "") {
        status = false
        errorText = "用户名不能为空"
      } else if (!/[a-zA-Z0-9]{3,12}/.test(this.usernameModel)) {
        status = false
        errorText = "用户名为3-12位的字母，数字!"
      } else {
        status = true
        errorText = ''
      }
      // 第一次进入清空判断的内容errorText
      if (!this.userFlag) {
        errorText = ''
        this.userFlag = true
      }
      return {
        status,
        errorText
      }
    },
    passwordErrors() {
      let errorText, status
      if (!/^\w{1,12}$/g.test(this.passwordModel)) {
        status = false
        errorText = '密码应为1-12位'
      } else {
        status = true
        errorText = ''
      }
      // 第一次进入清空判断的内容errorText
      if (!this.passwordFlag) {
        errorText = ''
        this.passwordFlag = true
      }
      return {
        status,
        errorText
      }
    }
  },
  methods: {
    onLogin() {
      if (!this.userErrors.status || !this.passwordErrors.status) {
        this.errorText = '部分选项未通过'
      } else {
        this.errorText = ''
        this.$emit('has-log', this.usernameModel)

        this.$http.get('api/login')
          .then((res) => {
            this.$emit('has-log', res.data)
          }, (error) => {
            console.log(error)
          })
      }
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
