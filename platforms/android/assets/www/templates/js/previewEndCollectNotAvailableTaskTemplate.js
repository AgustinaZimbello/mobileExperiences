var ready;
 function phonegapReady() {
 	ready = true;
 	loadTemplate();
 }

 function loadTemplate(){
 	var ecnt_inputTitle = localStorage.getItem('ecnt_inputTitle');
 	var ecnt_inputParagraph = localStorage.getItem('ecnt_inputParagraph');
 	var ecnt_inputQuestion = localStorage.getItem('ecnt_inputQuestion');
 	var ecnt_button1 = localStorage.getItem('ecnt_button1');
 	var ecnt_button2 = localStorage.getItem('ecnt_button2');
 	var iconQuestionECN = localStorage.getItem('iconQuestionECN');



     document.getElementById('ecnt_inputTitle').innerHTML=ecnt_inputTitle;
     document.getElementById('ecnt_inputParagraph').innerHTML=ecnt_inputParagraph;
     document.getElementById('ecnt_inputQuestion').innerHTML=ecnt_inputQuestion;
     document.getElementById('ecnt_button1').innerHTML=ecnt_button1;
     document.getElementById('ecnt_button2').innerHTML=ecnt_button2;
     $('#iconSelectECN').addClass(iconQuestionECN);

 }