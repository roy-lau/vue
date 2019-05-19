<template>
    <div id="tables">
        <el-card>
            <!-- 添加表头 start -->
            <el-form :model="addRowFrom" ref="addRowFrom" inline>
                <!-- 切换表名字 start-->
                <el-form-item>
                    <el-select v-model="selectTalbe" placeholder="请选择表" @change="changeTable">
                        <el-option v-for="item in tableList" :key="item.TABLE_NAME" :label="item.TABLE_COMMENT" :value="item.TABLE_NAME" />
                    </el-select>
                </el-form-item>
                <!-- 切换表名字 end-->
                <el-form-item prop="name">
                    <el-input v-model="addRowFrom.name" placeholder="表头" />
                </el-form-item>
                <el-form-item prop="cname">
                    <el-input v-model="addRowFrom.cname" placeholder="中文表头" />
                </el-form-item>
                <el-form-item prop="type">
                    <el-select v-model="addRowFrom.type" placeholder="请选择类型">
                        <el-option v-for="(item,idx) in typeList" :label="item" :value="item" :key="idx" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" @click="addRow" title="新增">新增</el-button>
                </el-form-item>
            </el-form>
            <!-- 添加表头 end -->
        </el-card><br />
        <el-card>
            <!-- 表格 start -->
            <el-table :data="tableData" border>
                <el-table-column prop="COLUMN_NAME" label="表头(字段)" />
                <el-table-column prop="COLUMN_COMMENT" label="表头(中文)" />
                <el-table-column prop="COLUMN_TYPE" label="类型" />
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="updateRow(scope.row)">修改</el-button>
                        <el-button type="text" size="small" @click="delRow(scope.$index,scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 表格 end -->
        </el-card>
        <!-- 修改弹框 start -->
        <el-dialog title="修改表头" :visible.sync="updateRowDialog">
            <el-form :model="updateRowFrom" label-width="100px">
                <el-form-item label="表名">
                    <el-select v-model="selectTalbe" @change="changeTable">
                        <el-option v-for="item in tableList" :key="item.TABLE_NAME" :label="item.TABLE_COMMENT" :value="item.TABLE_NAME" disabled />
                    </el-select>
                </el-form-item>
                <el-form-item label="表头" prop="name">
                    <el-input v-model="updateRowFrom.name" />
                </el-form-item>
                <el-form-item label="中文表头" prop="cname">
                    <el-input v-model="updateRowFrom.cname" />
                </el-form-item>
                <el-form-item label="请选择类型" prop="type">
                    <el-select v-model="updateRowFrom.type">
                        <el-option v-for="(item,idx) in typeList" :label="item" :value="item" :key="idx" />
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateRowDialog = false">取 消</el-button>
                <el-button type="primary" @click="updateRowSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 修改弹框 end -->
    </div>
</template>
<script>
// import { mapGetters, mapMutations } from 'vuex'

export default {
    data() {
        return {
            selectTalbe: 'default',
            oldRowName: '',
            tableList: [],
            tableData: [],
            addRowFrom: {
                name: '',
                cname: '',
                type: ''
            },
            updateRowFrom: {
                name: '',
                cname: '',
                type: ''
            },
            updateRowDialog: false,
            typeList: ['VARCHAR(10)', 'VARCHAR(25)', 'VARCHAR(50)', 'VARCHAR(100)', 'INT', 'DATE']

        }
    },
    computed: {
        // ...mapGetters(["tableList"])
    },
    methods: {
        getTable() {
            this.$axios.get('queryTables').then(res => {
                let { code, msg, result } = res.data
                if (code) {
                    this.$message.error(`${msg.errno} : ${msg.code}, ${msg.sqlMessage}`)
                } else {
                    this.tableList = result
                    this.selectTalbe = result[0]
                    this.changeTable(result[0].TABLE_NAME)
                }
            })
        },
        // 切换表
        changeTable(val) {
            this.selectTalbe = val
            this.$axios.get('queryRow', { params: { tableName: val } }).then(res => {
                let { code, msg, result } = res.data
                if (code) {
                    this.$message.error(`${msg.errno} : ${msg.code}, ${msg.sqlMessage}`)
                } else {
                    this.tableData = result
                }
            })
        },
        // 新增列
        addRow() {
            this.$axios.put('addRow', { tableName: this.selectTalbe, column: this.addRowFrom }).then(res => {
                let { code, msg, result } = res.data
                if (code) {
                    this.$message.error(`${msg.errno} : ${msg.code}, ${msg.sqlMessage}`)
                } else {
                    this.getTable()
                    this.$message({ type: 'success', message: '新增成功!' });
                    this.$refs.addRowFrom.resetFields()
                }
            })
        },
        // 修改
        updateRow(row) {
            this.updateRowDialog = true
            this.oldRowName = row.COLUMN_NAME
            this.updateRowFrom = {
                name: row.COLUMN_NAME,
                cname: row.COLUMN_COMMENT,
                type: row.COLUMN_TYPE,
            }
        },
        // 提交修改
        updateRowSubmit() {

            this.$axios.post('updateRow', {
                tableName: this.selectTalbe,
                oldRowName: this.oldRowName,
                column: this.updateRowFrom
            }).then(res => {
                let { code, msg, result } = res.data
                if (code) {
                    this.$message.error(`${msg.errno} : ${msg.code}, ${msg.sqlMessage}`)
                } else {
                    this.getTable()
                    this.updateRowDialog = false
                    this.$message({ type: 'success', message: '修改成功!' });

                }
            })
        },
        // 删除表头
        delRow(i, row) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete('delRow', { params: { tableName: this.selectTalbe, rowName: row.COLUMN_NAME } }).then(res => {
                    let { code, msg, result } = res.data
                    if (code) {
                        this.$message.error(`${msg.errno} : ${msg.code}, ${msg.sqlMessage}`)
                    } else {
                        this.getTable()
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
        this.getTable()
    }
}
</script>