<template>
  <div class="m-iselect">
    <span class="name">直接输入城市搜索：</span>
    <el-autocomplete v-model="input" :fetch-suggestions="querySearchAsync" @select="handleSelect" placeholder="请输入城市中文或拼音" />
    <span class="name">&nbsp;&nbsp;&nbsp;&nbsp;按省份选择：</span>
    <el-select v-model="pvalue" placeholder="选择省份">
      <el-option v-for="item in province" :key="item.id" :label="item.value" :value="item.id" />
    </el-select>
    <el-select v-model="cvalue" placeholder="选择城市" :disabled="!pvalue">
      <el-option v-for="item in citys" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
  </div>
</template>
<script>
import _ from "lodash"
export default {
  data() {
    return {
      province: [],
      pvalue: '',
      citys: [],
      cvalue: '',
      input: '',
      cities: []
    }
  },
  watch: {
    async pvalue(newPvalue) {
      let { status, data: res } = await this.$axios.get('/geo/province/' + newPvalue)
      if (status === 200) {
        this.citys = res.data.value
        this.cvalue = ""
      }
    }
  },
  async mounted() {
    let { status, data } = await this.$axios.get('/geo/province')
    if (status === 200) {
      this.province = data.data
    }
  },
  methods: {
    querySearchAsync: _.debounce(async function(query, cb) {
      if (this.cities.length) {
        cb(this.cities.filter(item => item.value.indexOf(query) > -1))
      } else {
        let { status, data } = await this.$axios.get('geo/city')
        if (status === 200) {
          this.cities = data.data.map(item => { return { value: item.name } })
          cb(this.cities.filter(item => item.value.indexOf(query) > -1))
        } else {
          cb([])
        }
      }
    }, 500),
    // 切换城市
    handleSelect(item) {
      this.$store.dispatch('geo/setPosition', { city: item.value })
    },
  }
}

</script>
<style lang="scss">
@import "@/assets/css/changecity/iselect.scss";

</style>
