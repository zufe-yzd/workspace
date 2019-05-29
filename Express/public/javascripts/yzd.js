//console.log("请使用这个页面作为开发的主界面。");

var order = [];
var order2 = [];

var parent = d3.select("body").append("div").style("margin",100);

var Hexagon = new ZDY.Chart();			// 建立聚合图对象
Hexagon.SetParent(parent);				// （可选）设置父节点容器，默认为 body
Hexagon.ShowSubChart = true;
Hexagon.SetTitle("上车坐标");
Hexagon.SetBackground("javascripts/sss.png");
										// （可选）设置背景图片
Hexagon.SetSize(0);						// （可选）设置六边形边长，默认为 20
//Hexagon.SetColor("#ff0022");			// （可选）设置填充色，默认为 #0000FF
Hexagon.CreateSvg(573, 348);			// 创建 svg 元素
Hexagon.SetExtent([[104.02,104.08],[30.49,30.52]]);
										// （可选）定义 x 和 y 坐标的范围，默认为 [[0,100],[0,100]]
Hexagon.Display(order);		
//Hexagon.ShowPoints = false;				// （可选）设置是否以散点显示数据，默认为是
Hexagon.SetRange(0,400);				// （可选）设置颜色插值最小和最大值所对应的点的数量，默认为 0,10
Hexagon.SetDecimal(3);
Hexagon.SetCompute("log");				// （可选）设置插值计算模式，默认为 linear（线性），可选 power（指数）、 log（对数）
Hexagon.Draw();							// 绘制（可用于重绘）

$.getJSON("data/orderOUT.json", function(data){
	for (var i = 0; i < data.length; i++) {
		order.push(data[i]["getOnCoordinate"]);
	}
	//console.log(order);
	Hexagon.Display(order);			// 引入数据
	Hexagon.Draw();					// 绘制（可用于重绘）
});

var parent2 = d3.select("body").append("div").style("margin",100);

var Hexagon2 = new ZDY.Chart();			// 建立聚合图对象
Hexagon2.SetParent(parent2);			// （可选）设置父节点容器，默认为 body
Hexagon2.ShowSubChart = true;
Hexagon2.SetTitle("下车坐标");
Hexagon2.SetBackground("javascripts/sss.png");
										// （可选）设置背景图片
Hexagon2.SetSize(0);					// （可选）设置六边形边长，默认为 20
Hexagon2.SetColor("#ff0022");			// （可选）设置填充色，默认为 #0000FF
Hexagon2.CreateSvg(573, 348);			// 创建 svg 元素
Hexagon2.SetExtent([[104.02,104.08],[30.49,30.52]]);
										// （可选）定义 x 和 y 坐标的范围，默认为 [[0,100],[0,100]]
Hexagon2.Display(order);		
//Hexagon2.ShowPoints = false;			// （可选）设置是否以散点显示数据，默认为是
Hexagon2.SetRange(0,400);				// （可选）设置颜色插值最小和最大值所对应的点的数量，默认为 0,10
Hexagon2.SetDecimal(3);
Hexagon2.SetCompute("log");				// （可选）设置插值计算模式，默认为 linear（线性），可选 power（指数）、 log（对数）
Hexagon2.Draw();						// 绘制（可用于重绘）

$.getJSON("data/orderOUT.json", function(data){
	for (var i = 0; i < data.length; i++) {
		order2.push(data[i]["getOffCoordinate"]);
	}
	//console.log(order2);
	Hexagon2.Display(order2);			// 引入数据
	Hexagon2.Draw();					// 绘制（可用于重绘）
});