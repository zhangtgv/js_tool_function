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

/*
用于清空一个对象
@param Object obj 需要被清空的对象
@return N/A 无返回值
*/
function clearObject(obj){
	for(var i in obj){
		delete obj[i];
	}
}

/*
用于检测一个对象是否为空对象
@param Object obj 需要被检测的对象
@return N/A 无返回值
*/
function isObjectEmpty(obj){
	for(var i in obj){
		return false;
	}
	return true;
}

/*
用于返回一个对象的长度
@param Object obj 需要被检测的对象
@return int 被检测对象的长度
*/
function getObjectLength(obj){
	var sum = 0;
	for(var i in obj){
		sum++;
	}
	return sum;
}

/*
用于设置cookie
@param string name 要设置的cookie的key
@param string value 要设置的cookie的value
@param string expiredays 要设置的cookie的过期时间
@return N/A 无返回值
*/
function setCookie(name,value,expiredays){
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
};

/*
用于获取cookie某一项的值
@param string c_name 要获取的cookie的key
@return string 获取到的值 如果不存在则返回空
*/
function getCookie(c_name){
	if (document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1){
			c_start=c_start + c_name.length+1
			c_end=document.cookie.indexOf(";",c_start)
			if (c_end==-1){
				c_end=document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
};

/*
用于获取对象的第一个键值对
@param Object obj 目标对象
@return Object 目标对象的第一个键值对
@example {
	key:'alpha'
	value:'bravo'
}
*/
function getObjectFirstElement(obj){
	for(var i in obj){
		return {
			key:i,
			value:obj[i]
		}
	}
	return false;
}

//空函数
function empty_func(){}

/*
用于返回某一个字符串最后一次出现在另一个字符串中的位置
@param string str 目标字符串
@param string word 需要匹配的关键字
@return int/bool 如果没有找到的话则返回false 找到就返回位置
*/
function find_last_index(str, word){
	var str_array = str.split(word);
	
	if(!str){
		return false;
	}
	
	var str_array_length = str_array.length;
	if(str_array_length == 1){
		return false;
	}
	
	var sum = 0;
	
	for(var i=0; i<str_array_length-1; i++){
		sum += str_array[i].length+1
	}
	
	return sum-1;
}


/*
用于在新标签中打开网页
@param string url 需要打开的目标页面的地址
@param bool not_new_tag 是否要使用新页面打开
@return N/A 无返回值
*/
function open_at_new_tag(url, not_new_tag){
	var a = $('<a>').attr('href', url).attr('target', not_new_tag?'_self':'_blank').appendTo($(document.body))
	.click(function(){
		$(this).remove();
	})
	
	var span = $('<span>').appendTo(a).click()
}


/*
用于将日期和时间转换成距离当前时间
@param int now_time 当前的时间一般为new Date().getTime()
@param string date_string 需要被对照的时间字符串
@return string 距离当前时间的字符串
*/
function date_transform(now_time, date_string){
	var date_obj = new Date(date_string.replace(/-/g,'/'));
	
	var date = date_obj.getDate();
	var month = date_obj.getMonth()+1;
	var year = date_obj.getFullYear();
	
	var time = date_obj.getTime();
	
	var time_diff = now_time - time;
	
	var return_str = '';
	
	if(time_diff < 3600000){
		var val = Math.round(time_diff/1000/60);
		if(val <= 1){
			return_str = val + ' min ago';
		}else{
			return_str = val + ' mins ago';
		}
	}else if(time_diff >= 3600000 && time_diff < 3600000*24){
		var val = Math.round(time_diff/3600000);
		if(val <= 1){
			return_str = val + ' hour ago';
		}else{
			return_str = val + ' hours ago';
		}
	}else if(time_diff >= 3600000*24 && time_diff < 3600000*24*7){
		var val = Math.round(time_diff/3600000/24);
		if(val <= 1){
			return_str = val + ' day ago';
		}else{
			return_str = val + ' days ago';
		}
	}else{
		return_str = [date, transform_date_suffix(date), ',', mapping_month(month), ',', year].join('');
	}
	
	return return_str;
	
	function transform_date_suffix(date){
		date = +date;
		if(date === 1){
			return 'st';
		}else if(date === 2){
			return 'nd';
		}else if(date === 3){
			return 'rd';
		}else{
			return 'th';
		}
	}
	
	function mapping_month(month){
		month = +month;
		
		switch(month){
			case 1:
				return 'Jan';
			case 2:
				return 'Feb';
			case 3:
				return 'Mar';
			case 4:
				return 'Apr';
			case 5:
				return 'May';
			case 6:
				return 'Jun';
			case 7:
				return 'Jul';
			case 8:
				return 'Aug';
			case 9:
				return 'Sep';
			case 10:
				return 'Oct';
			case 11:
				return 'Nov';
			case 12:
				return 'Dec';
		}
	}
}


//将外部的文字复制到网页中
//过滤掉所有的标签 并且把回车换成<br>
.bind('paste', function(e){
	e.preventDefault();
	var ua = navigator.userAgent;
	
	var copy_content = '';
	if(ua.indexOf('Trident')>-1 || ua.indexOf('MSIE')>-1){
		copy_content = window.clipboardData.getData('text');
	}else{
		copy_content = e.originalEvent.clipboardData.getData('Text');
	}
	copy_content = copy_content.replace(/<[^>]*>/g, '')
	copy_content = copy_content.replace(/(\r\n|\r|\n)/g, '<br>');
	
	
	var range = sel.getRangeAt(0);  
	range.deleteContents();
	sel.removeAllRanges();
	
	var frag = editor_document.createDocumentFragment();
	var content_span = editor_document.createElement('span');
	content_span.innerHTML = copy_content;
	frag.appendChild(content_span);
	
	range.insertNode(frag);
	sel.addRange(range);
})