// 监控区域
{
	$.getJSON("/data/zones.json",function(dataset){
		var width = 322;
		var height = 110;
		for (var z = 0; z < 12; z++) {
			var svg = d3.select("#zone"+z)
						.style("overflow","hidden")
						.style("padding","0px")
						.append("div")
						.style("top","10px")
						.append("svg")
						.attr("id","svg"+z)
						.attr("width",width)
						.attr("height",height)
						.style("border","1px solid #333");


			var padding = { top: 0, right: 0, bottom: 0, left: 0 };

			svg.append("rect")
						.attr("x",0)
						.attr("y",padding.top)
						.attr("width",width)
						.attr("height",height - padding.top - padding.bottom)
						.attr("fill","#333");

			var speeddata = [];
			var countdata = [];

			var piece = dataset[z]["data"];

			for (var i = 0; i < piece.length; i+=10) {
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

			var rect = svg.selectAll("rect")
						.data(countdata)
						.enter()
						.append("rect")
						.attr("class","rect")
						.attr("fill",function(d,i) {
							if (speeddata[i]["speed"] < averSpeed / 2)
								return colortab2((d["count"]-(maxCount/4.8))/(maxCount-maxCount/4.8));
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

			// d3.select("#time").text("15:0:0");
			// d3.select("#count").text(data[5400]["count"]);
			// d3.select("#speed").text(parseInt(speeddata[5400]["speed"]*10)/10+"m/s");

			// if (speeddata[selected]["speed"] < averSpeed / 2)
			// 	d3.select("#speed").style("color","red");
			// else
			// 	d3.select("#speed").style("color","LawnGreen");
			// if (data[selected]["count"] < averCount * 2)
			// 	d3.select("#count").style("color","green");
			// else
			// 	d3.select("#count").style("color","orange");


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
