<template>
<el-container class="home-container">
  <el-header class="header">
    <div class="logo-box">
      <img src="./img/logo.png" alt />
      <span>青岛市在线评审系统</span>
    </div>
    <!-- <div class="search-box">
      <el-input placeholder="请输入内容" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div> -->
    <div class="login-box">
      <span class="login" @click="loginToggle = true">登录</span>
      <span class="register" @click="register">注册</span>
    </div>
  </el-header>
  <el-main>Main</el-main>
  <el-footer>
    <div class="footer">
      Copyright@
      <span>{{Years}}</span> 成都乐培生科技有限公司 蜀ICP备15018125号
    </div>
  </el-footer>
  <Login :show="loginToggle" @close="loginToggle = false"></Login>
</el-container>
</template>

<script>
import Login from '@/views/Login/index'

export default {
  name: 'news',
  components: {
    Login
  },
  data() {
    return {
      Years: "",
      loginToggle: false,
    }
  },
  methods: {
    register() {
      this.$router.push('/register')
    }
  },
  mounted() {
    this.Years = new Date().getFullYear();
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
  height: 90px !important;
  line-height: 90px;
  display: flex;
  justify-content: space-around;

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

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 700px;
}

.footer {
  line-height: 60px;
}
</style>
