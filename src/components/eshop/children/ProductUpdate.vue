<template>
  <div class="main-box">
    <el-button @click="addGood()" type="primary">添加商品</el-button>
    <!--    分割线-->
    <div class="line_01">所有商品</div>
    <!--        商品展示区-->
    <el-table :data="tableData.arr" style="width: 100vw">
      <el-table-column fixed prop="Intro" label="商品信息" width="470"/>
      <el-table-column prop="Brand" label="品牌" width="120"/>
      <el-table-column prop="MarketPrice" label="市场价" width="120"/>
      <el-table-column prop="CelebrityPrice" label="网红价" width="120"/>
      <el-table-column prop="GoodUrl" label="店铺地址" width="400"/>
      <el-table-column fixed="right" label="Operations" width="450">
        <template v-slot="scope">
          <el-button link type="primary" size="small" @click="upload(scope.row)">上传图片</el-button>
          <el-button link type="primary" size="small" @click="detail(scope.row)">详细信息</el-button>
          <el-button v-if="scope.row.Status===1" link type="danger" size="small" @click="change(0,scope.row)">禁用
          </el-button>
          <el-button v-if="scope.row.Status===0" link type="primary" size="small" @click="change(1,scope.row)">启用
          </el-button>
          <el-button link type="danger" size="small" @click="drop(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!--  详细信息弹窗-->
  <div class="mask" v-if="centerDialogVisible">
    <div class="box">
      <img :src="goods.Img" style="width: 50px;height: 50px" alt="">
      <div class="little-box">
        <div style="width: 40px">商品名</div>
        <el-input v-model="goods.Name" placeholder="商品名"/>
      </div>

      <div class="little-box">
        <div style="width: 40px">品牌</div>
        <el-input v-model="goods.Brand" placeholder="品牌"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">分类</div>
        <el-select v-model="goods.Category" class="m-2" placeholder="分类" size="large">
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
        <el-input v-model="goods.MarketPrice" placeholder="市场价"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">网红价</div>
        <el-input v-model="goods.CelebrityPrice" placeholder="网红价"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">商品简介</div>
        <el-input v-model="goods.Intro" placeholder="商品简介"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">平台地址</div>
        <el-input v-model="goods.GoodUrl" placeholder="平台地址"/>
      </div>
      <el-button @click="centerDialogVisible=false">关闭</el-button>
      <el-button @click="updateProduct()">修改</el-button>
    </div>
  </div>

  <!--  添加弹窗-->
  <div class="mask" v-if="saveVisible">
    <div class="box">
      <div class="little-box">
        <div style="width: 40px">商品名</div>
        <el-input v-model="showGoods.Name" placeholder="商品名"/>
      </div>

      <div class="little-box">
        <div style="width: 40px">品牌</div>
        <el-input v-model="showGoods.Brand" placeholder="品牌"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">分类</div>
        <el-select v-model="showGoods.Category" class="m-2" placeholder="分类" size="large">
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
        <el-input v-model="showGoods.MarketPrice" placeholder="市场价"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">网红价</div>
        <el-input v-model="showGoods.CelebrityPrice" placeholder="网红价"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">商品简介</div>
        <el-input v-model="showGoods.Intro" placeholder="商品简介"/>
      </div>
      <div class="little-box">
        <div style="width: 40px">平台地址</div>
        <el-input v-model="showGoods.GoodUrl" placeholder="平台地址"/>
      </div>
      <el-button @click="saveVisible=false">关闭</el-button>
      <el-button @click="saveProduct()">添加</el-button>
    </div>
  </div>

  <!--  修改头像-->
  <div class="mask" v-show="imgFlag===true">
    <div class="box">
      <input type="file" accept="image/*" @change="changes">
      <br>
      <div class="btn">
        <el-button type="danger" @click="imgFlag=false">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import ERequest from "@/request/ERequest";
import router from "@/router";

let centerDialogVisible = ref(false)
let saveVisible = ref(false)

let imgFlag = ref(false)

let goods = ref({
  Img: '',
  Name: '',
  Brand: 0,
  Category: '',
  MarketPrice: 0,
  CelebrityPrice: 0,
  Intro: '',
  GoodUrl: '',
})

let showGoods = ref({
  Img: '',
  Name: '',
  Brand: 0,
  Category: '',
  MarketPrice: 0,
  CelebrityPrice: 0,
  Intro: '',
  GoodUrl: '',
})

const drop = (info) => {
  const data = new FormData()
  data.append("id", info.Id)
  ERequest.post("/delete", data).then((res) => {
    if (res.data.data.code === 200) {
      alert("删除成功")
    } else {
      alert("删除失败")
    }
  })
}

const addGood = () => {
  saveVisible.value = true
}

const upload = (info) => {
  localStorage.setItem("id", info.Id)
  imgFlag.value = true
}

const changes = (e) => {
  let formData = new FormData()
  formData.append("file", e.target.files[0])
  formData.append("id", localStorage.getItem("id"))
  ERequest.post('/uploadGood', formData).then((res) => {
    if (res.data.data.url !== null) {
      imgFlag = false
      alert("修改成功")
      router.go('/eshop/product')
    } else {
      imgFlag = false
      alert("修改失败")
    }
  })
}

const change = (status, info) => {
  const params = new FormData()
  params.append("status", status)
  params.append("id", info.Id)
  ERequest.post('/status', params).then((res) => {
    console.log(res)
  })
}

const detail = (data) => {
  centerDialogVisible.value = true
  goods.value = data
}

//获取全部商品信息
onMounted(() => {
  ERequest.get('/getAllGoods').then((res) => {
    tableData.arr = res.data.data.data
  })
})

const saveProduct = () => {
  ERequest.post('/saveGood', showGoods.value).then((res) => {
    if (res.data.code === 200) {
      saveVisible = false
      alert("添加成功")
      router.go('/eshop/product')
    } else {
      alert("添加失败")
    }
  })
}

const updateProduct = () => {
  ERequest.post('/updateGood', goods.value).then((res) => {
    if (res.status === 200) {
      saveVisible = false
      alert("添加成功")
      router.go('/eshop/product')
    } else {
      alert("添加失败")
    }
  })
}

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

const tableData = reactive({
  arr: []
})
</script>

<style scoped>
.line_01 {
  padding: 0 20px 0;
  margin: 20px 0;
  line-height: 1px;
  border-left: 190px solid #ddd;
  border-right: 190px solid #ddd;
  text-align: center;
  color: #79bbff;
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
  z-index: 100;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-box {
  margin-top: 5px;
  z-index: 1;
  width: 100%;
}
</style>
