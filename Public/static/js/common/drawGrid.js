
/*
	画昨日收盘基准线
*/

function yestCloBaseLine(){

	var baselineCountY = 0,
		baselineX = 0,
		flag = false;

	var timerBase = setInterval(function(){

		var option = {
			startX: 0,
			startY: $("#canvas").height() / 2,
			targetX: baselineX += 15,
			targetY: $("#canvas").height() / 2,
			canvasid: 'canvas',
			color: 'red',
			save: true
		};


		if( baselineX > $("#canvas").width()){

			clearInterval(timerBase);
			flag = true;
			return flag;
		}
		
		draw(option);

	}, 10);

}


/*
	绘制网格
*/
function drawGrid(obj) {


	var canvasLine = document.getElementById(obj),
		canvasLineWidth = canvasLine.offsetWidth,
		canvasLineHeight = canvasLine.offsetHeight,
		gridHeight = $(canvasLine).height() / 8,    //网格高度
		gridWidth = 61,		//网格宽度
		p = 0;

	/*
		画网格横线
	*/

	for( var i = 0, len = canvasLineHeight / gridHeight; i <= len; i++){

		p = canvasLineHeight - i * gridHeight;

		var Hline = {
			startX: 0,
			startY: p,
			targetX: canvasLineWidth,
			targetY: p,
			canvasid: obj,
			color: '#6a7989'
		};
		
		draw(Hline);
	}

	/*
		画网格竖线
	*/

	for( var i = 0, len = canvasLineWidth / gridWidth; i <= len; i++){

		p =  i * gridWidth;

		var Sline = {
			startX: p,
			startY: 0,
			targetX: p,
			targetY: canvasLineHeight,
			canvasid: obj,
			color: '#6a7989'
		};
		
		draw(Sline);
	}
}
