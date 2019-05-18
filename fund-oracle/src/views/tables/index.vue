<template>
    <div id="tables">
        <el-card>
            <!-- 新增 start -->
            <el-form :model="addColFrom" ref="addColFrom" inline>
                <el-form-item v-for="item in tableTitle" :prop="item.COLUMN_NAME">
                    <el-input v-model="addColFrom[item.COLUMN_NAME]" :placeholder="item.COLUMN_COMMENT" />
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" @click="addCol" title="新增">新增</el-button>
                </el-form-item>
            </el-form>
            <!-- 新增 end -->
        </el-card><br />
        <!-- 表格 start -->
        <el-table :data="tableData" border>
            <el-table-column v-for="item in tableTitle" :prop="item.COLUMN_NAME" :label="item.COLUMN_COMMENT" :key="item.COLUMN_NAME" />
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="updateCol(scope.row)">修改</el-button>
                    <el-button type="text" size="small" @click="delTable(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 表格 end -->
        <!-- 新增 dialog  start -->
        <el-dialog title="新增" :visible.sync="updateColDialog">
            <el-form :model="formList">
                <el-form-item v-for="item in tableTitle" :label="item.cname" :key="item.name">
                    <el-input v-model="formList[item.name]" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateColDialog = false">取 消</el-button>
                <el-button type="primary" @click="updateColSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 新增 dialog  end -->
    </div>
</template>
<script>
// import { mapGetters, mapMutations } from 'vuex'

export default {
    data() {
        return {
            updateColDialog: false,
            tableData: [],
            tableTitle: [],
            addColFrom: {},
            formList: {}
        }
    },
    computed: {
        // ...mapGetters(["tableList"])
    },
    methods: {
        getRow() {
            this.$axios.get('queryRow', { params: { tableName: this.$route.query.name } }).then(res => {
                let { code, msg, result } = res.data
                if (code) {
                    this.$message.error(msg)
                } else {
                    this.tableTitle = result
                }
            })
        },
        getCols() {
            this.$axios.get('queryCols', { params: { tableName: this.$route.query.name } }).then(res => {
                let { code, msg, result } = res.data
                if (code) {
                    this.$message.error(msg)
                } else {
                    this.tableData = result
                }
            })
        },
        // 新增
        addCol() {
            this.$axios.put('addCol', { tableName: this.$route.query.name, data: this.addColFrom }).then(res => {
                let { code, msg, result } = res.data
                if (code) {
                    this.$message.error(msg)
                } else {
                    this.getTable()
                    this.$message({ type: 'success', message: '新增成功!' });
                    this.$refs.addColFrom.resetFields()
                }
            })
        },
        // 修改
        updateCol(row) {
            this.updateColDialog = true
        },
        updateColSubmit() {},
        delTable(i) {
            // this.tableList.splice(i, 1)
            // this.updateTeble(this.tableList)
        },
        // ...mapMutations({
        //     updateTeble: 'UPDATE_TEBLE'
        // })
    },
    created() {
        this.getRow()
        this.getCols()
    }
}
</script>