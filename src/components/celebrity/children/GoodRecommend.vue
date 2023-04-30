<template>
  <div class="wrap">
    <div class="card_wrap" v-for="good in goods.arr" :key="good">
      <div class="card_item">
        <img class="card_content_img" :src="good.Img">
        <div>店铺:{{ good.Name }}</div>
        <div>市场价:{{ good.MarketPrice }}</div>
        <div class="platform-font">平台价:{{ good.CelebrityPrice }}</div>
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
  CRequest.get('allGoods').then((res) => {
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
