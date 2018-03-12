function loadSelectedMap(selectedMap) {
	switch (selectedMap) {
	case '2D':
		mapType = '2DMap';
		if (typeof map == 'undefined') { // TODO --> modificar para no tener
											// que crear el mapa para luego
											// tener que borrarlo...
			map = L.map('main', {
				zoom : 1,
				minZoom : 9,
				maxZoom : 10,
				center : [ -0.3, 0.5 ],
				crs : L.CRS.Simple,
			});
		}
		$("#main").css('background-color', 'white');
		break

	case 'GEO':
		if (typeof map == 'undefined') {
			map = L.map('main');
			// add an OpenStreetMap tile layer
			tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')
					.addTo(map);
			// Set initial map location
			// If I want the API to get my current posistion:
			// map.locate({setView: true, maxZoom: 16});
			// map.setView([-34.903671,-57.937843],16);
			map.on("locationfound", function(location) {
				// userPosition = location;
				if (typeof marker == "undefined")
					marker = L.userMarker(location.latlng, {
						pulsing : true,
						accuracy : 1,
						smallIcon : true
					}).addTo(map);
				marker.setLatLng(location.latlng);
				marker.setAccuracy(location.accuracy);
			});
			map.locate({
				watch : false,
				locate : true,
				setView : true,
				enableHighAccuracy : true
			});
			// Search-box creation
			//var searcher = new L.esri.Controls.Geosearch().addTo(map);
			//$('.geocoder-control-input, .leaflet-bar').parent();
		}
		if ($("#theCanvas").length == 1) { // If true means that there already
											// exists a canvas...
			$("#popbox").fadeOut("slow");
			$("#popbox").prev().fadeOut("slow");
			// Adding notification message...
			$("#notice-box3").fadeIn(1500);
			$("#notice-box3").fadeOut(8000);
		} else {
			mapType = 'GeoMap';
		}

		break

	case 'SAT':
		if (typeof map == 'undefined') {
			map = L.map('main');
			// add an OpenStreetMap tile layer
			tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')
					.addTo(map);
			// Set initial map location
			/* If I want the API to get my current posistion: */
			// map.locate({setView: true, maxZoom: 16});
			// map.on('locationfound', onLocationFound);
			map.on("locationfound", function(location) {
				userPosition = location
				if (typeof marker == "undefined")
					marker = L.userMarker(location.latlng, {
						pulsing : true,
						accuracy : 1,
						smallIcon : true
					}).addTo(map);

				marker.setLatLng(location.latlng);
				marker.setAccuracy(location.accuracy);
			});
			map.locate({
				watch : false,
				locate : true,
				setView : true,
				enableHighAccuracy : true
			});

			// map.setView([-34.903671,-57.937843],16);

			// Search-box creation
			var searcher = new L.esri.Controls.Geosearch().addTo(map);
			$('.geocoder-control-input, .leaflet-bar').parent();

		} else {
			// Backing up the marker pane... I append them to #main and change
			// its ID. See (1)
			$("#main").append(map.getPanes().markerPane);
			map.getPanes().markerPane.id = "backup";
		}
		// map.dragging.enable();
		/*
		 * if (staticLayer != null){ map.removeLayer(staticLayer); map.remove();
		 * $('.leaflet-map-pane').remove(); /* I remove all the leaflet controls
		 * (zoom, leaflet sign, etc) because they are recreated when map is
		 * re-instantiated
		 */
		/*
		 * var el =
		 * document.getElementsByClassName('leaflet-control-container')[0];
		 * el.parentNode.removeChild(el);
		 * 
		 * //(1) When map is created, a new marker pane is created. (2) map =
		 * L.map('main'); map.addLayer(tileLayer); //map.locate({setView: true,
		 * maxZoom: 30}); map.setView([-34.903671,-57.937843],16); //Adding
		 * search-box... new L.Control.GeoSearch({ provider: new
		 * L.GeoSearch.Provider.Google() }).addTo(map);
		 * 
		 * 
		 * //(2) So I remove the new marker pane because then I will restore the
		 * previous one.. See (3) $('#markerPane').remove();
		 * 
		 * //(3) Restoring original marker pane... console.log($("#backup")[0]);
		 * $('.leaflet-objects-pane').append($("#backup"));
		 * map.getPanes().markerPane=$("#backup")[0];
		 * $("#backup")[0].id="markerPane"; jsPlumb.repaintEverything();
		 * 
		 * //Adding notification message... $("#notice-box").fadeIn(1500);
		 * $("#notice-box").fadeOut(8000); } if (typeof importPopbox !=
		 * 'undefined') { if (importPopbox){ showImportPopbox(); } }
		 */
		break
	}
}

function onLocationFound(e) {
	L.marker(e.latlng).addTo(map);
}