<template>
<div class='main'>
  <div class="header">
    <el-row class="container">
      <div class="top-banner">
        <img src="../../../static/images/menu.jpg" />
        <router-link :to="{path: '/information'}" class="setting"><i class="el-icon-setting"></i>  配置管理</router-link>
      </div>
      <el-row>
        <el-col :span="4" class="menuItem">
          <router-link :to="{path: '/main/index'}"> 首页</router-link>
        </el-col>
        <el-col :span="4" class="menuItem">
          <router-link :to="{path: '/main/monitor'}"> 环境监测</router-link>
        </el-col>
        <el-col :span="4" class="menuItem">
          <router-link :to="{path: '/main/breedingLog'}" >养殖日志</router-link>
        </el-col>
        <el-col :span="4" class="menuItem">
          <router-link :to="{path: '/main/profit'}">经济效益</router-link>
        </el-col>
        <el-col :span="4" class="menuItem">
          <router-link :to="{path: '/main/expert'}" >专家指导</router-link>
        </el-col>
        <el-col :span="4" class="menuItem">
          <router-link :to="{path: '/main/knowledge'}">知识库</router-link>
        </el-col>
      </el-row>
    </el-row>
  </div>
  <router-view class="body container"></router-view>
  <el-row style="background:#262e39">
    <el-col :span="24" class="footer">
      copyright &copy;2016 All rights reserved.
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  data() {
    return {
      activeMenu: 1
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  background: #f8f8f8;
  z-index: 100;
}

.container {
  max-width: 1200px;
  min-width: 960px;
  margin: 0 auto;
}

.header>.el-row {
  background: #f8f8f8;
}

.header>.el-row .el-menu {
  background: #f8f8f8;
}

.body {
  padding-top: 5px;
  min-height: 806px;
}

.el-menu {
  padding: 5px 20px;
}

.top-banner {
  position: relative;
}

.top-banner .setting {
  position: absolute;
  color: #000;
  right: 5%;
  bottom: 20%;
}
 .top-banner .setting i{
  vertical-align: bottom;
}
.top-banner img {
  width: 100%;
}

.menuItem {
  text-align: center;
  height: 80px;
  line-height: 80px;
  color: #000;
}

.menuItem:hover,.menuItem.active {
  color: #098994;
  border-bottom: 5px solid #098994;
}

.menuItem a {
  display: block;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.settings_menu {
  position: relative;
  right: 0;
  bottom: -10px;
  height: 50px;
}

.footer {
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: #fff;
}
</style>
