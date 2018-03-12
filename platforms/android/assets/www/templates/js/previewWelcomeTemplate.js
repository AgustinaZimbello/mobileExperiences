 var ready;
 function phonegapReady() {
 	ready = true;
 	loadTemplate();
 }

 function loadTemplate(){
 	var wt_inputTitle = localStorage.getItem('wt_inputTitle');
 	var wt_inputParagraph = localStorage.getItem('wt_inputParagraph');
 	var wt_button = localStorage.getItem('wt_button');
 	var iconChange= localStorage.getItem('icon');


    alert(iconChange);
     document.getElementById('wt_inputTitle').innerHTML=wt_inputTitle;
     document.getElementById('wt_inputParagraph').innerHTML=wt_inputParagraph;
     document.getElementById('wt_button').innerHTML=wt_button;
     $('#iconSelect').addClass(iconChange);
 }