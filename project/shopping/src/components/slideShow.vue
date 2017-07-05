
<!-- 这是一个幻灯片组件 -->

<template>
  <div class="slide-show"  @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-img">
      <a :href="slides[nowIndex].href">
        <transition name="slide-trans">
          <img v-if="isShow" :src="slides[nowIndex].src">
        </transition>
        <transition name="slide-trans-old">
          <img v-if="!isShow" :src="slides[nowIndex].src">
        </transition>
      </a>
    </div>
    <h2>{{ slides[nowIndex].title }}</h2>		<!-- 底部左侧标题 -->
    <ul class="slide-pages">
       <li @click="goto(prevIndex)">&lt;</li> <!-- 上一页 -->
      <li v-for="(item, index) in slides"
      @click="goto(index)"
      >
        <a :class="{on: index === nowIndex}">{{ index + 1 }}</a>
      </li>
      <li @click="goto(nextIndex)">&gt;</li> <!-- 下一页 -->
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      default: []
    },
    inv: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {
      nowIndex: 0,
      isShow: true
    }
  },
  computed: {
  	/* 
  	 * 上一页逻辑：
  	 * 如果当前页等于0，则返回所有图片的总数。否则返回当前页的上一页
  	 *
  	 */
  		prevIndex() {
  			if (this.nowIndex === 0) {
  				return this.slides.length - 1
  			}else {
  				return this.nowIndex - 1
  			}
  		},
  	/* 
  	 * 
  	 * 下一页逻辑：
  	 * 如果当前页等于所有图片的总数，则返回 0 。否则返回当前页的下一页
  	 * 
  	 */
  		nextIndex() {
  			if (this.nowIndex === this.slides.length - 1) {
  				return 0 
  			}else {
  				return this.nowIndex + 1
  			}
  		}
  },
  methods: {
    goto (index) {
    	this.isShow = false
    	setTimeout(() => {
	    	this.isShow = true
	  		this.nowIndex = index
    	}, 10) 
    },
    runInv () {		// runInv 自动播放换灯片(页面渲染完成后，鼠标移除)
    	this.invId = setInterval(() => {
    		this.goto(this.nextIndex)   // 执行goto方法，每次传入计算属性的下一页。
    	}, this.inv)  // this.inv 每隔多长时间自动执行
    },
    clearInv (){	// clearInv 停止自动播放幻灯片（鼠标移入）
    	clearInterval(this.invId)
    }
  },
  mounted (){
  	this.runInv() 	// 页面渲染完成后，执行runInv方法
  }
}
</script>

<style scoped>
.slide-trans-enter-active {
  transition: all .5s;
}
.slide-trans-enter {
  transform: translateX(900px);
}
.slide-trans-old-leave-active {
  transition: all .5s;
  transform: translateX(-900px);
}
.slide-show {
  position: relative;
  margin: 15px 15px 15px 0;
  width: 900px;
  height: 500px;
  overflow: hidden;
}
.slide-show h2 {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  background: #000;
  opacity: .5;
  bottom: 0;
  height: 30px;
  text-align: left;
  padding-left: 15px;
}
.slide-img {
  width: 100%;
}
.slide-img img {
  width: 100%;
  position: absolute;
  top: 0;
}
.slide-pages {
  position: absolute;
  bottom: 10px;
  right: 15px;
}
.slide-pages li {
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  color: #fff;
}
.slide-pages li .on {
	color: yellow;
  text-decoration: underline;
}
</style>
