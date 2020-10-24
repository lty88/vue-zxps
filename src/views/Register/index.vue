<template>
<div class="container">
  <news-header>
    <div class="register-title">注册账号</div>
  </news-header>
  <section class="content-box">
    <el-form :rules="rules" ref="register" :model="user" label-width="80px">
      <el-form-item prop="role" label="角色">
        <el-select v-model="user.role" placeholder="请选择角色">
          <el-option v-for="item in roles" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="phone" label="手机号">
        <el-input v-model="user.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="user.password" clearable size="small" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPwd">
        <el-input v-model="user.confirmPwd" clearable size="small" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="org" label="机构">
        <el-cascader class="full" v-model="user.org" :options="options" clearable></el-cascader>
      </el-form-item>
      <el-form-item prop="title" label="职称">
        <el-input type="password" v-model="user.title"></el-input>
      </el-form-item>
      <!--<el-form-item prop="organ" label="机构">
        <el-cascader class="full" v-model="user.organ" :options="organs | organsTree"></el-cascader>
      </el-form-item>
      <el-form-item prop="rank" label="负责学段">
        <el-cascader class="full" v-model="user.rank" :options="ranks | rankTree" :props="{ multiple: true }" clearable></el-cascader>
      </el-form-item>-->
      <el-form-item>
        <el-button class="full" type="primary" @click="registerAjax">注册</el-button>
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
        if (this.user.confirmPwd !== '') {
          this.$refs.register.validateField('confirmPwd');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      user: {
        role: '',
        phone: '',
        password: '',
        confirmPwd: '',
        title: '',
        code: '',
        schoolCode: '',
        org: [],
      },
      roles: [{
        value: '1',
        label: '教师'
      }, {
        value: '2',
        label: '评审专家'
      }, {
        value: '3',
        label: '管理员'
      }],
      ranks: [],
      organs: [],
      type: 'register',
      rules: {
        role: [{
          required: true,
          message: '请输选择角色',
          trigger: 'blur'
        }],
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
        password: [{
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
        confirmPwd: [{
            required: true,
            message: '请确认密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 16,
            message: '长度在 6 到 16 个字符',
            trigger: 'blur'
          },
          {
            validator: validatePass2,
            trigger: 'blur',
            required: true
          }
        ],
        code: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }],
        email: [{
            required: true,
            message: '请输入邮箱地址',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        schoolCode: [{
          required: true,
          message: '请输入机构代码',
          trigger: 'blur'
        }],
        org: [{
          type: 'array',
          required: true,
          message: '请选择机构',
          trigger: 'change'
        }],
        rank: [{
          type: 'array',
          required: true,
          message: '请选择负责学段',
          trigger: 'change'
        }],

      },

      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }]
    }
  },
  methods: {
    registerAjax() {
      this.$refs['register'].validate((valid) => {
        if (valid) {
          register({
            phone: this.user.phone,
            password: this.user.password,
            code: this.user.code,
            email: this.user.email,
            schoolCode: this.user.schoolCode,
            oid: this.user.organ.length === 0 ? '' : this.user.organ[this.user.organ.length - 1].oid,
            rank: this.user.rank.length === 0 ? '' : this.user.rank.map(item => {
              return item[item.length - 1]
            }).join('-')
          }).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: res.message
              })
              this.user = {
                phone: '',
                password: '',
                code: '',
                email: '',
                schoolCode: '',
                organ: [],
                rank: []
              }
              this.$router.push({
                path: '/news'
              })
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
    getSmsCodeAjax() {
      if (this.user.phone === '') {
        this.$message({
          type: 'warning',
          message: '请先填写电话!'
        })
        return false
      }
      this.judgeSecond().then(() => {
        getSmsCode({
          phone: this.user.phone,
          type: this.type
        }).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.calTime(this.type)
            return true
          }
          this.$message({
            type: 'warning',
            message: res.message
          })
        })
      })
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

/deep/.el-select>.el-input {
  width: 400px !important;
}

.footer {
  margin: 15px 0;
}
</style>
