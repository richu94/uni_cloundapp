<template>
	<view class="blog">
		<view class="item">
			<view class="avatar">
				<image src="../../static/images/UserSquare.png" mode="aspectFill"></image>
			</view>
			<view class="name">
				<text>name</text>
				<text class="time">{{getDatetime}}</text>
			</view>
			<view class="more">
				...
			</view>
		</view>
		<view class="body">
			<view class="title">
				作者
			</view>
			<view class="text">
				文字
			</view>
			<view class="piclist">
				<image src="../../static/images/UserOperation.png" mode="aspectFill" v-for="(item,index) in piclist" :key="index"></image>
			</view>
			<view class="content">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:"blog-items",
		data(){
			return {
				piclist:[1,2,3]
			};
		},
		methods:{
			
		},
		onLoad() {
			
		},
		computed:{
			getDatetime(){
				/* let time = Article.value.posttime; */
				let time = Date.now();
				let ntime = Date.now();
				const postdate = new Date(time);
				if (ntime - time < 60000){
					return "刚刚";
				}else if (ntime - time >= 60000 && ntime - time < 3600000){
					return Math.floor((ntime - time) / 60000) + "分钟前";
				}else if (ntime - time >= 3600000 && ntime - time < 86400000){
					return Math.floor((ntime - time) / 3600000) + "小时前";
				}else{
					return postdate.getFullYear()+'-'+(postdate.getMonth()+1)+'-'+postdate.getDate();
				}
			}
		}
	}
</script>

<style lang="less">
.blog{
	
	.item{
		margin-top:50rpx;
		height: 90rpx;
		display: flex;
		white-space: nowrap;
		justify-content: space-between;
		align-items: center;;
		.avatar image{
			flex: 5;
			width: 40rpx;
			height: 40rpx;
			border-radius:50%;
			overflow: hidden;
		}
		.name{
			margin-left:5rpx;
			flex:5;
			font-size: 1.1em;
			.time{
				font-size: 0.9em;
				margin-left: 10rpx;
			}
		}
		.more{
			display: flex;
			justify-content: space-between;
		    flex: 0.5;
			font-size: 1.5em;
		    text-align: right;
		}

	}
	.body{
		display: block;
		margin-bottom: 5rpx;
		.title{
			font-size: 50rpx;
		}
		.text{
			margin: 10rpx 0;
		}
		.piclist image{
			width: 100rpx;
			height: 100rpx;
		}
	}
}
</style>
