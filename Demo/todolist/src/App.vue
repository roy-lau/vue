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
  data: function() {
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
    toggleFinish: function(item){
      item.isFinished = ! item.isFinished;
    },
    addNew: function () {
      this.items.unshift({
          lable: this.newItem,
          isFinished: false
        })
      this.newItem = ''
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.clickBG{
  background: blue;
}
</style>
