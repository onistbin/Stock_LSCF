
/*
	绘制曲线
*/

var canvas_height = 482,
	spanPrice0 = 0,
	spanPrice1 = 0
	arr= [];
function drawGraph(data){
	
	var stockData = data.dataFormats;
	var gridHeight = $("#canvas-grid").height() / 8;
	var canvas = document.getElementById('canvas'),
		priceIncrene = document.getElementById('y-line'),
		priceIncre = priceIncrene.getElementsByTagName('li');

	//设置2px打一个点
	
	var num = 2; 

	//得到价格最大最小值
	var priceMin = getMinMax(stockData).min;      
	var priceMax = getMinMax(stockData).max;  

	// 得到成交量最大值
	var volumeMax = getMinMax(stockData).maxVolume;

	//得到数据中最大和最小值与昨日收盘价格差的绝对值中较大的一个值
	
	var currentAbs = getAbsMax(data.yestclose - priceMin, data.yestclose - priceMax);

	//计算每个格子表示的价格
	
	everyRange = currentAbs / 4;



	//计算显示头部的数据

	var headerData = {
		nowPrice: data.dataFormats[data.dataFormats.length - 1].current,   
		todayStartPrice: data.dataFormats[0].current, //今开
		nowMax: priceMax,   //最高
		nowMin: priceMin,   //最低
		nowVolume: data.dataFormats[data.dataFormats.length - 1].volume,   //当前成交量
		yesterdayPrice: data.yestclose  //昨日闭盘价格
	}

	//页面顶部显示信息
	var $span = $("#header span");
	$span.eq(0).text(headerData.todayStartPrice);
	$span.eq(1).text(headerData.nowMax);
	$span.eq(2).text(data.lastVolume);  //最后成交量
	$span.eq(3).text(headerData.yesterdayPrice);
	$span.eq(4).text(headerData.nowMin);
	$span.eq(5).text(headerData.nowPrice);



	/*
		设置时间轴和当前价的位置
	*/

	var canvasHeight = $('#canvas').height(),
		yMarginTop = $('#canvas').height() - $("#y-line").height(),
		yMarginTop = $('#canvas').height() - $("#y-line").height();
		
	/*
		显示纵坐标数据，从昨日闭盘价开始算起；i<5,是闭盘价往上
	*/

	for( var i = 0; i <= 8; i ++) {

		i < 5 ? priceIncre[i].innerHTML = (Number(data.yestclose) + Number(everyRange * (4 - i))).toFixed(3) : priceIncre[i].innerHTML = (Number(data.yestclose) - Number(everyRange * (i - 4))).toFixed(3);
	}

	/*
		坐标原点(stsrtX, startY);
		下一个坐标(x, y);
		画曲线
	*/

	var stsrtX = 0,
		startY = 0,  
		     x = 0, 
		     y = 0; 


	var countHtmlPoor = Number(priceIncre[0].innerHTML) - Number(priceIncre[8].innerHTML);

	var actuHeight =((stockData[0].current - Number(priceIncre[8].innerHTML)) * canvasHeight) / countHtmlPoor;

	startY = parseInt(canvasHeight - actuHeight);


	/*
		描点连线
	*/

	var countFrame = 0;
	var time = 6;
	var timer = setInterval(function(){

		if(yestCloBaseLine){

			var increLen = (stockData[countFrame].current - priceMin) * gridHeight;

				spanPrice0 = Number(priceIncre[0].innerHTML),
				spanPrice8 = Number(priceIncre[8].innerHTML);

				x = countFrame * num;

				y = canvasHeight - ((stockData[countFrame].current - Number(priceIncre[8].innerHTML)) * canvasHeight) / countHtmlPoor;

			var Curves = {
				startX: stsrtX,    				//开始点的坐标（startX， startY）
				startY: startY,   				
				targetX: x,        				//目标点的坐标 （targetX， targetY）
				targetY: y,        				
				canvasid: "canvas",				//canvas ID
				color: "rgb(0, 170, 255)",		//线的颜色
  				fillRect: false,				//是否填充
				fillColor: "rgb(0, 170, 255)"	//填充的颜色
			};

			draw(Curves);
			arr.push({x: x, y: y});
			
			if(countFrame >= stockData.length - 1){
				var canvas = document.getElementById("canvas"),
				cxt = canvas.getContext('2d');

				clearInterval(timer);
				
				curveFitting(arr, canvasHeight, countHtmlPoor, spanPrice0, "http://img1.money.126.net/data/hs/time/today/0000001.json", 1);
			
			}
			else{

				countFrame++;

				/*
					鼠标移入到曲线上
				*/
				$("#inside").css({
					"width": x + 3,
					"height": $("canvas").height() + 112,
					"left": $("#y-line li").width()
				});
			}


			stsrtX = x;
			startY = y;
			
		}
	}, time);

	var oCanvas = document.getElementById('canvas');
	var strDataURI = oCanvas.toDataURL("image/jpeg");
	var bg = 'red';

	//插入成交量
	//
	var $volume = $(".volume");
	var $div = $('<div class="volume-div"></div>');
	for(var i = 0; i < stockData.length; i ++) {

		if(i % 2 == 0) {
			bg = 'green';
		} else {
			bg = 'red';
		}
		$volume.append($('<div class="volume-div" style="left: '+ 2*i +'px; height: '+ (70 * stockData[i].volume) /volumeMax +'px; background:'+ bg +';"></div>'));
	}
	
}

function curveFitting(data, canvasHeight, countHtmlPoor, spanPrice0, url, count) {
		

	$.ajax({
        url: ipAddress + '/Stock/index.php?m=Home&c=Index&a=minData&&url=' + url + '&&count=' + count,
        success: function(res) {
  			var res = $.parseJSON(res);
  			// 最小二乘法拟合
			//console.log(data);
			var canvas = $('#canvas')[0];
			var ctx2d = canvas.getContext('2d');
			ctx2d.lineWidth = 1;
			
			var startXres = data[0].x;
			var startYres = canvasHeight - ((res[0] - spanPrice8) * canvasHeight) / countHtmlPoor;
			var i = 0;

			var timer = setInterval(function() {
				
				    ctx2d.beginPath();
				    ctx2d.strokeStyle = '#ff7500';
				    ctx2d.beginPath();
				    ctx2d.moveTo(startXres, startYres);
				    ctx2d.lineTo(data[i].x, canvasHeight - ((res[i] - spanPrice8) * canvasHeight) / countHtmlPoor);
				    ctx2d.stroke();
				    ctx2d.closePath();
				    startXres = data[i].x;
				    startYres = canvasHeight - ((res[i] - spanPrice8) * canvasHeight) / countHtmlPoor;
				    if(i < res.length -1) {
				    	i++;
				    } else {
				    	clearInterval(timer);
				    
				    }
		  			
			}, 10);

			//console.log(arr);
        }
    });
	
}