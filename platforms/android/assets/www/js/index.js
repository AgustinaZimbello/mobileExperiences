var ready;
function phonegapReady(){
    //	Necesario para conocer si las app de PhoneGap ya escuentran disponibles(cargadas)
	ready=true;
	}

$(function() {
	$("#saveString").click(function() {
		if(ready){saveString();}
	});
	$("#saveInteger").click(function() {
		if(ready){saveInteger();}
	});
	$("#addElement").click(function() {
		if(ready){addElement();}
	});
	$("#saveList").click(function() {
		if(ready){saveList();}
	});
	$("#getString").click(function() {
		if(ready){getString();}
	});
	$("#getInteger").click(function() {
		if(ready){getInteger();}
	});
	$("#getList").click(function() {
		if (ready){getList();}
	});
});