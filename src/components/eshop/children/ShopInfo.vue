<template>
  <div class="left-box">
    <div class="block">
      <el-avatar :size="300" :src="info.arr.Avatar" class="header"/>
      <el-button style="display:block;margin:0 auto;" @click="imgFlag=true">修改头像</el-button>
    </div>
  </div>
  <div class="right-box">
    <el-descriptions
        title="我的信息"
        :column="4"
        direction="vertical"
    >
      <el-descriptions-item label="账号">{{ info.arr.Username }}</el-descriptions-item>
      <el-descriptions-item label="昵称">{{ info.arr.Name }}</el-descriptions-item>
      <el-descriptions-item label="电话">{{ info.arr.Phonenumber }}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{ info.arr.Email }}</el-descriptions-item>
      <el-descriptions-item label="年龄" :span="2">{{ info.arr.Age }}</el-descriptions-item>
      <el-descriptions-item label="常驻平台" :span="2">{{ info.arr.Platform }}</el-descriptions-item>
      <el-descriptions-item label="平台地址" :span="2">{{ info.arr.PlatformUrl }}</el-descriptions-item>
      <el-descriptions-item label="个人简介">{{ info.arr.Intro }}
      </el-descriptions-item>
    </el-descriptions>
    <el-button type="success" style=" margin-top: 20px; margin-left: 20px;" @click="update()">修改个人信息
    </el-button>
    <el-button type="success" style=" margin-top: 20px; margin-left: 20px;" @click="addressFlag=true">添加地址
    </el-button>
    <!--  地址信息-->
    <div class="tablebox">
      <table>
        <thead>
        <tr>
          <th>收货人</th>
          <th>所在地</th>
          <th>详细地址</th>
          <th>电话/手机</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in tbAddress.arr" :key="index">
          <td>{{ item.Name }}</td>
          <td>{{ item.Province }}{{ item.City }}{{ item.Area }}{{ item.Town }}</td>
          <td>{{ item.Detail }}</td>
          <td>{{ item.Phonenumber }}</td>
          <td>
            <el-button type="success" @click="updateAddr(item)">修改</el-button>
            <el-button type="danger" @click="deleteAddr(item)">删除</el-button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!--  弹窗-->
  <div class="mask" v-if="centerDialogVisible">
    <div class="box">
      <div class="little-box">
        <div style="width: 40px">账号</div>
        <el-input disabled v-model="goods.Username" placeholder="账号"/>
      </div>

      <div class="little-box">
        <div style="width: 40px">昵称</div>
        <el-input v-model="users.Name" placeholder="昵称"/>
      </div>

      <div class="little-box">
        <div style="width: 40px">电话</div>
        <el-input v-model="users.Phonenumber" placeholder="电话"/>
      </div>

      <div class="little-box">
        <div style="width: 40px">邮箱</div>
        <el-input v-model="users.Email" placeholder="邮箱"/>
      </div>

      <div class="little-box">
        <div style="width: 40px">年龄</div>
        <el-input v-model="users.Age" placeholder="年龄"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">常驻平台</div>
        <el-input v-model="users.Platform" placeholder="常驻平台"/>
      </div>

      <div class="little-box">
        <div style="width: 40px">平台地址</div>
        <el-input v-model="users.PlatformUrl" placeholder="平台地址"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">个人简介</div>
        <el-input v-model="users.Intro" placeholder="个人简介"/>
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

  <!--  添加地址弹窗-->
  <div class="mask" v-show="addressFlag===true">
    <div class="box">
      <div class="address">
        收货人
        <el-input v-model="addressInfo.name" placeholder="收货人"/>
      </div>
      <div class="address">
        手机号码
        <el-input v-model="addressInfo.tel" placeholder="手机号"/>
      </div>
      <div class="address">
        所在地区
        <v-region-selects town="true" @change="regionChange"/>
      </div>
      <div class="address">
        详细地址
        <el-input v-model="addressInfo.detail" placeholder="详细地址"/>
      </div>
      <div class="address">
        <el-button @click="addressFlag=false">取消</el-button>
        <el-button type="success" @click="addAddress()">添加</el-button>
      </div>
    </div>
  </div>

  <!--  修改地址弹窗-->
  <div class="mask" v-show="addrFlag===true">
    <div class="box">
      <div class="address">
        收货人
        <el-input v-model="addressInfo.name" placeholder="收货人"/>
      </div>
      <div class="address">
        手机号码
        <el-input v-model="addressInfo.tel" placeholder="手机号"/>
      </div>
      <div class="address">
        所在地区
        <v-region-selects town="true" @change="regionChange"/>
      </div>
      <div class="address">
        详细地址
        <el-input v-model="addressInfo.detail" placeholder="详细地址"/>
      </div>
      <div class="address">
        <el-button @click="addrFlag=false">取消</el-button>
        <el-button type="success" @click="upAddress()">修改</el-button>
      </div>
    </div>
  </div>

</template>

<script setup>
import {onBeforeMount, reactive, ref,} from "vue";
import ERequest from "@/request/ERequest";
import router from "@/router";

/***
 * 变量
 */
// 修改地址弹窗
let addrFlag = ref(false)

// 添加地址弹窗
let addressFlag = ref(false)

// 存储地址的其他信息
let addressInfo = reactive({
  name: '',
  tel: '',
  detail: '',
})

// 从接口获取的已有地址
let tbAddress = reactive({
  arr: []
})

// 存储组件生成的地址
const address = ref()

// 修改个人信息弹窗
let centerDialogVisible = ref(false)

// 修改头像弹弹窗
let imgFlag = ref(false)

// 存储个人信息
let info = reactive({
  arr: []
})

// 存储修改后的个人信息
let users = ref({
  Username: "",
  Name: "",
  Phonenumber: "",
  Email: "",
  Age: "",
  Platform: "",
  PlatformUrl: "",
  Intro: ""
})

/**
 * 方法
 * */
// 删除地址
const deleteAddr = (item) => {
  const flag = confirm("你确定要删除这条记录吗?")
  if (flag) {
    const params = new FormData()
    params.append("id", item.Id)
    ERequest.post("/deleteAddr", params).then((res) => {
      if (res.status === 200) {
        alert("删除成功")
      } else {
        alert("删除失败")
      }
    })
  }
}

// 更新地址准备工作
const updateAddr = (data) => {
  addrFlag.value = true
  addressInfo.name = data.Name
  addressInfo.tel = data.Phonenumber
  addressInfo.detail = data.Detail
  localStorage.setItem("addrId", data.Id)
}

// 更新地址接口
const upAddress = () => {
  const params = new FormData()
  params.append("id", localStorage.getItem("addrId"))
  params.append("name", addressInfo.name)
  params.append("tel", addressInfo.tel)
  params.append("detail", addressInfo.detail)
  params.append("province", address.value.province.value)
  params.append("city", address.value.city.value)
  params.append("area", address.value.area.value)
  params.append("town", address.value.town.value)
  ERequest.post("/upAddr", params).then((res) => {
    if (res.status === 200) {
      alert("修改成功")
      addrFlag.value = false
    } else {
      alert("修改失败")
    }
  })
}

// 添加新的地址
const addAddress = () => {
  const params = new FormData()
  params.append("name", addressInfo.name)
  params.append("tel", addressInfo.tel)
  params.append("detail", addressInfo.detail)
  params.append("province", address.value.province.value)
  params.append("city", address.value.city.value)
  params.append("area", address.value.area.value)
  params.append("town", address.value.town.value)
  ERequest.post("/addr", params).then((res) => {
    if (res.status === 200) {
      alert("添加成功")
      addressFlag.value = false
    }
  })
}

// 监听地址信息改变
const regionChange = (data) => {
  address.value = data
}

// 更新个人信息接口
const update = () => {
  centerDialogVisible.value = true
  users.value = info.arr
}

// 修改头像接口
const change = (e) => {
  let formData = new FormData()
  formData.append("file", e.target.files[0])
  formData.append("tel", info.arr.Phonenumber)
  formData.append("username", info.arr.Username)
  ERequest.post('/upload', formData).then((res) => {
    if (res.data.data.url !== null) {
      imgFlag = false
      alert("修改成功")
      router.go('/eshop/myself')
    } else {
      imgFlag = false
      alert("修改失败")
    }
  })
}

// 修改个人信息接口
const updateInfo = () => {
  ERequest.post('/update', users.value).then((res) => {
    console.log("res", res)
  })
}

onBeforeMount((() => {
  ERequest.get('/find').then((res) => {
    info.arr = res.data.data.data
  })
  ERequest.get('/address').then((res) => {
    tbAddress.arr = res.data.data.data
  })
}))
</script>

<style scoped>
table, tbody, tfoot, thead, tr, th, td {
  margin: 0;
  padding: 0;
  outline: 0;
  vertical-align: baseline;
  background: transparent;
  border-collapse: collapse;
  border-spacing: 0;
  border: 0;
  color: #fff;
}

.tablebox table {
  border-collapse: separate;
  border-spacing: 1px
}

.tablebox {
  width: 100%;
  height: auto;
  overflow: hidden;
  margin: 10px auto;
}

.tablebox table {
  width: 100%;
}

.tablebox table th, .tablebox table td {
  font-size: 12px;
  text-align: center;
  line-height: 16px;
  background: #606988;
  padding: 12px;
}

.tablebox table th {
  height: 30px;
  line-height: 30px;
  background: #6271bd;
  font-size: 14px;
  font-weight: normal;
}

.tablebox table td img {
  display: inline-block;
  vertical-align: middle;
}

.tablebox.table_md table td, .tablebox.table_md table th {
  line-height: 18px;
}

.address {
  margin: 5px;
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

.el-row {
  margin-top: 20px;
  margin-left: 20px;
}

.el-descriptions {
  margin-top: 20px;
  margin-left: 20px;
}

.header {
  margin: 10px 10% 20px 15%;
}

.left-box {
  width: 30%;
}

.right-box {
  width: 70%;
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
