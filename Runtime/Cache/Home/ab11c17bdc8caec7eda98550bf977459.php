<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE HTML>
<html>
<head>
	<meta charset="UTF-8">
	<title>大盘走势图</title>
	<link rel="stylesheet" type="text/css" href="Public/static/css/app/style.css" />
	<link rel="stylesheet" type="text/css" href="Public/static/css/app/danmu.css" />
	<link rel="stylesheet" type="text/css" href="Public/static/css/app/normalize.css" />
	<link rel="stylesheet" type="text/css" href="front/dist/css/all.min.css" />
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
				<li class="tab-btn-item">日k</li>
				<li class="tab-btn-item">周k</li>
			</ul>
		</div>


		<!-- today content -->
		<div id="container" class="content">
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

			<div id="line" class="line"></div>

			<div id="xyshow">
				<p>成交量：<span></span></p>
				<p>涨跌幅：<span></span></p>
				<p>当前价：<span></span></p>
				<p>时间：<span></span></p>
			</div>

			<div class="show-volume"></div>
			<div class="volume">
			</div>
		</div>


		<!-- 日K -->
		<div id="container2" class="content">
			<div id="inside-day"></div>
			<canvas id = "canvas_day" width = "548" height = "400"></canvas>
			<canvas id = "canvas-grid-day" width = "550" height = "402"></canvas>

			<ul id="ul-day">
				<li>开盘价<p style="background: red;"></p></li>
				<li>收盘价<p style="background: green;"></p></li>
				<li>最高价<p style="background: #ff7500;"></p></li>
				<li>最低价<p style="background: rgb(0, 170, 255);"></p></li>

			</ul>
			<div id="line2" class="line"></div>

			<div id="xyshow2">
				<p>时&nbsp;&nbsp;&nbsp;&nbsp;间：<span></span></p>
				<p>开盘价：<span></span></p>
				<p>收盘价：<span></span></p>
				<p>最高价：<span></span></p>
				<p>最低价：<span></span></p>
				<p>成交量：<span></span></p>
				<p>振&nbsp;&nbsp;&nbsp;&nbsp;幅：<span></span></p>
			</div>

			<div class="show-volume"></div>
			<div class="volume">
			</div>
		</div>


		<!-- 周K -->
		<div id="container3" class="content">
			<div id="inside-week"></div>
			<canvas id = "canvas_week" width = "548" height = "400"></canvas>
			<canvas id = "canvas-grid-week" width = "550" height = "402"></canvas>

			<ul id="ul-week">
				<li>开盘价<p style="background: red;"></p></li>
				<li>收盘价<p style="background: green;"></p></li>
				<li>最高价<p style="background: #ff7500;"></p></li>
				<li>最低价<p style="background: rgb(0, 170, 255);"></p></li>

			</ul>
			<div id="line3" class="line"></div>

			<div id="xyshow3">
				<p>时&nbsp;&nbsp;&nbsp;&nbsp;间：<span></span></p>
				<p>开盘价：<span></span></p>
				<p>收盘价：<span></span></p>
				<p>最高价：<span></span></p>
				<p>最低价：<span></span></p>
				<p>成交量：<span></span></p>
				<p>振&nbsp;&nbsp;&nbsp;&nbsp;幅：<span></span></p>
			</div>

			<div class="show-volume"></div>
			<div class="volume">
			</div>
		</div>
	</div>
	<!-- 弹幕 -->
		<div id="play">
		    <div id="danmu"></div>
		    <div id="danmu-btn">
		    	<form action="" method="" class="f-l">

		    		<span id="on-off" class="f-l onbg">
		    			<div class="on-off-btn on"></div>
		    		</span>
			    	<span class="input input--hoshi">
						<input class="input__field input__field--hoshi" type="text" id="text" name="messageCon"/>
	 
						<label class="input__label input__label--hoshi input__label--hoshi-color-1" for="text">
							<span class="input__label-content input__label-content--hoshi">快来发送弹幕吧！</span>
						</label>
					</span>
					<p class="f-r btn">
						<input id="btn" type="button" value="吐槽" name="sub">
					</p>
				</form>
		    </div>
		</div>
</div>
</body>
<script type="text/javascript" src="Public/static/js/jquery.js"></script>
<script type="text/javascript" src="Public/static/js/common/curveFitting.js"></script>
<script type="text/javascript" src="Public/static/js/common/data.js"></script>
<script type="text/javascript" src="Public/static/js/common/draw.js"></script>
<script type="text/javascript" src="Public/static/js/common/drawGraph.js"></script>
<script type="text/javascript" src="Public/static/js/common/drawGrid.js"></script>
<script type="text/javascript" src="Public/static/js/common/mouseMove.js"></script>
<script type="text/javascript" src="Public/static/js/app/index.js"></script>
<script type="text/javascript" src="Public/static/js/app/danmu.js"></script>
<script type="text/javascript" src="Public/static/js/app/dayMin.js"></script>
<!-- <script type="text/javascript" src="front/dist/js/all.min.js"></script> -->
</html>