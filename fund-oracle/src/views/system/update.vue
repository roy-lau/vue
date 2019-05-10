<template>
    <div id="update-tables">
        <el-table :data="tableList" border style="width: 500px">
            <el-table-column prop="tableCName" label="表名(中文)" />
            <el-table-column prop="tableName" label="表名" />
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

        }
    },
    computed: {
        ...mapGetters(["tableList"])
    },
    methods: {
        getTable() {
            console.log(this.tableList)
        },
        delTable(i) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.tableList.splice(i, 1)
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