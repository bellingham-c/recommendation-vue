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
        <el-button @click="onSubmit()" style="width: 80%;height: 60px;margin-left: 10%;margin-top: 10px" type="primary">注册</el-button>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref,reactive} from 'vue'
import {computed} from "vue";
import {CRequest} from '@/request/CRequest'
import ERequest from '../../request/ERequest'

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

const  checkPWD=ref("")
const identify=ref("")

const onSubmit = () => {
  const params=new URLSearchParams()
  params.append("username",form.username)
  params.append("name",form.name)
  params.append("phonenumber",form.phonenumber)
  params.append("password",form.password)
  if(identify.value==='商家'){
    ERequest.post('/register',params)
  }else {
    CRequest.post('/register',params)
  }
}
</script>

<style scoped>
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