var ready;
function phonegapReady() {
	ready = true;
		  $('#menu').hide();
}

$(function() {

	$('#indicationMap').click(function (){
			$('#indicationMapModal').modal('show');
		});


    	$('#selectExisting').click(function() {
    		var options = {
    			maximumImagesCount : 1,
    			width : 300,
    			height : 300,
    			quality : 80
    		};
    		plugins.imagePicker.getPictures(function(results) {
    			var imageUrl = results[0];
    			var affineOverlay;
                var image = new Image();
                image.src = imageUrl;
                var imageContainer=$('#indicationMapImage');
                imageContainer.append('<img src="'+imageUrl +'"/>');
                localStorage.setItem("indicationMapImage", imageUrl);
    		}, function(error) {
    			console.log('Error: ' + error);
    		}, options);
    	});

});
