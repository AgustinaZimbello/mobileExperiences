function redrawPosition(id,markerclass,lat,lng, index){	

	var copy = document.createElement('div');
	var ep = document.createElement('div');
	copy.id = id;
	copyId = copy.id;
	ep.id = copy.id+"ep";
	idEp = copy.id + "ep";
	copy.appendChild(ep);
	copyClass = "ui-droppable "+markerclass;
	ep.setAttribute('class', 'ep');

	/*PlumbIcon is a class that defines an icon to the marker. This icon has the ability to throw arrows and attach them to
	other PlumbIcon instances*/
	var marker = L.PlumbIcon = L.Icon.extend({
		options: {
			iconSize: [30, 28], // also can be set through CSS
			className: 'leaflet-div-icon',
		},
	
		createIcon: function () {
			this._set
			jsPlumb.makeSource($(copy), {
				filter:".ep",
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

	var mark = L.marker(latlng, {icon: myIcon, draggable:true, className: copyId, zIndexOffset:1000}).addTo(map);
	mark._icon.className = copyClass;
	mark._icon.children[0].id = id+"ep";
	addMarkerToList(copyId,copyClass,lat,lng,idEp);
	
	//Initializing content popbox & redips
	//$('#'+copyId).defineContent(copyId);
	//$(".popBox-holder").hide();
	//$(".content-definer").hide();

	$('#'+copyId).on("mouseover", function(c) { 
		map.dragging.disable();
		console.log(mark.getLatLng().lat);
		console.log(mark.getLatLng().lng);
	});
	$('#'+copyId).on("mouseout", function(c) {
		map.dragging.enable();
		mark.dragging.enable();
	});
	$('.ep').on("mousedown", function(c) { 
			map.dragging.disable();
			mark.dragging.disable();
		});
	$('.ep').on("mouseup", function(c) { 
		map.dragging.enable();
		mark.dragging.enable();
	});

};		

function redrawPositions(filename){
	var xmlHTTP = new XMLHttpRequest();
    try{
    	console.log(filename);
    	xmlHTTP.open("GET", filename, false);
    	xmlHTTP.send(null);
    }catch (e) {
        window.alert("Unable to load the requested file.");
        return;
    }
    var xml = xmlHTTP.responseXML;
    var length = xml.getElementsByTagName("position").length; //Markers quantity
    var length2 = xml.getElementsByTagName("connection").length; //Connections quantity

    increment = length;

    var avgLat = 0;
    var avgLng = 0;

    //Redrawing markers
    for (var i=0; i<length;i++){
    	var id = xml.getElementsByTagName("position")[i].getAttribute('id');
    	var markerclass = xml.getElementsByTagName("position")[i].getAttribute('class');
    	var lat = xml.getElementsByTagName("position")[i].getAttribute('lat');
    	var lng = xml.getElementsByTagName("position")[i].getAttribute('lng');
    	avgLat = avgLat + parseFloat(lat);
    	avgLng = avgLng + parseFloat(lng);
    	redrawPosition(id,markerclass,lat,lng,i);
    	console.log(markerclass);
    }

    //Setting the map view in an average lat and lng...
    avgLat = avgLat/length;
    avgLng = avgLng/length;
    console.log(avgLat+","+avgLng);
    map.setView([avgLat,avgLng], 16);

    //Redrawing connections
	for (var i=0; i<length2;i++){
    	var id = xml.getElementsByTagName("connection")[i].getAttribute('connectionId');
    	var source = xml.getElementsByTagName("connection")[i].getAttribute('sourceId');
    	var target = xml.getElementsByTagName("connection")[i].getAttribute('targetId');
    	jsPlumb.connect({ source:source, target:target });
    }
    
    

}

