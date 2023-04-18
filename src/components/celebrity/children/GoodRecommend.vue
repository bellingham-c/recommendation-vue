<template>
  <div class="wrap">
    <div class="card_wrap" v-for="good in goods.arr" :key="good">
      <div class="card_item">
        <img class="card_content_img" src="@/assets/img/regBack.jpg">
        <div>店铺:{{ good.name }}</div>
        <div>市场价:{{ good.Age }}</div>
        <div class="platform-font">平台价:{{ good.phonenumber }}</div>
        <div>
          <button @click="test()">立即购买</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onBeforeMount, reactive} from "vue";
import CRequest from "@/request/CRequest";

let goods = reactive({
  arr: []
})

const test = () => {
  console.log("test")
}

onBeforeMount(() => {
  CRequest.get('getAllGoods').then((res) => {
    goods.arr = res.data.data.data
  })
})


</script>

<style scoped>
.platform-font {
  color: red;
}

.wrap {
  /*这个只是让整体在页面居中展示 */
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 8px;
}

.card_wrap {
  /*卡片容器 */
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.card_item {
  /*每个卡片 */
  /*flex-basis: 25%;*/
  margin-bottom: 16px;
  padding: 0 8px;
  width: 278px;
  height: 350px;
  background-color: blue;
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
