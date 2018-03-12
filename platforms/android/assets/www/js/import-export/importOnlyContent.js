function getRandomInRange(from, to) {
    return (Math.random() * (to - from) + from);
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

function redrawContent(id){	
var copy = document.createElement('li');
var ep = document.createElement('div');
copy.id = id;
copyId = copy.id;
ep.id = copy.id+"content-ep";
idEp = copy.id + "content-ep";
copy.appendChild(ep);
copy.className = "ui-droppable panel-content elemento _jsPlumb_endpoint_anchor_ copy leaflet-marker-icon";
ep.setAttribute('class', 'content-panel-ep');

/*PlumbIcon is a class that defines an icon to the marker. This icon has the ability to throw arrows and attach them to
other PlumbIcon instances*/
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

// make copy divs draggable
jsPlumb.draggable($(copy));



var top;

if ($(".elemento").length == 0){
	top = "30px";

}else{
	top = ($(".elemento").last().first().position().top + 150) + "px";
}

//ORIGINAL
($("#east-panel ul")).append(copy);
//ALTERNATIVA
//($(".marker-container")).append(copy);
$('#'+copyId).on('dblclick',function(){addContentBox(copyId)});

$(copy).on('mouseover',function(){map.dragging.disable();});
$(copy).on('mouseout',function(){map.dragging.enable()});


	
	//addMarkerToList(copyId,copyClass,lat,lng,idEp);
	
	//Initializing content popbox & redips
	//$('#'+copyId).defineContent(copyId);
	//$(".popBox-holder").hide();
	//$(".content-definer").hide();
	
	/*$('#'+copyId).on("mouseover", function(c) { 
		map.dragging.disable();
		console.log(mark.getLatLng().lat);
		console.log(mark.getLatLng().lng);
	});
	$('#'+copyId).on("mouseout", function(c) {
		map.dragging.enable();
		mark.dragging.enable();
	});
	$('.content-ep').on("mousedown", function(c) { 
			map.dragging.disable();
			mark.dragging.disable();
		});
	$('.content-ep').on("mouseup", function(c) { 
		map.dragging.enable();
		mark.dragging.enable();
	});
	*/

};		

function readContents(filename){
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
    var length = xml.getElementsByTagName("content").length; //Contents quantity
    var length2 = xml.getElementsByTagName("connection").length; //Connections quantity

    increment = length;

    //Create list
    var list = document.createElement('ul');
	$("#east-panel").append(list);


    //Reading contents
    for (var i=0; i<length;i++){
    	var id = xml.getElementsByTagName("content")[i].getAttribute('id');
    	var children = xml.getElementsByTagName("content")[i].children.length;
    	//$("#content-container").append("<div class='imported-content'></div>");
    	for (var j=0; j<children;j++){
    		console.log("HIJO NUM "+j+" "+ xml.getElementsByTagName("content")[i].children[j].getAttribute('type'));
    	}
    	redrawContent(id);
    } 

    //Redrawing connections
	for (var i=0; i<length2;i++){
    	var id = xml.getElementsByTagName("connection")[i].getAttribute('connectionId');
    	var source = xml.getElementsByTagName("connection")[i].getAttribute('sourceId');
    	var target = xml.getElementsByTagName("connection")[i].getAttribute('targetId');
    	jsPlumb.connect({ source:source, target:target });
    } 
    //Move arrows to #main
    //$("._jsPlumb_endpoint_connected").appendTo("#main");
    //$("._jsPlumb_connector").appendTo("#main");
    
    //Draw east panel
    $(".ui-layout-resizer").css({"visibility":"visible"});
	$("#east-panel").css({"visibility":"visible"});	

}

