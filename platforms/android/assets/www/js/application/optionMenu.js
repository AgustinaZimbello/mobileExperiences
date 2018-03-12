$(function() {
		$('#optionMenu').click(function() {
       		// jQuery selector to get an element
       		var menu = $('#menu');
       		// check if element is Visible
       		var isVisible = menu.is(':visible');
       		if (isVisible === true) {
       			$('#template').css("height", "100%");
       			menu.hide();
       		} else {
       			$('#template').css("height", "50%");
       			menu.show();
       		}
	});
	});
