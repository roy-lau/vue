
<!-- 金额/数字设置组件 -->

<template>
    <div class="counter-component">
      <div class="counter-btn" @click="minus"> - </div>
      <div class="counter-show">
        <input type="text" v-model="number" @keyup="fixNumber">
      </div>
      <div class="counter-btn" @click="add"> + </div>
    </div>
</template>

<script>
export default {
  // 获取父组件传来的最大最小值，最大值默认是5，最小值默认是1.
  props: {
    max: {
      type: Number,
      default: 5
    },
    min: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      number: this.min  //  输入框内默认显示最小值
    }
  },
  watch: {
    number () {
      this.$emit('on-change', this.number)  // 每次数据变更时将输入框内的值传给父组件
    }
  },
  methods: {
    /*
    1. 键盘弹起时触发fixNumber事件
    2. 定义一个变量fix
    3. 判断输入框内的值类型是否是string，如果是string则清空。清空后赋值给fix。
    4. 如果输入框内的是不是string，则将输入框内的值赋给fix。
    5. 判断fix的值是否在设置的最大和最小值之间，如果不在最大和最小值之间，则返回一个设置的最小值。
    6. 最后将fix返回给输入框
    */
    fixNumber () {
      let fix
      if (typeof this.number === 'string') {
        fix = Number(this.number.replace(/\D/g, ''))
      }
      else {
        fix = this.number
      }
      if (fix > this.max || fix < this.min) {
        fix = this.min
      }
      this.number = fix
    },
    // 最大值默认是5，最小值默认是1.
    // 如果当前值小于等于最小值时，就return掉，不执行mins()方法
    // 否则当前值就减一
    minus () {
      if (this.number <= this.min) {
        return
      }
      this.number --
    },
   // 如果当前值大于等于最大值时，就return掉，不执行add()方法
    // 否则当前值就加一
    add () {
      if (this.number >= this.max) {
        return
      }
      this.number ++
    }
  }
}
</script>

<style scoped>
.counter-component {
  position: relative;
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
}
.counter-show {
  float: left;
}
.counter-show input {
  border: none;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  height: 23px;
  line-height: 23px;
  width: 30px;
  outline: none;
  text-indent: 4px;
}
.counter-btn {
  border: 1px solid #e3e3e3;
  float: left;
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  cursor: pointer;
}
.counter-btn:hover {
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}

</style>
