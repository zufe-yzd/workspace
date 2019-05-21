console.log("请使用这个页面作为开发的主界面。");

var order = [];

$.getJSON("data/orderOUT.json", function(data){
	order = data;
	console.log(order);


var map = new BMap.Map("allmap"); // 创建Map实例
map.centerAndZoom("成都", 20);  // 初始化地图,用城市名设置地图中心点
map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
map.setCurrentCity("成都");   // 设置地图显示的城市 此项是必须设置的
map.enableScrollWheelZoom(true);  //开启鼠标滚轮缩放
//var point = new BMap.Point(116.404, 39.915);
var point = new BMap.Point(104.08499, 30.50999);
var marker = new BMap.Marker(point); // 创建点
map.addOverlay(marker); //添加点
var point = new BMap.Point(103.985, 30.50999);
var marker = new BMap.Marker(point); // 创建点
map.addOverlay(marker); //添加点
var point = new BMap.Point(104.08499, 30.41);
var marker = new BMap.Marker(point); // 创建点
map.addOverlay(marker); //添加点
var point = new BMap.Point(103.985, 30.41);
var marker = new BMap.Marker(point); // 创建点
map.addOverlay(marker); //添加点
//map.removeOverlay(marker); //删除点
// 创建地址解析器实例
var myGeo = new BMap.Geocoder();
//批量解析
var adds = [/*"长沙", "深圳", "香港", "郑州 ", "惠州", "南昌", "赣州", "中山", "阳江", "上海", "无锡", "南京"*/];
for (var i = 0; i < adds.length; i++) {
	myGeo.getPoint(adds[i], function (point) {
		if (point) {
			var address = new BMap.Point(point.lng, point.lat);//纬度经度 
			var marker = new BMap.Marker(address);
			map.addOverlay(marker);
			var opts = {
				width: 120,  // 信息窗口宽度
				height: 70,  // 信息窗口高度
				title: "项目信息" // 信息窗口标题
			}
			var infoWindow = new BMap.InfoWindow("<a href='#' target='blank'>查看详情</a>", opts);
			// 创建信息窗口对象
			marker.addEventListener("click", function () {
				map.openInfoWindow(infoWindow,address); //开启信息窗口
			});
		}
	}, "成都市");
}
getBoundary("中国");
function getBoundary(sRegion) {
	var bdary = new BMap.Boundary();
	bdary.get(sRegion, function (rs) { //获取行政区域
		var count = rs.boundaries.length; //行政区域的点有多少个
		for (var i = 0; i < count; i++) {
			var ply = new BMap.Polygon(rs.boundaries[i], 
				{ strokeWeight: 2, strokeColor: "#4A7300", fillColor: "#FFF8DC" }); //建立多边形覆盖物
			map.addOverlay(ply); //添加覆盖物
		}
	});
}

});
/*
d3.json("data/order.json",function(data){
	console.log(data);
});
*/