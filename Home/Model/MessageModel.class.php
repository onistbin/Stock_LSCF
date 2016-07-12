<?php

	namespace Home\Model;
	use Think\Model;
	class MessageModel extends Model{
		
		public function getMessage($startId) {

			//message为数据库中的表名

	    	//$message = new Model('message');
	    	//方法等价于下边的M;
	    	$currentTime = date('Y-m-d H:i:s');
	  		$message = M('Barrage_msg');
		    $condition['messageId'] = array(array('gt', $startId), array('lt', $startId + 3));
		    $arr = $message -> where($condition) -> select();
		    
	    	return $arr;
		}
		public function postMessage() {

			
			$ip = get_client_ip();

			$message = M('Barrage_msg');

			$post_message = $_POST['messageCon'];
			

			$data['messageCon'] = "$post_message";
			$data['userIp'] = "$ip";
			$message -> add($data);
		}
	} 

