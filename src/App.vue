<template>
  <div id="app">
    <home />
  </div>
</template>

<script>
import home from 'container/home'
export default {
  name: 'App',
  components: {
    home
  }
}
</script>
<style lang="less" scoped>
  * {
    margin: 0;
    padding: 0;
  }
</style>
