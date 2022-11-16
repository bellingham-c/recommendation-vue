<template>
  <div class="login">
    <img src="../../../assets/img/loginIcon.jpeg" alt="">
    <p>网红登录</p>
    <el-input style="width: 80%;height: 60px; margin-left: 10%;margin-top: 10px;font-size: 25px" v-model="form.account"
              placeholder="账号"/>
    <el-input type="password" style="width: 80%;height: 60px; margin-left: 10%;margin-top: 10px;font-size: 25px"
              v-model="form.password" placeholder="密码"/>
    <br>
    <el-button @click="login()" style="width: 80%;height: 60px;margin-left: 10%;margin-top: 10px;font-size: 25px"
               type="success">登录
    </el-button>
    <br>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import axios from 'axios'

const form = reactive({
  account: '',
  password: ''
})

const login = () => {
  axios({
    method: 'post',
    url: 'http://localhost:8800/login',
    data: {
      username: form.account,
      password: form.password
    }
  }).then((res) => {
    console.log(res)
  })
}

</script>

<style scoped>
p {
  font-size: 30px;
  text-align: center;
  color: black;
}
img {
  width: 122px;
  height: 72px;
  margin-left: 43%;
  border-radius: 10%;
  position: relative;
  top: 15px;
}

</style>