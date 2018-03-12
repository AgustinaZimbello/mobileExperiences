$(function() {
		$('#optionMenu').click(function() {
       		// jQuery selector to get an element
       		console.log("clcc");
       		var menu = $('#menu');
       		// check if element is Visible
       		var isVisible = menu.is(':visible');
       		if (isVisible === true) {
       			$('#map').css("height", "100%");
       			menu.hide();
       		} else {
       			$('#map').css("height", "60%");
       			menu.show();
       		}
	});
	});
