(function ($) {
	//这一部分是用来判断系统的
	var ua = navigator.userAgent.toLowerCase();
	var system = 'unknown';
	if(ua.match(/macintosh/i)){
		system = 'apple';
	}else if(ua.match(/windows/i)){
		system = 'windows';
	}
	var is_ctrl_down = false;
	
	//绑定事件 如果是windows系统就用control键 如果是苹果系统就是用command键
	$(document.body)
	.keydown(function(e){
		if(system == 'windows'){
			if(e.ctrlKey){
				is_ctrl_down = true;
			}
		}else if(system == 'apple'){
			if(e.keyCode == 91){
				is_ctrl_down = true;
			}
		}
	})
	.keyup(function(e){
		if(system == 'windows'){
			if(!e.ctrlKey){
				is_ctrl_down = false;
			}
		}else if(system == 'apple'){
			if(e.keyCode == 91){
				is_ctrl_down = false;
			}
		}
	})
	
	var methods = {
		init: function (options) {
			var father = this;
			
			//设置默认的原始样式和选中后样式
			var original_css = options['original_css'] ? options['original_css'] : {};
			var changed_css = options['changed_css'] ? options['changed_css'] : {};
			
			var click_func = options['click_func'] ? options['click_func'] : empty_func;
			var click_with_ctrl_func = options['click_with_ctrl_func'] ? options['click_with_ctrl_func'] : empty_func;
			var click_with_shift_func = options['click_with_shift_func'] ? options['click_with_shift_func'] : empty_func;
			
			//将当前选中的dom对象挂在父节点上
			this.data('select_obj', {});
			//将多选的基准挂在父节点上
			this.data('base_select', '');
			
			this.delegate('.'+options.childClass, 'click', function(e){
				e.stopPropagation();
				
				document.title = is_ctrl_down;
				
				var select_obj = father.data('select_obj');
				
				var that = $(this);
				var target = $(e.target);
				var index = that.index();
				
				//带shift的点击是不用更换base_select的
				if(!e.shiftKey){
					father.data('base_select', that.index());
				}
				
				if(!e.shiftKey && !is_ctrl_down){
					//如果是单纯的点击 那么直接把选中的对象清空 然后把当前点击的东西插进去
					clearObject(select_obj);
					
					select_obj[index] = that.data();
					
					$('.'+options.childClass).data('select', 0).css(original_css);
					that.data('select', 1).css(changed_css);
					
					click_func(select_obj);
				}
				
				if(!e.shiftKey && is_ctrl_down){
					//如果按住了ctrl 那么要把选中的变成未选中 反之亦然
					var is_selected = false;
					if(select_obj[index]){
						is_selected = true;
					}
					
					if(is_selected){
						delete select_obj[index];
						
						//把去掉的那个节点的颜色改成白色
						that.data('select', 0).css(original_css);
					}else{
						select_obj[index] = that.data();
						that.data('select', 1).css(changed_css);
					}
					
					click_with_ctrl_func(select_obj);
				}
				
				if(e.shiftKey && !is_ctrl_down){
					//按住了shift 那么把当前选中的到基准点之间的所有项都选中
					var start = Math.min(index, father.data('base_select'));
					var end = Math.max(index, father.data('base_select'));
					
					clearObject(select_obj);
					
					$('.'+options.childClass).data('select', 0).css(original_css);
					
					for(var i=start; i<=end; i++){
						var node = father.children().eq(i);
						
						select_obj[i] = node.data();
						
						node.data('select', 1).css(changed_css);
					}
					click_with_shift_func(select_obj);
				}
			})
		}
	};

	$.fn.file_selector = function (method) {

			// 方法调用
			if (methods[method]) {
					methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
					return this;
			} else if (typeof method === 'object' || !method) {
					methods.init.apply(this, arguments);
					return this;
			} else {
					$.error('Method' + method + 'does not exist on jQuery.tooltip');
			}

	};

})(jQuery);