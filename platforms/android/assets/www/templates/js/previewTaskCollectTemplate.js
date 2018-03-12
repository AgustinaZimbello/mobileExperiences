 var ready;
 function phonegapReady() {
 	ready = true;
 	loadTemplate();
 }

 function loadTemplate(){
 	var tct_inputParagraph = localStorage.getItem('tct_inputParagraph');
 	var tct_button1 = localStorage.getItem('tct_button1');
 	var tct_button2 = localStorage.getItem('tct_button2');

     document.getElementById('tct_inputParagraph').innerHTML=tct_inputParagraph;
     document.getElementById('tct_button1').innerHTML=tct_button1;
     document.getElementById('tct_button2').innerHTML=tct_button2;
 }