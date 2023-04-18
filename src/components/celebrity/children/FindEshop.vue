<template>
  <div class="wrap">
    <div class="card_wrap" v-for="user in user.arr" :key="user">
      <div class="card_item">
        <img class="card_content_img" src="@/assets/img/regBack.jpg">
        <div>名字:{{ user.name }}</div>
        <div>年龄:{{ user.Age }}</div>
        <div>电话:{{ user.phonenumber }}</div>
        <div>常驻平台:{{ user.Platform }}</div>
        <div>
          <button @click="test(user)">查看详情</button>
          <button>合作</button>
        </div>
      </div>
    </div>
  </div>

  <!--  弹窗-->
  <div class="mask" v-if="centerDialogVisible">
    <div class="box">
        <img src="@/assets/img/regBack.jpg" style="width: 50px;height: 50px">
      <div class="little-box">
        <div style="width: 40px">账号</div>
        <el-input v-model="tempInfo.arr.username" disabled placeholder="账号"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">昵称</div>
        <el-input v-model="tempInfo.arr.name" placeholder="昵称"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">电话</div>
        <el-input v-model="tempInfo.arr.phonenumber" placeholder="电话"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">住址</div>
        <el-input v-model="input" placeholder="住址"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">性别</div>
        <el-select v-model="tempInfo.arr.Sex" class="m-2" placeholder="性别" size="large">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </div>
      <div class="little-box">
        <div style="width: 40px">年龄</div>
        <el-input v-model="tempInfo.arr.Age" placeholder="年龄"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">常驻平台</div>
        <el-input v-model="tempInfo.arr.Platform" placeholder="常驻平台"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">平台地址</div>
        <el-input v-model="tempInfo.arr.PlatformUrl" placeholder="平台地址"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">个人简介</div>
        <el-input v-model="tempInfo.arr.Intro" placeholder="个人简介"/>
      </div>
      <el-button @click="centerDialogVisible=false">关闭</el-button>
      <el-button @click="updateInfo()">修改</el-button>
    </div>

  </div>

</template>

<script setup>
import {onBeforeMount, reactive, ref} from "vue";
import CRequest from "@/request/CRequest";

let centerDialogVisible = ref(false)

let user = reactive({
  arr: []
})

let tempInfo = reactive({
  arr: []
})

const test = (user) => {
  tempInfo.arr = user
  centerDialogVisible.value = true
}

onBeforeMount(() => {
  CRequest.get('/findAll').then((res) => {
    user.arr = res.data.data.data
  })
})

</script>

<style scoped>
.little-box {
  padding: 10px;
  margin: 3px;
  display: flex;
  flex-direction: row;
}

.box {
  background: #fff;
  padding: 40px;
  border-radius: 8px;
  width: 30%;
}

.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrap {
  /*这个只是让整体在页面居中展示 */
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  align-items: center;
  height: 100%;
  padding: 8px;
}

.card_wrap {
  /*卡片容器 */
  padding: 10px;
}

.card_item {
  /*每个卡片 */
  margin-bottom: 16px;
  padding: 0 8px;
  width: 278px;
  height: 350px;
  border-radius: 8px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.4);
}

.card_item:hover {
  box-shadow: 0 15px 30px rgba(255, 0, 0, 0.5);
}

.card_content_img {
  /*卡片内容 */
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  height: 220px;
  width: 100%;
  background-color: red;
}
</style>
