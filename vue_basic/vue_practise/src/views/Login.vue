<template>
  <div class="login-container">
    <div class="login-box">
      <el-form :model="form" ref="loginRef" :rules="loginRules">
        <el-form-item label="账号" prop="account">
          <el-input
            v-model="form.account"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass" label="密码">
          <el-input
            v-model="form.pass"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        account:'',
        pass: '',
      },
      loginRules: {
        account: [{ required: true, message: "账号不能为空", trigger: "blur" },
                  { min:3,max:15,message:'账号长度有误',trigger:'blur'}
        ],
        pass: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min:6,max:16,message:'密码长度有误',trigger:'blur'}
        ],
      },
    };
  },
  methods: {
    reset() {
      // this.form.account = "";
      // this.form.pass = "";
      // console.log('this,',this);
      this.$refs.loginRef.resetFields()
    },
    login() {
      // if(this.form.account !== '' && this.form.pass !== ''){
      // localStorage.setItem('userAccount',this.form.account)
      // localStorage.setItem('userPass',this.form.pass)
      //   this.reset()
      localStorage.setItem('a',1)
      this.$refs.loginRef.validate((valid) => {
        // console.log("valid", valid);
        // this.$http.post or get('要求路径',this.form)
        if(!valid){
          this.$message.error('登录失败！')
        }else{
          this.$message.success('登录成功！')
          this.$router.push('/main')
        }
        this.reset()
      });
    },
  },
};
</script>

<style  lang="scss" scoped>
.login-container {
  position: absolute;
  left: 0;
  right: 0;
  height: 100%;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-box {
    height: 300px;
    width: 400px;
    background-color: floralwhite;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
