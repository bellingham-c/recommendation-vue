<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="Id" label="合约编号" width="180"/>
    <el-table-column prop="Eshop" label="合作对象" width="180"/>
    <el-table-column prop="StartTime" label="开始时间" width="180"/>
    <el-table-column prop="EndTime" label="结束时间" width="180"/>
    <el-table-column prop="Status" label="状态" width="180"/>
  </el-table>
</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import CRequest from "@/request/CRequest";

let tableData = ref([])

onBeforeMount((()=>{
  CRequest.get('/getContract').then((res1) => {
    tableData.value = res1.data.data.data
    console.log(tableData)
  })
}))
</script>

<style scoped>

</style>
