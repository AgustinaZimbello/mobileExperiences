var ready;
function phonegapReady() {
	ready = true;
		  $('#menu').hide();
}

$(function() {
	$('#selectQuestionIcon').click(function (){
			$('#iconModal').modal('show');
		});


	$('#question1').click(function (){
        var iconClassValue = $('#question1').attr('class');
        localStorage.setItem("iconQuestionECN",iconClassValue);
        alert('Icono Seleccionado'+iconClassValue);
    });
    $('#question2').click(function (){
    	var iconClassValue2 = $('#question2').attr('class');
        localStorage.setItem("iconQuestionECN",iconClassValue2);
    });
    $('#question3').click(function (){
    	var iconClassValue3 = $('#question3').attr('class');
        localStorage.setItem("iconQuestionECN",iconClassValue3);
    });

});

