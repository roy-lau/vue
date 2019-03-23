<template>
    <Panel title="In货推荐" :class="$style.panel" >
        <section :class="$style.content">

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

<style lang="scss">
@import "@/assets/css/element.scss";
.panel{
    @include panel;
    .content{}
}
</style>
