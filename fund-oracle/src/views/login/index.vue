<template>
    <div class="login-container">
        <el-row class="login-form-container">
            <el-col :span="8" :offset="8">
                <el-card shadow="always">
                    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
                        <div class="title-container">
                            <h3 class="title">XX 资产管理平台 </h3>
                        </div>
                        <el-form-item prop="userName">
                            <span class="svg-container">
                                <svg-icon icon-class="user" />
                            </span>
                            <el-input ref="userName" v-model="loginForm.userName" placeholder="userName" name="userName" type="text" tabindex="1" auto-complete="on" />
                        </el-form-item>
                        <el-form-item prop="passWord">
                            <span class="svg-container">
                                <svg-icon icon-class="passWord" />
                            </span>
                            <el-input :key="passWordType" ref="passWord" v-model="loginForm.passWord" :type="passWordType" placeholder="passWord" name="passWord" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
                        </el-form-item>
                        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登陆</el-button>
                        <div class="tips">
                            <span> 本系统正在努力的开发迭代中…… </span>
                        </div>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { logonCheck } from '@/assets/js/validate'

export default {
    name: 'Login',
    data() {
        return {
            loginForm: {
                userName: 'admin',
                passWord: '111111'
            },
            loginRules: logonCheck, // 登录校验
            loading: false,
            passWordType: 'passWord',
            redirect: undefined
        }
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },
    methods: {
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    console.log()
                    // this.$store.dispatch('user/login', this.loginForm).then(() => {
                    this.$router.push({ path: this.redirect || '/ser' })
                    this.loading = false
                    // }).catch(() => {
                    //   this.loading = false
                    // })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.login-container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: linear-gradient(125deg, #1e755f, #145fa0, #b32486, #cd951a);
    background-size: 800% 800%;
    animation: AnimationName 11s ease infinite;

}

@keyframes AnimationName {
    0% {
        background-position: 97% 0%
    }

    50% {
        background-position: 4% 100%
    }

    100% {
        background-position: 97% 0%
    }
}

.login-form-container {
    margin-top: 200px;
}

.tips {
    color: #F56C6C;
}
</style>