<template>
  <dl class="s-item">
    <dt>
      <img
        :src="meta.img"
        alt="商品图片">
    </dt>
    <dd>
      <h3><nuxt-link :to="{path:'detail',query:{keyword:meta.name,type:meta.module}}">{{ meta.name }}</nuxt-link></h3>
      <el-rate
        v-model="meta.rate"
        :colors="['#ff9900', '#ff9900', '#FF9900']"
        disabled/>
      <span
        v-if="meta.rate>4"
        class="s-item-comment">很好</span><span
          v-else-if="meta.rate>2"
          class="s-item-comment">一般</span><span
            v-else
            class="s-item-comment">很差</span>
      <span class="s-item-value">{{ meta.rate }}分</span>
      <span class="s-item-comment-total">{{ meta.comment }}人评论</span>
      <p>
        <span class="s-item-type">{{ meta.type }}</span>
        <span class="s-item-addr">{{ meta.addr }}</span>
      </p>
      <p>
        <em class="s-item-price">￥{{ meta.price}} 起</em>
        <b>{{ meta.status }}</b>
      </p>
      <ul>
        <!-- <li>
          <span class="detail-type">门票</span>{{meta.ticket}}
        </li>
        <li>
          <span class="detail-type">跟团</span>{{meta.group}}
        </li> -->
        <li v-if="meta.scene&&meta.scene.length">
          <span class="detail-type">景酒</span>{{ meta.scene }}
        </li>
        <li v-else>
          <span class="detail-type">景酒</span>暂无描述
        </li>
      </ul>
    </dd>
  </dl>
</template>

<script>
export default {
  props: {
    meta: {
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>
<style lang="scss">
 .s-item {
      display: flex;
      padding: 20px 0;
      min-height: 125px;
      border-top: 1px solid #E5E5E5;

      dt {
        width: 220px;
        padding-right: 20px;

        >img {
          width: 220px;
          height: 125px;
          overflow: hidden;
        }
      }

      dd {
        flex: 1;

        >h3 {
          font-weight: 500;
          font-size: 16px;
          color: #333;
        }

        .el-rate {
          display: inline-block;

          .el-rate__icon {
            font-size: 12px;
          }
        }

        >span {
          font-size: 12px;
          margin-right: 10px;
        }

        .s-item-comment-total {
          color: #f90;
        }

        .s-item-price {
          color: #f60;
        }

        >p {
          >span {
            font-size: 12px;
            padding-right: 10px;
          }

          >em {
            font-style: normal;
          }

          >b {
            float: right;
            border: 1px solid #31BBAC;
            background-color: rgb(255, 153, 0);
            border-color: rgb(255, 153, 0);
            color: rgb(255, 255, 255);
            padding: 0 6px;
            border-radius: 2px;
            height: 18px;
            line-height: 18px;
            font-size: 12px;
            cursor: default;
          }
        }

        >ul {
          list-style: none;
          font-size: 12px;
          padding-top: 11px;
          margin-top: 5px;
          border-top: 1px dashed #ddd;

          li {
            width: 668px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            .detail-type {
              width: 27px;
              height: 15px;
              line-height: 15px;
              display: inline-block;
              background: rgb(35, 147, 238);
              color: #fff;
              text-align: center;
              border-radius: 1px;
              padding: 1px 2px;
              margin-right: 10px;
            }

            &:nth-child(2) {
              .detail-type {
                background: rgb(162, 35, 204);
              }
            }

            &:nth-child(3) {
              .detail-type {
                background: rgb(234, 109, 45);
              }
            }
          }
        }
      }
    }

</style>
