<template>
<div id="app">

  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'app',
  components: {}
}
</script>

<style lang="scss" scoped>
@import './assets/normalize.css';

#app {
  height: 100vh;
  overflow: hidden;
}

body .el-table th.gutter {
  display: table-cell !important;
}
</style>
