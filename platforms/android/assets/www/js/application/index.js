var ready;
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
			window.open('contents/content.html','_blank', 'location=yes');
		}
	});
	$('#createPositions').click(function() {
    	if (ready) {
    		localStorage.setItem("selection", "position");
    		window.open('maps/mapSelection.html','_blank', 'location=yes');
    	}
    });
    $('#createTemplates').click(function() {
		if (ready) {
			window.open('templates/menuTemplates.html','_blank', 'location=yes');
		}
	});
    
    
});