<template>
    <div id="tables">
        <el-card>
            <!-- 新增 start -->
            <el-form :model="addColFrom" ref="addColFrom" inline>
                <el-form-item v-for="item in tableTitle" :key="item.COLUMN_NAME">
                    <el-input v-model="addColFrom[item.COLUMN_NAME]" :placeholder="item.COLUMN_COMMENT" />
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" @click="addCol" title="新增">新增</el-button>
                </el-form-item>
            </el-form>
            <!-- 新增 end -->
        </el-card><br />
        <el-card>
            <!-- 表格 start -->
            <el-table :data="tableData" border>
                <el-table-column v-for="item in tableTitle" :prop="item.COLUMN_NAME" :label="item.COLUMN_COMMENT" :key="item.COLUMN_NAME" />
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="updateCol(scope.row)">修改</el-button>
                        <el-button type="text" size="small" @click="delTable(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 表格 end -->
        </el-card>
        <!-- 修改 dialog  start -->
        <el-dialog title="修改" :visible.sync="updateColDialog">
            <el-form :model="updateColFrom" label-width="100px">
                <el-form-item label="id">
                    <el-input v-model="primaryId" autocomplete="off" disabled />
                </el-form-item>
                <el-form-item v-for="(item,idx) in tableTitle" :key="idx" :label="item.COLUMN_COMMENT">
                    <el-input v-model="updateColFrom[item.COLUMN_NAME]" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateColDialog = false">取 消</el-button>
                <el-button type="primary" @click="updateColSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 修改 dialog  end -->
    </div>
</template>
<script>
// import { mapGetters, mapMutations } from 'vuex'

export default {
    data() {
        return {
            primaryId: null,
            updateColDialog: false,
            tableData: [],
            tableTitle: [],
            addColFrom: {},
            updateColFrom: {}
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
                    this.$message.error(`${msg.errno} : ${msg.code}, ${msg.sqlMessage}`)
                } else {
                    this.tableTitle = result
                    this.getCols()
                }
            })
        },
        getCols() {
            this.$axios.get('queryCols', { params: { tableName: this.$route.query.name } }).then(res => {
                let { code, msg, result } = res.data
                if (code) {
                    this.$message.error(`${msg.errno} : ${msg.code}, ${msg.sqlMessage}`)
                } else {
                    this.tableData = result
                }
            })
        },
        // 新增
        addCol() {
            this.$axios.put('addCol', { tableName: this.$route.query.name, data: this.addColFrom }).then(res => {
                let { code, msg} = res.data
                if (code) {
                    this.$message.error(`${msg.errno} : ${msg.code}, ${msg.sqlMessage}`)
                } else {
                    this.getRow()
                    this.$message({ type: 'success', message: '新增成功!' });
                    this.$refs.addColFrom.resetFields()
                }
            })
        },
        // 修改
        updateCol(row) {
            this.updateColDialog = true
            this.primaryId = row.id
            // this.tableTitle.forEach(item => {
            //     this.updateColFrom = {
            //         item.COLUMN_NAME: row[item.COLUMN_NAMEH]
            //     }
            // })

        },
        // 提交修改
        updateColSubmit() {
            this.$axios.post('updateCol', {
                tableName: this.$route.query.name,
                id: this.primaryId,
                data: this.updateColFrom
            }).then(res => {
                let { code, msg } = res.data
                if (code) {
                    this.$message.error(`${msg.errno} : ${msg.code}, ${msg.sqlMessage}`)
                } else {
                    this.getRow()
                    this.updateColDialog = false
                    this.$message({ type: 'success', message: '修改成功!' });
                }
            })
        },
        delTable(row) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete('delCol', { params: { tableName: this.$route.query.name, id: row.id } }).then(res => {
                    let { code, msg } = res.data
                    if (code) {
                        this.$message.error(`${msg.errno} : ${msg.code}, ${msg.sqlMessage}`)
                    } else {
                        this.getRow()
                        this.$message({ type: 'success', message: '删除成功!' });
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // ...mapMutations({
        //     updateTeble: 'UPDATE_TEBLE'
        // })
    },
    created() {
        this.getRow()
    }
}
</script>
