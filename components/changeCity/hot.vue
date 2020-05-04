<!-- 热门城市 -->
<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd v-for="item in list" :key="item.id"
      v-text="item.name === '市辖区'?item.province:item.name"
      @click="changeCity(item.name === '市辖区'?item.province:item.name)"
      :class="$store.state.geo.position.city === (item.name === '市辖区'?item.province:item.name) ? 'selected':''" />
    </dl>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: []
    }
  },
  async mounted() {
    let { status, data } = await this.$axios.get('geo/hotCity')
    if (status === 200) {
      this.list = data.data
    }
  },
  methods: {
    changeCity(cityName) {
      this.$store.dispatch('geo/setPosition', { city: cityName })
    }
  }
}

</script>
<style lang="scss">
@import "@/assets/css/changecity/hot.scss";

</style>
