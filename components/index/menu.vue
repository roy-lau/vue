<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="onMouseleave">
      <dt>全部分类</dt>
      <dd v-for="(item,idx) in $store.state.home.menu" :key="idx" @mouseenter="onMouseenter">
        <i :class="item.type"/>{{ item.name }}<span class="arrow"/>
      </dd>
    </dl>
    <div
      v-if="kind"
      class="detail"
      @mouseenter="sOver"
      @mouseleave="sOut">
      <template
        v-for="(item,idx) in curDetail.child">
        <h4 :key="idx">{{ item.title }}</h4>
        <span
          v-for="v in item.child"
          :key="v">{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            kind:'',
            menu:[{
                type:'food',
                name: '美食',
                child:[{
                    title:'美食',
                    child:['代金券','火锅']
                }]
            },{
                type:'takeout',
                name: '外卖',
                child:[{
                    title:'外卖',
                    child:['代金券','火锅']
                }]
            }]
        }
    },
    computed:{
        curDetail(){
            return this.$store.state.home.menu.filter(item => item.type===this.kind)[0]
        }
    },
    methods:{

        // 鼠标离开事件
        onMouseleave(){
            let self = this
            self._timer = setTimeout(()=>{
                self.kind = ''
            },150)
        },
        // 鼠标移入事件
        onMouseenter(e){
            this.kind = e.target.querySelector('i').className
        },
        sOver(){
            clearTimeout(this._timer)
        },
        sOut(){
           this.kind = ''
        },
    },
 // mounted() {
 //    console.log(this.$store)
 //  }
}
</script>
