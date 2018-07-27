//增加遮罩
function CreateCovering(left, top, width, height, zindex, opacity, store, color) { //距左(null=0),距上(null=0),宽度(null=容器的100%),高度(null=容器的100%),zindex(null=200),透明度(输入0-100的值,null=30),要放入的容器(null=body),背景色(null=white)
	if($('#divCovering')[0])
		$('#divCovering').remove();
	if(left == null) {
		left = 0;
		top = 0;
	}
	zindex = zindex || 100;
	opacity = opacity || 60;
	if(store == null) {
		store = $('body');
		width = document.body.clientWidth;
		//height = document.documentElement.clientHeight;
		//height = document.body.clientHeight;	
		height = $(document).height();
	} else {
		if(width == null) {
			width = parseInt(store.css('width'));
			height = parseInt(store.css('height'));
		} else {
			width = width;
			height = height
		}
	}
	color = color || '#000';
	store.append("<div id='divCovering' style='position:absolute;background:" + color + ";z-index:" + zindex + ";filter: Alpha(Opacity=" + opacity + ");-moz-opacity:" + (opacity / 100) + ";opacity: " + (opacity / 100) + ";left:" + left + "px;top:" + top + "px;width:" + width + "px;height:" + height + "px'></div>");
}

function svFullCovering(id) { //全屏遮罩，有无关闭两种模式
	CreateCovering();
	var html = $('#' + id).html();
	$('#divCovering').append("<div class='covering_close'><i id='cover_close' class='iconfont icon-shixinguanbi'></i></div>");
	$('#' + id).css('display', 'block');
	$('#cover_close').click(function() {
		$('#divCovering').remove();
		$('#' + id).css('display', 'none');
	})
}

function svRemoveLoading() {
	$('#divCovering').remove();
}

/*
 * 二级页面
 */
function swAddBox(width, height, left, top, id, parentId, isMove) { //宽度，高度，左坐标，上坐标，ID，父容器ID，是否可拖拽
//	var default = {
//		width: 200
//	}
	var html = "";
	html += '<div id="' + id + '" style="width: ' + width + 'px;height: ' + height + 'px;margin:30 auto;position: fixed;z-index: 10;"><div id="mytitle" style="width: ' + width + 'px;height: 30px;background-color: yellow;position: relative;"></div><div style="width: ' + width + 'px;height: ' + height + 'px;background-color: brown;position: relative;"></div></div>';
	$('#' + parentId).append(html);
	if(isMove == 1) {
		dragInit(document.getElementById(id));
	}
}

/*
 * PC版弹窗
 */
function alertBox_pc(title, msg, confirm_name, confirm_func, close_name, close_func) { //标题，内容，确认按钮名称，确认按钮事件，取消按钮名称，取消按钮事件）（只有一个按钮最后两个参数可以不填）
	CreateCovering();
	var html = "";
	confirm_name = confirm_name || "OK";
	html += '<div style="width:100%;overflow:hidden;"><div id="alert_box" style="width: 500px;min-height: 120px;padding-bottom:50px;background-color: #fff;-webkit-box-shadow: 0 0 10px #333;box-shadow: 0 0 10px #333;margin:0 auto;top:20%;position: fixed;z-index:999;"><div id="mytitle" style="width: 100%;height: 40px;background-color: #D1181B;position: relative;color:white;line-height:40px;padding-left:20px;font-size:14px;display:inline-block;box-sizing:border-box !important;">' + title + '<span id="alert_x" style="font-size:22px;font-weight:bold;color:white;position:absolute;right:20px;line-height:40px;cursor:pointer;">x</span></div>';
	html += '<div style="text-align:center;margin:30px 30px; 20px;font-size:16px;">' + msg + '</div>';
	if(close_name != null) {
		html += '<div style="width:100%;text-align:center;position:absolute;bottom:20px;"><div id="close_id" class="alert_grey_btn">' + close_name + '</div><div id="confirm_id" class="alert_red_btn" style="margin-left:20px;">' + confirm_name + '</div>';
	} else {
		html += '<div id="confirm_id" style="width:100%;text-align:center;position:absolute;bottom:20px;"><div class="alert_red_btn">' + confirm_name + '</div>';
	}
	html += '</div></div></div>';
	$(document.body).append(html);
	$('#alert_x').click(function() {
		$('#alert_box').remove();
		svRemoveLoading();
	});
	$('#confirm_id').click(function() {
		$('#alert_box').remove();
		svRemoveLoading();
		if(confirm_func != null) {
			confirm_func();
		}
	});
	$('#close_id').click(function() {
		$('#alert_box').remove();
		svRemoveLoading();
		if(close_func != null) {
			close_func();
		}
	});
	dragInit(document.getElementById("alert_box"));
}

/*
 * 手机版弹窗
 */
function alertBox_phone(title, msg, confirm_name, confirm_func, close_name, close_func) { //标题，内容，确认按钮名称，确认按钮事件，取消按钮名称，取消按钮事件）（只有一个按钮最后两个参数可以不填）
	CreateCovering();
	var html = "";
	confirm_name = confirm_name || "OK";
	html += '<div id="alert_box" style="width: 80%;background-color: #fff;-webkit-box-shadow: 0 0 10px #333;box-shadow: 0 0 10px #333;left:10%;top:20%;position: fixed;z-index:999;"><div id="mytitle" style="width: 100%;height: 40px;background-color: #D1181B;position: relative;color:white;line-height:40px;padding-left:20px;font-size:14px;display:inline-block;box-sizing:border-box !important;">提示<span id="alert_x" style="font-size:22px;font-weight:bold;color:white;position:absolute;right:20px;line-height:40px;">x</span></div>';
	html += '<div style="width:100%;font-size:16px;padding:20px 16x 10px;"><div style="margin:10px auto;padding:10px 16px;">' + msg + '</div>';
	if(close_name != '') {
		html += '<div style="width:100%;text-align:center;margin:20px auto;"><div id="close_id" class="alert_grey_btn">' + close_name + '</div><div id="confirm_id" class="alert_red_btn" style="margin-left:20px;">' + confirm_name + '</div>';
	} else {
		html += '<div id="confirm_id" style="width:100%;text-align:center;position:absolute;bottom:20px;"><div class="alert_red_btn" style="">' + confirm_name + '</div>';
	}
	html += '</div></div></div>';
	$(document.body).append(html);
	$('#alert_x').click(function() {
		$('#alert_box').remove();
		swRemoveLoading();
	});
	$('#confirm_id').click(function() {
		$('#alert_box').remove();
		swRemoveLoading();
		if(confirm_func != null) {
			confirm_func();
		}
	});
	$('#close_id').click(function() {
		$('#alert_box').remove();
		swRemoveLoading();
		if(close_func != null) {
			close_func();
		}
	});
}

/*
 * 拖拽
 */
var dragInit = function(titleDom) { //传入容器的ID
	var dragl = 0,
		dragt = 0,
		dragx = 0,
		dragy = 0;
	var dragOver = false;
	var zindex = 999;
	var thisDom = titleDom; //获取当前title对象
	titleDom.onmousedown = function(event) {
		//		alert(thisDom);
		var e = event || window.event; //为了兼容IE和火狐
		dragx = e.clientX;
		dragy = e.clientY;

		dragl = parseInt(thisDom.offsetLeft); //距离浏览器左边的位置left
		dragt = parseInt(thisDom.offsetTop); //距离浏览器顶部的位置top
		dragOver = true;
		zindex++;
		thisDom.style.zIndex = zindex;

		document.onmousemove = function(event) {
			if(dragOver) {
				var e = event || window.event; //为了兼容IE和火狐
				var newLeft = dragl + e.clientX - dragx; //新的左边距
				var newTop = dragt + e.clientY - dragy; //新的顶部边距

				thisDom.style.left = newLeft + "px";
				thisDom.style.top = newTop + "px";
			}
		};
		document.onmouseup = function(event) {
			if(dragOver) {
				dragOver = false;
			}
		};
	};
}

/*
 * 回到顶部
 */
var svGoTop = function() {
	this.config = {
		pageWidth: 1000, // 页面宽度
		nodeId: 'go-top', // Go Top 节点的 ID
		nodeWidth: 40, // Go Top 节点宽度
		distanceToBottom: 120, // Go Top 节点上边到页面底部的距离
		distanceToPage: 20, // Go Top 节点左边到页面右边的距离
		hideRegionHeight: 90, // 隐藏节点区域的高度 (该区域从页面顶部开始)
		text: '' // Go Top 的文本内容
	};

	this.cache = {
		topLinkThread: null // 显示 Go Top 节点的线程变量 (用于 IE6)
	}
};

svGoTop.prototype = {
	init: function(config) {
		this.config = config || this.config;
		var _self = this;

		// 滚动屏幕, 修改节点位置和显示状态
		jQuery(window).scroll(function() {
			_self._scrollScreen({
				_self: _self
			});
		});

		// 改变屏幕尺寸, 修改节点位置
		jQuery(window).resize(function() {
			_self._resizeWindow({
				_self: _self
			});
		});

		// 在页面中插入节点
		_self._insertNode({
			_self: _self
		});
	},
	//在页面中插入节点
	_insertNode: function(args) {
		var _self = args._self;
		
		// 插入节点并绑定节点事件, 当节点被点击, 用 0.4 秒的时间滚动到页面顶部
		var topLink = jQuery('<a id="' + _self.config.nodeId + '" href="#">' + _self.config.text + '</a>');
		topLink.click(function() {
			jQuery('html,body').animate({
				scrollTop: 0
			}, 400);
			return false;
		}).appendTo(jQuery('body'));
		
		// 节点到屏幕右边的距离
		var right = _self._getDistanceToBottom({
			_self: _self
		});
		
		// IE6 (不支持 position:fixed) 的样式
		if(/MSIE 6/i.test(navigator.userAgent)) {
			topLink.css({
				'display': 'none',
				'position': 'absolute',
				'right': right + 'px'
			});

			// 其他浏览器的样式
		} else {
			topLink.css({
				'display': 'none',
				'position': 'fixed',
				'right': right + 'px',
				'top': (jQuery(window).height() - _self.config.distanceToBottom) + 'px'
			});
		}
	},
	//修改节点位置和显示状态
	_scrollScreen: function(args) {
		var _self = args._self;
		// 当节点进入隐藏区域, 隐藏节点
		var topLink = jQuery('#' + _self.config.nodeId);
		if(jQuery(document).scrollTop() <= _self.config.hideRegionHeight) {
			clearTimeout(_self.cache.topLinkThread);
			topLink.hide();
			return;
		}
		// 在隐藏区域之外, IE6 中修改节点在页面中的位置, 并显示节点
		if(/MSIE 6/i.test(navigator.userAgent)) {
			clearTimeout(_self.cache.topLinkThread);
			topLink.hide();

			_self.cache.topLinkThread = setTimeout(function() {
				var top = jQuery(document).scrollTop() + jQuery(window).height() - _self.config.distanceToBottom;
				topLink.css({
					'top': top + 'px'
				}).fadeIn();
			}, 400);

			// 在隐藏区域之外, 其他浏览器显示节点
		} else {
			topLink.fadeIn();
		}
	},
	//修改节点位置
	_resizeWindow: function(args) {
		var _self = args._self;

		var topLink = jQuery('#' + _self.config.nodeId);

		// 节点到屏幕右边的距离
		var right = _self._getDistanceToBottom({
			_self: _self
		});

		// 节点到屏幕顶部的距离
		var top = jQuery(window).height() - _self.config.distanceToBottom;
		// IE6 中使用到页面顶部的距离取代
		if(/MSIE 6/i.test(navigator.userAgent)) {
			top += jQuery(document).scrollTop();
		}

		// 重定义节点位置
		topLink.css({
			'right': right + 'px',
			'top': top + 'px'
		});
	},

	//获取节点到屏幕右边的距离
	_getDistanceToBottom: function(args) {
		var _self = args._self;

		// 节点到屏幕右边的距离 = (屏幕宽度 - 页面宽度 + 1 "此处 1px 用于消除偏移" ) / 2 - 节点宽度 - 节点左边到页面右边的宽度 (20px), 如果到右边距离屏幕边界不小于 10px
		var right = parseInt((jQuery(window).width() - _self.config.pageWidth + 1) / 2 - _self.config.nodeWidth - _self.config.distanceToPage, 10);
		if(right < 10) {
			right = 10;
		}

		return right;
	}
};