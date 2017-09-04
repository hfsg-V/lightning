//  ——————————————————————————fix固定导航出现/消失
function getScrollTop() {
	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	return scrollTop;
}
window.onload = function() {
	var menu = document.getElementById("nav2");
	window.onscroll = function() {
		if(getScrollTop() > 104) {
			menu.className = "fix";
		} else {
			menu.className = " ";
		}
	}
	for(var i=1; i<=7; i++){
		document.getElementById("tabCon_"+i).style.display="none"
	}
	document.getElementById("tabCon_"+1).style.display="block"
}
function changeTab(obj){
	for(var i=1; i<=7; i++){
		document.getElementById("tabCon_"+i).style.display="none"
		document.getElementById("tab"+i).className=" ";
	}
	document.getElementById("tab"+obj).className="active";
	document.getElementById("tabCon_"+obj).style.display="block"
}
//--------------------------------模态框------------------------
