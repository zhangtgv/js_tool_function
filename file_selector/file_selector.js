(function ($) {
	//��һ�����������ж�ϵͳ��
	var ua = navigator.userAgent.toLowerCase();
	var system = 'unknown';
	if(ua.match(/macintosh/i)){
		system = 'apple';
	}else if(ua.match(/windows/i)){
		system = 'windows';
	}
	var is_ctrl_down = false;
	
	//���¼� �����windowsϵͳ����control�� �����ƻ��ϵͳ������command��
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
			
			//����Ĭ�ϵ�ԭʼ��ʽ��ѡ�к���ʽ
			var original_css = options['original_css'] ? options['original_css'] : {};
			var changed_css = options['changed_css'] ? options['changed_css'] : {};
			
			var click_func = options['click_func'] ? options['click_func'] : empty_func;
			var click_with_ctrl_func = options['click_with_ctrl_func'] ? options['click_with_ctrl_func'] : empty_func;
			var click_with_shift_func = options['click_with_shift_func'] ? options['click_with_shift_func'] : empty_func;
			
			//����ǰѡ�е�dom������ڸ��ڵ���
			this.data('select_obj', {});
			//����ѡ�Ļ�׼���ڸ��ڵ���
			this.data('base_select', '');
			
			this.delegate('.'+options.childClass, 'click', function(e){
				e.stopPropagation();
				
				document.title = is_ctrl_down;
				
				var select_obj = father.data('select_obj');
				
				var that = $(this);
				var target = $(e.target);
				var index = that.index();
				
				//��shift�ĵ���ǲ��ø���base_select��
				if(!e.shiftKey){
					father.data('base_select', that.index());
				}
				
				if(!e.shiftKey && !is_ctrl_down){
					//����ǵ����ĵ�� ��ôֱ�Ӱ�ѡ�еĶ������ Ȼ��ѵ�ǰ����Ķ������ȥ
					clearObject(select_obj);
					
					select_obj[index] = that.data();
					
					$('.'+options.childClass).data('select', 0).css(original_css);
					that.data('select', 1).css(changed_css);
					
					click_func(select_obj);
				}
				
				if(!e.shiftKey && is_ctrl_down){
					//�����ס��ctrl ��ôҪ��ѡ�еı��δѡ�� ��֮��Ȼ
					var is_selected = false;
					if(select_obj[index]){
						is_selected = true;
					}
					
					if(is_selected){
						delete select_obj[index];
						
						//��ȥ�����Ǹ��ڵ����ɫ�ĳɰ�ɫ
						that.data('select', 0).css(original_css);
					}else{
						select_obj[index] = that.data();
						that.data('select', 1).css(changed_css);
					}
					
					click_with_ctrl_func(select_obj);
				}
				
				if(e.shiftKey && !is_ctrl_down){
					//��ס��shift ��ô�ѵ�ǰѡ�еĵ���׼��֮��������ѡ��
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

			// ��������
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