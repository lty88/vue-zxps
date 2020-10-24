<template>
<div class="Footer">
  Copyright@
  <span>{{Years}}</span> 成都乐培生科技有限公司 蜀ICP备15018125号
</div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      Years: "",
    }
  },
  mounted() {
    this.Years = new Date().getFullYear();
  }
}
</script>

<style lang="scss" scoped>
.Footer {
  line-height: 60px;
}
</style>
