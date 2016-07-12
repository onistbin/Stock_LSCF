<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE HTML>
<html>
<head>
	<meta charset="UTF-8">
	<title>大盘走势图</title>
	<link rel="stylesheet" type="text/css" href="Public/static/css/app/style.css" />
	<link rel="stylesheet" type="text/css" href="Public/static/css/app/danmu.css" />
	<link rel="stylesheet" type="text/css" href="Public/static/css/app/normalize.css" />
	<link rel="stylesheet" type="text/css" href="Public/static/css/app/component.css" />
</head>
<body>
<div id="main">

	<div id="header">
		<div class="title f-l">上证指数（000001）</div>
		<ul class="f-l">
			<li>今开: 	<span>3529.81	</span></li>
			<li>最高: 	<span>3543.95	</span></li>
			<li>成交量: 	<span>208.30亿 	</span></li>
			<li>昨收: 	<span>3524.99	</span></li>
			<li>最低: 	<span>3506.63	</span></li>
			<li>成交额: 	<span>2805.62亿 	</span></li>
		</ul>
		<p class="f-r"></p>
	</div>
	


	<div class="con">

		<!-- tab切换 -->
		<div id="tab-btn">
			<ul>
				<li class="tab-btn-item">分时</li>
				<li>日K</li>
				<li>周K</li>
				<li>月K</li>
			</ul>
		</div>


		<!-- today content -->
		<div id="container">

			<!-- 股票价格纵坐标 -->
			<ul id="y-line">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>

			<div id="inside">
				<div id="yesterday"></div>
			</div>
			
			<div id="canvas-con">
				<canvas id = "canvas" width = "482" height = "398">
				</canvas>
				<canvas id = "canvas-grid" width = "484" height = "400"></canvas>
			</div>

			<ul id="x-line">
				<li>09:30</li>
				<li>10:30</li>
				<li>11:30/13:00</li>
				<li>14:00</li>
				<li>14:30</li>
				<li>15:00</li>
			</ul>

			<div id="line"></div>

			<div id="xyshow">
				<p>成交量：<span></span></p>
				<p>涨跌幅：<span></span></p>
				<p>当前价：<span></span></p>
				<p>时间：<span></span></p>
			</div>
		</div>

		<!-- 弹幕 -->
		<div id="play">
		    <div id="danmu"></div>
		    <div id="danmu-btn">
		    	<span class="input input--hoshi">
					<input class="input__field input__field--hoshi" type="text" id="text" />

					<label class="input__label input__label--hoshi input__label--hoshi-color-1" for="text">
						<span class="input__label-content input__label-content--hoshi">		快来发送弹幕吧！	</span>
					</label>
				</span>
				<p class="f-r btn">
					<button id="btn">吐槽</button>
				</p>
		    </div>
		</div>
	</div>
</div>
</body>
<script type="text/javascript" src="Public/static/js/global/jquery.js"></script>
<script type="text/javascript" src="Public/static/js/common/data.js"></script>
<script type="text/javascript" src="Public/static/js/common/draw.js"></script>
<script type="text/javascript" src="Public/static/js/common/drawGrid.js"></script>
<script type="text/javascript" src="Public/static/js/common/drawGraph.js"></script>
<script type="text/javascript" src="Public/static/js/common/mouseMove.js"></script>
<script type="text/javascript" src="Public/static/js/app/index.js"></script>
<script type="text/javascript" src="Public/static/js/app/danmu.js"></script>
</html>