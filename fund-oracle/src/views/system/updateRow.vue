<template>
    <div id="tables">
        <el-select v-model="selectTalbe" placeholder="请选择表" @change="changeTable">
            <el-option v-for="item in tableList" :key="item.tableName" :label="item.tableCName" :value="item.tableName" />
        </el-select>
        <el-table :data="tableData" border>
            <el-table-column prop="cname" label="表头(中文)" />
            <el-table-column prop="name" label="表头(字段)" />
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small">修改</el-button>
                    <el-button type="text" size="small" @click="delTable(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    data() {
        return {
            selectTalbe: 'user',
            tableData: []
        }
    },
    computed: {
        ...mapGetters(["tableList"])
    },
    methods: {
        getTable() {
            // console.log(this.tableList)
            // console.log(this.$route.query)
            this.tableList.forEach(item => {
                if (item.tableName === this.selectTalbe) {
                    this.tableData = item.row
                }
            })
        },
        // 切换表
        changeTable(val) {
            this.selectTalbe = val
            this.tableList.forEach(item => {
                if (item.tableName === val) {
                    this.tableData = item.row
                }
            })
        },
        delTable(i) {

            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.tableList.forEach(item => {
                    if (item.tableName === this.selectTalbe) {
                        item.row.splice(i, 1)
                    }
                })
                this.updateTeble(this.tableList)
                this.$message({ type: 'success', message: '删除成功!' });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        ...mapMutations({
            updateTeble: 'UPDATE_TEBLE'
        })
    },
    created() {
        this.getTable()
    }
}
</script>