<template>
  <div style="position: absolute;top: 20px;left: 10px;">
    <router-link style="text-decoration: none;" to="/register">
      <el-button style="font-size: 15px" type="primary">注册账号</el-button>
    </router-link>
  </div>
  <div class="videoContainer">
    <video class="fullscreenVideo" id="bgVid" playsinline="" autoplay="" muted="" loop="">
      <source src="../../assets/video/login.mp4" type="video/mp4">
    </video>
  </div>
  <div class="login">

    <template v-if="identify">
      <CLogin/>
    </template>
    <template v-if="!identify">
      <ELogin/>
    </template>
    <button v-show="identify"
            class="change"
            @click="change(2)">点击进入商家登录
    </button>
    <button v-show="!identify"
            class="change"
            @click="change(1)">点击进入网红登录
    </button>

  </div>
</template>
<script setup>
import {ref} from 'vue'
import ELogin from './eshop/ELogin'
import CLogin from './celebrity/CLogin'

const identify = ref(true)
const change = (num) => {
  identify.value = num === 1;
}
</script>
<style scoped>
.change {
  position: absolute;
  bottom: 10%;
  left: 10%;
  right: 5px;
  z-index: 3;
  background-color: #79bbff;
  border: none;
  border-radius: 5px;
  font-size: 25px;
  width: 80%;
  height: 60px;
}
a {
  width: 20%;
  margin-top: 20px;
  margin-left: 40%;
}
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 900px;
  height: 500px;
  border-radius: 20px;
  background-color: white;
}
.videoContainer {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -100;
}
.videoContainer:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  display: block;
  z-index: -1;
  top: 0;
  left: 0;
  background: rgba(25, 29, 34, .65);
}
video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  height: auto;
  width: auto;
}
</style>
