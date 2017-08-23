<template>
    <div class='main container'>
        <div class="header">
            <el-row>
                <el-col :span="24">
                    <el-menu :router="true" :default-active="$route.path" class="el-menu" mode="horizontal">
                        <el-menu-item index="/main/index" class="logo"><span>&nbsp;</span></el-menu-item>
                        <el-menu-item index="/main/index">首页</el-menu-item>
                        <el-menu-item index="/main/monitor">环境监测</el-menu-item>
                        <el-menu-item index="/main/breedingLog">养殖日志</el-menu-item>
                        <el-menu-item index="/main/profit">经济效益</el-menu-item>
                        <el-menu-item index="5">专家指导</el-menu-item>
                        <el-menu-item index="/main/knowledge">知识库</el-menu-item>
                        <el-menu-item index="/information" class="settings_menu">
                            <i class="el-icon-setting"></i>配置管理
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
        </div>
        
        <router-view class="body"></router-view>
    </div>
    
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style scoped> 
    .header{
        position:fixed;
        width:100%;
        background:#f8f8f8;
        z-index:100;
    }
    .header>.el-row{
        max-width:1100px;
        min-width:960px;
        margin:0 auto;
        background:#f8f8f8;
    }
    .header>.el-row .el-menu{
        background:#f8f8f8;
    }
    .body{
        max-width:1100px;
        min-width:960px;
        margin:0 auto;
        padding-top:70px;
    }
    .el-menu {
		padding: 5px 20px;
	}
	
	.logo {
		display: inline-block;
		width: 120px;
		background: url('../../assets/index/logo.png') no-repeat center center / 100px 50px;
	}
	
	.logo:hover {
		border-bottom: 5px solid transparent;
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
</style>