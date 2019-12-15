//初始小蛇
var num = [[0,4],[0,3],[0,2],[0,1],[0,0]];
var sum=0;
//获取按键值
var nums=-1;
var key=39,keys;
$("body").keydown(function (){
	//左 -- 37 上 --38  右--39  下--40、
	keys=key;
	key=event.keyCode;
	if(key==13){
		if($(".achever:eq(0)").css("display")!="none"){
			Handover();
		}else{
			var showa=$(".showa:eq(0)");
			if(showa.css("display")=="none"){
		 		showa.show(500);
			}else{
				showa.hide(500);
		 		das=setInterval("changers("+key+")",500)
			}
			clearInterval(das);
		}
		return;
	}
	if($(".achever:eq(0)").css("display")!="none"||$(".showa:eq(0)").css("display")!="none"){
		clearInterval(das);
		return;
	}
	//不允许回头
	if((key==37&&keys==39)||(key==39&&keys==37)||(key==40&&keys==38)||(key==38&&keys==40)){
		key=keys;
		return;
	}else{
		changers(key);
		clearInterval(das);
		//自动运动
		das=setInterval("changers("+key+")",500)
	}
	//传入按键值更改内容	
})
var das=setInterval("changers("+key+")",500);
//按键改变
function changers(l){
	if(l<37||l>40){
		return;
	}
	nums=num[num.length-1];
	shows(num.length-1,"none");
	for(var i=num.length-1;i>0;i--){
		num[i]=[num[i-1][0],num[i-1][1]];
	}
	switch(key){
		case 37:
			num[0]=[num[0][0],num[0][1]-1];
			changer();
			break;
		case 38:
			num[0]=[num[0][0]-1,num[0][1]];
			changer();
			break;
		case 39:
			num[0]=[num[0][0],num[0][1]+1];
			changer();
			break;
		case 40:
			num[0]=[num[0][0]+1,num[0][1]];
			changer();
			break;
	}
	show();
}
//显示
function show(){
	shows(0,"url(image/tou"+key+".png)");
	for(var i=1;i<num.length;i++){
		shows(i,"url(image/pf.png)");
	}
}
//数组下标（i） 颜色（color）
function shows(i,color){
		var a=num[i][0]*20+num[i][1];
		var item=$(".item:eq("+a+")");
		item.css("background",color);
}
show();
//随机出现点
function randoms(){
	while(true){
		var s=Math.ceil(Math.random()*10000%400)-1;
		var item=$(".item:eq("+s+")");
		if(item.css("background-color")=="rgba(0, 0, 0, 0)"){
			item.css("background-color","blue");
			break;
		}
	}
}
//创建计时器打开
setTimeout("randoms()",2000);
//移动一次判断一次
function changer(){
	var x=num[0][0];
	var y=num[0][1];
	var k = x*20 + y;
	var item=$(".item:eq("+k+")");
	if(x==-1||y==-1||x==20||y==20||item.css("background-image").indexOf("pf.png")!=-1){
		$(".achever:eq(0)").show(500);
		clearInterval(das);
	};
	if(item.css("background-color")=="rgb(0, 0, 255)"){
		if(nums!=-1){
			sum++;
			$(".test:eq(0)").html("本次得分：&nbsp;&nbsp;&nbsp;&nbsp;"+sum*10+"分");
			num[num.length]=nums;
		}
		setTimeout("randoms()",2000);
	}
}
$("button:eq(0)").click(function (){
		Handover();
})
function Handover(){
		clearInterval(das);
		$(".achever:eq(0)").hide(500);
		var x=num[0][0];
		var y=num[0][1];
		var k = x*20 + y;
		var item=$(".item:eq("+k+")");
		$(".item").css("background","none");
		key=39;
		num = [[0,4],[0,3],[0,2],[0,1],[0,0]];
		show();
		nums=-1;
		setTimeout("randoms()",2000);
}
