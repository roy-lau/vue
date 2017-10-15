<template>
  <transition name="slide">
  </transition>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'

export default {
  created() {
    console.log(mapGetters)
    this._getDetail()
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  methods: {
    _getDetail() {
      console.log('执行 methods')
      console.log('获取 mapGetters 数据', this.singer)
      if (!this.singer) {
        console.log('return /singer')
        this.$router.push('/singer')
        return
      }
      console.log('执行 getSingerDetail 方法')
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list)
        }
      })
    }
  }
}

</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>