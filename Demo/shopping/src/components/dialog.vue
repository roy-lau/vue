
<!-- 这是一个弹框组件 -->

<template>
  <div>
    <div class="dialog-wrap">
      <div class="dialog-cover"  v-if="isShow" @click="closeMyself"></div>
      <transition name="drop">
        <div class="dialog-content"  v-if="isShow">
          <p class="dialog-close" @click="closeMyself">x</p>
          <slot>没有内容……</slot>	<!-- slot插槽：渲染内容 -->
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {		// 接收父级传来的是否显示
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    closeMyself () {	
      this.$emit('on-close')  // on-close 告诉父级关闭弹框
    }
  }
}
</script>

<style scoped>
	.drop-enter-active {
	  transition: all .5s ease;
	}
	.drop-leave-active {
	  transition: all .3s ease;
	}
	.drop-enter {
	  transform: translateY(-500px);
	}
	.drop-leave-active {
	  transform: translateY(-500px);
	}

	.dialog-wrap {
	  position: fixed;
	  width: 100%;
	  height: 100%;
	}
	.dialog-cover {
	  background: #000;
	  opacity: .3;
	  position: fixed;
	  z-index: 5;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	}
	.dialog-content {
	  width: 50%;
	  position: fixed;
	  max-height: 50%;
	  overflow: auto;
	  background: #fff;
	  top: 20%;
	  left: 50%;
	  margin-left: -25%;
	  z-index: 10;
	  border: 2px solid gray;
	  padding: 2%;
	  line-height: 1.6;
	}
	.dialog-close {
	  position: absolute;
	  right: 5px;
	  top: 5px;
	  width: 20px;
	  height: 20px;
	  text-align: center;
	  cursor: pointer;
	}
	.dialog-close:hover {
	  color: #4fc08d;
	}
</style>
