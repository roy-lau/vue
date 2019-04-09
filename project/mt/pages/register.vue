<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo"/>
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
        <el-form-item label="昵称" prop="name">
          <el-input v-model="registerForm.name"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email"/>
          <el-button size="mini" round @click="sendMsg">发送验证码</el-button>
          <span class="status" v-text="statusMsg"></span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="registerForm.code" maxlength="4"/>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="registerForm.pwd" type="password"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="registerForm.cpwd" type="password"/>
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
      registerRules:{
          name:[{required:true,type:'string',message:'请输入用户名',trigger:'blur'}],
          email:[{required:true,type:'email',message:'请输入邮箱',trigger:'blur'}],
          pwd:[{required:true,message:'创建密码',trigger:'blur'}],
          cpwd:[{required:true,message:'确认密码',trigger:'blur'},{
              validator:(rule,value,callback)=>{
                  if(value===''){
                      callback(new Error('请再次输入密码！'))
                  }else if(value !== this.registerForm.pwd){
                      callback(new Error('两次输入密码不一致！'))
                  }else{
                      callback()
                  }
              },
              trigger: 'blur'
          }],
      }
    };
  },
  methods: {
    sendMsg() {},
    register(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
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


