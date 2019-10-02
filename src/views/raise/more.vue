<template>
    <Panel title="更多福利" :class="$style.panel" >
        <section :class="$style.content">
            <img src="./imgs/more-1.jpg" alt="">
            <img src="./imgs/more-2.jpg" alt="">
            <img src="./imgs/more-3.jpg" alt="">
            <span>专享福利 > </span>
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
 .panel{
    @include panel;
    .content{
      @include flex(row);
      position: relative;
      justify-content: space-around;
      padding-bottom: 60px;
      img{
        width: 33.333333%;
        height: 280px;
      }
      span{
        position: absolute;
        right: 20px;
        top: -112px;
        font-size: 28px;
        color: #999;
        height: 112px;
        line-height: 112px;
      }
    }
  }
</style>
