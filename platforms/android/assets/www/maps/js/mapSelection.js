var ready;
function phonegapReady() {
	// Necesario para conocer si las app de PhoneGap ya escuentran
	// disponibles(cargadas)
	ready = true;

}
$(function() {
	//$('#indoorMap').click(function() {
	//	if (ready) {
	//		localStorage.setItem("typeMap", "indoorMap");
	//		window.open('selectIndoorMap.html', '_blank', 'location=yes');
	//	}
	//});
	//$('#satMap').click(function() {
    //		if (ready) {
    //			localStorage.setItem("typeMap", "satMap");
    //			window.open('selectSatellital.html', '_blank', 'location=yes');
    //		}
    //});
    $('#selectionGeoMap').click(function() {
		if (ready) {
			localStorage.setItem("typeMap", "geoMap");
			window.open('selectionGeoMap.html', '_blank', 'location=yes');
		}
	});
	$('#index').click(function() {
    	if (ready) {
    		window.open('../index.html', '_top', 'location=yes');
    	}
    });
});