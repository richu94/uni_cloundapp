<template>
	<view class="edit">
		<view class="title">
			<input type="text" placeholder="输入标题" placeholder-class="placeholderClass" v-model="articleobject.title"></input>
		</view>
		<view class="content">
			<editor class="myedit" placeholder="写点什么..." @focus="Onfucs"
			@ready="Onready" @statuschange="Onstatuschange"></editor>
		</view>
		<view class="button">
			<button @click="Onsubmit" type="primary" text="确认发表" :disabled="!articleobject.title.length">确定</button>
		</view>
		<view class="tool" v-show="toolshow">
			<view class="item" @click="clickHead">
				<text class="iconfont icon-heading-levels"></text>
			</view>
			<view class="item" @click="gotobig">
				<text class="iconfont icon-bold" :class="boldShow?'active' : ''"></text>
				</view>
			<view class="item"  @click="clickItalic" >
				<text class="iconfont icon-italics":class="italicShow?'active' : ''"></text>
			</view>
			<view class="item" @click="Divder"><text class="iconfont icon-insert-before"></text></view>
			<view class="item" @click="insertImages">
				<text class="iconfont icon-block-image"></text>
				</view>
			<view class="item" @click="EditOk">
				<text class="iconfont icon-check"></text>
				</view>
		</view>
	</view>
</template>

<script>
	import {getImgSrc} from '@/utils/tool.js'
	export default{
		name:"Edit",
		data(){
			return {
				toolshow:false,
				headShow:false,
				boldShow:false,
				italicShow:false,
				articleobject:{
					title:"",
					context:"",
					desciption:"",
					picurls:"",
					postlocation:"",
				}
			};
		},
		onLoad() {
			this.getProvince().then(res=>{
				this.articleobject.postlocation = res;
			})
		},
		methods:{
			Onfucs(){
				this.toolshow = true;
			},
			//离开焦点
			Onready(){
				uni.createSelectorQuery().in(this).select('.myedit').fields({
					size:true,
					context:true
				},res=>{
					this.editCtx = res.context;
				}).exec()
			},
			//样式改变
			Onstatuschange(e){
				let detail = e.detail;
				this.checkStatus("header",detail,this.headShow);
				this.checkStatus("bold",detail,this.boldShow);
				this.checkStatus("italic",detail,this.italicShow);
			},
			//分割线
			Divder(){
				this.editCtx.insertDivider();
			},
			//添加大标题
			clickHead(){
				this.headShow = !this.headShow;
				this.editCtx.format("header",this.headShow ? "h2" : false)
			},
			//加粗
			gotobig(){
				this.boldShow = !this.boldShow;
				this.editCtx.format("bold");
			},
			clickItalic(){
				this.italicShow = !this.italicShow;
				this.editCtx.format("italic");
			},
			Onsubmit(){
				this.editCtx.getContents({
					success:res=>{
						this.articleobject.desciption = res.text.slice(0,50);
						this.articleobject.context = res.html;
						this.articleobject.picurls = getImgSrc(res.html,2);
						console.log(this.articleobject)
					}
				})
			},
			EditOk(){
				this.toolshow = false;
			},
			checkStatus(name,detail,obj){
				if (detail.hasOwnProperty(name)){
					this[obj] = true;
				}else{
					this[obj] = false;
				}
			},
			getmylocate(){
				return new Promise((resolve,reject)=>{
					uni.request({
						url:"https://restapi.amap.com/v3/ip?key=fb6fd65b71f26f6774c08e0ad7574ecc",
						success: (res)=>{
							if (typeof(res.data.province) == "string"){
								resolve(res.data.province)
							}else{
								resolve("彗星")
							}
							let object = {
								province:res.data.province,
								date:Date.now()
							};
							uni.setStorageSync("historylocation",object)
						},
						fail: (err)=>{
							reject(err)
						}
					})
				})
			},
			getProvince(){
				return new Promise((resolve,reject)=>{
					let history = uni.getStorageSync("historylocation");
					if (history){
						if (Date.now() - history.date > 1000*60*60){
							this.getmylocate().then(res=>{
								resolve(res);
							}).catch(err=>{
								reject(err);
							});
						}else{
							resolve(history.province);
						}
					}else{
						this.getmylocate().then(res=>{
							resolve(res);
						}).catch(err=>{
							reject(err);
						});
					}
				})
			},
			insertImages(){
				uni.chooseImage({
					count:2,
					success:async res => {
						uni.showLoading({
							title:"图片上传中",
							mask:true
						})
						for (let ele of res.tempFiles) {
							let result = await uniCloud.uploadFile({
								filePath:ele.path,
								cloudPath:ele.name
							})
							this.editCtx.insertImage({
								src:result.fileID
							})
						}
						uni.hideLoading();
					}
				})
			}
		}
	}
</script>

<style lang="less">
@import url("../../static/iconfont/iconfont.css");
/deep/ .ql-blank::before{
	font-style: normal;
	color: #100;
}
.edit{
	.title {
		input{
			height: 120rpx;
			font-size: 46rpx;
			border-bottom: 1px solid #4e4e4e;
			margin-bottom: 30rpx;
			color: #666;
		}
		.placeholderClass{
			color: #e0e0e0e;
		}
	}
	.content{
		.myedit{
			height: calc(100vh - 500rpx);
			margin-bottom: 30rpx;
		}
	}
	.tool{
		width: 100%;
		height:80rpx;
		position: fixed;
		bottom: 20rpx;
		left: 0rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.iconfont{
			font-size:  50rpx;
			color: #333;
			&.active{
				color: aqua;
			}
		}
		.iconfont:active{
			color: aqua;
		}
	}
}
</style>
