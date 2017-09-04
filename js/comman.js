//		——————————————————————————header nav滑动开始————
$(document).ready(function(e) {
	var navLi = $("#nav-div ul li"),
		navUl = $("#nav-div ul"),
		speed = 200;

	function OnClick() {
		n = navUl.find("li.on").index();
		navUl.stop().animate({
			backgroundPosition: navLi.width() * n + 10
		}, speed);
	}
	OnClick();
	navLi.hover(
		function() {
			n = $(this).index();
			navUl.stop().animate({
				backgroundPosition: navLi.width() * n + 10
			}, speed);
		},
		function() {
			OnClick();
		})
	navLi.click(function() {
		$(this).addClass("on").siblings().removeClass("on")
	});
	$(window).scroll(function() {
		if($(window).scrollTop() > $("#nav").height() + 50) {
			$("#nav").addClass("scoll_nav")
		} else {
			$("#nav").removeClass("scoll_nav")
		}
	});
})
//		——————————————————————————header nav滑动结束————
//		——————————————————————————向上滑动————
			function getScrollTop(){
				var scrollTop=document.documentElement.scrollTop || window.pageYOffset ||document.body.scrollTop;
				return scrollTop;
			}
			window.onload=function(){
				var top=document.getElementById("top");
				window.onscroll=function(){
					if(getScrollTop()>400){
						 top.style.display="block"
					}else{
						top.style.display="none"
					}
					var y=document.documentElement.scrollTop;		//兼容火狐
					var i=document.body.scrollTop;		
					top.onclick=function(){
						time=setInterval(function(){
							if(i>=0 || y>=0){
								 i-=50;
								 y-=50;	//兼容火狐
		//								 z-=50;	//兼容IE
								document.body.scrollTop=i;
								document.documentElement.scrollTop=y;	//兼容火狐
							} 
						},20)
					};
				}
			}
//		——————————————————————————向上结束————