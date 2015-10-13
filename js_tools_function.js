/*
���ڷ��ظ�ʽ����ʣ��ʱ���ַ���
@param int seconds ��ʣ�������
@param bool is_add_zero ��ֵ(ʱ����)С��10��ʱ���Ƿ���ǰ�油��0
@return string ��ʽ������ַ���
@example 2Сʱ3����40��
*/
function convert_left_time(seconds, is_add_zero){
	var time_left_str = '';
	var day = Math.floor(seconds / (60*60*24));
	var hour = Math.floor(seconds % (60*60*24) / (60*60));
	var minute = Math.floor(seconds % (60*60) / 60);
	var second = Math.floor(seconds % 60);
	
	if(day > 0){
		time_left_str += '����һ��';
		return time_left_str
	}
	
	if(hour > 0){
		if(is_add_zero && hour<10){
			time_left_str += '0' + hour;
		}else{
			time_left_str += hour;
		}
		
		time_left_str += 'Сʱ';
	}
	
	if(minute > 0){
		if(is_add_zero && minute<10){
			time_left_str += '0' + minute;
		}else{
			time_left_str += minute;
		}
		
		time_left_str += '����';
	}
	
	if(second> 0){
		if(is_add_zero && second<10){
			time_left_str += '0' + second;
		}else{
			time_left_str += second;
		}
		
		time_left_str += '��';
	}
	
	return time_left_str;
}


 /*
���ڷ����ļ����ļ���׺
@param string filename ��Ҫ��������ļ����ַ���
@return object �ļ���Ϣ����
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
���ڷ��ظ�ʽ�����ļ��ߴ�
@param int size �ļ��ߴ� ��λKB
@param bool not_add_B �Ƿ�Ҫ�ڵ�λ����ʹ��B
@return string ����ʽ����ĳߴ��ַ���
@example 20M 32GB
*/
function convert_size(size, not_add_B){
	//�����size����KBΪ��λ��
	if(size < 1000){
		return (+size).toFixed(1)+'K' + (not_add_B ? '' : 'B');
	}else if(size >= 1000 && size<1024*1024){
		return (size/1024).toFixed(1)+'M' + (not_add_B ? '' : 'B');
	}else{
		return (size/1024/1024).toFixed(1)+'G' + (not_add_B ? '' : 'B');
	}
}

/*
�������һ������
@param Object obj ��Ҫ����յĶ���
@return N/A �޷���ֵ
*/
function clearObject(obj){
	for(var i in obj){
		delete obj[i];
	}
}

/*
���ڼ��һ�������Ƿ�Ϊ�ն���
@param Object obj ��Ҫ�����Ķ���
@return N/A �޷���ֵ
*/
function isObjectEmpty(obj){
	for(var i in obj){
		return false;
	}
	return true;
}

/*
���ڷ���һ������ĳ���
@param Object obj ��Ҫ�����Ķ���
@return int ��������ĳ���
*/
function getObjectLength(obj){
	var sum = 0;
	for(var i in obj){
		sum++;
	}
	return sum;
}

/*
��������cookie
@param string name Ҫ���õ�cookie��key
@param string value Ҫ���õ�cookie��value
@param string expiredays Ҫ���õ�cookie�Ĺ���ʱ��
@return N/A �޷���ֵ
*/
function setCookie(name,value,expiredays){
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
};

/*
���ڻ�ȡcookieĳһ���ֵ
@param string c_name Ҫ��ȡ��cookie��key
@return string ��ȡ����ֵ ����������򷵻ؿ�
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
���ڻ�ȡ����ĵ�һ����ֵ��
@param Object obj Ŀ�����
@return Object Ŀ�����ĵ�һ����ֵ��
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

//�պ���
function empty_func(){}

/*
���ڷ���ĳһ���ַ������һ�γ�������һ���ַ����е�λ��
@param string str Ŀ���ַ���
@param string word ��Ҫƥ��Ĺؼ���
@return int/bool ���û���ҵ��Ļ��򷵻�false �ҵ��ͷ���λ��
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
�������±�ǩ�д���ҳ
@param string url ��Ҫ�򿪵�Ŀ��ҳ��ĵ�ַ
@param bool not_new_tag �Ƿ�Ҫʹ����ҳ���
@return N/A �޷���ֵ
*/
function open_at_new_tag(url, not_new_tag){
	var a = $('<a>').attr('href', url).attr('target', not_new_tag?'_self':'_blank').appendTo($(document.body))
	.click(function(){
		$(this).remove();
	})
	
	var span = $('<span>').appendTo(a).click()
}


/*
���ڽ����ں�ʱ��ת���ɾ��뵱ǰʱ��
@param int now_time ��ǰ��ʱ��һ��Ϊnew Date().getTime()
@param string date_string ��Ҫ�����յ�ʱ���ַ���
@return string ���뵱ǰʱ����ַ���
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