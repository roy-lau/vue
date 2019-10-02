<template>
  <Panel title="急速借贷" :class="$style.panel">
    <section :class="$style.content">
      <router-link to="home">
        <img src="./imgs/borrow-1.png" alt />
      </router-link>
    </section>
  </Panel>
</template>

<script>
import Panel from "@/components/panel"
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
        padding-bottom: 40px;
        img{
            display: block;
            width: 100%;
        }
    }
}
</style>
