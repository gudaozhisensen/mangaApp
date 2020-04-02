<template>
  <div id="app">
      <keep-alive>
        <router-view :key="key"></router-view>
      </keep-alive>

  </div>
</template>

<script>
  export default{
    data() {
      return {
        
      }
    },
    computed: {
      key() {
      return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date()
      }
}
  }

</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif;
}
body {
  background-color: #efefef;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;
  
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
