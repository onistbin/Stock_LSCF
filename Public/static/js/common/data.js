var flag = true;
var renderDataArr = null;
/*
	请求成功回调
*/
function handleData(url, callback) {

	//第一次请求数据，后边轮询请求又设置为true;
	if(flag) {
		$.ajax({
	        url: url,
	        dataType: "jsonp",
	        jsonp: "callback",
	        success: function(res) {
	  			
	  			flag = false;
	  			var data = dataFormats(res);

	        	if(callback){
	        		renderDataArr = data;
	        		//console.log(renderDataArr);
	        		callback(data);
	        	}
	        }
	    });
	} else {
		callback(renderDataArr)
	}
}




/*
	数据格式化
*/
function dataFormats(res){

	var dataFormats = [];

	for( var i = 0; i < res.data.length; i++){
		dataFormats[i] = {
			time: res.data[i][0].toString(),     //时间
			volume: Number(res.data[i][3]),   //成交量
			current: Number(res.data[i][1]),  //当前价
		};
	}

	return {

		dataFormats: dataFormats,
		yestclose: Number(res.yestclose).toFixed(3),  //昨日闭市价格
		dataLenMax: 242,   //数据条数
		lastVolume: res.lastVolume   //最后成交量
	}
}


/*
	轮询请求
*/

function pollRequest(data){

	var stockData = data.dataFormats,
		dataLen = stockData.length,
		canvas = document.getElementById("canvas"),
		cxt = canvas.getContext('2d');

	var reloadTimer = setInterval(function(){


		// 判断如果数据条数没达到最后条数就轮询，否则不轮询，也就是9:30-15:00期间轮询请求
		if(dataLen > 0 && dataLen < data.dataLenMax){
	
			flag = true;
			cxt.clearRect(0, 0, $(canvas).width(), $(canvas).height());

			handleData(url.todayUrl, drawGraph);
			yestCloBaseLine();
		}
	
	}, 60000);
	
}


/*
	得到两个数中绝对值较大的
*/

function getAbsMax(a, b){

	var maxabs  = Math.abs(a) > Math.abs(b) ? Math.abs(a) : Math.abs(b);

	return maxabs;
}



/*
	得到数据中的最大值和最小值
*/

function getMinMax(data){

	var dataArr = [];
		volumeArr = [];
		
	for( var i = 0; i < data.length; i ++){

		dataArr[i] = data[i].current;
		volumeArr[i] = data[i].volume;
	}

	var min = Math.min.apply(Math, dataArr);      //价格最小值
	var max = Math.max.apply(Math, dataArr);      //价格最大值
	var minVolume = Math.min.apply(Math, volumeArr);      //价格最小值
	var maxVolume = Math.max.apply(Math, volumeArr);      //价格最大值

	return{
		max: max,
		min: min,
		minVolume: minVolume,
		maxVolume: maxVolume
	}
}