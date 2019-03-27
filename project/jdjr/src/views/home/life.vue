<template>
    <Panel title="生活服务" :class="$style.panel">
        <ul :class="$style.content">
             <li :class="$style.item">
                <img src="./imgs/life-1.png" alt="">
                <p>惠加油</p>
            </li>
            <li :class="$style.item">
                <img src="./imgs/life-2.png" alt="">
                <p>小白信用</p>
                <p>全新升级</p>
            </li>
            <li :class="$style.item">
                <img src="./imgs/life-3.png" alt="">
                <p>信用卡还款</p>
            </li>
            <li :class="$style.item">
                <img src="./imgs/life-4.png" alt="">
                <p>卡转让</p>
            </li>
            <li :class="$style.item">
                <img src="./imgs/life-5.png" alt="">
                <p>定期还款</p>
            </li>
        </ul>
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
        box-sizing: border-box;
        .item{
            width: 20%;
            text-align: center;
            img{
                width: 90px;
                height: 90px;;
            }
            p{
                font-size: 26px;
                color: #666;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                margin-top: 12px;
                &:nth-child(3){
                    color: #ff801a;
                }
            }
        }
    }
}
</style>


