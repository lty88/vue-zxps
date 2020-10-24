<template>
<el-header class="header">
  <div class="logo-box" @click="goHome">
    <img src="./img/logo.png" alt />
    <span>青岛市在线评审系统</span>
  </div>
  <div class="box">
    <slot />
  </div>
  <div class="login-box">
    <span class="login" @click="login">登录</span>
  </div>
</el-header>
</template>

<script>
export default {
  name: 'head-public',
  methods: {
    goHome() {
      this.$router.push({
        path: '/'
      })
    },
    login() {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/common.sass';

.el-header,
.el-footer {
  background-color: $white-font-color;
  color: $header-bg-color;
  text-align: center;
  line-height: 60px;
}

.header {
  box-sizing: border-box;
  height: 190px !important;
  line-height: 135px !important;
  display: flex;
  justify-content: space-around;
  border-bottom: 60px solid #105697;

  .logo-box {
    display: flex;
    align-items: center;
    cursor: pointer;

    span {
      font-weight: bold;
      font-size: $logo-font-size;
      margin-left: 5px;
    }

    img {
      width: 65px;
    }
  }

  .search-box {
    width: 350px;
  }

  .login-box {
    cursor: pointer;

    .login {
      margin-right: 10px;
    }
  }
}
</style>
