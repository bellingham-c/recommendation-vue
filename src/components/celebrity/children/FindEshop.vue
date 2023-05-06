<template>
  <div class="wrap">
    <div class="card_wrap" v-for="user in user.arr" :key="user">
      <div class="card_item">
        <img class="card_content_img" :src="user.Avatar">
        <div>名字:{{ user.Name }}</div>
        <div>年龄:{{ user.Age }}</div>
        <div>电话:{{ user.Phonenumber }}</div>
        <div>常驻平台:{{ user.Platform }}</div>
        <div>
          <el-button type="success" @click="detail(user)">查看详情</el-button>
        </div>
      </div>
    </div>
  </div>

  <!--  弹窗-->
  <div class="mask" v-if="centerDialogVisible">
    <div class="box">
      <div class="little-box">
        <div class="blue-font">昵称</div>
        <span>{{ tempInfo.arr.Name }}</span>
      </div>
      <div class="little-box">
        <div class="blue-font">电话</div>
        <span>{{ tempInfo.arr.Phonenumber }}</span>
      </div>
      <div class="little-box">
        <div class="blue-font">住址</div>
        <span>null</span>
      </div>
      <div class="little-box">
        <div class="blue-font">性别</div>
        <span>{{ tempInfo.arr.Sex }}</span>
      </div>
      <div class="little-box">
        <div class="blue-font">年龄</div>
        <span>{{ tempInfo.arr.Age }}</span>
      </div>
      <div class="little-box">
        <div class="blue-font">常驻平台</div>
        <span>{{ tempInfo.arr.Platform }}</span>
      </div>
      <div class="little-box">
        <div class="blue-font">平台地址</div>
        <span>{{ tempInfo.arr.PlatformUrl }}</span>
      </div>
      <div class="little-box">
        <div class="blue-font">个人简介</div>
        <span>{{ tempInfo.arr.Intro }}</span>
      </div>
      <el-button type="danger" @click="centerDialogVisible=false">关闭</el-button>
      <el-button type="primary" @click="cooperate(tempInfo.arr.Name)">合作</el-button>
    </div>

  </div>

</template>

<script setup>
import {onBeforeMount, reactive, ref} from "vue";
import CRequest from "@/request/CRequest";
import {ElMessage} from "element-plus";

let centerDialogVisible = ref(false)

let user = reactive({
  arr: []
})

let tempInfo = reactive({
  arr: []
})

const cooperate = (name) => {
  let formData = new FormData()
  formData.append("Eshop  ", tempInfo.arr.Id)
  const r = confirm("你确定要与" + name + "合作吗?")
  if (r === true) {
    CRequest.post('/save', formData).then((res) => {
      if (res.status===200){
        centerDialogVisible.value = false
        Success()
      }
    })
  } else {
    Error()
  }
}

const Success = () => {
  ElMessage({
    showClose: true,
    message: '已成功发送合作请求',
    type: 'success',
  })
}

const Error = () => {
  ElMessage.error('服务器出错')
}

const detail = (user) => {
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
.blue-font {
  width: 40px;
  color: #2cc4bf;
}

span {
  padding: 10px;
  font-size: 15px;
}

.little-box {
  padding: 10px;
  margin: 3px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid black;
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
