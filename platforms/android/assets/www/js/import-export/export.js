function exportToXML(){
	// Simple helper function creates a new element from a name, so you don't have to add the brackets etc.
	$.createElement = function(name)
	{
	    return $('<'+name+' />');
	};

	// JQ plugin appends a new element created from 'name' to each matched element.
	$.fn.appendNewElement = function(name)
	{
	    this.each(function(i)
	    {
	        $(this).append('<'+name+' />');
	    });
	    return this;
	}
	var xw = new XMLWriter('UTF-8');
	xw.formatting = 'indented';//add indentation and newlines
	xw.indentChar = ' ';//indent with spaces
	xw.indentation = 2;//add 2 spaces per level
	xw.writeComment('Experiencia Móvil - Test');
	xw.writeStartDocument();
	xw.writeStartElement('Experience');

	//CONTENTS
	if (contents.length > 0){
		xw.writeComment('DIGITAL POINTS');
		xw.writeStartElement('DigitalPointsOfinterest');
		for (var i in contents){
			xw.writeStartElement('DigitalPointOfInterest');
			xw.writeElementString( 'Id', ''+contents[i]["id"] );
			xw.writeStartElement('Elements');
			xw.writeComment('Por ahora es UN solo elemento');
			switch (contents[i]["order"]){
				case "first-element":
					xw.writeStartElement('FirstElement');
				break;
				case "last-element":
					xw.writeStartElement('LastElement');
				break;
				default:
					xw.writeStartElement('InnerElement');
				break;
			}
			var size = contents[i].length;
			if (size > 1){ //Means the content is mixed
				xw.writeStartElement('CompositeContent');
					xw.writeElementString( 'Id', ''+contents[i]["id"] );
					//ContextText
					xw.writeElementString('ContextText','');
					//Contents
					xw.writeStartElement('Contents');
			}
			for (var j=0; j< size ;j++){
				switch (contents[i][j]["contentType"]){
		    		case "question":
		    			//TODO -> Check question type
		    			xw.writeStartElement('ClosedAutoevaluableQuestion');
		    				xw.writeAttributeString( 'dicotomic', false); //TODO -> dicotomic value
		    				if (size == 1){
		    					xw.writeElementString( 'Id', contents[i][j]["id"] );
		    				}
			    			xw.writeElementString('ContextText', contents[i][j]['question']['contextText']);
							xw.writeStartElement('CorrectAnswers');
								$.each(contents[0][0]['question']['correctAnswers'], function(key,val){
									xw.writeStartElement('Answer');
				    					xw.writeElementString('Text', val);
				    				xw.writeEndElement();

								});
							xw.writeEndElement();
							xw.writeStartElement('IncorrectAnswers');
								$.each(contents[0][0]['question']['incorrectAnswers'], function(key,val){
									xw.writeStartElement('Answer');
				    					xw.writeElementString('Text', val);
				    				xw.writeEndElement();
								});
							xw.writeEndElement();
			    			
			    		xw.writeEndElement();
			    	break;
			    	case "textarea":
			    		xw.writeStartElement('TextInformation');
			    			if (size == 1){
		    					xw.writeElementString( 'Id', contents[i]["id"] );
		    				}
			    			xw.writeElementString('ContextText','');
				    		xw.writeElementString('Text',contents[i][j]['text']);
			    		xw.writeEndElement();
			    	break;
				}
			}
			if (contents[i].length > 1){ //Means the content is composite
				xw.writeEndElement();
				xw.writeEndElement();
			}
			xw.writeEndElement();
			xw.writeEndElement();
			xw.writeEndElement();
		}
		xw.writeEndElement();
	}

	//POSITIONS
	if (markers.length > 0){
		xw.writeComment('PHYSICAL POINTS');
		xw.writeStartElement( 'PhysicalPointsOfInterest' );
		for (var key in markers){
			xw.writeStartElement('PhysicalPointOfInterest');
				xw.writeElementString('Id',''+markers[key].id);
			    xw.writeStartElement('Position');
				    /*if (qr activado)
				    	xw.writeStartElement('QR');
			    			//bytes de la imagen
			    		xw.writeEndElement();
			    	}*/
				    if (mapType == "2DMap"){
				    	xw.writeStartElement('XYPosition');
			    			xw.writeElementString('X',''+markers[key].lat);
			    			xw.writeElementString('Y',''+markers[key].lng);
			    		xw.writeEndElement();
				    }else{
				    	xw.writeStartElement('Georeferenced');
				    		xw.writeElementString('Lat',''+markers[key].lat);
			    			xw.writeElementString('Lng',''+markers[key].lng);
			    		xw.writeEndElement();
				    }
			    xw.writeEndElement();	
		    xw.writeEndElement();
		}
		xw.writeEndElement();
	}

	//MAP TYPE
	if (markers.length > 0){
		xw.writeComment('MAP TYPE');
		xw.writeStartElement( 'Map' );
		xw.writeAttributeString( 'type', mapType );
		if (mapType == 'SatelliteMap'){
			xw.writeAttributeString( 'api', 'OpenStreetMap' );
		}
		if (mapType == '2DMap'){
			var imgurl = staticLayer._image.src.split("/");
			var size = staticLayer._image.src.split("/").length;
			xw.writeAttributeString( 'imgurl', imgurl[size-1] ); //Only if it is a 2D map --> TO DO, GEO MAP IMAGE!!!
		}
		//FALTA GEOREFERENCIADO

		xw.writeEndElement();
	}
	
	//RELATIONS
	if (contents.length > 1){
		xw.writeComment('RELATIONS');
		var connections = [];
		$.each(jsPlumb.getConnections(), function (idx, connection) {
		    connections.push({
		        connectionId: connection.id,
		    	    sourceId: connection.sourceId,
		        targetId: connection.targetId
		    });
		});

		if (connections.length == 0){
			structure = 'set';
			xw.writeComment('There are no relations');
		}else{
			xw.writeStartElement( 'Relations' );
			for (var i=0; i< connections.length; i++){
				xw.writeStartElement('Relation');
				xw.writeElementString('ConnectionId', connections[i].connectionId );
			    xw.writeElementString( 'SourceId', connections[i].sourceId);
			    xw.writeElementString( 'TargetId', connections[i].targetId);
			    xw.writeEndElement();
			}
			xw.writeEndElement();
		}
	}

	//STRUCTURE
	if (contents.length > 0){
		xw.writeComment('STRUCTURE');
		//TODO Esto debería ser detectado
		var numCons = [];
		for (var i = 0; i < connections.length; i++) {
			if(isNaN(numCons[connections[i].sourceId])){
				numCons[connections[i].sourceId] = 1;
			}else{
				numCons[connections[i].sourceId]++;
			}
			
		};
		switch(structure){
			case "lineal":
				xw.writeStartElement('LinealStructure');
					xw.writeElementString('StructureName', 'LinealStructure');
				xw.writeEndElement();
			break;
			case "graph":
				xw.writeStartElement('GraphStructure');
					xw.writeElementString('StructureName', 'GraphStructure');
				xw.writeEndElement();
			break;
			case "set":
				xw.writeStartElement('SetStructure');
					xw.writeElementString('StructureName', 'SetStructure');
				xw.writeEndElement();
			break;
		}
		//si no tiene relaciones
			//set
		//si todos tienen una sola relacion
			//list
		//si hay alguno que tiene mas de una relacion y ademas tdos tienen al menos una
			//graph

		//para el ultimo, hay que validar cuando hago el export... (cartel: no se puede determinar la estructura)
		
	}

	xw.writeEndDocument();
	var uri = 'data:text/xml;charset=utf-8,' + escape(xw.flush());
	$("#exportContent").attr('href',uri);

	//FILE NAME
	$("#exportContent").attr('download',"experience.xml");
}

