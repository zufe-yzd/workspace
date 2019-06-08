// 监控区域
{
	$.getJSON("/data/zones.json",function(dataset){
		var width = 322;
		var height = 110;
		for (var z = 0; z < 11; z++) {
			var svg = d3.select("#zone"+(z+1))
						.style("overflow","hidden")
						.style("padding","0px")
						.append("div")
						.style("top","10px")
						.append("svg")
						.attr("id","svg"+z)
						.attr("width",width)
						.attr("height",height)
						.style("border","1px solid #333")
						.on("mouseover",function() {
							d3.select("#line"+d3.select(this).attr("id").substring(3,d3.select(this).attr("id").length)).style("color","LawnGreen");
							d3.select(this).select("rect").attr("fill","black");
						})
						.on("mouseout",function() {
							d3.select("#line"+d3.select(this).attr("id").substring(3,d3.select(this).attr("id").length)).style("color","white");
							d3.select(this).select("rect").attr("fill","#222");
						});


			var padding = { top: 0, right: 0, bottom: 0, left: 0 };

			svg.append("rect")
						.attr("x",0)
						.attr("y",padding.top)
						.attr("width",width)
						.attr("height",height - padding.top - padding.bottom)
						.attr("fill","#222");

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
			d3.select("#ti"+z+"d").text(parseInt(averCount+0.5) + " ρ½辆");
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
					speeddata[i]["speed"] = Math.sqrt(Math.pow(speeddata[i]["speed"], 2) + Math.pow((speeddata[i-1]["speed"] + speeddata[i+1]["speed"]) / 2, 2));
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

			tip.text(parseInt(Math.sqrt(parseInt(tip.text())*maxCount)) + " ρ½辆");


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
	});
}
// 信息
{
	var tipBox = d3.select("#table")
		.style("overflow","hidden")
		.append("table")
		.attr("border","0")
		.style("margin","0px");


	var tablehead_ti = tipBox.append("tr").style("font-size","12px");
	tablehead_ti.append("th").style("width","40px").text("id");
	tablehead_ti.append("th").style("width","200px").text("位置");
	tablehead_ti.append("th").style("width","100px").text("车辆承载量");
	tablehead_ti.append("th").style("width","120px").text("平均实时流量");
	tablehead_ti.append("th").style("width","100px").text("自由行车速度");
	tablehead_ti.append("th").style("width","120px").text("拥堵时段");

	for (var i = 0; i < 11; i++) {
		var tablecontent_ti = tipBox.append("tr").attr("id","line"+i).style("font-size","12px").style("line-height","1.4em")
						.on("mouseover",function() {
							d3.select("#zone"+d3.select(this).attr("id").substring(4,d3.select(this).attr("id").length)).select("rect").attr("fill","black");
							d3.select(this).style("color","LawnGreen");
						})
						.on("mouseout",function() {
							d3.select("#zone"+d3.select(this).attr("id").substring(4,d3.select(this).attr("id").length)).select("rect").attr("fill","#222");
							d3.select(this).style("color","white");
						});;
		tablecontent_ti.append("td").attr("id","ti"+i+"a").text(i+1);
		tablecontent_ti.append("td").attr("id","ti"+i+"b").text(" ? ");
		tablecontent_ti.append("td").attr("id","ti"+i+"c").text("0");
		tablecontent_ti.append("td").attr("id","ti"+i+"d").text("0");
		tablecontent_ti.append("td").attr("id","ti"+i+"e").text("no record");
		tablecontent_ti.append("td").attr("id","ti"+i+"f").text(" - ");
		tablecontent_ti.selectAll("td").style("background-color",function() {
			return i % 2 == 0 ? "#222222" : "#555555";
		});
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