<template>
  <div class="register-container">
    <el-form
      ref="loginForm"
      :model="RegisterForm"
      :rules="loginRules"
      class="register-form"
      auto-complete="on"
      label-position="left"
    >

      <div class="title-container">
        <h2 class="bigtitle">12307火车订票系统</h2>
        <h3 class="title">用户信息修改</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          ref="username"
          v-model="RegisterForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="off"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="RegisterForm.password"
          :type="passwordType"
          placeholder="请输入新密码，不改动请留空"
          name="password"
          tabindex="2"
          auto-complete="off"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>

      <el-form-item prop="phone_number">
        <span class="svg-container">
          <svg-icon icon-class="phone"/>
        </span>
        <el-input
          ref="phone_number"
          v-model="RegisterForm.phone_number"
          placeholder="Phone Number"
          name="phone_number"
          type="text"
          tabindex="3"
          auto-complete="off"
        />
      </el-form-item>

      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="email"/>
        </span>
        <el-input
          ref="email"
          v-model="RegisterForm.email"
          placeholder="E-Mail Address"
          name="email"
          type="text"
          tabindex="4"
          auto-complete="off"
        />
      </el-form-item>

      <el-form-item prop="real_name">
        <span class="svg-container">
          <svg-icon icon-class="real_name"/>
        </span>
        <el-input
          ref="real_name"
          v-model="RegisterForm.real_name"
          placeholder="Real Name"
          name="real_name"
          type="text"
          tabindex="5"
          auto-complete="off"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="warning"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleRegister"
      >修改个人信息
      </el-button>

      <div class="tips">
        <span>南方科技大学数据库原理课程项目</span>
        <span>黄炜杰,石文轩</span>
      </div>

    </el-form>
  </div>
</template>

<script>
  import { Register } from '@/utils/register'
  import { validUsername } from '@/utils/validate'
  import { getInfo, modifyUserInfo } from '@/api/user'

  export default {
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        validUsername(value).then(value => {
          if (value) {
            callback()
          } else {
            callback(new Error('用户名已存在'))
          }
        }).catch(error => {
          callback(new Error(error))
        })
      }
      const validatePassword = (rule, value, callback) => {
        const regex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}')
        if (!regex.test(value)) {
          callback(new Error('密码中必须包含字母、数字，至少8个字符，最多30个字符。'))
        } else {
          callback()
        }
      }
      return {
        RegisterForm: {
          username: '',
          password: '',
          phone_number: '',
          email: '',
          real_name: ''
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined
      }
    },
    created() {
      this.getUserInfo()
    },
    methods: {
      getUserInfo() {
        new Promise((resolve, reject) => {
            getInfo().then(response => {
              const { result } = response
              resolve(result)
            }).catch(err => reject(err))
          }
        ).then(result => {
          this.RegisterForm = result
          console.log(this.RegisterForm)
        })
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleRegister() {
        this.loading = true
        new Promise((resolve, reject) => {
          modifyUserInfo(this.RegisterForm).then(response => {
            const { result } = response
            resolve(result)
          }).catch(err => {
            reject(err)
          })
        }).then((result) => {
          this.$notify.success({
            title: '成功',
            message: result
          })
          this.loading = false
        }).catch(error => {
          new Error(error)
          this.loading = false
        })
      }
    }
  }

</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .register-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .register-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .register-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .register-form {
      position: relative;
      width: 650px;
      max-width: 100%;
      padding: 80px 35px 80px;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      text-align: center;
      font-size: 14px;
      color: #fff;
      margin: auto;

      /*span {*/
      /*  &:first-of-type {*/
      /*    margin-right: 16px;*/
      /*  }*/
      /*}*/
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 20px;
        color: $dark_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }

      .bigtitle {
        font-size: 35px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
