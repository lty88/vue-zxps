<template>
<el-dialog class="container-login" :visible="show" width="420px" :show-close="false" @close="close" center>
  <section class="form">
    <el-form v-if="method === 'pwd'">
      <el-form-item>
        <el-input placeholder="手机号" v-model="phone">
          <template slot="prepend">
            <span class="el-icon-user"></span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="密码" type="password" v-model="password" show-password>
          <template slot="prepend">
            <span class="el-icon-lock"></span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="full" type="primary">登录</el-button>
      </el-form-item>
      <section class="title-bottom">
        <a href="javascript:void(0)" @click="rigester">没有账号？立即注册</a>
        <a href="javascript:void(0)" @click="forgetPassword">忘记密码</a>
      </section>
    </el-form>

  </section>
</el-dialog>
</template>

<script>
export default {
  name: 'login',
  created() {},
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      method: 'pwd',
      type: 'login',
      phone: '',
      password: '',
      code: '',
    }
  },
  watch: {

  },
  methods: {
    close() {
      this.$emit('close')
    },
    rigester() {
      this.$router.push('/register');
    },
    forgetPassword() {
      this.$router.push('/forgetPassword')
    }
  },
}
</script>

<style lang="scss">
.container-login .el-dialog__body {
  margin-top: -10px;
  padding-top: 15px;
}

.full {
  margin-top: 10px;
  width: 100%;

}

.title-bottom {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: 12px;
}
</style>
