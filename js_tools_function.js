/*
用于返回格式化的剩余时间字符串
@param int seconds 还剩余多少秒
@param bool is_add_zero 当值(时分秒)小于10的时候是否在前面补上0
@return string 格式化后的字符串
@example 2小时3分钟40秒
*/
function convert_left_time(seconds, is_add_zero){
	var time_left_str = '';
	var day = Math.floor(seconds / (60*60*24));
	var hour = Math.floor(seconds % (60*60*24) / (60*60));
	var minute = Math.floor(seconds % (60*60) / 60);
	var second = Math.floor(seconds % 60);
	
	if(day > 0){
		time_left_str += '超过一天';
		return time_left_str
	}
	
	if(hour > 0){
		if(is_add_zero && hour<10){
			time_left_str += '0' + hour;
		}else{
			time_left_str += hour;
		}
		
		time_left_str += '小时';
	}
	
	if(minute > 0){
		if(is_add_zero && minute<10){
			time_left_str += '0' + minute;
		}else{
			time_left_str += minute;
		}
		
		time_left_str += '分钟';
	}
	
	if(second> 0){
		if(is_add_zero && second<10){
			time_left_str += '0' + second;
		}else{
			time_left_str += second;
		}
		
		time_left_str += '秒';
	}
	
	return time_left_str;
}


 /*
用于返回文件和文件后缀
@param string filename 需要被处理的文件名字符串
@return object 文件信息对象
@example {
	name:'bravo',
	ext:'jpg'
}
*/
function deal_filename(filename){
	var filename_array = filename.split('.');
	var filename_array_length = filename_array.length;
	var name = '';
	var ext = '';
	if(filename_array_length == 0){
		;
	}else if(filename_array_length == 1){
		name = filename_array[0];
	}else{
		ext = filename_array.pop();
		name = filename_array.join('.');
	}
	
	return {
		name:name,
		ext:ext
	}
}


/*
用于返回格式化的文件尺寸
@param int size 文件尺寸 单位KB
@param bool not_add_B 是否要在单位后面使用B
@return string 被格式化后的尺寸字符串
@example 20M 32GB
*/
function convert_size(size, not_add_B){
	//这里的size是用KB为单位的
	if(size < 1000){
		return (+size).toFixed(1)+'K' + (not_add_B ? '' : 'B');
	}else if(size >= 1000 && size<1024*1024){
		return (size/1024).toFixed(1)+'M' + (not_add_B ? '' : 'B');
	}else{
		return (size/1024/1024).toFixed(1)+'G' + (not_add_B ? '' : 'B');
	}
}