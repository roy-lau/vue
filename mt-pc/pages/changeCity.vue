<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <i-select />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hot />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
      	<categroy />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import iSelect from "@/components/changeCity/iSelect.vue"
import hot from "@/components/changeCity/hot.vue"
import categroy from "@/components/changeCity/categroy.vue"
export default {
  components: {
    iSelect,
    hot,
    categroy
  }
}

</script>
