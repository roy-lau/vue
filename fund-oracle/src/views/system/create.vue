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
                    <el-form-item style="float:right;">
                        <el-button type="warning" @click="createRow" title="新增表头">新增表头</el-button>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    </el-form-item>
                </div>
                <div v-for="(list,index) in createTebleFrom.rows" :key="index" class="text item">
                    <el-form-item :label="'表头'+(index+1)" prop="name">
                        <el-input v-model="list.name" />
                    </el-form-item>
                    <el-form-item label="中文表头" prop="cname">
                        <el-input v-model="list.cname" />
                    </el-form-item>
                    <el-form-item label="类型" prop="type">
                        <el-select v-model="list.type">
                            <el-option v-for="(item,idx) in typeList" :label="item" :value="item" :key="idx" />
                        </el-select>
                    </el-form-item>
                    <el-button type="text" @click="delRow(index)" title="删除表头"> 删除</el-button>
                </div>
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
                rows: [{
                    name: '', // 表头（列）
                    cname: '', // 中文表头（列）
                    type: '',
                }],
                col: [] // 行
            },
            typeList: ['VARCHAR(10)', 'VARCHAR(25)', 'VARCHAR(50)', 'VARCHAR(100)', 'INT', 'DATE']
        };
    },
    methods: {
        // 新增一列
        createRow() {
            this.createTebleFrom.rows.push({
                name: '', // 表头
                cname: '', // 中文表头
            })
        },
        delRow(i) {
            this.createTebleFrom.rows.splice(i, 1) // 删除一行
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post('createTable', this.createTebleFrom).then(res => {
                        if (res.data.code) {
                            this.$message.error(res.data.msg)
                        } else {
                            this.$message.success("恭喜您！ 表格创建成功")
                        }
                    })
                    // this.$store.dispatch('createTeble', this.createTebleFrom)
                    // this.createTeble(this.createTebleFrom)
                    // this.$refs[formName].resetFields();
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