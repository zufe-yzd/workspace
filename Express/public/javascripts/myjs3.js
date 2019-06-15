// 地图
/*
{
	var _Width = 430;
	var _Height = 457;
	var _Parent = d3.select('#map');
	var _SVG = null;
	var _ShowPoints = true;
	var _Decimal = 1000;

	try {
		d3.select('#map').style("padding","0px");
		_SVG = _Parent.append("svg").attr("id","map-container").attr("width",_Width).attr("height",_Height).style("border","1px solid black");
	} catch(error) {
		console.log("ERROR: Unable to get the parent node.");
	}
	try {
		var pattern = _SVG.append("defs").append("pattern").attr("id","background-image").attr("width",1).attr("height",1).attr("patternUnits","objectBoundingBox");
		pattern.append("image").attr("xlink:href","./images/chengdu.png").attr("width",_Width).attr("height",_Height);
	} catch(error) {
		console.log("ERROR: Unable to load the image.");
	}
	try {
		var _chart = _SVG.append("rect").attr("id","background").attr("width",_Width).attr("height",_Height).attr("x",0).attr("y",0).style("fill","url(#background-image)");
	} catch(error) {
		console.log("ERROR: Unable to load the image.");
	}

	$.getJSON("/data/nodes.json",function(dataset){
		var _Data = dataset;

		_SVG.selectAll(".datapoint")
			.data(_Data)
			.enter()
			.append("circle")
			.attr("fill","#286690")
			.each(function(d) {
				d3.select(this).attr("class", "datapoint Z-"+d[3]+" "+d[2]);
			})
			.style("opacity",0.5)
			.attr("cx",function(d) {
				return _Width*(d[0]-103.7175)/(104.4090-103.7175);
			})
			.attr("cy",function(d) {
				return _Height-(_Height*(d[1]-30.3145)/(30.9441-30.3145));
			})
			.style("visibility","visible")
			.style("stroke","#eee")
			.style("stroke-width",0.2)
			.attr("r", 1.6);
	});

	d3.select("#chart1").append("div")
					.html('<button type="button" class="btn btn-default" id="getons" style="float: left; margin: 42px 58px; color: white; background: #428BCA;">上车坐标</button>\
							<button type="button" class="btn btn-default" id="getoffs" style="float: left; margin: 42px 58px; color: white; background: #428BCA;">下车坐标</button>');

	d3.select("#getons")
		.on("mouseover",function() {
			d3.select(this).style("background","#84CDFF");
			_SVG.selectAll(".geton")
				.style("fill","#00FFFF");
		})
		.on("mouseout",function() {
			if (d3.select(".geton").style("visibility") == "visible") {
				d3.select(this).style("background","#428BCA");
				_SVG.selectAll(".geton")
					.style("fill","#286690");
			}
			else {
				d3.select(this).style("background","#666666");
				_SVG.selectAll(".geton")
					.style("fill","#286690");
			}
		})
		.on("click",function() {
			if (d3.select(".geton").style("visibility") == "visible") {
				d3.select(this).style("background","#666666");
				_SVG.selectAll(".geton")
					.style("visibility","hidden");
			}
			else {
				d3.select(this).style("background","#428BCA");
				_SVG.selectAll(".geton")
					.style("visibility","visible");
			}
		});
	d3.select("#getoffs")
		.on("mouseover",function() {
			d3.select(this).style("background","#84CDFF");
			_SVG.selectAll(".getoff")
				.style("fill","#FFFF00");
		})
		.on("mouseout",function() {
			if (d3.select(".getoff").style("visibility") == "visible") {
				d3.select(this).style("background","#428BCA");
				_SVG.selectAll(".getoff")
					.style("fill","#286690");
			}
			else {
				d3.select(this).style("background","#666666");
				_SVG.selectAll(".getoff")
					.style("fill","#286690");
			}
		})
		.on("click",function() {
		if (d3.select(".getoff").style("visibility") == "visible") {
			d3.select(this).style("background","#666666");
			_SVG.selectAll(".getoff")
				.style("visibility","hidden");
		}
		else {
			d3.select(this).style("background","#428BCA");
			_SVG.selectAll(".getoff")
				.style("visibility","visible");
		}
	});
}
*/
// 力导向图
{
	var svgForce = d3.select("#map0").append("svg")
				.attr("id","forcechart")
				.attr("width","100%")
				.attr("height","100%");

	var nodes = [];

	for (var i = 1; i < 12; i++) {
		nodes.push({name: i});
	}

	var edges = [];

	$.getJSON("/data/Q2_lines.json",function(dataset){
		for (var i = 0; i < dataset.length; i++) {
			edges.push({source:dataset[i][0]-1,target:dataset[i][1]-1});
		}

		var force = d3.layout.force()
					.nodes(nodes)
					.links(edges)
					.size([500,500])
					.linkDistance(260)
					.charge(-100);

		force.start();

		console.log(nodes);
		console.log(edges);

		var colorTable = d3.scale.category20();

		var zone = null;

		var lines = svgForce.selectAll(".forceLine")
						.data(edges)
						.enter()
						.append("line")
						.attr("id",function(d,i) {
							return "L"+i;
						})
						.attr("transform","translate(10,30)")
						.attr("class","forceLine")
						.style("stroke","rgba(66,139,202,0.3)")
						.style("stroke-width",0.2);

		var circles = svgForce.selectAll(".forceCircle")
						.data(nodes)
						.enter()
						.append("circle")
						.attr("transform","translate(10,30)")
						.attr("id",function(d) {
							return "P-" + d["name"];
						})
						.attr("class","forceCircle")
						.attr("r",8)
						.style("fill",function(d,i) {
							return colorTable(i);
						})
						.style("stroke","white")
						.style("stroke-width",1)
						.call(force.drag)
						.on("mouseover",function() {
							d3.select(this)
								.attr("r",10)
								.style("stroke","gold");
							/*
							var Xmin = 0;
							var Ymin = 0;
							var Xmax = 0;
							var Ymax = 0;
							d3.selectAll(".Z-"+d3.select(this).attr("id").substring(2,d3.select(this).attr("id").length))
								.style("fill","red")
								.style("stroke-width",0.6)
								.style("stroke","#222")
								.attr("r", 3)
								.each(function() {
									if (Xmin==0) {
										Xmin = d3.select(this).attr("cx");
										Xmax = d3.select(this).attr("cx");
										Ymin = d3.select(this).attr("cy");
										Ymax = d3.select(this).attr("cy");
									}
									if (d3.select(this).attr("cx") > Xmax)
										Xmax = d3.select(this).attr("cx");
									else if (d3.select(this).attr("cx") < Xmin)
										Xmin = d3.select(this).attr("cx");
									if (d3.select(this).attr("cy") > Ymax)
										Ymax = d3.select(this).attr("cy");
									else if (d3.select(this).attr("cy") < Ymin)
										Ymin = d3.select(this).attr("cy");
								});
							zone = _SVG.append("rect")
										.attr("x",Xmin-4)
										.attr("y",Ymin-4)
										.attr("width",Xmax-Xmin+8)
										.attr("height",Ymax-Ymin+8)
										.attr("fill","white")
										.attr("fill-opacity",0.2)
										.attr("stroke","orange")
										.attr("stroke-width",2);
							*/
						})
						.on("mouseout",function() {
							d3.select(this)
								.attr("r",8)
								.style("stroke","white");
							/*
							d3.selectAll(".Z-"+d3.select(this).attr("id").substring(2,d3.select(this).attr("id").length))
								.style("fill","#286690")
								.style("stroke-width",0.2)
								.style("stroke","#eee")
								.attr("r", 1.6);
							zone.remove();
							zone = null;
							*/
						});

		force.on("tick", function () {
			if(force.alpha()<=0.05) {  // 足够稳定时，才渲染一次
				lines.attr("x1", function (d) { return d.source.x; })
					.attr("y1", function (d) { return d.source.y; })
					.attr("x2", function (d) { return d.target.x; })
					.attr("y2", function (d) { return d.target.y; });
				circles.attr("cx", function (d) { return d.x; })
					.attr("cy", function (d) { return d.y; });

				force.stop(); // 渲染完成后立即停止刷新
			}
		});

		force.on("start", function() {
			console.log("运动开始");
		});
		force.on("end", function() {
			console.log("运动结束");
		});
	});
}
