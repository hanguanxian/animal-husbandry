<template>
    <el-row class="content">
    <el-col :xs="24" :sm="{span: 8,offset: 8}">
        <h1> {{ title }} </h1>
        <el-row v-show="!registerFlag">
          <el-form :model="loginForm" ref="loginForm" label-width="100px" :rules="loginRules">
              <el-form-item prop="power" label="用户类别:">
                <el-select v-model="loginForm.power" placeholder="请选择用户类别">
                  <el-option label="普通用户" value="2"></el-option>
                  <el-option label="专家" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="userName" label="用户名:">
                  <el-input v-model="loginForm.userName" placeholder="用户名"></el-input>
              </el-form-item>
              <el-form-item prop="password" label="密码:">
                  <el-input type="password" placeholder="密码" v-model="loginForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
                <el-button @click="formChange">注册</el-button>
              </el-form-item>
          </el-form>
        </el-row>
        <el-row v-show="registerFlag">
          <el-form :model="registForm" ref="registForm" label-width="100px">
              <el-form-item prop="userName" label="用户名:">
                  <el-input v-model="registForm.userName" placeholder="用户名"></el-input>
              </el-form-item>
              <el-form-item prop="password" label="密码:">
                  <el-input type="password" placeholder="密码" v-model="registForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="register">注册</el-button>
                <el-button @click="formChange">返回登录</el-button>
              </el-form-item>
          </el-form>
        </el-row>
    </el-col>
  </el-row>
</template>
<script>
    export default {
    data () {
      return {
        title: '用户登录',
        registerFlag: false,
        loginUrl: "/interface/user/checklogin",
        loginForm: {
          power:"1",
          userName: 'zhangsir',
          password: '12121212'
        },
        loginRules: {
          power: [
            { required: true, message: '请选择用户类别', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        registForm: {
          userName: 'zhangsir',
          password: '12121212'
        }
      }
    },
    watch: {
    // 如果 question 发生改变，这个函数就会运行
    // password_r: function () {
    //   if(this.password_r ==''){
    //     this.tips="输入密码啊"
    //   }
    //   else if(this.password_r != this.password)
    //   {
    //     this.tips="两次密码不一样哦"
    //   }
    //   else
    //     this.tips="对接成功，可以注册了"
    // }
  },
  methods:{
    formChange(){
      this.registerFlag = !this.registerFlag;
      this.title = this.register ? "用户注册" : "用户登录";
    },
    login() {
      const self = this;
      self.$refs.loginForm.validate((valid) => {
        if (valid) {
          self.$axios.post(self.loginUrl, self.loginForm).then((res) => {
            console.log(res);
            localStorage.setItem('msuserName',self.loginForm.userName);
          });
        }
      });
    },
    register() {

      }
    }
  }
</script>
<style scoped>
  .content {
      padding-top: 60px;
  }
  h1 {
      text-align: center;
      color: #368A55;
  }
</style>
