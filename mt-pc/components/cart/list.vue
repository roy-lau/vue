<template>
  <el-table :data="cartData" empty-text="购物车为空">
    <el-table-column prop="name" label="项目" width="532" />
    <el-table-column prop="price" label="单价" width="132" />
    <el-table-column label="数量" width="212">
      <template slot-scope="scope">
        <el-input-number v-model="scope.row.count" :min="0" size="mini" label="描述文字" />
      </template>
    </el-table-column>
    <el-table-column label="总价">
      <template slot-scope="scope">
        <el-tag type="danger" v-text="'¥ '+scope.row.price*scope.row.count" />
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    cartData: {
      type: Array,
      default:() => []
    }
  }
}

</script>
