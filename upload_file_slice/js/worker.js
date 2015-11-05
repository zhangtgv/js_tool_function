//worker.js
importScripts('core-min.js', 'md5.js');

onmessage = function (evt){
  var d = evt.data;
	
	md5 = CryptoJS.algo.MD5.create();
	
	file = d;
	file_size = d.size;
	max_page = Math.ceil(file_size / size);
	now = 0;
	
	console.log(evt);

	slice_and_calc();
}

var reader = new FileReader();
var md5;
var size = 1048576;
var file_size;
var file;

var max_page;
var now;

function slice_and_calc(){
	if(now > max_page){
		var hash = md5.finalize();
		
		postMessage(hash.toString());
		
		return;
	}
	
	reader.readAsBinaryString(file.slice(now*size, (now+1)*size));
}

reader.onloadend = function () {
	var text = (reader.result);
	
	md5.update(CryptoJS.enc.Latin1.parse(text));
	
	now++;
	
	slice_and_calc();
}