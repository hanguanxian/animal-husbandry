<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
	}
	
	html,
	body,
	div,
	p,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin: 0;
		padding: 0;
	}
	ul{
		list-style:none;
	}
	/* 轮播图导航位置 */
	.el-carousel__indicators {
		bottom: 80px;
	}
</style>
