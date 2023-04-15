<template>
  <div class="wrap">
    <div class="card_wrap">
      <div class="card_item">
        <img class="card_content_img" src="@/assets/img/regBack.jpg">
        <div>简介:</div>
        <div>市场价:</div>
        <div>平台价:</div>
        <div><button>立即购买</button></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onBeforeMount} from "vue";
import CRequest from "@/request/CRequest";


onBeforeMount(()=>{
  CRequest.get('getAllGoods').then((res) => {
    this.allGoods = res.data
  })
})


</script>

<style scoped>
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
