<template>
  <div class="common-layout">
    <el-container>
      <el-header style="background-color: #0d6efd">
        <div class="header">

          <div class="function">
            <router-link to="/celebrity/index">
              <el-button>首页</el-button>
            </router-link>
            <router-link to="/celebrity/recommend">
              <el-button>优品臻选</el-button>
            </router-link>
            <router-link to="/celebrity/find">
              <el-button>找合作</el-button>

            </router-link>
            <router-link to="/celebrity/myself">
              <el-button>我的</el-button>

            </router-link>
          </div>
          <div class="search">
            <el-input style="width: 200px" placeholder="Search"></el-input>
            <el-button>搜索</el-button>
          </div>

          <div class="exit">
            <div>
              <img src="../../assets/img/whb.png" alt="">

            </div>
            <div>
              <el-button>退出</el-button>
            </div>
          </div>


        </div>
      </el-header>
      <el-main style="background-color: yellow">Main
      <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "IndexView"
}
</script>

<style scoped>
a{
  text-decoration: none;
}
.header {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}

.function {
  margin-left: 100px;
}

.search {
  margin-left: 100px;
}

.exit {
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 50px;
}

.exit img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>