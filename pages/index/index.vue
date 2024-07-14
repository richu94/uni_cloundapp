<template>
	<view class="index">
		<view class="topnav">
			<u-tabs :list="navlist" 
			:activeStyle="{
				color:'#333',
				fontWeigth: 'bold',
				transform:'scale(1.08)'
			}"
			:inactiveStyle="{
				color:'#888',
				transform:'scale(1.0)'
			}" @click="clicknav"></u-tabs>
		</view>
		<!-- 骨架屏-->
			<u-skeleton
				v-show="isloading"
			    rows="4"
			    title
				loading
			></u-skeleton>
		<view class="content">
			<view class="blog" v-for="(item,index) in datalist" :key="index">
				<blog-items></blog-items>
			</view>
		</view>
		
		<view class="edit">
			<text class="iconfont icon-tool" @click="gotoedit"></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navlist: [{
					name:"最新"
				},{
					name:"热门"
				}],
				isloading: false,
				datalist:[1,2,3]
			}
		},
		onLoad() {

		},
		methods: {
			clicknav(e){
				console.log(e)
			},
			gotoedit(){
				uni.navigateTo({
					url:"/pages/Edit/Edit"
				})
			}
		}
	}
</script>

<style lang="less">
@import url("../../static/iconfont/iconfont.css");
.index{
	.edit{
		width:100rpx;
		height:100rpx;
		display:flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 160rpx;
		right:80rpx;
		color: #000;
		background-color:#e0c3fc ;
		border-radius: 50%;
		box-shadow: 0 0 20rpx #e0c3fc ;
	}
}
</style>
