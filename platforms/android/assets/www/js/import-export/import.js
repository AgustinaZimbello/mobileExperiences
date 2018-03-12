/*function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}*/

function importXML(filename,option){
	var xmlHTTP = new XMLHttpRequest();

    try{
    	xmlHTTP.open("GET", './'+filename, false);
    	xmlHTTP.send(null);
    }catch (e) {
        window.alert("Unable to load the requested file.");
        return;
    }
    var xml = xmlHTTP.responseXML;

	var option = GetURLParameter('option');

	   	switch(option) {
	        case "onlyContents":
	        	var contentIDs = readContentsLayer(xml);
	        	for (var i = 0; i < contentIDs.length; i++) {
	        		createContent(contentIDs[i]);
	        	};
	            break;

	        case "onlyPositions":
	        	readSpace(xml,true);
	            break;

	        case "positionedElements":
	            var contentIDs = readContentsLayer(xml);
	        	for (var i = 0; i < contentIDs.length; i++) {
	        		console.log(xml.getElementsByTagName("Position"));
			        var lat = xml.getElementsByTagName("Position")[i].children[0].innerHTML;
			        var lng = xml.getElementsByTagName("Position")[i].children[1].innerHTML;
			        var latlng = new L.LatLng(lat, lng);
		   			createContentWithMarker(contentIDs[i],latlng); //Create popbox of elements (empty)
	        	};
	            break;

	        case "icds":
	            createContentWithMarker(idContent);
	            break;

	        default:
	            break;
	    }
	   	increment++;
	

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
    	jsPlumb.connect({ source:source, target:target });
    }
 
}


function readContentsLayer(xml){

    var lengthPDI = xml.getElementsByTagName("DigitalPointOfInterest").length; //DPI quantity
    console.log(xml.getElementsByTagName("DigitalPointOfInterest"));
    contentIDs = [];
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
			//addContentBox(idContent);
			
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
		    			console.log($("#"+id+" td"));
		    			//$("#"+id+" td")[counter].innerHTML = ('<div id="div-textarea-'+id+'" class="drag"><textarea id="textarea'+id+'" class="div-textarea" rows="4" cols="50">'+text+'</textarea><div id="drag-textarea"></div></div>');
						//$("#popbox-"+id2).hide();
						//$("#popBox-holder").hide();
						

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
				//$('.popBox-holder').hide();
		    }
	    }
	    $("#question-"+id2+" .save-icon").click();
	    contentIDs[j] = idContent;
	}
	return contentIDs;
}

function readSpace(xml,onlyPositions){
	
	var length = xml.getElementsByTagName("PhysicalPointOfInterest").length; //Markers quantity

	if (!onlyPositions){
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
	    if(mapType == "2DMap"){
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

			var el = document.getElementsByClassName('leaflet-control-container')[0];
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
	    }
	}

	var avgLat = 0;
	var avgLng = 0;

    //Redrawing markers
    for (var i=0; i<length;i++){
    	var id = xml.getElementsByTagName("PhysicalPointOfInterest")[i].children[0].textContent; //Id
    	var lat = xml.getElementsByTagName("PhysicalPointOfInterest")[i].children[1].children[0].textContent; //Lat or X
    	var lng = xml.getElementsByTagName("PhysicalPointOfInterest")[i].children[1].children[1].textContent; //Lng or Y
    	console.log("POSICION DE "+i+": "+lat+","+lng);
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

}