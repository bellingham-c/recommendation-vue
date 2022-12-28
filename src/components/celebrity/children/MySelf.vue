<template>
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content ep-bg-purple"/>
          id和头像
        </el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple"/>
          我的收货地址
        </el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple"/>
          3
        </el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple"/>
          4
        </el-col>
      </el-row>
    </div>

    <div>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content ep-bg-purple"/>
          待付款
        </el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple"/>
          代发货
        </el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple"/>
          待收货
        </el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple"/>
          待评价
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
const address=()=>{

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