<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团">
            </el-col>
        <el-col :span="15" class="center">
          <div class="wrapper">
            <el-input placeholder="搜索商家地址" v-model="search" @focus="onFocusSearch" @blur="onBlurSearch" @input="onInputSearch" />
            <button class="el-button el-button--primary"><i class="el-icon-search" /></button>
                    <dl class="hotPlace" v-if="isHotPlate">
                        <dt>热门搜索</dt>
                        <dd v-for="(item,i) in $store.state.home.hotPlace.slice(0, 6)" :key="i" v-text="item.name"></dd>
                    </dl>
                    <dl class="searchList" v-if="isSearchList">
                        <dd v-for="(item,i) in searchList" :key="i" v-text="item.name"></dd>
                    </dl>
                </div>
                <p class="suggest">
                    <a v-for="(item,i) in $store.state.home.hotPlace" :key="i" v-text="item.name"></a>
                </p>
                <ul class="nav">
                    <li><nuxt-link to="/" class="takeout">美团外卖</nuxt-link></li>
                    <li><nuxt-link to="/" class="movie">猫眼电影</nuxt-link></li>
                    <li><nuxt-link to="/" class="hotel">美团酒店</nuxt-link></li>
                    <li><nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link></li>
                    <li><nuxt-link to="/" class="business">商家入驻</nuxt-link></li>
                </ul>
            </el-col>
            <el-col :span="6" class="right">
              <ul class="security">
              <li>
                <i class="refund"><p class="txt">随时退</p></i>
              </li>
              <li>
                <i class="single"><p class="txt">不满意免单</p></i>
              </li>
              <li>
                <i class="overdue"><p class="txt">过期退</p></i>
              </li>
              </ul>
        </el-col>
    </el-row>
  </div>
</template>
<script>
import _ from "lodash"
export default {
  data() {
    return {
      search: '',
      isFoucs: false,
      hotPlate: [],
      searchList: []
    }
  },
  computed: {
    isHotPlate() {
      return this.isFoucs && !this.search
    },
    isSearchList() {
      return this.isFoucs && this.search
    }
  },
  methods: {
    // 搜索框聚焦事件
    onFocusSearch() {
      this.isFoucs = true
    },
    // 搜索框失去焦点事件
    onBlurSearch() {
      this.$nextTick(() => {
        this.isFoucs = false
      })
    },
    // 搜索框输入事件
    onInputSearch: _.debounce(async function() {
      let city = this.$store.state.geo.position.city.replace('市', '')
      const { status, data } = await this.$axios.get('search/top', { params: { input: this.search, city } })

      if (status === 200 && data && data.code === 0) {
        if (data.length >= 10) {
          this.searchList = data.data.slice(0, 10)
        } else {
          this.searchList = data.data
        }
      }
    }, 300)
  }
}

</script>
