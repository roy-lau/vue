<template>
    <div id="update-tables">
        <el-card>
            <!-- 表格 start -->
            <el-table :data="tableList" border style="width: 100%">
                <el-table-column prop="TABLE_COMMENT" label="表名(中文)" />
                <el-table-column prop="TABLE_NAME" label="表名" />
                <el-table-column prop="CREATE_TIME" label="创建时间" />
                <el-table-column prop="UPDATE_TIME" label="更新时间" />
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="updateTable(scope.row)">修改</el-button>
                        <el-button type="text" size="small" @click="delTable(scope.$index,scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 表格 end -->
        </el-card>
        <!-- 修改弹框 start -->
        <el-dialog title="修改表" :visible.sync="updateTableDialog" width="30%">
            <el-form :model="newForm" label-width="100px">
                <!-- <p> 原表名(中文) : <span v-text="oldForm.cname"></span> </p> -->
                <!-- <p> 原表名 : <span v-text="oldForm.name"></span> </p> -->
                <el-form-item label="原表名(中文)">
                    <el-input v-model="oldForm.cname" autocomplete="off" readonly />
                </el-form-item>
                <el-form-item label="原表名">
                    <el-input v-model="oldForm.name" autocomplete="off" readonly />
                </el-form-item>
                <el-form-item label="新表名(中文)">
                    <el-input v-model="newForm.cname" autocomplete="off" autofocus />
                </el-form-item>
                <el-form-item label="新表名">
                    <el-input v-model="newForm.name" autocomplete="off" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateTableDialog = false">取 消</el-button>
                <el-button type="primary" @click="updateTableSubmit">确 定</el-button>
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
            tableList: [],
            updateTableDialog: false,
            oldForm: {
                cname: '',
                name: ''
            },
            newForm: {
                cname: '',
                name: ''
            }
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
                }
            })
        },
        delTable(i, row) {
            this.$confirm('此操作将永久删除该表格, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                // this.tableList.splice(i, 1)
                // this.updateTeble(this.tableList)
                this.$axios.delete('delTable', { params: { tableName: row.TABLE_NAME } }).then(res => {
                    let { code, msg } = res.data
                    if (code) {
                        this.$message.error(`${msg.errno} : ${msg.code}, ${msg.sqlMessage}`)
                    } else {
                        this.getTable()
                        this.$message({ type: 'success', message: '删除成功!' });
                    }
                })

            }).catch(() => {
                this.$message.info('已取消删除');
            });
        },
        updateTable(row) {
            this.updateTableDialog = true
            this.oldForm.cname = row.TABLE_COMMENT
            this.oldForm.name = row.TABLE_NAME

        },
        updateTableSubmit() {
            let data = {
                oldName: this.oldForm.name,
                oldCName: this.oldForm.cname,
                newName: this.newForm.name,
                newCName: this.newForm.cname,
            }

            this.$axios.post('updateTable', data).then(res => {
                let { code, msg } = res.data
                if (code) {
                    this.$message.error(`${msg.errno} : ${msg.code}, ${msg.sqlMessage}`)
                } else {
                    this.getTable()
                    this.updateTableDialog = false
                    this.$message({ type: 'success', message: '修改成功!' });

                }
            })
        }
        // ...mapMutations({
        //     updateTeble: 'UPDATE_TEBLE'
        // })
    },
    created() {
        this.getTable()
    }
}
</script>
