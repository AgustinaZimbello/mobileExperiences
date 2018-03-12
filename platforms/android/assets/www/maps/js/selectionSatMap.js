var ready;
var options;
var crd;

function phonegapReady() {
	ready = true;
	loadMap();
}

function loadMap() {
	localStorage.setItem("typeMap", "geoMap");
	if (localStorage.getItem("element") == 'elementPosition') {
		$('#element').attr('id', 'elementPosition');
		$("#elementh3").text("CREAR ELEMENTO POSICIONADO");
	}

	map = L.map('map').fitWorld();
	tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
	var searcher = new L.esri.Controls.Geosearch().addTo(map);

	$('#menu').hide();
	
}


$(function() {
	$('#optionMenu').click(function() {
		var query = $('#menu');
		var isVisible = query.is(':visible');
		if (isVisible === true) {
			$('#map').css("height", "100%");
			query.hide();
		} else {
			$('#map').css("height", "32%");
			query.show();
		}
	});
});
