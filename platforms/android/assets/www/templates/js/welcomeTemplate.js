var ready;
function phonegapReady() {
	ready = true;
		  $('#menu').hide();
}

$(function() {

	$('#selectImage').click(function (){
			$('#imageModal').modal('show');
		});

     $('#selectExisting').click(function() {
		if (ready) {
		  $('#selectFromGallery').hide();
		  $('#selectExisting').hide();
       	  $('#carousel-example-generic').show();

		}
	});
	$('#globe').click(function (){
        var iconClassValue = $('#globe').attr('class');
        localStorage.setItem("icon",iconClassValue);
        alert('Icono Seleccionado'+iconClassValue);
    });
    $('#refresh').click(function (){
    	var iconClassValue2 = $('#refresh').attr('class');
        localStorage.setItem("icon",iconClassValue2); 
    });
    $('#puzzle').click(function (){
    	var iconClassValue3 = $('#puzzle').attr('class');
        localStorage.setItem("icon",iconClassValue3);
    });
    $('#map').click(function (){
    	var iconClassValue4 = $('#map').attr('class');
        localStorage.setItem("icon",iconClassValue4);
    });

});

