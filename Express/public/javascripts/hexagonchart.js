console.log("Thank you for using hexagonchart.js, writen by ZhenDong Yang, 2019-5-24");

var ZDY = window.NameSpace || {};

var _ID = 0;

ZDY.Chart = function Chart() {
	_ID++;
	this.ID = "containerX"+_ID;
	this.Title = "Chart "+_ID;
	this.isSubChart = false;
	this.ShowSubChart = false;
	this.Brushable = true;
	this.Brush = null;
	this.SubChart = null;
	this.Width = 600;
	this.Height = 400;
	this.Size = 20;
	this.Parent = d3.select('body');
	this.SVG = null;
	this.ToolTip = null;
	this.Xmin = 0;
	this.Xmax = 100;
	this.Ymin = 0;
	this.Ymax = 100;
	this.Data = [];
	this.ShowPoints = true;
	this.Decimal = 100;
	this.Background = "";
	this.Color = "#0000FF";
	this.Min = 0;
	this.Max = 10;
	this.Compute = "linear";
	this.ShowToolTip = true;
	this.Counter = [];
};

ZDY.Chart.prototype.Clear = function() {
	document.getElementById(this.ID).remove();
	document.getElementById("tooltip"+this.ID).remove();
	this.SVG = null;
}

ZDY.Chart.prototype.SetParent = function(parent) {
	this.Parent = parent;
};

ZDY.Chart.prototype.SetDecimal = function(len) {
	this.Decimal = Math.pow(10,len);
	if (this.Decimal<1)
		this.Decimal = 1;
}

ZDY.Chart.prototype.SetBackground = function(url) {
	this.Background = url;
}

ZDY.Chart.prototype.SetColor = function(color) {
	this.Color = color;
}

ZDY.Chart.prototype.SetTitle = function(title) {
	this.Title = title;
}

ZDY.Chart.prototype.SetRange = function(min, max) {
	try {
		this.Min = min;
		this.Max = max;
	} catch (error) {
		console.log("HexagonChart ERROR #5: Illegal extent format.");
	}
};

ZDY.Chart.prototype.SetCompute = function(compute) {
	this.Compute = compute;
}

ZDY.Chart.prototype.CreateSvg = function(width, height) {
	if (this.SVG != null) {
		console.log("HexagonChart ERROR #2: SVG element already existed.");
		return;
	}
	width = width < 80 ? 80 : width;
	height = height < 80 ? 80 : height;
	this.Width = width;
	this.Height = height;
	var ID = this.ID;
	try {
		this.SVG = this.Parent.append("svg").attr("id",ID).attr("width",width).attr("height",height).style("border","1px solid black");
		this.ToolTip = this.Parent.append("div").attr("id","tooltip"+ID).style("visibility","hidden").style("position","absolute").style("border","1px solid black").style("padding","0px 10px").style("background-color","#FFFFDD").text("location");
		this.SVG.on("mouseover",function() {
					d3.select("#tooltip"+ID).style("visibility","visible");
				})
				.on("mouseout",function() {
					d3.select("#tooltip"+ID).style("visibility","hidden");
				});
	} catch(error) {
		console.log("HexagonChart ERROR #1: Unable to get the parent node.");
	}
	if (this.Background == "")
		return;
	try {
		var url = this.Background;
		var pattern = this.SVG.append("defs").append("pattern").attr("id","background-image"+ID).attr("width",1).attr("height",1).attr("patternUnits","objectBoundingBox");
		pattern.append("image").attr("xlink:href","./"+url).attr("width",width).attr("height",height);
	} catch(error) {
		console.log("HexagonChart ERROR #4: Unable to load the image.");
	}
};

ZDY.Chart.prototype.SetSize = function(size) {
	size = size > this.Width/16 ? this.Width/16 : size > this.Height/16 ? this.Height/16 : size;
	size = size < this.Width/80 ? this.Width / 80 : size < this.Height/80 ? this.Height/80 : size;
	this.Size = size;
};

ZDY.Chart.prototype.SetExtent = function(extent) {
	try {
		this.Xmin = extent[0][0];
		this.Xmax = extent[0][1];
		this.Ymin = extent[1][0];
		this.Ymax = extent[1][1];
	} catch (error) {
		console.log("HexagonChart ERROR #5: Illegal extent format.");
	}
};

ZDY.Chart.prototype.Display = function(data) {
	this.Data = data;
};

ZDY.Chart.prototype.Draw = function() {
	this.SVG.selectAll("rect").remove();
	this.SVG.selectAll(".hexagon").remove();
	this.SVG.selectAll(".datapoint").remove();
	this.Counter = [];
	for (var y = 0; y < this.Height+this.Size*1.772; y += this.Size*1.772) {
		this.Counter.push([]);
		this.Counter.push([]);
		for (var x = 0; x < this.Width+this.Size*3; x += this.Size*3) {
			this.Counter[parseInt(y/(this.Size*1.772)*2)].push(0);
			this.Counter[parseInt(y/(this.Size*1.772)*2)+1].push(0);
		}
	}
	if (this.Background != "") {
		try {
			var ID = this.ID;
			this.SVG.append("rect").attr("id","background").attr("width",this.Width).attr("height",this.Height).attr("x",0).attr("y",0).style("fill","url(#background-image"+ID+")");
		} catch(error) {
			console.log("HexagonChart ERROR #4: Unable to load the image.");
		}
	}
	var size = this.Size;
	var svg = this.SVG;
	var color = this.Color;
	if (this.Data.length == 0) {
		console.log("HexagonChart warning: No data.");
	}
	else {
		try {
			var r = this.Size / Math.log(this.Data.length);
			r = r < 0.4 ? 0.4 : r;
			var width = this.Width;
			var height = this.Height;
			var x1 = this.Xmin;
			var x2 = this.Xmax;
			var y1 = this.Ymin;
			var y2 = this.Ymax;
			var count = this.Counter;
			svg.selectAll(".datapoint")
				.data(this.Data)
				.enter()
				.append("circle")
				.classed("datapoint",true)
				.attr("fill","black")
				.style("opacity",0.64)
				.each(function(d){
					var cx = width*(d[0]-x1)/(x2-x1);
					var cy = height-(height*(d[1]-y1)/(y2-y1));
					d3.select(this).attr("cx",cx).attr("cy",cy);
					var toX = parseInt((cx+size*3/4) / (size*3));
					var toY = 0;
					if (toX % 2 == 0)
						toY = parseInt((cy+size*0.886) / (size*1.772)) * 2;
					else
						toY = parseInt(cy / (size*1.772)) * 2 + 1;
					if (toX>=0 && toX<count[0].length && toY>=0 && toY<count.length) {
						count[toY][toX]++;
					}
				})
				.attr("r", r);
		} catch(error) {
			console.log("HexagonChart ERROR #3: Failed to parse the data, please check the format of it.");
		}
	}
	var compute = this.Compute;
	var min = this.Min;
	var max = this.Max;
	var count = this.Counter;
	var decimal = this.Decimal;
	var title = this.Title;
	var ID = this.ID;
	var ToolTipName = "#tooltip"+ID;
	for (var y = 0; y < this.Height+this.Size*1.772; y += this.Size*1.772) {
		for (var x = 0; x < this.Width+this.Size*3; x += this.Size*3) {
			svg.append("polygon")
				.attr("points",
					(x-size/2)+","+(y-size*0.886)
					+" "+(x+size/2)+","+(y-size*0.886)
					+" "+(x+size)+","+(y)
					+" "+(x+size/2)+","+(y+size*0.886)
					+" "+(x-size/2)+","+(y+size*0.886)
					+" "+(x-size)+","+(y))
				.attr("id",function() {
					return "H-"+parseInt(y/(size*1.772)*2)+"-"+parseInt(x/(size*3));
				})
				.classed("hexagon",true)
				.style("stroke","black")
				.style("stroke-width",0.2)
				.style("fill",color)
				.style("fill-opacity",function() {
					var opacity = 0;
					switch (compute) {
						case "power":
							opacity = Math.pow(1.8,(count[parseInt(y/(size*1.772)*2)][parseInt(x/(size*3))]-min)/(max-min))-1;
							break;
						case "log":
							opacity = 0.8*Math.log(1+Math.E*(count[parseInt(y/(size*1.772)*2)][parseInt(x/(size*3))]-min)/(max-min));
							break;
						default:
							opacity = 0.8*(count[parseInt(y/(size*1.772)*2+1)][parseInt(x/(size*3))]-min)/(max-min);
					}
					opacity = opacity > 0.8 ? 0.8 : opacity;
					return opacity;
				})
				.on("mousemove",function() {
					var dx = parseInt(d3.event.pageX-document.getElementById(ID).getBoundingClientRect().x);
					var dy = parseInt(d3.event.pageY-document.getElementById(ID).getBoundingClientRect().y);
					dx = parseInt((dx*(x2-x1)/width+x1)*decimal)/decimal;
					dy = parseInt(((height-dy)/height*(y2-y1)+y1)*decimal)/decimal;
					var text = title+"<br />"+dx+", "+dy+"<br />count: "+count[parseInt(this.id.substring(2,this.id.lastIndexOf('-')))][parseInt(this.id.substring(this.id.lastIndexOf('-')+1))];
					d3.select(ToolTipName).style("left",(d3.event.pageX+20)+"px").style("top",(d3.event.pageY+10)+"px")
						.html(text);
				});

			svg.append("polygon")
				.attr("points",
					(x+size)+","+(y)
					+" "+(x+size*2)+","+(y)
					+" "+(x+size*5/2)+","+(y+size*0.886)
					+" "+(x+size*2)+","+(y+size*1.772)
					+" "+(x+size)+","+(y+size*1.772)
					+" "+(x+size/2)+","+(y+size*0.886))
				.attr("id",function() {
					return "H-"+parseInt(y/(size*1.772)*2+1)+"-"+parseInt(x/(size*3));
				})
				.classed("hexagon",true)
				.style("stroke","black")
				.style("stroke-width",0.2)
				.style("fill",color)
				.style("fill-opacity",function() {
					var opacity = 0;
					switch (compute) {
						case "power":
							opacity = Math.pow(1.8,(count[parseInt(y/(size*1.772)*2+1)][parseInt(x/(size*3))]-min)/(max-min))-1;
							break;
						case "log":
							opacity = 0.8*Math.log(1+Math.E*(count[parseInt(y/(size*1.772)*2+1)][parseInt(x/(size*3))]-min)/(max-min));
							break;
						default:
							opacity = 0.8*(count[parseInt(y/(size*1.772)*2+1)][parseInt(x/(size*3))]-min)/(max-min);
					}
					opacity = opacity > 0.8 ? 0.8 : opacity;
					return opacity;
				})
				.on("mousemove",function() {
					var dx = parseInt(d3.event.pageX-document.getElementById(ID).getBoundingClientRect().x);
					var dy = parseInt(d3.event.pageY-document.getElementById(ID).getBoundingClientRect().y);
					dx = parseInt((dx*(x2-x1)/width+x1)*decimal)/decimal;
					dy = parseInt(((height-dy)/height*(y2-y1)+y1)*decimal)/decimal;
					var text = title+"<br />"+dx+", "+dy+"<br />count: "+count[parseInt(this.id.substring(2,this.id.lastIndexOf('-')))][parseInt(this.id.substring(this.id.lastIndexOf('-')+1))];
					d3.select(ToolTipName).style("left",(d3.event.pageX+20)+"px").style("top",(d3.event.pageY+10)+"px")
						.html(text);
				});
		}
	}
	if (!this.ShowPoints)
		this.SVG.selectAll(".datapoint").remove();
	if (!this.isSubChart) {
		this.Parent.selectAll(".brush").remove();
		this.Brush = new ZDY.Brush(this.SVG, this.ID, this);
	}
	if (!this.isSubChart && this.ShowSubChart) {
		if (this.SubChart == null) {
			this.SubChart = new ZDY.Chart();
			this.SubChart.ID = this.ID + "[sub]";
			this.SubChart.ShowSubChart = false;
			this.SubChart.isSubChart = true;
			this.SubChart.SetParent(this.Parent);
			this.SubChart.SetTitle(this.Chart);
			this.SubChart.SetBackground(this.Background);
			this.SubChart.SetSize(this.Size);
			this.SubChart.SetColor(this.Color);
			this.SubChart.CreateSvg(this.Width, this.Height);
			this.SubChart.SetExtent([[this.Xmin,this.Xmax],[this.Ymin,this.Ymax]]);
			this.SubChart.Display(this.Data);
			this.SubChart.ShowPoints = false;
			this.SubChart.SetRange(this.Min,this.Max);
			this.SubChart.SetDecimal(this.Decimal);
			this.SubChart.SetCompute(this.Compute);
		}
		this.SubChart.Draw();
	}
};



ZDY.Brush = function Brush(parent, parentID, container) {
	this.Parent = parent;
	this.Container = container;
	this.Rect = parent.append("rect")
					.classed("brush", true)
					.attr("x", 0)
					.attr("y", 0)
					.attr("width", 0)
					.attr("height", 0)
					.style("fill", "#223366")
					.style("stroke", "#0000FF")
					.style("stroke-width", 2)
					.style("fill-opacity", 0.4)
					.style("opacity", 0);
	var brush = this.Rect;
	var container = this.Container;
	var ID = parentID;
	this.Parent.on("mousedown", function() {
		brush.attr("x", d3.event.pageX-document.getElementById(ID).getBoundingClientRect().x)
			.attr("y", d3.event.pageY-document.getElementById(ID).getBoundingClientRect().y)
			.style("opacity", 0.8);
	});
	this.Parent.on("mousemove", function() {
		if (brush.style("fill-opacity")!="0") {
			brush.attr("width", function() {
					return d3.event.pageX - document.getElementById(ID).getBoundingClientRect().x - d3.select(this).attr("x");
				})
				.attr("height", function() {
					return d3.event.pageY - document.getElementById(ID).getBoundingClientRect().y - d3.select(this).attr("y");
				});
		}
	});
	this.Parent.on("mouseup", function() {
		container.SubChart.Clear();

		var x1 = brush.attr("x");
		var x2 = parseInt(brush.attr("x")) + parseInt(brush.attr("width"));
		var y1 = brush.attr("y");
		var y2 = parseInt(brush.attr("y")) + parseInt(brush.attr("height"));

		container.SubChart.SetBackground(container.Background);
		container.SubChart.SetBackground("");
		d3.select("#background-image"+ID+"[sub]").select("image").attr("style", "clip:rect("+x1+","+y1+","+x1+","+y2+")");
		container.SubChart.CreateSvg((x2-x1)/(y2-y1)*container.Height, container.Height);

		x1 = x1*(container.Xmax-container.Xmin)/container.Width+container.Xmin;
		x2 = x2*(container.Xmax-container.Xmin)/container.Width+container.Xmin;
		y1 = (container.Height-y1)/container.Height*(container.Ymax-container.Ymin)+container.Ymin;
		y2 = (container.Height-y2)/container.Height*(container.Ymax-container.Ymin)+container.Ymin;

		brush.attr("width", 0)
			.attr("height", 0)
			.style("opacity", 0);

		container.SubChart.SetExtent([[x1,x2],[y2,y1]]);
		container.SubChart.Display(container.Data);		
		container.SubChart.ShowPoints = true;
		container.SubChart.Draw();
	});
}