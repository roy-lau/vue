
<!-- 多选切换按钮 组件 -->

<template>
  <div class="chooser-component">
    <ul class="chooser-list">
      <li
        v-for="(item, index) in selections"
        @click="toggleSelection(index)"
        :key="index"
        :title="item.label"
        :class="{active: checkActive(index)}"
      >
        {{ item.label }}
        <!-- <span> | {{ checkActive(index) }}</span> 用来查看retuen 的值-->
      </li>
    </ul>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    selections: {
      type: Array,
      default: [
        {
          label: "test",
          value: 0
        }
      ]
    }
  },
  data() {
    return {
      nowIndexes: [0]
    };
  },
  methods: {
    /* 
      1. nowIndexes创建一个数组
      2. toggleSelection方法传入一个选中的下标
      3. 判断传入的下标是否等于 负一(-1)
      4. 如果传入的下标等于负一，就将下标传入 nowIndexes数组中
          注：this.nowIndexes.indexOf(index)会返回当前数组所有的值和一个负一(-1)
      5. 如果传入的下标内没有负一，就将传入的下标删除
    */
    toggleSelection(index) {
      if (this.nowIndexes.indexOf(index) === -1) {
        this.nowIndexes.push(index);
      } else {
        this.nowIndexes = _.remove(this.nowIndexes, idx => {
          // idx: 当前已选中的值, index当前点击的值
          // 如果已选中的值和点击(传入/index)的值不同，则返回true(添加)
          // 如果已选中的值和点击(传入/index)的值相同，则返回false(删除)
          return idx !== index;
        });
      }
      // nowObjArray:当前数组内所有的数据
      let nowObjArray = _.map(this.nowIndexes, idx => {
        return this.selections[idx];
      });
      this.$emit("on-change", nowObjArray);
    },
    checkActive(index) {
      // c传入的值已选中，返回一个false
      // 传入的值未选中，返回一个true

      return this.nowIndexes.indexOf(index) !== -1;
    }
  }
};
</script>

<style scoped>
.chooser-component {
  position: relative;
  display: inline-block;
}
.chooser-list li {
  display: inline-block;
  border: 1px solid #e3e3e3;
  height: 25px;
  line-height: 25px;
  padding: 0 8px;
  margin-right: 5px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
}
.chooser-list li.active {
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}
</style>
