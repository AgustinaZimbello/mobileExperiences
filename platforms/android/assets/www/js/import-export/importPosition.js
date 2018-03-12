/*function redrawPosition(id,markerclass,lat,lng, index){	

	var copy = document.createElement('div');
	var ep = document.createElement('div');
	copy.id = id;
	copyId = copy.id;
	ep.id = copy.id+"ep";
	idEp = copy.id + "ep";
	copy.appendChild(ep);
	copyClass = "ui-droppable "+markerclass;
	ep.setAttribute('class', 'content-ep');
	ep.style.visibility = "hidden";

	/*PlumbIcon is a class that defines an icon to the marker. This icon has the ability to throw arrows and attach them to
	other PlumbIcon instances*/
	/*var marker = L.PlumbIcon = L.Icon.extend({
		options: {
			iconSize: [30, 28], // also can be set through CSS
			className: 'leaflet-div-icon',
		},
	
		createIcon: function () {
			this._set
			jsPlumb.makeSource($(copy), {
				filter:".content-ep",
				anchor:"Continuous",
				connector:[ "StateMachine", { curviness:20 } ],
				connectorStyle:{ strokeStyle:nextColour(), lineWidth:4 },
				maxConnections:5,
				onMaxConnections:function(info, e) {
					alert("Maximum connections (" + info.maxConnections + ") reached");
				}
			});
			
			jsPlumb.makeTarget($(copy), {
				dropOptions:{ hoverClass:"dragHover" },
				anchor:"Continuous"				
			});
			jsPlumb.bind("click", function(c) { 
				//var r=confirm("Esta; seguro que desea borrar la conexion?");
				//if (r){
					jsPlumb.detach(c);
				//}
			});
			
			$('#mapa').bind("dblclick", function(c) { 
				map.doubleClickZoom.enable(); 
			});
			
			$('#'+copy.id).on("dblclick", function(c) { 
				map.doubleClickZoom.disable();
			});
			return copy;
		},
	
		createShadow: function () {
			return null;
		}
	});
	L.plumbIcon = function (options) {
		return new L.PlumbIcon(options);
	};
	var myIcon = L.plumbIcon();

	var lat = lat;
	var lng = lng;
	var latlng = new L.LatLng(lat,lng);

	var mark = L.marker(latlng, {icon: myIcon, draggable:true, className: copyId, zIndexOffset:1000, bounceOnAdd: true, bounceOnAddOptions: {duration: 500, height: 100}}).addTo(map);
	mark._icon.className = copyClass;
	mark._icon.children[0].id = id+"ep";
	addMarkerToList(copyId,copyClass,lat,lng,idEp);	

	$('#'+copyId).on("mouseover", function(c) { 
		map.dragging.disable();
		console.log(mark.getLatLng().lat);
		console.log(mark.getLatLng().lng);
	});
	$('#'+copyId).on("mouseout", function(c) {
		map.dragging.enable();
		mark.dragging.enable();
	});

	$('#'+copyId).on("dblclick", function(c) {
		addContentBox(c.currentTarget.id);
	});
	$('.content-ep').on("mousedown", function(c) { 
		map.dragging.disable();
		mark.dragging.disable();
	});
	$('.content-ep').on("mouseup", function(c) { 
		map.dragging.enable();
		mark.dragging.enable();
	});

};	

function readSpace(filename){
	var xmlHTTP = new XMLHttpRequest();

    try{
    	xmlHTTP.open("GET", '../'+filename, false);
    	xmlHTTP.send(null);
    }catch (e) {
        window.alert("Unable to load the requested file.");
        return;
    }
    var xml = xmlHTTP.responseXML;
    var length = xml.getElementsByTagName("PhysicalPointOfInterest").length; //Markers quantity
    var mapType = xml.getElementsByTagName("Map")[0].getAttribute('type'); //MapType
    increment = length;

    var avgLat = 0;
    var avgLng = 0;

    //Setting the map...
    map = L.map('main');
	tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
	map.setView([-34.903671,-57.937843],8);

    /*Setting the map view
     * if Satellite Map in an average lat and lng...
     * if 2D Map load image
    */
    /*if(mapType == "2DMap"){
    	map.options.zoom=10;
		map.options.minZoom=-20;
		//Backing up the marker pane... I append them to #main and change its ID. See (1)
		$("#main").append(map.getPanes().markerPane);
		map.getPanes().markerPane.id="backup";
		map.removeLayer(tileLayer);
		if (staticLayer != null){
			map.removeLayer(staticLayer);
		}
		map.remove();
		$('.leaflet-map-pane').remove();
		/* I remove all the leaflet controls (zoom, leaflet sign, etc) because they are  
		 * recreated when map is re-instantiated 
		 */

		/*var el = document.getElementsByClassName('leaflet-control-container')[0];
		el.parentNode.removeChild(el);

		$("#popbox").fadeOut("slow");
		$("#popbox").prev().fadeOut("slow");
		//Adding notification message...
		$("#notice-box").fadeIn(1500);
		$("#notice-box").fadeOut(8000);
		//var imageUrl = 'images/'+this.parentNode.id+'.png';
		//(1) When map is created, a new marker pane is created. See (2) 
		map = L.map('main', {
			zoom: 1,
			crs: L.CRS.Simple
		}).setView([300, 420], 0.010);

		map.dragging.disable();
		staticLayer = L.imageOverlay('../images/'+xml.getElementsByTagName("map")[0].getAttribute('imgurl'), [[0, 200], [600, 0]]).addTo(map);

		$("#popbox-tipomapa").remove();
		$("#popbox-tipomapa2").remove();
		var elemento = $('.leaflet-image-layer')[0];
		elemento.className = elemento.className + ' geomap-img';
		//(2) So I remove the new marker pane because then I will restore the previous one.. See (3)
		$('#markerPane').remove();

		//(3) Restoring original marker pane...
		$('.leaflet-objects-pane').append($("#backup"));
		map.getPanes().markerPane=$("#backup")[0];
		$("#backup")[0].id="markerPane";
		jsPlumb.repaintEverything();
		console.log($(".leaflet-control-container")[0].children[0]);
		//$("#zoomBar").hide();
		map.dragging.enable();
    }else{
    	
    }

    //Redrawing markers
    for (var i=0; i<length;i++){
    	var id = xml.getElementsByTagName("PhysicalPointOfInterest")[i].children[0].textContent; //Id
    	//var markerclass = xml.getElementsByTagName("position")[i].getAttribute('class');
    	var markerclass = "blue-marker elemento _jsPlumb_endpoint_anchor_ copy leaflet-marker-icon";
    	var lat = xml.getElementsByTagName("PhysicalPointOfInterest")[i].children[1].children[0].textContent; //Lat or X
    	var lng = xml.getElementsByTagName("PhysicalPointOfInterest")[i].children[1].children[1].textContent; //Lng or Y
    	console.log(xml.getElementsByTagName("PhysicalPointOfInterest")[i].children[1]);
    	console.log("ELEMTNO EN: "+lat+","+lng);
    	if (mapType != "2DMap"){
	    	avgLat = avgLat + parseFloat(lat);
	    	avgLng = avgLng + parseFloat(lng);
    	}
    	var latlng = new L.LatLng(lat,lng);
    	createPosition(id,latlng);
    }
    if(mapType != "2DMap"){
	    avgLat = avgLat/length;
		avgLng = avgLng/length;
		console.log(avgLat+","+avgLng);
		map.setView([avgLat,avgLng], 16);
		map.dragging.disable();
		map.doubleClickZoom.disable();
	}
    

    $("#popbox").fadeOut("slow");
    $("#popBox-holder").fadeOut("slow");
}*/

