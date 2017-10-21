<template>
  <div style="color: red;">
      歌手详情页
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'

export default {
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    console.log(this.singer)
    // this._getDetail()
  },
  methods: {
    _getDetail() {
      if (!this.singer) {
        this.$router.push('/singer')
        return
      }
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