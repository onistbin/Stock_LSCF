<?php
	namespace Home\Controller;
	use Think\Controller;

	class IndexController extends Controller  {


	    public function index(){

	    	$this -> display();
	    }


	    //消息处理接口
	    function getMessage($startId) {

	    	$arr = D('Message') -> getMessage($startId);
	    	
	    	echo json_encode($arr);	
	    }

	    //插入新提交弹幕消息数据接口
	    public function postMessage() {
	  
			D('Message') -> postMessage();

			echo "写入成功";
		}	

	    //最小二乘法曲线拟合
	    public function minData($url, $count) {

	    	$json = file_get_contents($url);
	    	
	    	$obj = json_decode($json);
	  
			$order = 20;

			//x,y 全部数据
			$x = array();
			$y = array();
			$objLen = count($obj -> {'data'});
			for($i = 0; $i < $objLen; $i++){
				$x[] = $i;	
				$y[] = $obj -> {'data'}[$i][$count];
				
			}

			#xa,ya 部分数据
			$xa = array_slice($x, 0, $objLen);
			$ya = array_slice($y, 0, $objLen);


			#进行曲线拟合
			$matA = array();
			for($i = 0; $i < $order + 1; $i ++){ 
				$matA1 = array();
				for($j = 0;$j < $order + 1; $j ++){
					$tx = 0.0;
					for($k = 0; $k < count($xa); $k ++){
						$dx = 1.0;
						for($l = 0; $l < $j + $i; $l++){
							$dx = $dx * $xa[$k];
						}
						$tx += $dx;
				    }
					$matA1[] = $tx;
				}
				$matA[] = $matA1;
			}

			#print(len(xa))
			$matB = array();

			for ($i = 0; $i < $order + 1; $i++){
				$ty = 0.0;
				for($k = 0; $k < count($xa); $k++){
					$dy = 1.0;
					for($l = 0;$l < $i; $l++){
						$dy = $dy * $xa[$k];
					}
					$ty += $ya[$k] * $dy;
				}
				$matB[] = $ty;
			}

			#求解matA*matAA=matB的matAA
			#初始化 L and U 矩阵
			$matL = array();
			for($i = 0; $i < $order + 1; $i ++){ 
				$matL1 = array();
				for($j = 0;$j < $order+1; $j ++){
					
					if($i == $j){
						$matL1[] = 1.0;
					} else {
						$matL1[] = 0.0;
					}
				}
				$matL[] = $matL1;
			}

			$matU = array();
			$matU1 = array();
			for($i = 0; $i < $order+1; $i++){
				$matU1[] = (float)$matA[0][$i];
			}

			$matU[] = $matU1;
			for($i = 1; $i < $order+1; $i++){ 
				$matU1 = array();
				for($j = 0;$j < $order+1; $j++){
					$matU1[]=0.0;
					
				}
				$matU[] = $matU1;
			}
			#计算L 和 U 矩阵
			for($i=0; $i<$order; $i++){
				for($j=$i+1; $j<$order+1; $j++){
					for($k=0,$sum=0; $k<$order+1; $k++) {
						if($k != $i) {
							$sum += $matL[$j][$k]*$matU[$k][$i];
						}
					}
					$matL[$j][$i] = ($matA[$j][$i]-$sum)/$matU[$i][$i];
				}

				for($j=$i+1; $j<$order+1; $j++) {
					for($k=0,$sum=0; $k<$order+1; $k++) {
						if($k != $i+1) {
							$sum += $matL[$i+1][$k]*$matU[$k][$j];
						}
					}
					$matU[$i+1][$j] = ($matA[$i+1][$j]-$sum);
				}
			}
			#LU分解法回代过程，并求出方程组的解
			#print(var_dump($matB));
			//计算Ly=b中的y
			$Ly = array();
			for($i=0;$i<$order+1;$i++) {
				$Ly[]=$matB[$i];
			    for($j=0;$j<=$i-1;$j++){
					$Ly[$i]-=($matL[$i][$j]*$Ly[$j]);
				}
			    $Ly[$i]/=$matL[$i][$i];
			}

			$matAA=$matB;
			//计算Ux=y中的x
			for($i=$order;$i>=0;$i--) {
				$matAA[$i]=$Ly[$i];
				for($j=$i+1;$j<$order+1;$j++)
					$matAA[$i]-=($matU[$i][$j]*$matAA[$j]);
					$matAA[$i]/=$matU[$i][$i];
			}

			//print(var_dump($matAA));

			$xxa = $xa;
			$yya = array();
			#print(var_dump($xxa));
			for($i = 0; $i < count($xxa);$i++){
				$yy=0.0;
				for($j = 0; $j < $order+1;$j++){
					$dy=1.0;
					for($k=0;$k < $j;$k++){
						$dy*=$xxa[$i];
					}
					
					$dy*=$matAA[$j];
					$yy+=$dy;
				}
				$yya[]=$yy;
			}

			echo json_encode($yya);
	    }


	}
