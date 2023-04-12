<template>
  <div>
    <button @click="test()">dianwo</button>
  </div>
</template>

<script setup>
import CRequest from "@/request/CRequest";

const test = () => {
  CRequest.get('/find').then((res) => {
    console.log(res)
    console.log(res.data)
  })
}
</script>

<style scoped>
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
