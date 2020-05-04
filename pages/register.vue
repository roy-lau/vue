<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo" />
        <span class="login">
          <em class="blod">已有美团账号？</em>
          <a href="/login">
            <el-button type="primary" size="small">登陆</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form
        :model="registerForm"
        :rules="registerRules"
        ref="registerForm"
        label-width="100px"
        class="demo-registerForm"
      >
        <el-form-item label="账号" prop="name">
          <el-input v-model="registerForm.name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email" />
          <el-button size="mini" round @click="sendMaill('registerForm')">发送验证码</el-button>
          <span class="status" v-text="statusMsg"></span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="registerForm.code" maxlength="6" />
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="registerForm.pwd" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="registerForm.cpwd" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register('registerForm')">同意以下协议并注册</el-button>
          <div class="error">{{errorMsg}}</div>
        </el-form-item>
        <el-form-item>
          <a href="http://www.meituan.com/about/terms" target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
import { MD5 } from "crypto-js";
export default {
  layout: "blank",
  data() {
    return {
      statusMsg: "",
      errorMsg: "",
      registerForm: {
        name: "",
        email: "",
        code: "",
        pwd: "",
        cpwd: ""
      },
      registerRules: {
        name: [
          {
            required: true,
            type: "string",
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            type: "email",
            message: "请输入邮箱",
            trigger: "blur"
          }
        ],
        pwd: [{ required: true, message: "创建密码", trigger: "blur" }],
        cpwd: [
          { required: true, message: "确认密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码！"));
              } else if (value !== this.registerForm.pwd) {
                callback(new Error("两次输入密码不一致！"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //   发送邮件
    sendMaill(formName) {
      let namePass, emailPass;

      if (this.timerid) {
        return false;
      }
      // 验证昵称
      this.$refs[formName].validateField("name", valid => {
        namePass = valid;
      });
      this.timerid = null;
      this.statusMsg = "";
      if (namePass) {
        return false;
      }

      // 验证邮箱
      this.$refs[formName].validateField("email", valid => {
        emailPass = valid;
      });

      if (!namePass && !emailPass) {
        this.$axios
          .post("/users/verify", {
            username: encodeURIComponent(this.registerForm.name),
            email: this.registerForm.email
          })
          .then(({ status, data }) => {
            if (status === 200 && data && data.code === 0) {
              let count = 60;
              this.statusMsg = `验证码已发送，剩余${count--}秒`;
              this.timerid = setInterval(() => {
                this.statusMsg = `验证码已发送，剩余${count--}秒`;
                if (count < 0) {
                  clearInterval(this.timerid);
                }
              }, 1000);
            } else {
              this.statusMsg = data.msg;
            }
          });
      }
    },
    register(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/users/singup", {
              username: encodeURIComponent(this.registerForm.name),
              password: MD5(this.registerForm.pwd).toString(),
              email: this.registerForm.email,
              code: this.registerForm.code
            })
            .then(({ status, data }) => {
              if (status === 200) {
                if (data && data.code === 0) {
                  this.$router.push("/login");
                  this.$message.success(data.msg);
                } else {
                  this.errorMsg = data.msg;
                }
              } else {
                this.errorMsg = `服务器出错，错误代码${status}`;
              }
              setTimeout(() => {
                this.errorMsg = "";
              }, 30000);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/register/index.scss";
</style>
