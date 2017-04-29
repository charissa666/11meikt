$(function(){
	
	var timeOut = 1200;		//弹框消失时间
	
	var startValue = new Date(2016,8,24,17,10,30).getTime();
	var endValue = new Date(2017,8,24,17,12,10).getTime();
	
	//倒计时
	//var startValue = parseInt($("#startTime").val());	//开始时间
	//var endValue = parseInt($("#endTime").val());		//结束时间
	
	countDown();
	var timer = setInterval(function(){
		countDown();
	},1000);
	function countDown(){
		var nowTime = new Date();
		if($("#startTime").val().length == 2){
			if($("#startTime").val()[0] == '0'){
				startValue = $("#startTime").val()[1];
			}
			if($("#endTime").val()[0] == '0'){
				endValue = $("#endTime").val()[1];
			}
			var YY = nowTime.getFullYear();
			var MM = nowTime.getMonth();
			var DD = nowTime.getDate();
			var s_st = new Date(YY,MM,DD,startValue,00,00);
			var e_st = new Date(YY,MM,DD,endValue,00,00);
			var s_differ = s_st - nowTime.getTime();
			var e_differ = e_st - nowTime.getTime();
		}else{
			var s_differ = startValue - nowTime.getTime();
			var e_differ = endValue - nowTime.getTime();
		}

		if(s_differ > 999){
			//团购未开始
			countNum(s_differ);
			$(".count_time>i").html('距开始还有');
			$(".add_btn").attr('class','add_btn did_star');
			$(".buy_btn").attr('class','buy_btn did_star');
			
		}else{
			if(e_differ > 999){
				//团购开始
				countNum(e_differ);
				$(".count_time>i").html('团购剩余');
				$(".add_btn").attr('class','add_btn');
				$(".buy_btn").attr('class','buy_btn');

			}else{
				//团购结束
				clearInterval(timer);
				$(".count_time>b").html(0);
				$(".count_time>i").html('团购已结束');
				$(".add_btn").attr('class','add_btn over_btn');
				$(".buy_btn").attr('class','buy_btn over_btn');
			}
		}
	};
	function countNum( dif ){
		var day = parseInt(dif / (24 * 3600 * 1000));
		day<10?day='0'+day:day=''+day;
		var hours = parseInt(dif % (24 * 3600 * 1000) / (3600 * 1000));
		hours<10?hours='0'+hours:hours=''+hours;
		var minute = parseInt(dif % (24 * 3600 * 1000) % (3600 * 1000) / (60 * 1000));
		minute<10?minute='0'+minute:minute=''+minute;
		var mill = parseInt(dif % (24 * 3600 * 1000) % (3600 * 1000) % (60 * 1000) /1000);
		mill<10?mill='0'+mill:mill=''+mill;
		for(var i = 0; i < day.length; i++){
			$("#time1").html(day[0]);
			$("#time2").html(day[1]);
		}
		for(var i = 0; i < hours.length; i++){
			$("#time3").html(hours[0]);
			$("#time4").html(hours[1]);
		}
		for(var i = 0; i < minute.length; i++){
			$("#time5").html(minute[0]);
			$("#time6").html(minute[1]);
		}
		for(var i = 0; i < mill.length; i++){
			$("#time7").html(mill[0]);
			$("#time8").html(mill[1]);
		}
	};
		
	//团购结束
	$(document).on('click','.over_btn',function( ev ){
		ev.preventDefault();
		$(".car_hint").html('团购已结束').show();
		setTimeout(function(){
			$(".car_hint").hide();
		},timeOut)
	});
	
	//团购未开始
	$(document).on('click','.did_star',function( ev ){
		ev.preventDefault();
		$(".car_hint").html('团购未开始').show();
		setTimeout(function(){
			$(".car_hint").hide();
		},timeOut)
	});
	
	//单品数量
	$("#add").click(function(){
		var maxNum = $("#maxNum").html();
		var num = $("#num").val();
		num>maxNum-1?num=maxNum:num++;
		$("#num").val(num);
	});
	$("#reduce").click(function(){
		var num = $("#num").val();
		num<2?num=1:num--;
		$("#num").val(num);
	});
	$("#reduce").mousedown(function(ev){
		ev.preventDefault();
	});
	$("#add").mousedown(function(ev){
		ev.preventDefault();
	});
	$("#num").on('input propertychange',function(){
		var maxNum = parseInt($("#maxNum").html());
		var val = parseInt($(this).val());
		$(this).val(val);
		if($(this).val() == "NaN"){
			$(this).val('');
		}
		if(val > maxNum){
			$(this).val(maxNum);
			$(".car_hint").html('超过库存数量').show();
			setTimeout(function(){
				$(".car_hint").hide();
			},timeOut)
		}
	})
	
	//加入团购清单
	$('.add_btn').click(function(){
		if($(this).attr('class') == 'add_btn'){
			if($("#num").val() == ''){
				$(".car_hint").html('请填写商品数量').show();
				setTimeout(function(){
					$(".car_hint").hide();
				},timeOut)
			}else{
				var flyElm = $('#centImg').clone().css('opacity','0.7');
				flyElm.css({
					'z-index': 9000,
					'display': 'block',
					'position': 'absolute',
					'top': $('#centImg').offset().top +'px',
					'left': $('#centImg').offset().left +'px',
					'width': $('#centImg').width() +'px',
					'height': $('#centImg').height() +'px'
				});
				$('body').append(flyElm);
				flyElm.animate({
					top:$('.shopcar').offset().top,
					left:$('.shopcar').offset().left,
					width:50,
					height:50,
				},function(){
					$(".car_hint").html('已加入到团购清单！').show();
					setTimeout(function(){
						$(".car_hint").hide();
					},timeOut)
					flyElm.remove();
					var num = $(".car_num").html();
					num++;
					$(".car_num").html(num);
				});
				
				
			}
		}
	});
	
	//收藏单品
	$(".collect").click(function(){
		if($('.collect>span').hasClass('had')){
			$(this).html('<span></span>收藏本品');
		}else{
			$(this).html('<span class="had"></span>已收藏');
		}
	});
	
	//放大镜
	$('.mark').hover(function(){
		$('.shade').show();
		$('.max_img').show();
	},function(){
		$('.shade').hide();
		$('.max_img').hide();	
	});
	$('.mark').mousemove(function( ev ){
		var ev = ev || event;
		var l = ev.pageX - $('.mark').offset().left - $('.shade').width()/2;
		var t = ev.pageY - $('.mark').offset().top - $('.shade').height()/2;
		if(l < 0){
			l = 0;
		}else if(l > $('.mark').width() - $('.shade').width()){
			l = $('.mark').width() - $('.shade').width()
		}
		if(t < 0){
			t = 0;
		}else if(t > $('.mark').height() - $('.shade').height()){
			t = $('.mark').height() - $('.shade').height()
		}
		$('.shade').css({'left':l,'top':t});
		var parX = l / ($('.mark').width() - $('.shade').width());
		var parY = t / ($('.mark').height() - $('.shade').height());
		var bl = parX * ($('.max_img').width() - $('#maxImg').width());
		var bt = parY * ($('.max_img').height() - $('#maxImg').height());
		$('#maxImg').css({'left':bl,'top':bt});
	});



});