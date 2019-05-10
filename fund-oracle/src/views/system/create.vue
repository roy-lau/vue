<template>
    <div class="create-teble">
        <el-form :model="createTebleFrom" ref="ruleForm" inline label-width="100px" class="demo-ruleForm">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <el-form-item label="表名" prop="tableName">
                        <el-input v-model="createTebleFrom.tableName" />
                    </el-form-item>
                    <el-form-item label="中文表名" prop="tableCName">
                        <el-input v-model="createTebleFrom.tableCName" />
                    </el-form-item>
                </div>
                <div v-for="(list,index) in createTebleFrom.row" :key="index" class="text item">
                    <el-form-item :label="'表头'+(index+1)" prop="name">
                        <el-input v-model="list.name" />
                    </el-form-item>
                    <el-form-item label="中文表头" prop="cname">
                        <el-input v-model="list.cname" />
                    </el-form-item>
                    <el-button type="text" @click="delRow(index)" title="删除表头"> 删除</el-button>
                </div>
                <el-form-item>
                    <el-button type="warning" @click="createRow" title="新增表头">新增表头</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                </el-form-item>
            </el-card>
        </el-form>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
    data() {
        return {
            createTebleFrom: {
                tableName: '', // 表名
                tableCName: '', // 中文名
                row: [{
                    name: '', // 表头（列）
                    cname: '', // 中文表头（列）
                }],
                col: [] // 行
            },
        };
    },
    methods: {
        // 新增一列
        createRow() {
            this.createTebleFrom.row.push({
                name: '', // 表头
                cname: '', // 中文表头
            })
        },
        delRow(i) {
            this.createTebleFrom.row.splice(i, 1) // 删除一行
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // this.$store.dispatch('createTeble', this.createTebleFrom)
                    this.createTeble(this.createTebleFrom)
                    this.$message.success("恭喜您！ 表格创建成功")
                    this.$refs[formName].resetFields();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        ...mapMutations({
            createTeble: 'CREATE_TEBLE'
        })
    }
}
</script>