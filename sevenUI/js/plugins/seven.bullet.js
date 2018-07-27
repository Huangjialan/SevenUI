//初始化弹幕
$.fn.bullet = function(bullet_div,sub_btn,sub_txt) {
	var _width = $(this).width();
	var _height = $(this).height();
	init_screen(bullet_div,1, _width, _height);
	$("#" + sub_btn).click(function() {
		var text = $("#"+sub_txt).val();
		$("#"+sub_txt).val('');
		var div = "<div>" + text + "</div>";
		$("#"+bullet_div).append(div);
		init_screen(bullet_div,0, _width, _height);
	})
}

function init_screen(bullet_div,isNew, box_w, box_h) {
	var _top = 0;
	$("#"+bullet_div).find("div").show().each(function() {
		var _width = box_w || $(window).width();
		var _height = box_h || $(window).height();
		var line = Math.floor(_height / 30);
		_left = _width + 240;
		var _top = $(this).index() % line * 30;

		var color = isNew ? getReandomColor() : color;
		$(this).css({
			left: _left,
			top: _top,
			color: color
		});
		var time = Math.round(Math.random() * 10000 + 15000);
		var delat_time = Math.floor($(this).index() / line) * 5000;
		$(this).delay(delat_time).animate({
			left: "-" + _left + "px"
		}, time, function() {

		});
	});
}

//随机获取颜色值
function getReandomColor() {
	return '#' + (function(h) {
		return new Array(7 - h.length).join("0") + h
	})((Math.random() * 0x1000000 << 0).toString(16))
}