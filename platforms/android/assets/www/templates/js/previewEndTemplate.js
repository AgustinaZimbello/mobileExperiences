var ready;
 function phonegapReady() {
 	ready = true;
 	loadTemplate();
 }

 function loadTemplate(){
 	var et_inputTitle = localStorage.getItem('et_inputTitle');
 	var et_inputParagraph = localStorage.getItem('et_inputParagraph');
 	var et_inputQuestion = localStorage.getItem('et_inputQuestion');
 	var et_button1 = localStorage.getItem('et_button1');
 	var et_button2 = localStorage.getItem('et_button2');
 	var iconQuestionEnd= localStorage.getItem('iconQuestionEnd');

     document.getElementById('et_inputTitle').innerHTML=et_inputTitle;
     document.getElementById('et_inputParagraph').innerHTML=et_inputParagraph;
     document.getElementById('et_inputQuestion').innerHTML=et_inputQuestion;
     document.getElementById('et_button1').innerHTML=et_button1;
     document.getElementById('et_button2').innerHTML=et_button2;
     $('#iconQuestionEnd').addClass(iconQuestionECA);

 }