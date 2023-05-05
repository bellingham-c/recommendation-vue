<template>
  <div class="wrap">
    <div class="card_wrap" v-for="good in goods.arr" :key="good">
      <div class="card_item">
        <img class="card_content_img" :src="good.Img">
        <div>店铺:{{ good.Name }}</div>
        <div>市场价:{{ good.MarketPrice }}</div>
        <div class="platform-font">平台价:{{ good.CelebrityPrice }}</div>
        <div>
          <el-button type="primary" @click="detail(good)">查看详情</el-button>
          <el-button type="success" @click="buy(good)">立即购买</el-button>
        </div>
      </div>
    </div>
  </div>

  <!--  详情页-->
  <div class="mask" v-if="centerDialogVisible">
    <div class="box">
      <div class="little-box">
        <div class="blue-font">品牌</div>
        <span>{{ tempGood.Brand }}</span>
      </div>
      <div class="little-box">
        <div class="blue-font">商品名</div>
        <span>{{ tempGood.Name }}</span>
      </div>
      <div class="little-box">
        <div class="blue-font">市场价</div>
        <span>{{ tempGood.MarketPrice }}</span>
      </div>
      <div class="little-box">
        <div class="blue-font">网红价</div>
        <span style="color:red;">{{ tempGood.CelebrityPrice }}</span>
      </div>
      <div class="little-box">
        <div class="blue-font">商品介绍</div>
        <span>{{ tempGood.Intro }}</span>
      </div>
      <div class="little-box">
        <div class="blue-font">店铺</div>
        <span>{{ tempGood.Eshop }}</span>
      </div>
      <el-button type="danger" @click="centerDialogVisible=false">关闭</el-button>
      <el-button type="primary" @click="buy(tempGood)">购买</el-button>
    </div>

  </div>

  <!--  订单页-->

</template>

<script setup>
import {onBeforeMount, reactive, ref} from "vue";
import CRequest from "@/request/CRequest";

let goods = reactive({
  arr: []
})

const centerDialogVisible = ref(false)

const tempGood = ref()

const buy = (good) => {
  const flag = confirm("你确定要购买"+ good.Name+ "吗？")
  if (flag === true) {
    CRequest.post("/order", good).then((res) => {
      if (res.status === 200) {
        alert("购买成功")
      } else {
        alert("购买失败")
      }
    })
  }
}

const detail = (good) => {
  centerDialogVisible.value = true
  tempGood.value = good
}

onBeforeMount(() => {
  CRequest.get('allGoods').then((res) => {
    goods.arr = res.data.data.data
  })
})


</script>

<style scoped>
.blue-font {
  width: 40px;
  color: #0bcc42;
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
