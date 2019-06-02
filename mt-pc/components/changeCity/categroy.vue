<template>
  <div>
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="item in list" :key="item">
        <a :href="'#city-'+item" v-text="item"></a>
      </dd>
    </dl>
    <!-- 字母选择 -->
    <dl v-for="item in blocks" :key="item.title" class="m-categroy-section">
      <dt v-text="item.title" :id="'city-'+item.title" />
      <dd><span v-for="c in item.city" :key="c" v-text="c" @click="changeCity(c)" :class="$store.state.geo.position.city ===c ? 'selected':''" /></dd>
    </dl>
  </div>
</template>
<script>
import pyjs from "js-pinyin"
	export default {
		data(){
			return{
				list:'ABCDEFGHIJKLMOPQRSTUVWXYZ'.split(''),
				blocks:[]
			}
		},
		async mounted(){
			let _blocks =[]
			let {status,data} = await this.$axios.get('geo/city')
			if (status===200) {
				let p,c,d={}

				data.data.forEach(item =>{
					// 匹配中文拼音 -> 转小写 -> 获取拼音首字母
					p = pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0,1)
					// 获取首字母的unionCode
					c=p.charCodeAt(0)
					// 判断首字母是否在 a-z or A-Z 之间，然后按照顺序放到数组中
					if (c>96&&c<123) {
						if (!d[p]) {
							d[p]=[]
						}
						d[p].push(item.name)
					}
				})
				// 遍历放入到 _blocks对象中
				for(let [k,v] of Object.entries(d)){
					_blocks.push({
						title:k.toUpperCase(),
						city:v
					})
				}
				// 排序
				_blocks.sort((a,b) => a.title.charCodeAt(0)-b.title.charCodeAt(0))
				this.blocks = _blocks
			}
		},
		methods: {
			// 切换城市
			changeCity(cityName){
		      this.$store.dispatch('geo/setPosition', { city: cityName })
			}
		}
	}
</script>
<style lang="scss">
@import "@/assets/css/changecity/categroy.scss";

</style>
