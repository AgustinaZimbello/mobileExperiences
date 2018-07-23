var ready;
var canvas;
function phonegapReady() {
	ready = true;

}
$(function() {
	$('#createElementPositioned').click(function() {
		if (ready) {
     		 localStorage.setItem("selection", "elementPositioned");
			 window.open('maps/mapSelection.html','_blank', 'location=yes');
		}
	});
	$('#createContents').click(function() {
		if (ready) {
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