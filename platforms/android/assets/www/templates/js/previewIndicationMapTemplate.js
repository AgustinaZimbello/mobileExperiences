var ready;
 function phonegapReady() {
 	ready = true;
 	loadTemplate();
 }

 function loadTemplate(){
 	var imt_inputTitle = localStorage.getItem('imt_inputTitle');
 	var imt_inputParagraph = localStorage.getItem('imt_inputParagraph');
 	var imt_button_read = localStorage.getItem('imt_button_read');
 	var imageContainer=$('#imageIndicationMapPreview');
 	var imageUrl=localStorage.getItem('indicationMapImage');

     document.getElementById('imt_inputTitle').innerHTML=imt_inputTitle;
     document.getElementById('imt_inputParagraph').innerHTML=imt_inputParagraph;
     document.getElementById('imt_button_read').innerHTML=imt_button_read;
     imageContainer.append('<img src="'+imageUrl +'"/>');
    console.log("indicationMap"+imageUrl);
 }