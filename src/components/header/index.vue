<template>
<header class="header-container">
  <div class="header-title">
    <img src="./img/logo.png" alt="logo" width="50" height="50" />
    <span>青岛市教育质量监测大数据中心监测信息平台</span>
  </div>
  <div class="operation-wrapper">
    <div class="welcome-info">
      <span class="name">{{ nickName }}</span>
      <span class="welcome">, 欢迎您!</span>
    </div>
    <span class="el-icon-caret-bottom icon">
      <triangle-box class="operation-list">
        <li @click="logoutAjax">退出登录</li>
      </triangle-box>
    </span>
  </div>
</header>
</template>

<script>
import triangleBox from '@/components/triangleBox'
import {
  mapGetters
} from 'vuex'
import {
  logout
} from '@/ApiCp/User'

export default {
  name: 'vue-header',
  computed: {
    ...mapGetters([
      'nickName'
    ])
  },
  methods: {
    logoutAjax() {
      logout().then(res => {
        this.$router.push({
          path: '/news'
        })
        location.reload()
      })
    }
  },
  components: {
    triangleBox
  }
}
</script>

<style lang="sass" scoped>
@import '~@/styles/common.sass'

.header-container display: flex;
justify-content: space-between;
align-items: center;
padding: 0 15px;
height: 65px;
.header-title display: flex;
align-items: center;
font-size: $theme-font-size font-weight: bold;
letter-spacing: 1px;
img margin-right: 5px;
.operation-wrapper display: flex;
align-items: center;
font-size: $text-font-size;
.welcome-info margin-right: 10px;
.icon position: relative;
padding: 10px;
cursor: pointer;
&:hover .operation-list display: block;
.operation-list display: none;
position: absolute;
top: 35px;
left: 50%;
z-index: 9999;
transform: translateX(-50%);
</style>
