<template>
  <div class="main-box">
    <el-button @click="centerDialogVisible=true">添加商品</el-button>
    <!--        商品展示区-->
    <el-table :data="tableData" style="width: 100vw">
      <el-table-column fixed prop="date" label="商品信息" width="470"/>
      <el-table-column prop="name" label="品牌" width="120"/>
      <el-table-column prop="state" label="市场价" width="120"/>
      <el-table-column prop="city" label="网红价" width="120"/>
      <el-table-column prop="address" label="商品代理数" width="400"/>
      <el-table-column fixed="right" label="Operations" width="450">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick"
          >Detail
          </el-button
          >
          <el-button link type="primary" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!--  添加弹窗-->
  <div class="mask" v-if="centerDialogVisible">
    <div class="box">
      <div class="little-box">
        <div style="width: 40px">商品名</div>
        <el-input v-model="tempInfo.arr.username" disabled placeholder="商品名"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">图片</div>
        <el-input v-model="tempInfo.arr.name" placeholder="图片"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">品牌</div>
        <el-input v-model="tempInfo.arr.phonenumber" placeholder="品牌"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">分类</div>
        <el-select v-model="tempInfo.arr.Sex" class="m-2" placeholder="分类" size="large">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </div>
      <div class="little-box">
        <div style="width: 40px">市场价</div>
        <el-input v-model="input" placeholder="市场价"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">网红价</div>
        <el-input v-model="input" placeholder="网红价"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">商品简介</div>
        <el-input v-model="input" placeholder="商品简介"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">平台地址</div>
        <el-input v-model="tempInfo.arr.PlatformUrl" placeholder="平台地址"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">个人简介</div>
        <el-input v-model="tempInfo.arr.Intro" placeholder="个人简介"/>
      </div>
      <el-button @click="centerDialogVisible=false">关闭</el-button>
      <el-button @click="updateInfo()">添加</el-button>
    </div>

  </div>

</template>

<script setup>
import {reactive, ref} from "vue";

let centerDialogVisible = ref(false)

let tempInfo = reactive({
  arr: []
})

const options = [
  {
    value: '美妆',
    label: '美妆',
  },
  {
    value: '食品',
    label: '食品',
  },
  {
    value: '奢侈品',
    label: '奢侈品',
  },
  {
    value: '电器',
    label: '电器',
  },
  {
    value: '医药',
    label: '医药',
  },
  {
    value: '保健',
    label: '保健',
  },
  {
    value: '运动',
    label: '运动',
  },
  {
    value: '汽车',
    label: '汽车',
  },
  {
    value: '家具',
    label: '家具',
  }, {
    value: '服装',
    label: '服装',
  },
  {
    value: '文具',
    label: '文具',
  },
  {
    value: '宠物',
    label: '宠物',
  },
  {
    value: '农产品',
    label: '农产品',
  },
  {
    value: '游戏',
    label: '游戏',
  },
  {
    value: '书籍',
    label: '书籍',
  },
  {
    value: '数码',
    label: '数码',
  },
  {
    value: '其他',
    label: '其他',
  },
]

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
]
</script>

<style scoped>
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
  z-index: 100;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-box {
  z-index: 1;
  width: 100%;
}
</style>
