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
          <span>
            <svg t="1686754214322" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="2118" width="200" height="200">
            <path
                d="M936.448 423.424c-16.384-23.552-48.128-35.328-99.84-35.328-28.672 0-59.392 3.072-88.576 6.144-20.48 2.048-39.936 4.096-53.248 4.096-10.752 0-19.968-0.512-28.16-2.048l-8.704-1.536 3.584-7.68c44.544-97.792 23.04-185.344 13.312-227.84l-0.512-1.536c-0.512-3.072-1.536-5.632-2.048-9.216-9.216-42.496-50.688-65.024-87.04-65.024-4.096 0-8.704 0.512-12.8 1.024-34.304 5.12-67.072 33.28-62.976 84.992 11.264 135.168-110.592 210.944-160.768 236.544-11.264-10.752-26.624-16.896-43.52-16.896H211.968c-35.328 0-64 28.672-64 64v383.488c0 35.328 28.672 64 64 64h93.696c16.384 0 31.232-6.144 42.496-16.384v0.512c38.4 0.512 101.888 5.12 158.72 10.24 54.272 4.096 105.984 8.704 133.12 8.704 57.856 0 129.536 0 185.344-36.352 49.664-32.768 63.488-120.832 75.264-199.168v-1.024c2.56-16.384 4.608-31.744 7.168-44.544 4.096-20.992 12.8-43.52 20.48-64.512 16.896-45.568 35.84-94.72 8.192-134.656zM309.76 832.512c0 4.096-3.584 7.68-7.68 7.68H215.552c-4.096 0-7.68-3.584-7.68-7.68V456.704c0-4.096 3.584-7.68 7.68-7.68h86.016c4.096 0 7.68 3.584 7.68 7.68v375.808z m558.592-299.52c-8.704 22.528-18.432 48.64-23.552 75.264-2.56 14.336-5.12 30.72-7.68 48.128-7.68 51.712-20.48 138.24-46.592 155.136-39.936 26.624-98.816 26.624-150.528 26.624-24.064 0-74.24-3.584-127.488-7.68h-0.512c-50.688-4.096-102.912-8.192-142.336-9.216v-353.28c51.712-25.088 218.624-120.32 203.264-302.592-1.024-14.848 3.584-15.872 8.704-16.384h3.584c10.752 0 22.528 5.632 25.088 14.336 0.512 3.072 1.536 7.168 2.56 11.776 9.728 39.936 27.648 115.2-14.848 197.632-9.728 18.432-9.728 38.4 0.512 54.784 14.848 23.552 47.104 35.84 95.744 35.84 16.384 0 36.352-2.048 60.416-4.608 26.624-2.56 56.32-6.144 82.432-6.144h4.608c27.136 0.512 36.864 4.608 40.448 6.656l1.024 0.512c8.192 12.288-3.584 43.008-14.848 73.216z"
                fill="#2C2C2C" p-id="2119"></path>
          </svg>
            {{user.Likes}}</span>
        </div>
      </div>
    </div>

    <!--  弹窗-->
    <div class="mask" v-if="centerDialogVisible">
      <div class="box">
        <div class="fork-style">
          <svg t="1686753889199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="1667" width="200" height="200">
            <path
                d="M916.336 917.44a15.952 15.952 0 0 1-11.312-4.688L96.368 104.08a15.984 15.984 0 1 1 22.624-22.624l808.656 808.672a15.984 15.984 0 0 1-11.312 27.312z"
                fill="" p-id="1668"></path>
            <path
                d="M107.68 917.44a15.984 15.984 0 0 1-11.312-27.312L905.024 81.456a15.984 15.984 0 1 1 22.624 22.624L118.992 912.752a15.92 15.92 0 0 1-11.312 4.688z"
                fill="" p-id="1669"></path>
          </svg>
        </div>

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
        <el-button type="success" @click="like(tempInfo)">
          <svg t="1686754214322" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="2118" width="200" height="200">
            <path
                d="M936.448 423.424c-16.384-23.552-48.128-35.328-99.84-35.328-28.672 0-59.392 3.072-88.576 6.144-20.48 2.048-39.936 4.096-53.248 4.096-10.752 0-19.968-0.512-28.16-2.048l-8.704-1.536 3.584-7.68c44.544-97.792 23.04-185.344 13.312-227.84l-0.512-1.536c-0.512-3.072-1.536-5.632-2.048-9.216-9.216-42.496-50.688-65.024-87.04-65.024-4.096 0-8.704 0.512-12.8 1.024-34.304 5.12-67.072 33.28-62.976 84.992 11.264 135.168-110.592 210.944-160.768 236.544-11.264-10.752-26.624-16.896-43.52-16.896H211.968c-35.328 0-64 28.672-64 64v383.488c0 35.328 28.672 64 64 64h93.696c16.384 0 31.232-6.144 42.496-16.384v0.512c38.4 0.512 101.888 5.12 158.72 10.24 54.272 4.096 105.984 8.704 133.12 8.704 57.856 0 129.536 0 185.344-36.352 49.664-32.768 63.488-120.832 75.264-199.168v-1.024c2.56-16.384 4.608-31.744 7.168-44.544 4.096-20.992 12.8-43.52 20.48-64.512 16.896-45.568 35.84-94.72 8.192-134.656zM309.76 832.512c0 4.096-3.584 7.68-7.68 7.68H215.552c-4.096 0-7.68-3.584-7.68-7.68V456.704c0-4.096 3.584-7.68 7.68-7.68h86.016c4.096 0 7.68 3.584 7.68 7.68v375.808z m558.592-299.52c-8.704 22.528-18.432 48.64-23.552 75.264-2.56 14.336-5.12 30.72-7.68 48.128-7.68 51.712-20.48 138.24-46.592 155.136-39.936 26.624-98.816 26.624-150.528 26.624-24.064 0-74.24-3.584-127.488-7.68h-0.512c-50.688-4.096-102.912-8.192-142.336-9.216v-353.28c51.712-25.088 218.624-120.32 203.264-302.592-1.024-14.848 3.584-15.872 8.704-16.384h3.584c10.752 0 22.528 5.632 25.088 14.336 0.512 3.072 1.536 7.168 2.56 11.776 9.728 39.936 27.648 115.2-14.848 197.632-9.728 18.432-9.728 38.4 0.512 54.784 14.848 23.552 47.104 35.84 95.744 35.84 16.384 0 36.352-2.048 60.416-4.608 26.624-2.56 56.32-6.144 82.432-6.144h4.608c27.136 0.512 36.864 4.608 40.448 6.656l1.024 0.512c8.192 12.288-3.584 43.008-14.848 73.216z"
                fill="#2C2C2C" p-id="2119"></path>
          </svg>
          {{ likeInfo }}
        </el-button>
      </div>

    </div>

  </div>
</template>

<script setup>
import {onBeforeMount, reactive, ref} from "vue";
import CRequest from "@/request/CRequest";

let user = reactive({
  arr: []
})

let centerDialogVisible = ref(false)

let tempInfo = reactive({
  arr: []
})

const likeInfo=ref("点赞")

const like=(user)=>{
  console.log(user.arr.Id)
  const f=new FormData()
  f.append("id",user.arr.Id)
  CRequest.post('/like',f).then((res)=>{
    if (res.data.data===true){
      likeInfo.value="取消点赞"
    }else{
      likeInfo.value="点赞"
    }
  })
}

const detail = async (user) => {
  await isLiked(user.Id)
  tempInfo.arr = user
  centerDialogVisible.value = true
}

const isLiked=(id)=>{
  const formData=new FormData()
  // 传递被点赞对象的id
  formData.append("likedId",id)
  CRequest.post('/isLiked',formData).then((res)=>{
    if (res.data.data===true){
      likeInfo.value="取消点赞"
    }else{
      likeInfo.value="点赞"
    }
  })
}

onBeforeMount(() => {
  CRequest.get('/findAll').then((res) => {
    user.arr = res.data.data.data
  })
})

</script>

<style scoped>
svg {
  width: 20px;
  height: 20px;
}

.fork-style:hover {
  box-shadow: 0 15px 30px rgba(212, 13, 13, 0.5);
}

.fork-style {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  color: white;
  border: none;
  cursor: pointer;
}

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
  position: relative;
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
