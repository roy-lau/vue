<template>
    <div id="tables">
        <el-button type="text" @click="addTableDialog = true">新增</el-button>
        <!-- table -->
        <el-table :data="tableData" border>
            <el-table-column v-for="item in tableTitle" :prop="item.name" :label="item.cname" :key="item.name" />
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small">修改</el-button>
                    <el-button type="text" size="small" @click="delTable(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- Form -->
        <el-dialog title="新增" :visible.sync="addTableDialog">
            <el-form :model="formList">
                <el-form-item v-for="item in tableTitle" :label="item.cname" :key="item.name" >
                    <el-input v-model="formList[item.name]" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addTableDialog = false">取 消</el-button>
                <el-button type="primary" @click="addTable">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    data() {
        return {
            addTableDialog: false,
            tableData: [],
            tableTitle: [],
            formList: {}
        }
    },
    computed: {
        ...mapGetters(["tableList"])
    },
    methods: {
        getTable() {
            this.tableList.forEach(item => {
                if (item.tableName === this.$route.query.name) {
                    this.tableTitle = item.row
                    this.tableData = item.col
                }
            })
        },
        // 新增
        addTable() {
            this.tableList.forEach(item => {
                if (item.tableName === this.$route.query.name) {
                    item.col.unshift(this.formList)
                }
            })
            this.updateTeble(this.tableList)
            this.addTableDialog = false
            this.getTable()
        },
        delTable(i) {
            this.tableList.splice(i, 1)
            this.updateTeble(this.tableList)
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