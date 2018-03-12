var ready;
function phonegapReady() {
	ready = true;
}

$(function() {
	$('#welcomeTemplate').click(function() {
		if (ready) {
			window.open('welcomeTemplate.html','_blank', 'location=yes');
		}
	});
	$('#indicationMapTemplate').click(function() {
		if (ready) {
			window.open('indicationMapTemplate.html','_blank', 'location=yes');
		}
	});
	$('#taskCollectTemplate').click(function() {
		if (ready) {
			window.open('taskCollectTemplate.html','_blank', 'location=yes');
		}
    });
    $('#endCollectAvailableTaskTemplate').click(function() {

		if (ready) {
			window.open('endCollectAvailableTasksTemplate.html','_blank', 'location=yes');
		}
	});
    $('#endCollectNotAvailableTaskTemplate').click(function() {
		if (ready) {
			window.open('endCollectNotAvailableTasksTemplate.html','_blank', 'location=yes');
		}
	});
    $('#endTemplate').click(function() {
		if (ready) {
			window.open('endTemplate.html','_blank', 'location=yes');
		}
	});
});