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
        :size="size"
        direction="vertical"
        :style="blockMargin"
    >
      <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
      <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
      <el-descriptions-item label="Place" :span="2">Suzhou</el-descriptions-item>
      <el-descriptions-item label="Sex">men</el-descriptions-item>
      <el-descriptions-item label="Age" :span="2">18</el-descriptions-item>
      <el-descriptions-item label="Remarks">
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Address"
      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions
        title="信誉积分"
        :column="4"
        :size="size"
        direction="vertical"
        :style="blockMargin"
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
              <el-button text class="button">Operating</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import CRequest from "@/request/CRequest";
import {onMounted} from "vue";

onMounted((() => {
  CRequest.get('/find').then((res) => {
    console.log(res)
    console.log(res.data)
  })
}))
</script>

<style scoped>
.el-row{
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
