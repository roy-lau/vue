<template>
  <div class="m-products-list">
    <dl>
      <dd
        v-for="item in nav"
        :key="item.name"
        :class="[item.name,item.acitve?'s-nav-active':'']"
        @click="navSelect"
      >{{ item.txt }}</dd>
    </dl>
    <ul>
      <Item
        v-for="(item,idx) in list"
        :key="idx"
        :meta="item"/>
    </ul>
  </div>
</template>

<script>
import Item from './product.vue'
export default {
  components: {
    Item
  },
  props: {
    list: {
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      nav: [
        {
          name: 's-default',
          txt: '智能排序',
          acitve: true
        }, {
          name: 's-price',
          txt: '价格最低',
          active: false
        }, {
          name: 's-visit',
          txt: '人气最高',
          active: false
        }, {
          name: 's-comment',
          txt: '评价最高',
          active: false
        }
      ]
    }
  },
  async asyncData({app}) {
    let { data } = await app.$axios.get('searchList')
    return { items: data.list }
  },
  methods: {
    navSelect: function () {
      console.log('select')
    }
  }
}
</script>
<style lang="scss">
  .m-products-list {
      box-sizing: border-box;
      margin-top: 10px;
      background: #FFF;
      border: 1px solid #E5E5E5;
      border-radius: 4px;
      color: #333;
      font-size: 14px;
      line-height: 20px;
      padding: 11px 20px;

      >dl {
        dd {
          width: 96px;
          height: 20px;
          display: inline-block;
          box-sizing: border-box;
          text-align: center;
          cursor: pointer;

          &.s-nav-active {
            color: #31BCAD;
          }
        }

        padding-bottom: 2px;

        .s-price {
          position: relative;

          &:before,
          &:after {
            content: " ";
            position: absolute;
            right: 8px;
            top: 0;
            border: 4px solid transparent;
            border-bottom-color: #ddd;
            width: 0;
            height: 0;
          }

          &:after {
            top: 12px;
            border-bottom-color: transparent;
            border-top-color: #ddd;
          }
        }
      }

      >ul {
        list-style: none;
        padding: 11px 0;
      }
    }
</style>
