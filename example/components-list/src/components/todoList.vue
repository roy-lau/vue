<template>
  <div id="app">
    <h1 v-text="title"></h1>
    <input type="text" v-model="newItem" @keyup.enter="addNew(newItem)">
    <ol>
      <li v-for="item in items" v-text="item.lable" :class="{clickBG: item.isFinished}" @click="toggleFinish(item)"></li>
    </ol>
  </div>
</template>

<script>

export default {
  data () {
    return {
        title: "this is a todo list",
        items: [
        {
          lable: 'coding',
          isFinished: false
        },{
          lable: 'walking',
          isFinished: true
        }
      ],
      newItem: ''
    }
  },
  methods:{
    toggleFinish (item){
      item.isFinished = ! item.isFinished;
    },
    addNew  () {
      this.items.unshift({
          lable: this.newItem,
          isFinished: false
        })
      this.newItem = ''
    }
  }
}
</script>