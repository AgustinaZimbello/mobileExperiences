$(function() {
	$('#home').click(function() {
		window.open('index.html', '_blank', 'location=yes');
	});

	$('#position').click(function() {
		if ($("#popbox-contentBUILDING").length == 0) {
			createPosition();
		} else {
			$("#popbox-contentBUILDING").show();
		}
	});

	$('#positionedElement').click(function() {
		window.open('ContentBox.html', '_blank', 'location=yes');
	});

});