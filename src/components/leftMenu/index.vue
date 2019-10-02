<template>
    <div id="left-menu">
        <el-menu :default-active="defaultActive" class="el-menu-vertica" router background-color="#304156" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="dashboard">
                <i class="el-icon-s-home"></i>
                <span slot="title"> 首页 </span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>系统管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="system-create-table">创建表</el-menu-item>
                    <el-menu-item index="system-update-table">修改表</el-menu-item>
                    <el-menu-item index="system-update-row">修改表头</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <span v-for="(nav,index) in tableList" :key="index">
                <el-menu-item :index="'tables?name='+nav.TABLE_NAME">
                    <i class="el-icon-document"></i>
                    <span slot="title" v-text="nav.TABLE_COMMENT"></span>
            </el-menu-item>
            </span>
        </el-menu>
    </div>
</template>
<script>
// import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            tableList: []
        }
    },
    computed: {
        // ...mapGetters(["tableList"]),
        defaultActive() {
            let pathStr = this.$route.path
            return pathStr.split('/')[pathStr.split('/').length - 1]
        }
    },
    methods: {
        getMenu() {
            this.$axios.get('queryTables').then(res => {
                let { code, msg, result } = res.data
                if (code) {
                    this.$message.error(msg)
                } else {
                    this.tableList = result
                }
            })
        }
    },
    created() {
        this.getMenu()
    }
}
</script>
<style>
.el-menu-vertica {}
</style>