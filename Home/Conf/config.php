<?php
	return array(
		//'配置项'=>'配置值'
		
		'URL_MODEL' => 2,

		//修改左右定界符
		'TMPL_L_DELIM' => '{%',
		'TMPL_R_DELIM' => '%}',

		//配置数据库,使用DSN配置较简洁
		'DB_TYPE' => 'mysql',
		'DB_HOST' => 'localhost',
		'DB_NAME' => 'stockMessage',   //thinkphp为相关的数据库名
		'DB_USER' => 'root',
		'DB_PWD' => 'twzxy123',
		'DB_PORT' => '3306',
		//'DB_PREFIX' => 'tp_',

		//等价方法，两者都有的话DSN方式优先生效
		//'DB_DSN' => 'mysql://root:@localhost:3306/thinkphp' 
		'SHOW_PAGE_TRACE' => true
	);
?>