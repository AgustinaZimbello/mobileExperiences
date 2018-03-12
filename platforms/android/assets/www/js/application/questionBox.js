function questionBox(id, targetCell){
	$("#popbox-"+id).append("<div id='question-"+id+"' class='question'>"+
								"<ul><li>Pregunta:<input class='title' type='text'></li></ul>"+
								"<ul id='sortable-"+id+"'></ul>"+
								"<div class='add-icon'></div>"+
								"<button class='button save-icon action redbtn'><span class='glabel'>GUARDAR</span></button>"+
							"</div>");
	editQuestionOptions(id);
}

function editQuestionOptions(id){
	$('#sortable-'+id).sortable();

	$(".add-icon").on("click",function(){
		var children = $("#sortable-"+id)[0].childElementCount + 1;
		$("#sortable-"+id).append("<li class='option incorrect-li'><div class='drag-icon'></div>Opci&oacute;n "+(children)+":<input type='text'><div id='q"+children+'-'+id+"' class='incorrect'></div><div class='remove-icon'></div></li>");
		$(".remove-icon").on("click",function(){
			this.parentNode.remove();
		});
		$("#q"+children+'-'+id).on("click",function(){
			if($("#q"+children+'-'+id)[0].className == "incorrect"){
				$("#q"+children+'-'+id)[0].className = "correct";
				$("#q"+children+'-'+id)[0].parentNode.className = "option correct-li";
			}else{
				$("#q"+children+'-'+id)[0].className = "incorrect";
				$("#q"+children+'-'+id)[0].parentNode.className = "option incorrect-li";
			}
		});

	});
	
	$(".remove-icon").on("click",function(){
		this.parentNode.remove();
	});

	$(".save-icon").on("click",function(){
		//targetCell.innerHTML=('<div id="div-question-'+id+'" class="q-result">'+$("#popbox-"+id+" li").children()[0].value+'</div> ');
		console.log($("#popbox-"+id+" .questionButton").last());
		if($("#popbox-"+id+" .questionButton").length == 2){
			$("#popbox-"+id+" .questionButton").last().parent()[0].innerHTML=('<div id="div-question-'+id+'" class="drag q-result">'+$("#popbox-"+id+" li").children()[0].value+'</div> ');
		}else{
			$("#div-question-"+id)[0].innerHTML=$("#popbox-"+id+" li").children()[0].value;
		}

		//Reinitialize grid
		grid.init('drag-'+id);
		//var res = document.createElement('div');
		//res.className = 'q-result';
		//res.innerHTML = $("#popbox-"+id+" li").children()[0].value;
		//targetCell.innerHTML = "";
		//targetCell.appendChild(res);
		$("#popbox-"+id+" .question").fadeOut("slow");
		$("#div-question-"+id).unbind("click");
		$("#div-question-"+id).on("click",function(){
			id = this.id.split("-")[2];
			$("#question-"+id).fadeIn("slow");
		});
	});

	$("#question-"+id+" .add-icon").click();

	$(document).bind('keyup', function (event) {
	   if (event.keyCode == 27) {
		 $(".question").fadeOut('slow');
	   }
	});
}