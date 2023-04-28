<template>
  <div class="left-box">
    <div class="block">
      <el-avatar :size="300" :src="info.arr.Avatar" class="header"/>
      <el-button type="primary" style="display:block;margin:0 auto;" @click="imgFlag=true">修改头像</el-button>
      <div class="credit">
        <div class="reputation">
          信誉积分
          <div v-show="level==='0'">
            <span class="reputation-level-1">{{ info.arr.CreditPoint }}</span>
          </div>
          <div v-show="level==='1'">
            <span class="reputation-level-2">{{ info.arr.CreditPoint }}</span>
          </div>
          <div v-show="level==='2'">
            <span class="reputation-level-3">{{ info.arr.CreditPoint }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="right-box">
    <el-descriptions
        title="我的信息"
        :column="4"
        direction="vertical"
    >
      <el-descriptions-item label="账号">{{ info.arr.username }}</el-descriptions-item>
      <el-descriptions-item label="昵称">{{ info.arr.name }}</el-descriptions-item>
      <el-descriptions-item label="电话">{{ info.arr.phonenumber }}</el-descriptions-item>
      <el-descriptions-item label="地址" :span="2">Suzhou</el-descriptions-item>
      <el-descriptions-item label="性别">{{ info.arr.Sex }}</el-descriptions-item>
      <el-descriptions-item label="年龄" :span="2">{{ info.arr.Age }}</el-descriptions-item>
      <el-descriptions-item label="常驻平台" :span="2">{{ info.arr.Platform }}</el-descriptions-item>
      <el-descriptions-item label="平台地址" :span="2">{{ info.arr.PlatformUrl }}</el-descriptions-item>
      <el-descriptions-item label="个人简介">{{ info.arr.Intro }}
      </el-descriptions-item>
    </el-descriptions>
    <el-button type="success" style=" margin-top: 20px; margin-left: 20px;" @click="centerDialogVisible=true">修改个人信息
    </el-button>
    <el-descriptions
        title="我的订单"
        :column="4"
        direction="vertical"
    >
    </el-descriptions>
    <!--    订单展示-->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="Id" label="合约编号" width="180"/>
      <el-table-column prop="Eshop" label="合作对象" width="180"/>
      <el-table-column prop="StartTime" label="开始时间" width="180"/>
      <el-table-column prop="EndTime" label="结束时间" width="180"/>
      <el-table-column prop="Status" label="状态" width="180"/>
    </el-table>
  </div>
  <!--  弹窗-->
  <div class="mask" v-if="centerDialogVisible">
    <div class="box">
      <div class="little-box">
        <div style="width: 40px">账号</div>
        <el-input v-model="info.arr.username" disabled placeholder="账号"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">昵称</div>
        <el-input v-model="info.arrname" placeholder="昵称"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">电话</div>
        <el-input v-model="info.arr.phonenumber" placeholder="电话"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">住址</div>
        <el-input v-model="input" placeholder="住址"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">性别</div>
        <el-select v-model="info.arr.Sex" class="m-2" placeholder="性别" size="large">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </div>
      <div class="little-box">
        <div style="width: 40px">年龄</div>
        <el-input v-model="info.arr.Age" placeholder="年龄"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">常驻平台</div>
        <el-input v-model="info.arr.Platform" placeholder="常驻平台"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">平台地址</div>
        <el-input v-model="info.arr.PlatformUrl" placeholder="平台地址"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">个人简介</div>
        <el-input v-model="info.arr.Intro" placeholder="个人简介"/>
      </div>
      <el-button @click="centerDialogVisible=false">关闭</el-button>
      <el-button @click="updateInfo()">修改</el-button>
    </div>

  </div>

  <!--  修改头像-->
  <div class="mask" v-show="imgFlag===true">
    <div class="box">
      <input type="file" accept="image/*" @change="change">
      <br>
      <div class="btn">
        <el-button type="danger" @click="imgFlag=false">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>

import CRequest from "@/request/CRequest"
import {computed, onBeforeMount, reactive, ref,} from "vue"
import router from "@/router";

let centerDialogVisible = ref(false)

let imgFlag = ref(false)

let info = reactive({
  arr: []
})

let tableData = ref([])

const options = [
  {
    value: '男',
    label: '男',
  },
  {
    value: '女',
    label: '女',
  },
  {
    value: '其他',
    label: '其他',
  }
]

const level = computed(() => {
  if (info.arr.CreditPoint >= 90) {
    return '0'
  } else if (info.arr.CreditPoint < 90 && info.arr.CreditPoint > 80) {
    return '1'
  } else {
    return '2'
  }
})

const updateInfo = () => {
  CRequest.post('/updateInfo', info.arr).then((res) => {
    console.log(res)
  })
}

const change = (e) => {
  let formData = new FormData()
  formData.append("file", e.target.files[0])
  formData.append("tel", info.arr.phonenumber)
  formData.append("username", info.arr.username)
  CRequest.post('/upload', formData).then((res) => {
    if (res.data.data.url !== null) {
      imgFlag = false
      alert("修改成功")
      router.go('/celebrity/myself')
    } else {
      imgFlag = false
      alert("修改失败")
    }
  })
}

onBeforeMount((() => {
  CRequest.get('/find').then((res) => {
    info.arr = res.data.data.data
  })
  CRequest.get('/getContract').then((res1) => {
    tableData.value = res1.data.data.data
    console.log(tableData)
  })
}))

</script>

<style scoped>
.credit {
  display: block;
  margin: 10px auto;
}

.reputation {
  display: block;
  padding: 10px;
  margin: 5px auto;
  font-size: 24px;
  font-weight: bold;
  color: #4d4d4d;
  background-color: #f2f2f2;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  line-height: 60px;
  text-align: center;
}

.reputation-level-1 {
  color: #0dde0d;
}

.reputation-level-2 {
  color: #ef7005;
}

.reputation-level-3 {
  color: red;
}

.btn {
  padding: 15px;
  display: block;
  margin: 0 auto;
  text-align: center;
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
  width: 200px;
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

.el-row {
  margin-top: 20px;
  margin-left: 20px;
}

.el-descriptions {
  margin-top: 20px;
  margin-left: 20px;
}

.header {
  display: block;
  margin: 5px auto;
  padding: 5px;
}

.left-box {
  width: 30%;
  background-color: red;
}

.right-box {
  width: 70%;
  background-color: yellow;
}

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
