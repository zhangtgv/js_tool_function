<?php
	$uploaded_file_dir = '../files/';
	$filename = $_POST['uploadName'];
	$content = file_get_contents($_FILES["fileFragment"]["tmp_name"]);
	//print_r($content);
	//exit;
	file_put_contents(transToGBK($uploaded_file_dir.$filename), $content, FILE_APPEND);
	echo 'ok';
	
	function transToGBK($data){
		return iconv("UTF-8", "GB2312//IGNORE", $data);
	}
?>