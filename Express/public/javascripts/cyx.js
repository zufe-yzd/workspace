// 监控区域
{
	d3.select("#map").append("svg").attr("width","100%").attr("height","100%").attr("id","mapbox").style("position","relative").style("top","-350px");
	var show = null;


	function showZone(num) {
		if (num == -1) {
			try {
				show.remove();
			} catch (error) {}
			show = null;
			return;
		}
		else {
			var x1 = 0, x2 = 0, y1 = 0, y2 = 0;
			switch (parseInt(num)) {
				case 0:
					x1 = 6;
					x2 = 62;
					y1 = 216;
					y2 = 308;
					break;
				case 1:
					x1 = 48;
					x2 = 100;
					y1 = 134;
					y2 = 216;
					break;
				case 2:
					x1 = 82;
					x2 = 114;
					y1 = 90;
					y2 = 134;
					break;
				case 3:
					x1 = 98;
					x2 = 136;
					y1 = 2;
					y2 = 90;
					break;
				case 4:
					x1 = 136;
					x2 = 196;
					y1 = 12;
					y2 = 32;
					break;
				case 5:
					x1 = 196;
					x2 = 232;
					y1 = 12;
					y2 = 32;
					break;
				case 6:
					x1 = 136;
					x2 = 182;
					y1 = 62;
					y2 = 86;
					break;
				case 7:
					x1 = 182;
					x2 = 232;
					y1 = 62;
					y2 = 86;
					break;
				case 8:
					x1 = 232;
					x2 = 262;
					y1 = 12;
					y2 = 86;
					break;
				case 9:
					x1 = 120;
					x2 = 180;
					y1 = 180;
					y2 = 206;
					break;
				case 10:
					x1 = 140;
					x2 = 220;
					y1 = 260;
					y2 = 290;
					break;
			}
			show = d3.select("#mapbox")
					.append("rect")
					.attr("x",x1)
					.attr("y",y1)
					.attr("width",x2-x1)
					.attr("height",y2-y1)
					.attr("fill-opacity",0)
					.attr("stroke","#FFAA00")
					.attr("stroke-width","4px");
		}
	}


	$.getJSON("/data/zones.json",function(dataset){
		var width = 322;
		var height = 110;
		for (var z = 0; z < 11; z++) {
			var svg = d3.select("#zone"+(z+1))
						.style("overflow","hidden")
						.style("padding","0px")
						.style("background-color","rgb(0,25,50)")
						.style("background-image","none")
						.append("div")
						.style("top","10px")
						.append("svg")
						.attr("id","svg"+z)
						.attr("width",width)
						.attr("height",height)
						.on("mouseover",function() {
							d3.select("#line"+d3.select(this).attr("id").substring(3,d3.select(this).attr("id").length)).style("color","LawnGreen");
							d3.select(this).select("rect").attr("fill","black");
							showZone(d3.select(this).attr("id").substring(3,d3.select(this).attr("id").length));
						})
						.on("mouseout",function() {
							d3.select("#line"+d3.select(this).attr("id").substring(3,d3.select(this).attr("id").length)).style("color","white");
							d3.select(this).select("rect").attr("fill","#262626");
							showZone(-1);
						});


			var padding = { top: 0, right: 0, bottom: 0, left: 0 };

			// svg.append("rect")
			// 			.attr("x",0)
			// 			.attr("y",padding.top)
			// 			.attr("width",width)
			// 			.attr("height",height - padding.top - padding.bottom)
			// 			.attr("fill","#262626");

			var speeddata = [];
			var countdata = [];

			var piece = dataset[z]["data"];

			for (var i = 0; i < piece.length; i+=20) {
				countdata.push({"time":piece[i]["time"],"count":piece[i]["count"]});
				speeddata.push({"time":piece[i]["time"],"speed":piece[i]["speed"]});
			}

			var maxCount = 0;

			// 确定自由行车速度
			var averCount = 0, _had = 0;
			for (var i = 0; i < countdata.length; i++) {
				if (countdata[i]["count"] > 0) {
					averCount += countdata[i]["count"];
					_had++;
					if (countdata[i]["count"] > maxCount)
						maxCount = countdata[i]["count"];
				}
			}
			averCount /= _had;
			var averSpeed = 0, had = 0;
			for (var i = 0; i < speeddata.length; i++) {
				if (speeddata[i]["speed"] > 0 && countdata[i]["count"] < averCount / 4) {
					averSpeed += speeddata[i]["speed"];
					had ++;
				}
			}
			averSpeed /= had;
			if (averSpeed == 0 || had == 0) {
				averSpeed = 0, had = 0;
				for (var i = 0; i < speeddata.length; i++) {
					if (speeddata[i]["speed"] > 0 && countdata[i]["count"] < averCount / 2) {
						averSpeed += speeddata[i]["speed"];
						had ++;
					}
				}
				averSpeed /= had*1.1;
			}
			if (averSpeed == 0 || had == 0) {
				averSpeed = 0, had = 0;
				for (var i = 0; i < speeddata.length; i++) {
					if (speeddata[i]["speed"] > 0 && countdata[i]["count"] < averCount) {
						averSpeed += speeddata[i]["speed"];
						had ++;
					}
				}
				averSpeed /= had*1.1;
			}
			if (averSpeed == 0 || had == 0) {
				averSpeed = 0, had = 0;
				for (var i = 0; i < speeddata.length; i++) {
					if (speeddata[i]["speed"] > 0) {
						averSpeed += speeddata[i]["speed"];
						had ++;
					}
				}
				averSpeed /= had*1.1;
			}

			d3.select("#ti"+z+"c").text(parseInt(maxCount+0.5));
			d3.select("#ti"+z+"d").text(parseInt(averCount+0.5) + " 辆");
			d3.select("#ti"+z+"e").text(parseInt(averSpeed*100+0.5)/100 + " m/s");

			// 还原零点
			for (var i = 0; i < speeddata.length; i++) {
				if (countdata[i]["count"] <= 5 || speeddata[i]["speed"]==-255) {
					speeddata[i]["speed"] = averSpeed;
				}
			}

			// 调整折线图显示效果
			for (var i = 0; i < speeddata.length; i++) {
				if (i > 0 && i < speeddata.length - 1) {
					speeddata[i]["speed"] = 
							Math.sqrt(Math.pow(speeddata[i]["speed"], 2) + Math.pow((speeddata[i-1]["speed"] + speeddata[i+1]["speed"]) / 2, 2));
					var aver = 0;
					var left = i < 10 ? 0 : i - 10;
					var right = i > speeddata.length - 11 ? speeddata.length - 1 : i + 10;
					for (var a = left; a <= right; a++)
						aver += speeddata[a]["speed"];
					aver /= (right - left + 1);
					if (speeddata[i]["speed"] >= aver * 1.2)
						speeddata[i]["speed"] = aver * 1.2;
				}
			}

			var xScale = d3.scale.linear()
							.domain([0, 8640])
							.range([0, width - padding.left - padding.right]);

			var yScale = d3.scale.linear()
							.domain([0, 100])
							.range([height - padding.top - padding.bottom, 0]);

			var yScale_s = d3.scale.linear()
							.domain([0, 40])
							.range([0, height - padding.top - padding.bottom]);

			var colortab1 = d3.interpolateRgb("#AFEEEE", "#4169E1");

			var colortab2 = d3.interpolateRgb("#FFFF00", "#FF0000");

			var tip = d3.select("#ti"+z+"c");

			var rect = svg.selectAll("rect")
						.data(countdata)
						.enter()
						.append("rect")
						.attr("class","rect")
						.attr("fill",function(d,i) {
							if (speeddata[i]["speed"] < averSpeed / 2) {
								if (d["count"] < parseInt(tip.text()))
									tip.text(d["count"]);
								return colortab2((d["count"]-(maxCount/4.8))/(maxCount-maxCount/4.8));
							}
							return colortab1(d["count"]/(maxCount/2.4));
						})
						.attr("x", function(d,i) {
							return padding.left + i * (width*2 - padding.left - padding.right)/(countdata.length+1);
						})
						.attr("y", function(d,i) {
							return padding.top + yScale(d["count"]);
						})
						.attr("width",(width - padding.left - padding.right)/(countdata.length+1))
						.attr("height",function(d) {
							return height - padding.top - padding.bottom - yScale(d["count"]);
						})
						.attr("transform","translate(-322,0)");

			tip.text(parseInt(Math.sqrt(parseInt(tip.text())*maxCount)) + " 辆");

			// 建立数组
			var status = [];
			for (var i = 0; i < speeddata.length; i++) {
				var bool = speeddata[i]["speed"] < averSpeed / 2 ? true : false;
				status.push({crowded:bool,start:speeddata[i]["time"],end:speeddata[i]["time"]})
			}
			var all = [];
			var update = status[0];
			var bool = status[0]["crowded"];
			for (var i = 1; i < status.length; i++) {
				if (status[i]["crowded"] == bool) {
					update["end"] = status[i]["end"];
				}
				else {
					all.push(update);
					update = status[i];
					bool = status[i]["crowded"];
				}
			}
			all.push(update);
			status = all;
			var minlen = status[0]["end"]-status[0]["start"];
			for (var i = 0; i < status.length; i++) {
				if (minlen > status[i]["end"]-status[i]["start"])
					minlen = status[i]["end"]-status[i]["start"];
			}
			// 迭代至分堆最小时间跨度大于二十分钟
			while (minlen < 1200) {
				for (var i = 1; i < status.length-1; i++) {
					if (status[i]["end"]-status[i]["start"] >= 1200 && status[i]["crowded"]==true)
						continue;
					if (status[i]["end"]-status[i]["start"] < (status[i+1]["end"]-status[i-1]["start"])/4) {
						status[i]["crowded"] = status[i+1]["crowded"];
					}
				}
				try {
					if (status[status.length-1]["end"]-status[status.length-1]["start"] >= 1200 && status[status.length-1]["crowded"]==true);
					else if (status[status.length-1]["end"]-status[status.length-1]["start"] 
								< (status[status.length-2]["end"]-status[status.length-2]["start"])/3) {
						status[status.length-1]["crowded"] = status[status.length-2]["crowded"];
					}
				} catch (error) {
					break;
				}
				var all = [];
				var update = status[0];
				var bool = status[0]["crowded"];
				for (var i = 1; i < status.length; i++) {
					if (status[i]["crowded"] == bool) {
						update["end"] = status[i]["end"];
					}
					else {
						all.push(update);
						update = status[i];
						bool = status[i]["crowded"];
					}
				}
				all.push(update);
				status = all;
				minlen = status[0]["end"]-status[0]["start"];
				for (var i = 0; i < status.length; i++) {
					if (minlen > status[i]["end"]-status[i]["start"])
						minlen = status[i]["end"]-status[i]["start"];
				}
			}
			for (var i = 0; i < status.length; i++) {
				if (status[i]["crowded"] == true) {
					if (d3.select("#ti"+z+"f").html() == " - ")
						d3.select("#ti"+z+"f").html(str2time(status[i]["start"]) + " - " + str2time(status[i]["end"]));
					else
						d3.select("#ti"+z+"f").html(d3.select("#ti"+z+"f").html() 
														+ "<br />" + str2time(status[i]["start"]) + " - " + str2time(status[i]["end"]));
					d3.select("#svg"+z)
						.append("rect")
						.attr("class", "will")
						.attr("x", function() {
							return padding.left + parseInt(status[i]["start"]/10) * (width*2 - padding.left - padding.right)/8641;
						})
						.attr("y", function() {
							return padding.top;
						})
						.attr("width", function() {
							return padding.left + parseInt(status[i]["end"]/10) * (width*2 - padding.left - padding.right)/8641 
									- d3.select(this).attr("x");
						})
						.attr("height", height - padding.top - padding.bottom)
						.attr("transform","translate(-322,0)")
						.attr("fill", "red")
						.attr("opacity", 0.3);
				}
			}

			var linePath = d3.svg.line()
				.interpolate("linear")
				.x(function(d){ return padding.left + d["time"]/86410 * (2*width - padding.left - padding.right); })
				.y(function(d){ return padding.top + yScale_s(d["speed"]); });

			svg.selectAll("path")
				.data([speeddata])
				.enter()
				.append("path")
				.attr("class","path")
				.attr("transform","translate(-322,0)")
				.attr("d", function(d) {
					return linePath(d);
				})
				.attr("fill","none")
				.attr("stroke-width",0.7)
				.attr("stroke", "yellow");
		}

		//表格紧凑
		d3.select("#table")
			.select("table")
			.selectAll("td")
			.style("padding","4.51px 6px");
	});
}
// 信息
{
	var tipBox = d3.select("#table")
		.style("overflow","hidden")
		.style("padding","0px")
		.append("table")
		.attr("border","0")
		.style("margin","0px 14px 0px 10px");


	function str2time(str) {
		var hour = parseInt(parseInt(str)/3600);
		var minute = parseInt((parseInt(str)%3600)/60);
		if (minute < 10)
			minute = "0" + minute;
		return hour + ":" + minute;
	}


	var tablehead_ti = tipBox.append("tr").style("font-size","12px");
	tablehead_ti.append("th").style("width","40px").text("id");
	tablehead_ti.append("th").style("width","220px").text("位置");
	tablehead_ti.append("th").style("font-size","10px").style("width","85px").text("车辆承载量");
	tablehead_ti.append("th").style("font-size","10px").style("width","100px").text("平均实时流量");
	tablehead_ti.append("th").style("font-size","10px").style("width","100px").text("自由行车速度");
	tablehead_ti.append("th").style("width","160px").text("拥堵时段");

	for (var i = 0; i < 11; i++) {
		var tablecontent_ti = tipBox.append("tr").attr("id","line"+i).style("font-size","12px").style("line-height","16.4px")
						.on("mouseover",function() {
							d3.select("#line"+(parseInt(d3.select(this).attr("id").substring(4,d3.select(this).attr("id").length))+1))
										.select("rect").attr("fill","black");
							d3.select(this).style("color","rgb(30,180,220)");
							showZone(d3.select(this).attr("id").substring(4,d3.select(this).attr("id").length))
						})			
						.on("mouseout",function() {
							d3.select("#line"+(parseInt(d3.select(this).attr("id").substring(4,d3.select(this).attr("id").length))+1))
										.select("rect").attr("fill","#262626");
							d3.select(this).style("color","white");
							showZone(-1);
						});
		tablecontent_ti.append("td").attr("id","ti"+i+"a").text(i+1);
		tablecontent_ti.append("td").attr("id","ti"+i+"b").text(" ? ");
		tablecontent_ti.append("td").attr("id","ti"+i+"c").text("0");
		tablecontent_ti.append("td").attr("id","ti"+i+"d").text("0");
		tablecontent_ti.append("td").attr("id","ti"+i+"e").text("no record");
		tablecontent_ti.append("td").attr("id","ti"+i+"f").text(" - ");
		tablecontent_ti.selectAll("td")
					.style("background-color",function() {
						return i % 2 == 0 ? "" : "";
					})
					.style("padding","4.51px 6px");
	}

	d3.select("#ti0b").text("剑南大道与武汉路交叉口");
	d3.select("#ti1b").text("剑南大道南一段南端");
	d3.select("#ti2b").text("剑南大道与沈阳路交叉口");
	d3.select("#ti3b").text("剑南大道南一段北端");
	d3.select("#ti4b").text("祥鹤四街西段");
	d3.select("#ti5b").text("祥鹤四街东段");
	d3.select("#ti6b").text("沈阳路西段优品道锦绣附近");
	d3.select("#ti7b").text("沈阳路西段天府四中附近");
	d3.select("#ti8b").text("沿河道路北段");
	d3.select("#ti9b").text("龙马路东段");
	d3.select("#ti10b").text("武汉路西段东端");
}