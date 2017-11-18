import { mapGetters } from 'vuex'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  // 组件document.read的时候触发
  mounted() {
    this.handlePlaylist(this.playList)
  },
  // 组件切进来的时候触发
  activated() {
    this.handlePlaylist(this.playList)
  },
  watch: {
    playList(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    // 如果组件内实现了handlePlaylist方法，使用组件内实现的，如果没有实现则抛出异常提醒用户实现这个方法
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method') // 组件必须实现handlePlaylist方法
    }
  }
}