<template>
  <div class="left-box">
    <div class="block">
      <el-avatar :size="300" :src="info.arr.Avatar" class="header"/>
      <el-button style="display:block;margin:0 auto;" @click="imgFlag=true">修改头像</el-button>
    </div>
  </div>
  <div class="right-box">
    <el-descriptions
        title="我的信息"
        :column="4"
        direction="vertical"
    >
      <el-descriptions-item label="账号">{{ info.arr.Username }}</el-descriptions-item>
      <el-descriptions-item label="昵称">{{ info.arr.Name }}</el-descriptions-item>
      <el-descriptions-item label="电话">{{ info.arr.Phonenumber }}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{ info.arr.Email }}</el-descriptions-item>
      <el-descriptions-item label="年龄" :span="2">{{ info.arr.Age }}</el-descriptions-item>
      <el-descriptions-item label="常驻平台" :span="2">{{ info.arr.Platform }}</el-descriptions-item>
      <el-descriptions-item label="平台地址" :span="2">{{ info.arr.PlatformUrl }}</el-descriptions-item>
      <el-descriptions-item label="个人简介">{{ info.arr.Intro }}
      </el-descriptions-item>
    </el-descriptions>
    <el-button type="success" style=" margin-top: 20px; margin-left: 20px;" @click="change()">修改个人信息
    </el-button>
    <el-descriptions
        title="信誉积分"
        :column="4"
        direction="vertical"
    >
    </el-descriptions>
    <el-row>
      <el-col
          v-for="(o, index) in 2"
          :key="o"
          :span="8"
          :offset="index > 0 ? 2 : 0"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
          />
          <div style="padding: 14px">
            <span>Yummy hamburger</span>
            <div class="bottom">
              <time class="time">{{ currentDate }}</time>
              <el-button text class="button" @click="test()">Operating</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <!--  弹窗-->
  <div class="mask" v-if="centerDialogVisible">
    <div class="box">
      <div class="little-box">
        <div style="width: 40px">账号</div>
        <el-input disabled v-model="goods.Username" placeholder="账号"/>
      </div>

      <div class="little-box">
        <div style="width: 40px">昵称</div>
        <el-input v-model="goods.Name" placeholder="昵称"/>
      </div>

      <div class="little-box">
        <div style="width: 40px">电话</div>
        <el-input v-model="goods.Phonenumber" placeholder="电话"/>
      </div>

      <div class="little-box">
        <div style="width: 40px">邮箱</div>
        <el-input v-model="goods.Email" placeholder="邮箱"/>
      </div>

      <div class="little-box">
        <div style="width: 40px">年龄</div>
        <el-input v-model="goods.Age" placeholder="年龄"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">常驻平台</div>
        <el-input v-model="goods.Platform" placeholder="常驻平台"/>
      </div>

      <div class="little-box">
        <div style="width: 40px">平台地址</div>
        <el-input v-model="goods.PlatformUrl" placeholder="平台地址"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">个人简介</div>
        <el-input v-model="goods.Intro" placeholder="个人简介"/>
      </div>
      <el-button @click="centerDialogVisible=false">关闭</el-button>
      <el-button @click="updateInfo()">修改</el-button>
    </div>
  </div>

  <!--  修改头像-->
  <div class="mask" v-show="imgFlag===true">
    <div class="box">
      <input type="file" accept="image/*" @change="change">
      <br>
      <div class="btn">
        <el-button type="danger" @click="imgFlag=false">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onBeforeMount, reactive, ref,} from "vue";
import ERequest from "@/request/ERequest";
import router from "@/router";

let centerDialogVisible = ref(false)

let imgFlag = ref(false)

let info = reactive({
  arr: []
})

let goods = ref({
  Username: "",
  Name: "",
  Phonenumber: "",
  Email:"",
  Age: "",
  Platform: "",
  PlatformUrl: "",
  Intro: ""
})

const change=(e)=>{
  let formData=new FormData()
  formData.append("file",e.target.files[0])
  formData.append("tel",info.arr.Phonenumber)
  formData.append("username",info.arr.Username)
  ERequest.post('/upload',formData).then((res)=>{
    if (res.data.data.url!==null){
      imgFlag=false
      alert("修改成功")
      router.go('/eshop/myself')
    }else{
      imgFlag=false
      alert("修改失败")
    }
  })
}

const updateInfo = () => {
  ERequest.post('/update', goods.value).then((res) => {
    console.log(res)
  })
}

const test = () => {
  console.log(info.arr.username)
}

onBeforeMount((() => {
  ERequest.get('/find').then((res) => {
    info.arr = res.data.data.data
  })
}))
</script>

<style scoped>
.btn{
  padding: 15px;
  display: block;
  margin: 0 auto;
  text-align: center;
}
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

.el-row {
  margin-top: 20px;
  margin-left: 20px;
}

.el-descriptions {
  margin-top: 20px;
  margin-left: 20px;
}

.header {
  margin: 10px 10% 20px 15%;
}

.left-box {
  width: 30%;
  background-color: red;
}

.right-box {
  width: 70%;
  background-color: yellow;
}

.el-row {
  margin-bottom: 10px;

}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
