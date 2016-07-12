/*
*	draw(画线方法)
*	var option = {
*		startX: stsrtX,    				//开始点的坐标（startX， startY）
*		startY: startY,   				
*		targetX: x,        				//目标点的坐标 （targetX， targetY）
*		targetY: y,        				
*		canvasid: "canvas",				//canvas ID
*		color: "rgb(0, 170, 255)",		//线的颜色
*		fillRect: false,				//是否填充
*		fillColor: "rgb(0, 170, 255)"	//填充的颜色
*	};
*/
function draw(option){

	var canvasObj = document.getElementById(option.canvasid),
		cxt = canvasObj.getContext('2d'),
		canvasHeight = $(canvasObj).height();

	cxt.beginPath();

		cxt.moveTo(option.startX, option.startY);
		cxt.lineTo(option.targetX, option.targetY);

		cxt.strokeStyle = option.color || '#6a7989';
		cxt.lineWidth = option.lineWidth || 1;

		cxt.stroke();

		if(option.save){

			cxt.save();
		}
		if( option.fillRect ){

			cxt.fillStyle = option.fillColor;
			cxt.fillRect(option.startX, option.startY, 1, canvasHeight - option.startY);
		}
		
	cxt.closePath();
}
