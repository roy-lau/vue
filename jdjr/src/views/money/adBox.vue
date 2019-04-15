<template>
    <Panel :title="title" :class="$style.panel" >
        <section :class="$style.content">
            <img :src="img" :alt="title" :height="height">
        </section>
    </Panel>
</template>

<script>
import Panel from "@/components/panel.vue"
export default {
    components:{
        Panel
    },
    props:{
        title:{
            type: String,
            default:"标题"
        },
        img:{
            type: String,
            default:""
        },
        height:{
            type:[String,Number],
            default:"100px"
        }
    }
}
</script>
<style lang="scss" module>
@import "@/assets/css/element.scss";
.panel{
    @include panel;
    &>h4{
        display: none;
    }
    .content{
        img{
            width: 100%;
            display: block;
        }
    }
}
</style>

