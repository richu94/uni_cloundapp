export function getImgSrc(richtext,num=3){
	let imglist = [];
	richtext.replace(/<img [^>]*src=['"]([^'"]+)[^>]*/g,(matche,capture)=>{
		imglist.push(capture);
	});
	imglist = imglist.slice(0,num);
	return imglist;
}