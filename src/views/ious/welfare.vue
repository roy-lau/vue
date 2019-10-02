<template>
    <Panel title="白条福利" :class="$style.panel">
          <section :class="$style.content">
            <div :class="$style.item">
                <img src="./imgs/welfare-1.jpg" alt="">
                <div>
                    <h4>开通白条</h4>
                    <p>送188元礼包</p>
                </div>
                <em>立即开通 > </em>
            </div>
            <div :class="$style.item">
                <img src="./imgs/welfare-2.jpg" alt="">
                <div>
                    <h4>白条闪付</h4>
                    <p>新手享158元礼包</p>
                </div>
                <em>随机立减 > </em>
            </div>
            <div :class="$style.item">
                <img src="./imgs/welfare-3.jpg" alt="">
                <div>
                    <h4>白条提额</h4>
                    <p>金融app专享提额礼包</p>
                </div>
                <em>去提额 > </em>
            </div>
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
    &>h4{
        border-bottom: 1px solid #ddd;
    }
    .content{
        @include flex;
        .item{
            @include flex(row);
            align-items: center;
            height: 140px;
            &:after{
                content: " ";
                box-sizing: border-box;
                height: 0;
                width: 100%;
                border-bottom: 1px solid #ddd;
                margin-left: 150px;
            }
            &:last-child:after{
                border-color: #fff;
            }
            >img{
                width: 88px;
                height: 88px;
                display: inline-block;
                margin: 0 32px;
            }
            >div{
                font-size: 32px;
                color: #333;
                line-height: 1.8;
                width: 344px;
                p{
                    color: #ff3232;
                    font-size: 24px;
                    line-height: 1.1;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
            }
            >em{
                color: #ff801a;
                font-size: 28px;
            }
        }
    }
}
</style>

