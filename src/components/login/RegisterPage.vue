<template>
  <div>
    <img src="../../assets/img/regBack.jpg" alt="">
    <div style="position: absolute;top: 10px;left: 10px;">
      <router-link style="text-decoration: none;" to="/">
        <el-button type="primary">返回登录</el-button>
      </router-link>
    </div>
    <div class="register-form">
      <form>
        <p>欢迎加入我们</p>
        <el-input style="width: 80%;height: 60px; margin-left: 10%; font-size: 25px; margin-top: 10px"
                  v-model="form.username" placeholder="账号"/>
        <el-input style="width: 80%;height: 60px; margin-left: 10%;font-size: 25px; margin-top: 10px"
                  v-model="form.name" placeholder="昵称"/>
        <el-input style="width: 80%;height: 60px; margin-left: 10%;font-size: 25px; margin-top: 10px"
                  v-model="form.phonenumber" placeholder="手机号"/>
        <el-input type="password" style="width: 80%;height: 60px; font-size: 25px; margin-left: 10%;margin-top: 10px"
                  v-model="form.password" placeholder="密码"/>
        <el-input type="password" style="width: 80%;height: 60px; font-size: 25px; margin-left: 10%;margin-top: 10px"
                  v-model="checkPWD" placeholder="确认密码"/>
        <el-form-item style="width: 80%;height: 60px; font-size: 25px; margin-left: 10%;margin-top: 10px"
                      label="您的身份">
          <el-radio-group v-model="identify">
            <el-radio label="商家"/>
            <el-radio label="网红"/>
          </el-radio-group>
        </el-form-item>
        <el-alert
            v-show="!isSame"
            style="width: 80%;height: 40px; margin-left: 10%;font-size: 25px; margin-top: 10px"
            type="error"
            description="两次密码不一致"
            show-icon
        />
        <el-button @click="onSubmit()" style="width: 80%;height: 60px;margin-left: 10%;margin-top: 10px" type="primary">
          注册
        </el-button>
      </form>
      <div class="is-legal" v-show="!isTelLegal">
        <svg t="1668772943828" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="2672" width="200" height="200">
          <path
              d="M512 929.959184c-230.4 0-417.959184-187.559184-417.959184-417.959184s187.559184-417.959184 417.959184-417.959184 417.959184 187.559184 417.959184 417.959184-187.559184 417.959184-417.959184 417.959184z m0-794.122449c-207.412245 0-376.163265 168.75102-376.163265 376.163265s168.75102 376.163265 376.163265 376.163265 376.163265-168.75102 376.163265-376.163265-168.75102-376.163265-376.163265-376.163265z"
              p-id="2673" fill="#d81e06"></path>
          <path
              d="M512 690.677551m-31.346939 0a31.346939 31.346939 0 1 0 62.693878 0 31.346939 31.346939 0 1 0-62.693878 0Z"
              p-id="2674" fill="#d81e06"></path>
          <path
              d="M512 584.097959c-11.493878 0-20.897959-9.404082-20.897959-20.897959v-261.22449c0-11.493878 9.404082-20.897959 20.897959-20.897959s20.897959 9.404082 20.897959 20.897959v261.22449c0 12.016327-9.404082 20.897959-20.897959 20.897959z"
              p-id="2675" fill="#d81e06"></path>
        </svg>
        <span>手机号不合法</span>
      </div>

    </div>
  </div>
</template>

<script setup>
import {ref, reactive} from 'vue'
import {computed} from "vue";
import ERequest from '../../request/ERequest'
import CRequest from '../../request/CRequest'
import router from "@/router";
import {ElMessage} from "element-plus";

const isSame = computed(() => {
  return form.password === checkPWD.value;
})

// do not use same name with ref
const form = reactive({
  username: '',
  name: '',
  phonenumber: '',
  password: '',
})

const checkPWD = ref("")
const identify = ref("")

// 验证手机号是否合法
const reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
const isTelLegal = computed(() => {
  return reg_tel.test(form.phonenumber);
})


// 验证手机号是否被注册

// 提交注册信息
const onSubmit = () => {
  const params = new FormData()
  params.append("account", form.username)
  params.append("name", form.name)
  params.append("phonenumber", form.phonenumber)
  params.append("password", form.password)
  if (identify.value === '商家') {
    ERequest.post('/register', params).then((res) => {
      if (res.data.code === 200) {
        Success()
        router.push('/')
      } else {
        Fail()
      }
    })
  } else {
    CRequest.post('/register', params).then((res) => {
      if (res.data.code === 200) {
        Success()
        router.push('/')
      } else {
        Fail()
      }
    })
  }
}

const Success = () => {
  ElMessage({
    message: '注册成功',
    type: 'success',
  })
}
const Fail = () => {
  ElMessage.error('注册失败')
}
</script>

<style scoped>
svg {
  width: 25px;
  height: 25px;
  margin-top: 7px;
}

.is-legal {
  position: absolute;
  top: 38%;
  color: red;
  display: flex;
  align-items: center;
}

.is-legal span {
  margin-top: 1px;
  color: red;
  font-size: 20px;
}

p {
  font-size: 30px;
  text-align: center;
  color: black;
}

form {
  width: 80%;
  height: 50%;
  margin-left: 10%;
}

.register-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 900px;
  height: 700px;
  border-radius: 20px;
  background-color: rgb(246, 246, 246, 0.6);
}

img {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-size: cover;
  z-index: -1;
}
</style>
