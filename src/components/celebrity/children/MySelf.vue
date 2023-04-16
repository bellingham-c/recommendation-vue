<template>
  <div class="left-box">
    <div class="block">
      <el-avatar :size="300" :src="circleUrl" class="header"/>
      <el-button style="display:block;margin:0 auto;">修改头像</el-button>
    </div>
  </div>
  <div class="right-box">
    <el-descriptions
        title="我的信息"
        :column="4"
        direction="vertical"
    >
      <el-descriptions-item label="账号">{{ info.arr.username }}</el-descriptions-item>
      <el-descriptions-item label="昵称">{{ info.arr.name }}</el-descriptions-item>
      <el-descriptions-item label="电话">{{ info.arr.phonenumber }}</el-descriptions-item>
      <el-descriptions-item label="地址" :span="2">Suzhou</el-descriptions-item>
      <el-descriptions-item label="性别">{{ info.arr.Sex }}</el-descriptions-item>
      <el-descriptions-item label="年龄" :span="2">{{ info.arr.Age }}</el-descriptions-item>
      <el-descriptions-item label="常驻平台" :span="2">{{ info.arr.Platform }}</el-descriptions-item>
      <el-descriptions-item label="平台地址" :span="2">{{ info.arr.PlatformUrl }}</el-descriptions-item>
      <el-descriptions-item label="个人简介">{{ info.arr.Intro }}
      </el-descriptions-item>
    </el-descriptions>
    <el-button type="success" style=" margin-top: 20px; margin-left: 20px;" @click="centerDialogVisible=true">修改个人信息
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
        <el-input v-model="info.arr.username" disabled placeholder="账号"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">昵称</div>
        <el-input v-model="info.arrname" placeholder="昵称"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">电话</div>
        <el-input v-model="info.arr.phonenumber" placeholder="电话"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">住址</div>
        <el-input v-model="input" placeholder="住址"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">性别</div>
        <el-select v-model="info.arr.Sex" class="m-2" placeholder="性别" size="large">
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
        <el-input v-model="info.arr.Age" placeholder="年龄"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">常驻平台</div>
        <el-input v-model="info.arr.Platform" placeholder="常驻平台"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">平台地址</div>
        <el-input v-model="info.arr.PlatformUrl" placeholder="平台地址"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">个人简介</div>
        <el-input v-model="info.arr.Intro" placeholder="个人简介"/>
      </div>
      <el-button @click="centerDialogVisible=false">关闭</el-button>
      <el-button @click="updateInfo()">修改</el-button>
    </div>

  </div>

</template>

<script setup>
import CRequest from "@/request/CRequest";
import {onBeforeMount, reactive, ref,} from "vue";

let centerDialogVisible = ref(false)

let info = reactive({
  arr: []
})

const options = [
  {
    value: '男',
    label: '男',
  },
  {
    value: '女',
    label: '女',
  },
  {
    value: '其他',
    label: '其他',
  }
]

const updateInfo = () => {
  CRequest.post('/updateInfo', info.arr).then((res) => {
    console.log(res)
  })
}

const test = () => {
  console.log(info.arr.username)
}

onBeforeMount((() => {
  CRequest.get('/find').then((res) => {
    info.arr = res.data.data.data
  })
}))
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
