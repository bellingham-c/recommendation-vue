<template>
  <el-tabs type="border-card" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><calendar/></el-icon>
          <span>店铺信息</span>
        </span>
      </template>
    </el-tab-pane>
    <el-tab-pane label="我的订单">
    </el-tab-pane>
    <div>
      <router-view></router-view>
    </div>
  </el-tabs>
</template>

<script setup>
import {Calendar} from '@element-plus/icons-vue'
import router from '../../../router/index'


const handleClick = (tab) => {
  if (tab.index === '0') {
    router.push('/eshop/myself/info')
  } else{
    router.push('/eshop/myself/order')
  }
}
</script>

<style scoped>
.el-tabs {
  width: 100%;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}

.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>
