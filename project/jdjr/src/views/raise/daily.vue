<template>
  <Panel title="每日签到" :class="$style.panel">
    <section :class="$style.content">
      <img src="./imgs/daily-1.jpg" alt>
      <img src="./imgs/daily-2.jpg" alt>
      <p>不抢白不抢</p>
    </section>
  </Panel>
</template>
<script>
import Panel from "@/components/panel.vue"
export default {
    components:{
        Panel
    }
}
</script>

<style lang="scss" module>
@import "@/assets/css/element.scss";

.panel {
  @include panel;
  .content {
    @include flex(row);
    position: relative;
    padding-bottom: 40px;
    img{
        width: 320px;
        height: 136px;
    }
    p{
        position: absolute;
        top: -112px;
        right: 20px;
        font-size: 28px;
        color: #999;
        height: 112px;
        line-height: 112px;
    }
  }
}
</style>
