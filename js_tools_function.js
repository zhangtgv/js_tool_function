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
���ڷ��ظ�ʽ�����ʣ��ʱ���ַ���
@param int second ʣ���ʱ��(��)
@param bool is_add_zero ��ʱ�����е�����һ��ֻ��һλ����ʱ�� �Ƿ�Ҫ��ǰ���0
@return string ��ʽ�����ʣ��ʱ��
*/
function convert_left_time(seconds, is_add_zero){
	var time_left_str = '';
	var day = Math.floor(seconds / (60*60*24));
	var hour = Math.floor(seconds % (60*60*24) / (60*60));
	var minute = Math.floor(seconds % (60*60) / 60);
	var second = Math.floor(seconds % 60);
	
	if(day > 0){
		time_left_str += '����һ��';
		return time_left_str;
	}
	
	if(is_add_zero && hour<10){
		time_left_str += '0' + hour;
	}else{
		time_left_str += hour;
	}
	time_left_str+=':';

	if(is_add_zero && minute<10){
		time_left_str += '0' + minute;
	}else{
		time_left_str += minute;
	}
	time_left_str+=':';

	if(is_add_zero && second<10){
		time_left_str += '0' + second;
	}else{
		time_left_str += second;
	}
	
	return time_left_str;
}