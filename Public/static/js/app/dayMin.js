(function() {
var minArrDay = [];
var maxArrDay = [];
var flagFirst1 = true;
var flagFirst2 = true;
var urlDay = 'http://img1.money.126.net/data/hs/kline/day/history/2016/0000001.json';
var urlWeek = 'http://img1.money.126.net/data/hs/kline/week/history/2015/0000001.json';
$(".tab-btn-item").click(function() {

		var index = $(this).index();
		$(".content").hide().eq(index).show();
		if(index == 1 && flagFirst1) {

			drawGrid('canvas-grid-day');
			
				curveFittingDay('canvas_day', 'red', urlDay, 1, 843, 2719.9168276156, 6);		
				curveFittingDay('canvas_day', 'green', urlDay, 2, 843, 2719.9168276156, 6);
			
				curveFittingDay('canvas_day', '#ff7500', urlDay, 3, 843, 2719.9168276156, 6);
			
				curveFittingDay('canvas_day', 'rgb(0, 170, 255)', urlDay, 4, 843, 2719.9168276156, 6);	

			flagFirst1 = false;
		}
		

		if(index == 2 && flagFirst2) {

			drawGrid('canvas-grid-week');
			
				curveFittingDay('canvas_week', 'red', urlWeek, 1, 1948, 2980.398241399, 10);		
				curveFittingDay('canvas_week', 'green', urlWeek, 2, 1948, 2980.398241399, 10);
			
				curveFittingDay('canvas_week', '#ff7500', urlWeek, 3, 1948, 2980.398241399, 10);
			
				curveFittingDay('canvas_week', 'rgb(0, 170, 255)', urlWeek, 4, 1948, 2980.398241399, 10);
			flagFirst2 = false;
		}
	});

	
	function curveFittingDay(can, color, url, count, countHtmlPoor, spanPrice8, n) {
		

		$.ajax({
	        url: ipAddress + '/Stock/index.php?m=Home&c=Index&a=minData&&url=' + url + '&&count=' + count,
	        success: function(res) {
	  			var res = $.parseJSON(res);
	  			var dataArr = arr;
	  			// for(var i = 0 ; i < arr.length; i ++) {
	  			// 	dataArr[i] *= 3;
	  			// }
	  			// console.log(arr);
	  			// 最小二乘法拟合
				minArrDay.push(Math.min.apply(Math, res));
				maxArrDay.push(Math.max.apply(Math, res));
				
				var canvas_day = document.getElementById(can);
				var ctx2d = canvas_day.getContext('2d');
			
				ctx2d.lineWidth = 1;
				
				var startXres = 0;
				// var countHtmlPoor = countHtmlPoor;  //最大最小值差
				var canvasHeight = 400;
					// spanPrice8 = spanPrice8;  //数据最小值


				console.log(Math.min.apply(Math, minArrDay), Math.max.apply(Math, maxArrDay));
				var startYres = canvasHeight - ((res[0] - spanPrice8) * canvasHeight) / countHtmlPoor;
				

				var i = 0;

				var timer = setInterval(function() {
				
				    ctx2d.beginPath();
				    ctx2d.strokeStyle = color;
				    ctx2d.beginPath();
				    ctx2d.moveTo(startXres, startYres);
				    ctx2d.lineTo(i * n, canvasHeight - ((res[i] - spanPrice8) * canvasHeight) / countHtmlPoor);
				    ctx2d.stroke();
				    ctx2d.closePath();
				    startXres = i * n;
				    startYres = canvasHeight - ((res[i] - spanPrice8) * canvasHeight) / countHtmlPoor;
				    if(i < res.length -1) {
				    	i++;
				    } else {
				    	clearInterval(timer);
				    
				    }
		  			
				}, 10);
	        }
	    });
	
	}	
})();
	