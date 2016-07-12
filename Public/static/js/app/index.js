
var ipAddress = 'http://10.18.61.164',
	url = {
		todayUrl: 	'http://img1.money.126.net/data/hs/time/today/0000001.json',
		dayUrl: 	'http://img1.money.126.net/data/hs/kline/day/history/2016/0000001.json', 
		weekUrl: 	'http://img1.money.126.net/data/hs/kline/week/history/2015/0000001.json', 
		monthUrl: 	'http://img1.money.126.net/data/hs/kline/month/history/'+ 2014 +'/0000001.json'
	};

(function() {

    function browserRedirect() {

        var sUserAgent = navigator.userAgent.toLowerCase();
            bIsIpad = sUserAgent.match(/ipad/i) == "ipad",
            bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os",
            bIsMidp = sUserAgent.match(/midp/i) == "midp",
            bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
            bIsUc = sUserAgent.match(/ucweb/i) == "ucweb",
            bIsAndroid = sUserAgent.match(/android/i) == "android",
            bIsCE = sUserAgent.match(/windows ce/i) == "windows ce",
            bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
 

        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {

            $("#header").css("marginTop", "100px");
        	$(".con").css({
        		"marginTop": "80px",
        		"padding": "50px 0 50px 0px"
        	});
        	$("#play").css("top", "355px");
        	$("#danmu-btn").css("top", "130px");

        } 
        else {

        	
            //alert("pc");
        }
    }

    browserRedirect();

}());

$(document).ready(function(){

	//分时部分
	~(function($) {
		
		/*画网格*/

	    drawGrid('canvas-grid');


	    /*画昨日收盘基准线*/

	   	yestCloBaseLine();



		/*drawGraph()描点画曲线*/

		handleData(url.todayUrl, drawGraph);

		/*轮询请求*/
		
		setTimeout(function() {
			handleData(url.todayUrl, pollRequest);
			
		}, 0);

	})(jQuery);
		

	/*绑定事件*/
   	(function(){

		/*设置横纵坐标*/
		setXy();


		/*获取系统时间*/

		(function() {
			setInterval(function() {

				var date = new Date(),
					getYear = date.getFullYear(),
					getMonth = date.getMonth() + 1,
					getDate = date.getDate(),
					getHours = date.getHours(),
					getMinutes = date.getMinutes(),
					getSeconds = date.getSeconds();

					$("#header p").text(getYear + '/' + getMonth + '/' + getDate + '   ' + getHours + ':' + getMinutes + ':' + getSeconds);
			}, 1000);
		}());
   }());

});





/*设置横纵坐标*/

function setXy(){

	$("#x-line").css({
		"left": $("#y-line").width() - 20,
		"top": $("#canvas-grid").height() + 20
	});

	$("#y-line li").css({
		"height": $("#canvas-grid").height() / 8,
		"line-height": 0
	});

}




var lastVolume = 0;
function getShow(data){
	var stockData = renderDataArr.dataFormats;

	/*鼠标移入跟随显示信息*/
	var dataLen = stockData.length;

	lastVolume = stockData[dataLen - 1].volume;

	var moveTgt = new Move('container', 'xyshow', 'line');

		moveTgt.fnMove();
		moveTgt.fnRemove();
   


    var	xyShow = document.getElementById('xyshow'),
		showSpan = xyShow.getElementsByTagName('span');

    var yestClosePrice = data.yestclose;

    var priceChangeRatio = 0;
    var priceAverage = 0;

    // 根据鼠标当前的位置判断是显示哪条数据,像素一一对应的关系
    var index = parseInt(($("#line").offset().left - $("#canvas").offset().left) / 2);

    try{
   
		priceAverage = index > 3 ? (stockData[index - 1].current + stockData[index - 2].current + stockData[index - 3].current) / 3 : stockData[index].current;
	
		//这里为了使涨跌幅更准确，取了当前三个点的平均价格作为计算涨跌幅的当前价
		//计算涨跌幅  涨跌幅 = ((当前价-昨日闭盘价/昨日闭盘价)x100%
		priceChangeRatio = (((priceAverage - yestClosePrice) / yestClosePrice) * 100).toFixed(2);

		$(".show-volume")[0].innerHTML = showSpan[0].innerHTML = stockData[index].volume;   //成交量
		$(".show-volume").css("line-height", '70px');
		showSpan[1].innerHTML = priceChangeRatio + "%" ;   //涨跌幅
		showSpan[2].innerHTML = stockData[index].current;  //当前价
		showSpan[3].innerHTML = stockData[index].time.substring(0, 2) + ':' + stockData[index].time.substring(2);       //时间

    }catch(err){

    	console.log("");
   	}
     	
}



function getShow2(data){
	
	var moveTgt = new Move('container2', 'xyshow2', 'line2');

		moveTgt.fnMove();
		moveTgt.fnRemove();
   


    var	xyShow = document.getElementById('xyshow2'),
		showSpan = xyShow.getElementsByTagName('span');

    

    // 根据鼠标当前的位置判断是显示哪条数据,像素一一对应的关系
    var index = parseInt(($("#line2").offset().left - $("#canvas_day").offset().left) / 6);

    try{
    	showSpan[0].innerHTML = data[index][0];
		showSpan[1].innerHTML = data[index][1];
		showSpan[2].innerHTML = data[index][2];
		showSpan[3].innerHTML = data[index][3];
		showSpan[4].innerHTML = data[index][4];
		showSpan[5].innerHTML = data[index][5];
		showSpan[6].innerHTML = data[index][6];
		

    }catch(err){

    	console.log("");
   	}
     	
}


function getShow3(data){
	
	var moveTgt = new Move('container3', 'xyshow3', 'line3');

		moveTgt.fnMove();
		moveTgt.fnRemove();
   


    var	xyShow = document.getElementById('xyshow3'),
		showSpan = xyShow.getElementsByTagName('span');

    

    // 根据鼠标当前的位置判断是显示哪条数据,像素一一对应的关系
    var index = parseInt(($("#line3").offset().left - $("#canvas_week").offset().left) / 6);

    try{
    	showSpan[0].innerHTML = data[index][0];
		showSpan[1].innerHTML = data[index][1];
		showSpan[2].innerHTML = data[index][2];
		showSpan[3].innerHTML = data[index][3];
		showSpan[4].innerHTML = data[index][4];
		showSpan[5].innerHTML = data[index][5];
		showSpan[6].innerHTML = data[index][6];
		

    }catch(err){

    	console.log("");
   	}
     	
}



/*
	配置显示的横纵坐标大小,canvas容器的大小
*/

function configXy(){

	$("#canvas-con").css({
		"width": $("#canvas-grid").width(),
		"height": $("#canvas-grid").height()
	});
}




/*
	显示隐藏显示信息
*/
function hideXyShow(){

	$("#line, #xyshow").hide();
	$("#line2, #xyshow2").hide();
	$("#line3, #xyshow3").hide();
}

function showXyShow(){

	$("#line").css({
		"height": $("#canvas").height() + 112
	}).show();

	$("#line2").css({
		"height": $("#canvas_day").height()
	}).show();
	$("#line3").css({
		"height": $("#canvas_week").height()
	}).show();
	$("#xyshow").show();
	$("#xyshow2").show();
	$("#xyshow3").show();
}