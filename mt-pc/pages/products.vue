<template>
  <el-row class="page-product">
    <el-col :span="19">
      <Crumbs :keyword="keyword" />
      <Categroy :types="types" :areas="areas" />
      <List :list="list" />
    </el-col>
    <el-col :span="5">
      <Amap v-if="point.length" :width="230" :height="290" :point="point" />
    </el-col>
  </el-row>
</template>
<script>
import Crumbs from "@/components/products/crumbs"
import Categroy from "@/components/products/categroy"
import List from "@/components/products/list"
import Amap from "@/components/public/map.vue"
export default {
  components: {
    Crumbs,
    Categroy,
    List,
    Amap
  },
  data() {
    return {
      list: [],
      types: [],
      areas: [],
      keyword: '',
      point: [],
    }
  },
  async asyncData(ctx) {
    let keyword = encodeURIComponent(ctx.query.keyword),
      city = ctx.store.state.geo.position.city,
      { status, data:data } = await ctx.$axios.get('search/resultsByKeywords', {
        params: {
          keyword,
          city
        }
      }),
      { status: status1, data: data1 } = await ctx.$axios.get('categroy/crumbs', { params: { city } })

    if (status === 200 && status1 === 200 && data.count > 0) {
      return {
        list: data.pois
          .filter(item => item.photos.length)
          .map(item => {
            return {
              type: item.type,
              img: item.photos[0].url,
              name: item.name,
              addr: item.addr,
              comment: Math.floor(Math.random() * 10000),
              rate: Number(item.biz_ext.rating),
              price: item.biz_ext.lowest_price || 0,
              scene: item.tag,
              tel: item.tel,
              status: '可定明日',
              location: item.location,
              module: item.type.split(';')[0]
            }
          }),
        keyword,
        areas: data1.data.areas.filter(item => item.type != '').slice(0, 5),
        types: data1.data.types.filter(item => item.type != '').slice(0, 5),
        point: (data.pois.find(item => item.location).location || '').split(',')
      }
    }
  }
}

</script>
<style lang="scss">
.page-product{
    .m-crumbs{
        margin: 10px 0;
    }
}
</style>
