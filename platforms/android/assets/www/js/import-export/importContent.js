function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

function redrawContent(id){	
	var copy = document.createElement('div');
	var ep = document.createElement('div');
	copy.id = id;
	copyId = copy.id;
	ep.id = copy.id+"content-ep";
	idEp = copy.id + "content-ep";
	copy.appendChild(ep);
	copyClass = "ui-droppable imported-content elemento _jsPlumb_endpoint_anchor_ copy leaflet-marker-icon";
	ep.setAttribute('class', 'content-ep');

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

	/*var lat = -34.903729;
	var lng = -57.937915;
	var latlng = new L.LatLng(-34.903729,-57.937915);*/

	//Here I use getRandomInRange() to get a random lat lng where to place the marker...
	var margin = 0.00150;
	var lat = getRandomInRange(map.getBounds()._southWest.lat+margin, map.getBounds()._northEast.lat,14);
	var lng = getRandomInRange(map.getBounds()._southWest.lng+margin, map.getBounds()._northEast.lng-margin,14);
	var latlng = new L.LatLng(lat,lng);

	var mark = L.marker(latlng, {icon: myIcon, draggable:true, className: copyId, zIndexOffset:1000}).addTo(map);
	mark._icon.className = copyClass;
	mark._icon.children[0].id = id+"ep";
	
	addMarkerToList(copyId,copyClass,lat,lng,idEp);
	
	//Initializing content popbox & redips
	//$('#'+copyId).defineContent(copyId);
	//$(".popBox-holder").hide();
	//$(".content-definer").hide();
	$('#'+copyId).on('dblclick',function(){
		var idContent = id.split("-")[1];
		addContentBox(idContent);
	});
	

	$('#'+copyId).on("mouseover", function(c) { 
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

};		

function readContents(filename){
	var xmlHTTP = new XMLHttpRequest();
    try{
    	console.log(filename);
    	xmlHTTP.open("GET", '../'+filename, false);
    	xmlHTTP.send(null);
    }catch (e) {
        window.alert("Unable to load the requested file.");
        return;
    }
    var xml = xmlHTTP.responseXML;
    var lengthPDI = xml.getElementsByTagName("DigitalPointOfInterest").length; //DPI quantity
    console.log(xml.getElementsByTagName("DigitalPointOfInterest"));

    increment = length;

    //Create container
    //$("#main").append("<div id='content-container' class='content-container'></div>");

    //Reading contents
    console.log("Cantidad de DPIs: "+lengthPDI);

    for (var j=0; j<lengthPDI;j++){ //For each DPI
    	console.log("Procesando DPI nro: "+j);
	    var lengthElements = xml.getElementsByTagName("DigitalPointOfInterest")[j].getElementsByTagName("Elements").length;
	    
		console.log("Cantidad de elementos dentro del DPI (debería ser 1 por ahora): "+lengthElements);
	    for (var i=0; i<lengthElements;i++){ //For each element inside a DPI
	    	var id = xml.getElementsByTagName("DigitalPointOfInterest")[j].children[0].innerHTML;
	    	console.log("Importando elemento...");
	    	console.log("El ID del elemento es: "+id);
	    	var idContent = id.split("-")[1];
			addContentBox(idContent);
			
	    	$('#sortable'+id).sortable(); //Make it sortable

	    	var elements = xml.getElementsByTagName("DigitalPointOfInterest")[j].getElementsByTagName("Elements")[i];
	    	var type = elements.children[i].nodeName;
	    	var element = elements.children[i];
	    	var contentType = element.children[0].nodeName;
	    	console.log("El elemento es un: "+type);
	    	switch(type){
					case 'InnerElement':
						$("#order-content"+(j+1)+" input[value='inter-element']").prop("checked", true);
					break;
					case 'LastElement':
						$("#order-content"+(j+1)+" input[value='last-element']").prop("checked", true);
					break;
					case 'FirstElement':
						$("#order-content"+(j+1)+" input[value='first-element']").prop("checked", true);
					break;
			}
	    	
	    	console.log("El elemento es un: "+contentType);
	    	
	    	var contentLength = 1; //It changes if it is composite
	    	var counter = 0;
	    	if (contentType == 'CompositeContent'){
	    		var isComposite = true;
	    		contentLength = element.children[0].children[2].childElementCount;
	    	}else{
	    		var isComposite = false;
	    	}
	    	if (isComposite){
	    		//console.log(element.children[i]);
    			element = elements.children[i].children[0].getElementsByTagName("Contents")[0];
	    		var id = elements.children[i].children[0].children[0].innerHTML;
	    		var id2 = id.split("-")[1];
	    		var contextText = elements.children[i].children[0].children[1].innerHTML;
	    		console.log("El id del CompositeContent es: "+id2);
	    		console.log("El context del CompositeContent es: "+contextText);

    		}
    		console.log("La cantidad de contenidos es: "+contentLength);
	    	for (var k=0; k<contentLength;k++){ //For each content inside an element
		    	if (isComposite){
		    		contentType = elements.children[0].children[0].getElementsByTagName("Contents")[0].children[k].nodeName;
	    		}
	    		console.log(element);
		    	switch(contentType){
					case 'TextInformation':
						console.log("Importando TextInformation...");
						console.log(element.children[k]);
						if (!isComposite){
							var id = element.children[k].children[0].innerHTML;
			    			var id2 = id.split("-")[1];
			    			var contextText = element.children[k].children[1].innerHTML;
			    			var text  = element.children[k].children[2].innerHTML;
						}else{
							console.log(element.children[k])
							var contextText = element.children[k].children[0].innerHTML;
			    			var text  = element.children[k].children[1].innerHTML;
						}
						console.log("El context text es: "+contextText);
		    			console.log("El texto es: "+text);
		    			$("#"+id+" td")[counter].innerHTML = ('<div id="div-textarea-'+id+'" class="drag"><textarea id="textarea'+id+'" class="div-textarea" rows="4" cols="50">'+text+'</textarea><div id="drag-textarea"></div></div>');
						$("#popbox-"+id2).hide();
						$("#popBox-holder").hide();
						

					break;
					case 'ClosedAutoevaluableQuestion':
						console.log("Importando ClosedAutoevaluableQuestion...");
						if (!isComposite){
							var id = element.children[k].children[0].innerHTML;
							var id2 = id.split("-")[1];
							var contextText  = element.children[k].children[1].innerHTML;
							var correctAnswers = element.children[k].children[2]; //Correct answers
							var incorrectAnswers = element.children[k].children[3]; //Incorrect answers

						}else{
							var contextText = element.children[k].children[0].innerHTML;
			    			var correctAnswers = element.children[k].children[1]; //Correct answers
							var incorrectAnswers = element.children[k].children[2]; //Incorrect answers
						}

						questionBox(id2, $("#"+id+" td")[counter]);
						$("#sortable-"+id2+" li")[0].remove(); //Removing answer 0
						$("#question-"+id2+" li input")[0].value = contextText; //Setting question's context text

						console.log("Cantidad de preguntas correctas: "+correctAnswers.childElementCount);
						for (var i = 1; i <= correctAnswers.childElementCount; i++) { //For each correct answer
							var text = correctAnswers.children[i-1].children[0].innerHTML;
							var children = $("#sortable-"+id2)[0].childElementCount;
							$("#sortable-"+id2).append("<li class='option correct-li'><div class='drag-icon'></div>Opci&oacute;n "+(children)+":<input type='text' value='"+text+"'><div id='q"+children+'-'+id2+"' class='correct'></div><div class='remove-icon'></div></li>");
						};
						console.log("Cantidad de preguntas incorrectas: "+incorrectAnswers.childElementCount);
						for (var i = 1; i <= incorrectAnswers.childElementCount; i++) { //For each correct answer
							var text = incorrectAnswers.children[i-1].children[0].innerHTML;
							console.log(incorrectAnswers.children[i-1]);
							var children = $("#sortable-"+id2)[0].childElementCount;
							$("#sortable-"+id2).append("<li class='option incorrect-li'><div class='drag-icon'></div>Opci&oacute;n "+(children)+":<input type='text' value='"+text+"'><div id='q"+children+'-'+id2+"' class='incorrect'></div><div class='remove-icon'></div></li>");
						};
						
						$("#popbox-"+id2).hide();
						$("#popBox-holder").hide();
					break;
					default:
					//code to be executed if n is different from case 1 and 2
				}
				counter++;
				$('.popBox-holder').hide();
		    }
	    }
	    $("#question-"+id2+" .save-icon").click();
	   	redrawContent(id); //Create popbox of elements (empty)
	}

    //Redrawing connections
    var lengthRelations = xml.getElementsByTagName("Relation").length;
	for (var i=0; i<lengthRelations;i++){
		var element = xml.getElementsByTagName("Relation")[i];
    	var id = element.children[0].innerHTML;
    	var source = element.children[1].innerHTML;
    	var target = element.children[2].innerHTML;
    	console.log(source);
    	console.log(target);
    
    	console.log(element);
    	jsPlumb.connect({ source:"grid-"+source, target:"grid-"+target });
    }
 
}

