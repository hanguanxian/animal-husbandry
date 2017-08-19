<template>
	<div class="index">
		<el-row>
			<el-col :span="24">
				<el-menu :default-active="activeIndex" class="el-menu" mode="horizontal">
					<el-menu-item index="1" class="logo"><span>&nbsp;</span></el-menu-item>
					<el-menu-item index="1">首页</el-menu-item>
					<el-menu-item index="2">环境监测</el-menu-item>
					<el-menu-item index="3">养殖日志</el-menu-item>
					<el-menu-item index="4">经济效益</el-menu-item>
					<el-menu-item index="5">专家指导</el-menu-item>
					<el-menu-item index="6">知识库</el-menu-item>
					<el-menu-item index="7" class="settings_menu">
						<i class="el-icon-setting"></i>配置管理
					</el-menu-item>
				</el-menu>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24" style="position:relative">
				<el-carousel trigger="click" height="380px">
					<el-carousel-item v-for="item in 4" :key="item">
						<h3>{{ item }}</h3>
					</el-carousel-item>
				</el-carousel>
				<div class="bus_and_tec">
					<div class="out_tria">
						<div class="in_tria">
							<span>业务<i>与</i>技术</span>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="20" style="background-color:#f2f7fd;margin:0">
			<el-col :span="6" v-for="n in 4" :key="n">
				<div class="grid-content">
					<div class="content_icon"></div>
					<h2 class="content_title">水产产品</h2>
					<p class="content_detail">
						箱的心得，本篇将理论结合实际，为大家剖析冰箱选购的的那些事，当然了文章还是以抛砖引玉为主，欢迎大家多多交流和探讨。
					</p>
				</div>
			</el-col>
		</el-row>
		<el-row class="news">
			<el-col :span="10">
				<div class="news_title">
					<h3>资讯信息/news</h3>
					<span class="more">更多 <i class="el-icon-arrow-right"></i></span>
				</div>
				<ul class="news_list">
					<li class="news_item" v-for="n in 6" :key="n">
						<span class="news_item_title">新疆北园市场:一周市场分析</span>
						<span class="news_item_time">2017-08-16</span>
					</li>
					
				</ul>

			</el-col>
			<el-col :span="14">
				<div class="pic_news">
					<h3 style="opacity:0">图片新闻</h3>
					<span class="more">更多 <i class="el-icon-arrow-right"></i></span>
				</div>
				<div class="pic_news_list">
					<el-row :gutter="20">
						<el-col :span="12" v-for="n in 2" :key='n'>
							<div class="pic_news_item">
								<img src="../assets/index/2.gif" alt="">
								<p>5月6日小龙虾批发价格(北京农贸大市场)</p>	
							</div>
						</el-col>
					</el-row>
				</div>
			</el-col>
		</el-row>
		<el-row style="background:#262e39">
			<el-col :span="24" class="footer">
				copyright &copy;2016 All rights reserved.
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'index',
		data() {
			return {
				activeIndex: '1',
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.index{
		max-width:1100px;
		min-width:960px;
		margin:0 auto;
	}
	.el-menu {
		padding: 5px 20px;
	}
	
	.logo {
		display: inline-block;
		width: 120px;
		background: url('../assets/index/logo.png') no-repeat center center / 100px 50px;
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
	
	.settings_menu i {
		margin-right: 5px;
	}
	
	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}
	
	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}

	.bus_and_tec{
		position:absolute;
		bottom:0px;
		left:50%;
		transform: translateX(-50%);
		z-index:20;
	}

	.bus_and_tec .out_tria{
		position:relative;
		bottom:0px;
		width: 0;
		height: 0;
		border-right: 80px solid transparent;
		border-bottom: 	60px solid #76ade6;
		border-left: 80px solid transparent;
	}
	.bus_and_tec .in_tria{
		position: absolute;
		top: 16px;
		left: -42px;
		display:flex;
		justify-content:center;
		align-items:center;
		transform: rotate(45deg);
		width:84px;
		height:84px;
		background-color:#192086;
		text-align:center;
	}
	.bus_and_tec .in_tria span{
		display:block;
		transform: rotate(-45deg);
		color:#fff;
		font-size:14px;
	}
	.bus_and_tec .in_tria span i{
		font-style:normal;
		font-size:12px;
	}

	.grid-content{
		display:flex;
		flex-direction: column;
		justify-content: space-around;
		padding:20px 10px;
		min-height: 400px;
		text-align:center;
	}
	.grid-content .content_icon{
		width:100%;
		min-height:200px;
		background:url("../assets/index/1.gif") no-repeat center center / 200px 200px;
	}
	.grid-content .content_title{
		margin:20px 0px;
	}
	.grid-content .content_detail{
		padding:0 20px;
		font-size:12px;
		line-height: 22px;
	}
	.news{
		min-height:300px;	
	}
	.news_title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding:20px 30px;
	}
	.more{
		font-size:14px;
	}
	.more i{
		font-size:12px;
	}

	.news_list{
		padding: 0 30px;
	}

	.news_item{
		display: flex;
		justify-content: space-between;
	}
	.news_item .news_item_title{
		text-overflow: ellipsis;
	}

	.pic_news{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding:20px 30px;
	}
	.pic_news_list{
		padding:10px 30px;
	}
	.pic_news_item img{
		width:100%;
		max-height:140px;
	}
	.pic_news_item p{
		font-size:12px;
		text-align: center;
	}

	.footer{
		height:100px;
		line-height: 100px;
		text-align:center;
		color:#fff;
	}
</style>
