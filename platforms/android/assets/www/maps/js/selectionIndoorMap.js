var ready;
function phonegapReady() {
	ready = true;
	loadMap();
}

function loadMap() {

	if (localStorage.getItem("element") == 'elementPosition') {
		$('#divElement').attr('id', 'elementPosition');
		$('#elementh3').html("NUEVO ELEMENTO POSICIONADO");
	}

	map = L.map('map', {
		zoom : 5,
		minZoom : 9,
		maxZoom : 10,
		center : [ -0.3, 0.5 ],
		crs : L.CRS.Simple,
	});

	$('#map').hide();
	$('#menu').hide();
	$('#optionMenu').hide();
}

$(function() {
	$('#selectMapFromGallery').click(function() {
		var options = {
			maximumImagesCount : 1,
			width : 800,
			height : 800,
			quality : 80
		};
		plugins.imagePicker.getPictures(function(results) {
			var imageUrl = results[0];
			var myImage = new Image();
			myImage.src = imageUrl;
			console.log(myImage);
			myImage.onload = function() {
				var w = myImage.width;
				var h = myImage.height;
				// calculate the edges of the image, in coordinate space
				var southWest = map.unproject([ 0, h ], map.getMaxZoom());
				var northEast = map.unproject([ w, 0 ], map.getMaxZoom());
				var imageBounds = new L.LatLngBounds(southWest, northEast);

				L.imageOverlay(imageUrl, imageBounds).addTo(map);
				$('#selectIndoorMap').hide();
				$('#map').show();
				$('#optionMenu').show();
			};

		}, function(error) {
			console.log('Error: ' + error);
		}, options);
	});

	$('#optionMenu').click(function() {

		// jQuery selector to get an element
		var query = $('#menu');

		// check if element is Visible
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
