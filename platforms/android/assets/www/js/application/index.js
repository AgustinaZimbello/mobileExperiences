var ready;
var canvas;
function phonegapReady() {
	ready = true;


}

$(function() {
	$('#createElementPositioned').click(function() {
		if (ready) {
                window.canvas2ImagePlugin.saveImageDataToLibrary(
                    function(msg){
                        console.log(msg);
                    },
                    function(err){
                        console.log(err);
                    },
                    canvas
            );			// localStorage.setItem("selection", "elementPositioned");
			// window.open('maps/mapSelection.html','_blank', 'location=yes');
		}
	});
	$('#createContents').click(function() {
		if (ready) {
            $('#target').Jcrop({
                onChange : updatePreview,
                onSelect : updatePreview,
                aspectRatio : 1
            });

            function updatePreview(c) {
                if(parseInt(c.w) > 0) {
                    // Show image preview
                    var imageObj = $("#target")[0];
                    canvas = $("#preview")[0];
                    var context = canvas.getContext("2d");
                    context.drawImage(imageObj, c.x, c.y, c.w, c.h, 0, 0, canvas.width, canvas.height);
                    Canvas2Image.saveAsPNG(canvas);
                }
            };
		    localStorage.setItem("selection", "content");
			//window.open('content/createContent.html','_blank', 'location=yes');
		}
	});
	$('#createPosition').click(function() {
    	if (ready) {
    		localStorage.setItem("selection", "position");
    		window.open('maps/mapSelection.html','_blank', 'location=yes');
    	}
    });
    $('#createTemplates').click(function() {
		if (ready) {
			window.open('templates/templates.html','_blank', 'location=yes');
		}
	});



});