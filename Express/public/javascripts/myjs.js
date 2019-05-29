var gps = [];
var time = Math.floor(Math.random()*(86390 - 130) + 130);
var a = (parseInt)(time/10);
console.log(a)

$.getJSON("/data/gps_by_time_match.json",function(dataset){
	for (var i = 0; i < dataset.length; i++) {
		gps.push([]);
		if (dataset[i]["data"].length==0)
			gps[i].push({"lat":null, "lng":null,"count":1});
		for (var j = 0; j < dataset[i]["data"].length; j++) {
			gps[i].push({"lat":dataset[i]["data"][j][1]+0.0025, "lng":dataset[i]["data"][j][0]-0.0025,"count":1});
		}
	}

	draw();
	
	// for(var i = 0; i < 13; i++){
	// 	gps.push({"lat":null,"lng":null})
	// 	data.push({"time":i*10,"data":null})
	// }
	// for(var i = 0; i < dataset.length; i++){
	// 	for(var j = 0; j < dataset[i]["data"].length; j++){
	// 		data.push({"time":dataset[i]["time"],"lat":dataset[i]["data"][j]})
	// 	gpsTime.push({"time":dataset[i]["time"],"lat":dataset[i]["data"][j][0],"lng":dataset[i]["data"][j][1]});	
	// }
					
	// }
	// console.log(gpsTime);
	// console.log(data)
	
	// for(var i = 0; i < 13; i++){
	// 	gps.push({"lat":null,"lng":null});
	// }
	// for(var i = 13; i < 8640; i++){
	// 	for(var j = 0; j < dataset[i]["data"].length; j++){
	// 			gps.push({"lat":dataset[i]["data"][j][0],"lng":dataset[i]["data"][j][1]})
	// 	}
	// }
	
// });
});

var timer = 6400;

// setTimeout("draw(timer)", 6000);

function draw(time) {
	time = parseInt(Math.random() * 8640);

	console.log(gps);
	
	var testData = {
			max: 1,
			data: gps[time]
			};        

	timer += 10;

	var baseLayer = L.tileLayer(
			'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
			attribution: '...',
			maxZoom: 20,
			minZoom: 14
			}
		);
	var cfg = {
			// radius should be small ONLY if scaleRadius is true (or small radius is intended)
			// if scaleRadius is false it will be the constant radius used in pixels
			"radius": 10,
			"maxOpacity": .8, 
			// scales the radius based on map zoom
			"scaleRadius": false, 
			// if set to false the heatmap uses the global maximum for colorization
			// if activated: uses the data maximum within the current map boundaries 
			//   (there will always be a red spot with useLocalExtremas true)
			"useLocalExtrema": true,
			// which field name in your data represents the latitude - default "lat"
			latField: 'lat',
			// which field name in your data represents the longitude - default "lng"
			lngField: 'lng',
			// which field name in your data represents the data value - default "value"
			valueField: 'count'
		};


	var heatmapLayer = new HeatmapOverlay(cfg);

	var map1 = new L.Map('map', {
			center: new L.LatLng(30.463, 104.0328),//(30.4594579639, 104.0357266458),
			zoom: 14,
			layers: [baseLayer, heatmapLayer]
		});

	heatmapLayer.setData(testData);

	//多边形
    var polygon = L.polygon([
        [30.4419, 104.0328+0.0262],
        [30.4419, 104.0328-0.0262],
        [30.4861, 104.0328-0.0262],
        [30.4861, 104.0328+0.0262]
    ]).addTo(map1);		
    // 多边形
    // var polygon = L.polygon([
    //     [31.844248, 117.232868],
    //     [30.586032, 114.32653],
    //     [28.235398, 112.956396]
    // ]).addTo(map1);

	//标记点
    var marker = L.marker([30.463, 104.0328]);
    marker.bindPopup("<b>顾拜旦现代五项赛事中心</b>");
    marker.addTo(map1);

    //图标
    var shadowUrl = "http://leafletjs.com/examples/custom-icons/leaf-shadow.png";

    // //配置图标选项
    var LeafIcon = L.Icon.extend({
        options: {
            shadowUrl: shadowUrl, //阴影图像
            iconSize: [15, 55], //图标的大小
            shadowSize: [50, 64], //阴影的大小
            iconAnchor: [22, 94], //点图标将对应标记的位置
            shadowAnchor: [4, 62], //相同的影子
            popupAnchor: [-3, -76] //点弹出打开相对于iconanchor
        }
    });

}
    
 //    map = L.map('map').setView([30.4594579639, 104.0357266458], 12);
	// tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	//     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
	// }).addTo(map);
	// heat = L.heatLayer(gps[time], {radius: 25}).addTo(map);

 //    setTimeout(function() {_redraw(time+1);}, 2000);


 // $.getJSON("/data/orderOUT.json",function(data){
 //    //console.log(data)
	// var getOn = []
 // 	var getOff = []
 // 	var dataset = []
 // 	var lng1 = []
 // 	var lat1= []
 // 	var begin = []
 // 	var end = []
 // 	var lng2 = []
 // 	var lat2 = []

 // 	console.log(data[0])

 // 	for (var i = 0; i < data.length; i++){
 // 	   	getOn.push({"getOnCoordinate":data[i]["getOnCoordinate"],"value":1})
 // 	   	getOff.push({"getOffCoordinate":data[i]["getOffCoordinate"]})
 // 	   	dataset.push(data[i])
 // 	   	lat1.push(data[i]["getOnCoordinate"][1]+0.0025)
 // 	   	lng1.push(data[i]["getOnCoordinate"][0]-0.0025)
 // 	   	lat2.push(data[i]["getOffCoordinate"][1]+0.0025)
 // 	   	lng2.push(data[i]["getOffCoordinate"][0]-0.0025) 
 // 	   	begin.push({"lat":data[i]["getOnCoordinate"][1]+0.0025,"lng":data[i]["getOnCoordinate"][0]-0.0025,"count":1});
 // 	   	end.push({"lat":data[i]["getOffCoordinate"][1]+0.0025,"lng":data[i]["getOffCoordinate"][0]-0.0025,"count":1});
 // 	}

 // 	// console.log(begin)
 // 	console.log

 // 	var min1 = d3.min(lat1);
 // 	var max1 = d3.max(lat1);
 // 	var max2 = d3.max(lng1);
 // 	var max3 = d3.max(lat2)
 // 	var max4 = d3.max(lng2)
 // 	var min2 = d3.min(lng1);
 // 	var min3 = d3.min(lat1);
 // 	var min4 = d3.min(lng2);
 // 	console.log(min1,min2,max1,max2,min3,min4,max3,max4)
 // 	var lat1Scale = d3.scaleBand().domain([min1,max1]).range([0,130])
 // 	var lat1s = []
 // 	for(var i = 0; i < lat1.length ;i++){
 // 		lat1s[i]=lat1Scale(lat1[i])
 // 	}

 // 	var min2 = d3.min(lat2);
 // 	var max1 = d3.max(lat1);
 // 	var lat1Scale = d3.scaleBand().domain([min1,max1]).range([0,130])
 // 	var lat1s = []
 // 	for(var i = 0; i < lat1.length ;i++){
 // 		lat1s[i]=lat1Scale(lat1[i])
 // 	}
 	// console.log(lat1s)



//  // $(function() {
//                 // //实例化对象
//                 // var map = new L.Map("map");
//                 // //设置地图视图（地理中心和缩放）
//                 // map.setView([30.4594579639, 104.0357266458], 12);

//                 // //地图地址
//                 // var url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
//                 // var attr = ' Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';

//                 // //图层
//                 // L.tileLayer(url, {
//                 //     maxZoom: 18,
//                 //     attribution: attr,
//                 //     id: 'mapbox.streets'
//                 // }).addTo(map);

//                 // // //圆心
//                 // // var circle = L.circle([30.466655, 104.040847], {
//                 // //     color: 'red', //边框颜色
//                 // //     fillColor: '#f03', //填充颜色
//                 // //     fillOpacity: 0.2, //透明度
//                 // //     radius: 200000 //半径 米
//                 // // }).addTo(map);

//                 // // //多边形
//                 // // var polygon = L.polygon([
//                 // //     [31.844248, 117.232868],
//                 // //     [30.586032, 114.32653],
//                 // //     [28.235398, 112.956396]
//                 // // ]).addTo(map);

                

//                 // // L.marker([39.921108, 116.395562]).addTo(map).bindPopup("<b>北京!</b><br />直辖市.");
//                 // // L.marker([39.120097, 117.206074]).addTo(map).bindPopup("<b>天津市!</b><br />直辖市.");
//                 // // L.marker([31.233953, 121.460992]).addTo(map).bindPopup("<b>上海市!</b><br />直辖市.");
//                 // // L.marker([29.573519, 106.545211]).addTo(map).bindPopup("<b>重庆市!</b><br />直辖市.");
                
                
//                 // // //可拖拽的标识
//                 // // var marker = L.marker([30, 118], {
//                 // //         draggable: true, // 使图标可拖拽
//                 // //         title: 'Text', // 添加一个标题
//                 // //         opacity: 0.5 // 设置透明度
//                 // //     })
//                 // //     .addTo(map)
//                 // //     .bindPopup("<b>中国</b><br>安徽黄山.")
//                 // //     .openPopup();
                
//                 // // var orangeUrl = "http://leafletjs.com/examples/custom-icons/leaf-orange.png";
//                 // // var redUrl = "http://leafletjs.com/examples/custom-icons/leaf-red.png";
//                 // // var greenUrl = "http://leafletjs.com/examples/custom-icons/leaf-green.png";

                
//                 // // var redIcon = new LeafIcon({
//                 // //     iconUrl: redUrl //图标图像
//                 // // });


//                 // // 弹出面板
//                 // // 绑定一个弹出标记点击并打开它
//                 // var popup = L.popup();
//                 // popup.setLatLng([30.4594579639, 104.0357266458]);
//                 // popup.setContent("<b>顾拜旦现代五项赛事中心</b>");
//                 // // popup.openOn(map);
//                 // // var popup2 = L.popup().setLatLng([25.051612, 121.531195]).setContent("<b>台北市!</b><br />台北.").openOn(map);

//                 // //添加点击事件
//                 // function onMapClick(e) {
//                 //     popup
//                 //         .setLatLng(e.latlng)
//                 //         .setContent("点击坐标： " + e.latlng.toString())
//                 //         .openOn(map);
//                 // }

//                 // map.on('click', onMapClick);
//                 // 
// //******************************************起点热力图***********************************************************//
// //**********************************************************************************************************************//
// //**********************************************************************************************************************//
  //       var testData = {
		// 		max: 1,
		// 		data: begin
		// 	};        

		// var baseLayer = L.tileLayer(
		// 		'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
		// 		attribution: '...',
		// 		maxZoom: 20
		// 		}
		// 	);
		// var cfg = {
		// 		// radius should be small ONLY if scaleRadius is true (or small radius is intended)
		// 		// if scaleRadius is false it will be the constant radius used in pixels
		// 		"radius": 4,
		// 		"maxOpacity": .8, 
		// 		// scales the radius based on map zoom
		// 		"scaleRadius": false, 
		// 		// if set to false the heatmap uses the global maximum for colorization
		// 		// if activated: uses the data maximum within the current map boundaries 
		// 		//   (there will always be a red spot with useLocalExtremas true)
		// 		"useLocalExtrema": true,
		// 		// which field name in your data represents the latitude - default "lat"
		// 		latField: 'lat',
		// 		// which field name in your data represents the longitude - default "lng"
		// 		lngField: 'lng',
		// 		// which field name in your data represents the data value - default "value"
		// 		valueField: 'count'
		// 		};


		// var heatmapLayer = new HeatmapOverlay(cfg);

		// var map1 = new L.Map('map', {
		// 		center: new L.LatLng(30.4594579639, 104.0357266458),
		// 		zoom: 12,
		// 		layers: [baseLayer, heatmapLayer]
		// 	});

		// heatmapLayer.setData(testData);
		

// //******************终点热力图**************************************************************//
// //**************************************************************************************************************//
// //**************************************************************************************************************//		
// //**************************************************************************************************************//
//   //     var testData = {
// 		// 		max: 1,
// 		// 		data: end
// 		// 	};        

// 		// var baseLayer = L.tileLayer(
// 		// 		'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
// 		// 		attribution: '...',
// 		// 		maxZoom: 20
// 		// 		}
// 		// 	);
// 		// var cfg = {
// 		// 		// radius should be small ONLY if scaleRadius is true (or small radius is intended)
// 		// 		// if scaleRadius is false it will be the constant radius used in pixels
// 		// 		"radius": 4,
// 		// 		"maxOpacity": .8, 
// 		// 		// scales the radius based on map zoom
// 		// 		"scaleRadius": false, 
// 		// 		// if set to false the heatmap uses the global  maximum for colorization
// 		// 		// if activated: uses the data maximum within the current map boundaries 
// 		// 		//   (there will always be a red spot with useLocalExtremas true)
// 		// 		"useLocalExtrema": true,
// 		// 		// which field name in your data represents the latitude - default "lat"
// 		// 		latField: 'lat',
// 		// 		// which field name in your data represents the longitude - default "lng"
// 		// 		lngField: 'lng',
// 		// 		// which field name in your data represents the data value - default "value"
// 		// 		valueField: 'count' 
// 		// 		};


// 		// var heatmapLayer = new HeatmapOverlay(cfg);
                                
// 		// var map1 = new L.Map('map', {
// 		// 		center: new L.LatLng(30.4594579639, 104.0357266458),
// 		// 		zoom: 12,
// 		// 		layers: [baseLayer, heatmapLayer]
// 		// 	});

// 		// heatmapLayer.setData(testData);		


		//标记点
 //        var marker = L.marker([30.463, 104.0328]);
 //        marker.bindPopup("<b>顾拜旦现代五项赛事中心</b>");
 //        marker.addTo(map1);

 //        //图标
 //        var shadowUrl = "http://leafletjs.com/examples/custom-icons/leaf-shadow.png";

 //        // //配置图标选项
 //        var LeafIcon = L.Icon.extend({
 //            options: {
 //                shadowUrl: shadowUrl, //阴影图像
 //                iconSize: [15, 55], //图标的大小
 //                shadowSize: [50, 64], //阴影的大小
 //                iconAnchor: [22, 94], //点图标将对应标记的位置
 //                shadowAnchor: [4, 62], //相同的影子
 //                popupAnchor: [-3, -76] //点弹出打开相对于iconanchor
 //            }
 //        });
		                
	// });

// function _redraw(time) {
// 	// heat.onAdd(map);
// 	// heat._initCanvas();
// 	heat.setLatLngs(gps[time]);
// }