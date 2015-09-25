function waterfall(config, callback){
	this.config = config;
	this._callback = callback;
	this._current_max = 0;
	this._container_height = this.config.container.height();
	this._can_load = true;
}

//初始化
waterfall.prototype.init = function(){
	var wf = this;
	wf.config.container.scroll(function(){
		console.log('onscroll');
		var scroll_top = wf.config.container.scrollTop();
		var scroll_height = wf.config.container[0].scrollHeight;
		if(scroll_height-(scroll_top+wf._container_height) < wf.config.next_tick_range){
			wf.getNewData(++wf._current_max);
		}
	})
	wf.getNewData(wf._current_max);
}

//修改回调函数
waterfall.prototype.changeCallback = function(callback){
	this._callback = callback;
}

//修改设置
waterfall.prototype.changeSetting = function(config){
	for(var i in config){
		this.config[i] = config[i];
	}
}

//获取新页的数据
waterfall.prototype.getNewData = function(page_num){
	var wf = this;
	if(!wf._can_load){
		return;
	}
	$.post(wf.config.post_addr, {limit:wf.config.page_size, offset:page_num*wf.config.page_size}, function(html){
		wf._can_load = true;
		this._current_max = +page_num;
		wf._callback(wf.config.container, html);
	})
	
	wf._can_load = false;
}