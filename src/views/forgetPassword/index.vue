<template>
<div class="container">
  <news-header>
    <div class="register-title">忘记密码</div>
  </news-header>
  <section class="content-box">
    <el-form :rules="rules" :model="user" ref="forgetPass" label-width="80px">
      <el-form-item prop="phone" label="手机号">
        <el-input v-model="user.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code" label="验证码">
        <el-input v-model="user.code" placeholder="请输入验证码">
          <template slot="append">
            <el-button type="button" @click="sendcode" :disabled="disabled" v-if="disabled==false">发送验证码
            </el-button>
            <el-button type="button" @click="sendcode" :disabled="disabled" v-if="disabled==true">{{btntxt}}
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="newPass" label="新密码">
        <el-input type="password" v-model="user.newPass"></el-input>
      </el-form-item>
      <el-form-item prop="confirmPass" label="确认密码">
        <el-input type="password" v-model="user.confirmPass"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="full" type="primary" @click="submitForm">确认</el-button>
      </el-form-item>
    </el-form>
    <v-footer class="footer"></v-footer>
  </section>

</div>
</template>

<script>
import NewsHeader from '@/components/NewsHeader'
import VFooter from '@/components/footer'

export default {
  name: 'register',
  created() {

  },
  data() {
    var validatePhone = (rule, value, callback) => {
      var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (value === "") {
        return callback(new Error("请输入手机号码"));
      }
      setTimeout(() => {
        if (!reg.test(value)) {
          callback(new Error("请输入正确的11位的手机号码"));
        } else {
          callback();
        }
      }, 1000);
    };

    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.user.confirmPass !== '') {
          this.$refs.forgetPass.validateField('confirmPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.user.newPass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      user: {
        phone: '',
        code: '',
        newPass: '',
        confirmPass: ''
      },
      disabled: false,
      time: 0,
      btntxt: "重新发送",
      ranks: [],
      organs: [],
      type: 'update',
      rules: {
        phone: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {

            message: '必须是11位手机号码',
            trigger: 'blur'
          },
          {
            validator: validatePhone,
            trigger: 'blur'
          }
        ],
        code: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }],
        newPass: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 16,
            message: '长度在 6 到 16 个字符',
            trigger: 'blur'
          },
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        confirmPass: [{
            required: true,
            message: '请确认密码',
            trigger: 'blur'
          },
          {
            validator: validatePass2,
            trigger: 'blur',
            required: true
          }
        ],
      }
    }
  },
  methods: {
    forgivePassAjax() {
      this.$refs['forgetPass'].validate((valid) => {
        if (valid) {
          forgivePass({
            phone: this.user.phone,
            code: this.user.code,
            newPass: this.user.newPass,
            confirmPass: this.user.confirmPass
          }).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: res.message
              })
              this.user = {
                phone: '',
                code: '',
                newPass: '',
                confirmPass: ''
              }
              return true
            }
            this.$message({
              type: 'warning',
              message: res.message
            })
          })
        }
      })
    },
    //手机验证发送验证码
    sendcode() {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (this.user.phone == '') {
        this.$message({
          message: '手机号不能为空',
          center: true
        })
        return
      }
      if (!reg.test(this.user.phone)) {
        this.$message({
          message: '请输入正确的手机号',
          center: true
        })
        return
      } else {
        console.log(this.user.phone);
        this.$message({
          message: '发送成功',
          type: 'success',
          center: true
        });
        this.time = 60;
        this.disabled = true;
        this.timer();
      }
    },
    //60S倒计时
    timer() {
      if (this.time > 0) {
        this.time--;
        this.btntxt = this.time + "s后重新获取";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "获取验证码";
        this.disabled = false;
      }
    },
    submitForm() {

    }
  },
  components: {
    NewsHeader,
    VFooter
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100vw;
  overflow: auto;
}

.full {
  width: 100%;
}

.register-title {
  font-size: 20px;
  font-weight: 550;
  letter-spacing: 5px;
  text-align: center;
}

.content-box {
  width: 480px;
  margin: 50px auto 0;
}

.code-btn {
  padding: 0;
  width: 100px;
}

.footer {
  margin-top: 100px;
}
</style>
