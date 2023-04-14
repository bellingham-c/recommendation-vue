<template>
  <div>
    <!--        商品展示区-->
    <div id="goodsDisplay" style="position: relative;top: 20px">
      <input v-model="searchData" type="text" placeholder="请输入您要查找的商品名称">
      <button @click="fuzzySearch()">查找</button>
      <div class="card">
        <div class="card-box"
             v-for="g in allGoods" :key="g">
          <img :src="g.img" style="width: 250px;height: 250px;" alt="">
          <div style="width: 250px;height: 250px;">
            店铺：{{ g.eshopName }}<br>
            {{ g.intro }}<br>
            市场价：{{ g.marketPrice }}<br>
            平台价：{{ g.celebrityPrice }}<br>
          </div>
          <div>
            <button @click="makeContract(g.goodId,g.eshopAccount)" style="bottom: 10px">立即购买</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onBeforeMount, reactive, ref} from "vue";
import CRequest from "@/request/CRequest";
import router from "@/router";

const allGoods = reactive({
  allGoods: []
})

const searchData = ref('test')

onBeforeMount(() => {
  CRequest.get('getAllGoods').then((res) => {
    this.allGoods = res.data
  })
})

const makeContract = (goodId, account) => {
  const params = new URLSearchParams()
  params.append("goodId", goodId)
  params.append("account", account)
  var flag = confirm("您确定要购买吗？")
  if (flag) {
    CRequest.post('/login', params).then((res) => {
      if (res.data.code === 200) {
        router.push('/celebrity')
        localStorage.setItem('token', res.data.data.token)
      }
    })
  }
}
const fuzzySearch = () => {
  CRequest.post('/login', searchData).then((res) => {
    if (res.data.code === 200) {
      router.push('/celebrity')
      localStorage.setItem('token', res.data.data.token)
    }
  })
}
</script>

<style scoped>
.card-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.card {
  display: flex;
  flex-flow: wrap;
  margin: 10px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
</style>
