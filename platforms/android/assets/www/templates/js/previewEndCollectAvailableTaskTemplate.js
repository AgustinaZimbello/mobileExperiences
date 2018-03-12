var ready;
 function phonegapReady() {
 	ready = true;
 	loadTemplate();
 }

 function loadTemplate(){
 	var ect_inputTitle = localStorage.getItem('ect_inputTitle');
 	var ect_inputParagraph = localStorage.getItem('ect_inputParagraph');
 	var ect_inputQuestion = localStorage.getItem('ect_inputQuestion');
 	var ect_button1 = localStorage.getItem('ect_button1');
 	var ect_button2 = localStorage.getItem('ect_button2');
 	var iconQuestionECA =localStorage.getItem('iconQuestionECA');

     document.getElementById('ect_inputTitle').innerHTML=ect_inputTitle;
     document.getElementById('ect_inputParagraph').innerHTML=ect_inputParagraph;
     document.getElementById('ect_inputQuestion').innerHTML=ect_inputQuestion;
     document.getElementById('ect_button1').innerHTML=ect_button1;
     document.getElementById('ect_button2').innerHTML=ect_button2;
     $('#iconQuestionECA').addClass(iconQuestionECA);


 }