<template>
<!-- 头部区域 -->
<el-container class="home-container">
  <!-- 头部区域 -->
  <el-header>
    <div class="left">
      <img src="./img/logo.png" alt />
      <span>青岛在线评审系统</span>
    </div>
    <el-dropdown>
      <span>欢迎您，admin</span>
      <!--下拉菜单-->
      <el-dropdown-menu slot="dropdown">

        <el-dropdown-item icon="el-icon-switch-button">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
  <!-- 主题区域 -->
  <el-container>
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '70px' : '200px'">
      <!-- 折叠展开 -->
      <el-radio-group v-model="isCollapse" style="margin: 20px 20px">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
      <!-- 侧边栏效果 -->
      <el-menu background-color="#333744" text-color="#fff" active-text-color="#ffd04b" unique-opened class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" router :default-active="activePath">
        <!-- 一级菜单 -->
        <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
          <!-- 一级菜单模板 -->
          <template slot="title">
            <!-- 图标 -->
            <i :class="iconsObj[item.id]"></i>
            <!-- 文本 -->
            <span>{{ item.name }}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item :index="subitem.path + ''" v-for="subitem in item.children" :key="subitem.path" @click="saveNavState(subitem.path + '')">
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>{{ subitem.name }}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 右侧主题 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      isCollapse: false, //折叠展开
      menuList: [{
          id: 1,
          name: '发布管理',
          children: [{
              id: 'Q1',
              path: '/qsList',
              name: '发布新的活动',
            },
            {
              path: '/Test',
              id: 'Q2',
              name: '管理活动',
            },
          ],
        },
        {
          id: 2,
          name: '审核管理',
          children: [{
              id: 'Q3',
              path: '/welocme',
              name: '审核专家管理',
            },
            {
              id: 'Q4',
              path: '/fillD',
              name: '审核用户管理',
            },
          ],
        },
        {
          id: 3,
          name: '评审管理',
          children: [{
              id: 'Q5',
              path: '/QSEdit/:code',
              name: '评审专家管理',
            },
            {
              path: '/QSEdit/:code1',
              id: 'Q6',
              name: '评审数据报表',
            },
            {
              path: '/QSEdit/:code1',
              id: 'Q7',
              name: '被评审数据管理',
            },
          ],
        },
        {
          id: 4,
          name: '公告通知',
          children: [{
              path: '/data/:code',
              id: 'Q8',
              name: '发布新的公告',
            },
            {
              path: '/data/:code2',
              id: 'Q9',
              name: '管理已发布公告',
            },
          ],
        },
        {
          id: 5,
          name: '公告通知',
          children: [{
              path: '/d/:code2',
              id: 'Q9',
              name: '数据列表',
            },
            {
              path: '/dd/:code2',
              id: 'Q10',
              name: '数据分类',
            },
          ],
        },
      ],
      iconsObj: {
        1: 'iconfont icon-icon-test3',
        2: 'iconfont icon-icon-test4',
        3: 'iconfont icon-icon-test2',
        4: 'iconfont icon-icon-test',
        5: 'iconfont icon-icon-test1',
      },
      activePath: '', //被激活的地址
    }
  },
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    getListData() {
      getList().then((res) => {
        console.log(res)
      })
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    //保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
  },
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.home-container {
  height: 100%;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #373d41;
  color: #eaedf1;
  font-size: 20px;

  .left {
    display: flex;
    align-items: center;

    span {
      margin-left: 20px;
    }

    img {
      width: 45px;
    }
  }
}

.el-aside {
  background-color: #333744;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 12px;
  font-size: 18px;
}

.toggle_box {
  background-color: chartreuse;
  font-size: 15px;
  font-weight: bold;
  line-height: 24px;
  color: #FFFFFF;
  letter-spacing: 0.2em;
  text-align: center;
  cursor: pointer;

}
</style>
