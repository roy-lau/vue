<template>
  <Panel title="新手特权" :class="$style.panel">
    <section :class="$style.content">
      <div :class="$style.item">
        <h4>
          下载APP
          <span :class="$style.red">送888礼包</span>
        </h4>
        <p :class="$style.gray">新手专享</p>
        <img src="./imgs/novice-1.png" alt>
      </div>
      <div :class="$style.item">
        <ul>
          <li>
            <img src="./imgs/novice-2.png" alt>
            <h4 :class="$style.red">领128元新手礼包</h4>
            <p :class="$style.gray">立即开通</p>
          </li>
          <li>
            <img src="./imgs/novice-3.png" alt>
            <h4>
              打白条
              <span :class="$style.red">享免息</span>
            </h4>
            <p :class="$style.gray">立即开通享豪礼</p>
          </li>
        </ul>
      </div>
    </section>
  </Panel>
</template>
<script>
import Panel from "@/components/panel.vue";
export default {
  components: {
    Panel
  }
};
</script>
<style lang="scss" module>
@import "@/assets/css/element.scss";

.panel {
  @include panel;
  > h4 {
    border-bottom: 1px solid #ddd;
  }
  .content {
    @include list(row);
    .item {
      width: 50%;
      box-sizing: border-box;
      &:first-child{
          padding: 32px 20px;
          text-align: center;
          border-right: 1px solid #ddd;
          img{
              width: 132px;
              height: 132px;
              margin: 20px auto;
          }
      }
      h4{
          font-size: 26px;
          line-height: 40px;
      }
      .red{
          color:red;
      }
      .gray{
          font-size: 24px;
          color:#999;
      }
      ul{
          width: 100%;
          li{
              height: 144px;
              width: 100%;
              padding: 32px 28px;
              box-sizing: border-box;
              &:first-child{
                  border-bottom: 1px solid #ddd;
              }
              h4{
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  text-align: left;
              }
              img{
                  width: 80px;
                  height: 80px;
                  float: right;
              }
          }
      }
    }
  }
}
</style>
