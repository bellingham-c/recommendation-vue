<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="Id" label="合约编号" width="180"/>
    <el-table-column prop="Celebrity" label="合作对象" width="180"/>
    <el-table-column prop="StartTime" label="开始时间" width="180"/>
    <el-table-column prop="EndTime" label="结束时间" width="180"/>
    <el-table-column prop="Status" label="状态" width="180"/>
  </el-table>
</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import ERequest from "@/request/ERequest";

let tableData = ref([])

onBeforeMount((() => {
  ERequest.get('/contract').then((res1) => {
    tableData.value = res1.data.data.data
    console.log(tableData)
  })
}))
</script>

<style scoped>

</style>
