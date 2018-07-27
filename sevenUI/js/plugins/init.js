//左边栏点击事件
var handleSidebarMenu = function() {
	//  "use strict";
	$('.sv_sidebar .nav .nav_li > a').click(function() {
		var target = $(this).next('.sub_menu');
		var otherMenu = '.sv_sidebar .nav .nav_li > .sub_menu';

		$(otherMenu).not(target).slideUp(250, function() {
			$(this).closest('li').removeClass('expand');
		});
		$(target).slideToggle(250, function() {
			var targetLi = $(this).closest('li');
			if($(targetLi).hasClass('expand')) {
				$(targetLi).removeClass('expand');
			} else {
				$(targetLi).addClass('expand');
			}
		});
	});
};
//左边栏滚动事件
var handleSlimScroll = function() {
	"use strict";
	$('[data-scrollbar=true]').each(function() {
		generateSlimScroll($(this));
	});
};
var generateSlimScroll = function(element) {
	if($(element).attr('data-init')) {
		return;
	}
	var dataHeight = $(element).attr('data-height');
	dataHeight = (!dataHeight) ? $(element).height() : dataHeight;

	var scrollBarOption = {
		height: dataHeight,
		alwaysVisible: true
	};
	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		$(element).css('height', dataHeight);
		$(element).css('overflow-x', 'scroll');
	} else {
		$(element).slimScroll(scrollBarOption);
	}
	$(element).attr('data-init', true);
};

var handlePanel = function() {
	$(document).on('click', '[data-click=panel-close]', function(e) {
		$(this).closest('.sv_panel').remove();
	});
	$(document).on('click', '[data-click=panel-min]', function(e) {
		$(this).closest('.sv_panel').find('.panel_body').slideToggle();
	});
	//开关按钮
	$(document).on('click', '[data-click=switch-btn]', function(e) {
		$(this).toggleClass('on');
		this.dataset.state = this.dataset.state == "on" ? "off" : "on";
	});
}

/*
 * 回到顶部
 */
$(function(){
	(new svGoTop()).init({
		pageWidth: 1800,  //设置超过屏幕宽度，就会贴右显示
		nodeId: 'go-top',
		nodeWidth: 40,
		distanceToBottom: 125,
		distanceToPage: 20,
		hideRegionHeight: 130,
		text: ''
	});
})
