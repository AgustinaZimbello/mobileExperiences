/*jslint white: true, browser: true, undef: true, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, strict: true, newcap: true, immed: true, maxerr: 14 */
/*global window: false, REDIPS: true */

/* enable strict mode */
"use strict";

var redipsInit,		// define redipsInit variable
	save,			// save elements and their positions
	report,			// function shows subject occurring in timetable
	reportButton,	// show/hide report buttons
	showAll,		// function show all subjects in timetable
	printMessage,	// print message
	divNodeList,	// node list of DIV elements in t2 (global variable needed in report() and visibility() function)
	id,				// id of scrollable container
	globalId;

// redips initialization
redipsInit = function (id) {
	globalId = id;
	grid = REDIPS.drag;			// reference to the REDIPS.drag object
	// initialization
	grid.init('drag-'+id);
	// REDIPS.drag settings
	grid.dropMode = 'single';			// dragged elements can be placed only to the empty cells
	grid.hover.colorTd = '#9BB3DA';	// set hover color
	grid.clone.keyDiv = true;			// enable cloning DIV elements with pressed SHIFT key
	// prepare node list of DIV elements in t2
	divNodeList = document.getElementById('grid-'+id).getElementsByTagName('div');
	// show / hide report buttons (needed for dynamic version - with index.php)
	reportButton();
	// element is dropped
	grid.event.dropped = function () {
		var id = $("#grid-"+globalId)[0].parentNode.parentNode.parentNode.id.split("-")[1];
		var	objOld = grid.objOld,					// original object
			targetCell = grid.td.target,			// target cell
			targetRow = targetCell.parentNode,	// target row
			i, objNew;							// local variables
		// print message only if target and source table cell differ
		if (grid.td.target !== grid.td.source) { 
			printMessage('Content has been changed!');
		}
		// show / hide report buttons
		reportButton();
		var classname = objOld.className.split(" ")[4];
		switch(classname){
			case "imageButton":
				$(targetCell).append("<div id='div-image-"+id+"' class='drag' style='display:none;'></div>");
				$(targetCell).append("<img id='thumb-"+id+"' class='thumbnail'></img>");
				$(targetCell).append("<input id='file-"+id+"' type='file' style='display:none;'/>");
				var file = $("#file-"+id);
				file.click();
				file.on("change",function(){
					function previewFile(file) {
                        var file = file[0].files[0];
                        var reader = new FileReader();
                        reader.onloadend = function () {
                        	$(targetCell).children(0).first().remove();
                            $("#thumb-"+id).attr("src",reader.result);
                            thumb = reader.result;
                        }
                        if (file) {
                            reader.readAsDataURL(file);
                        }
                    }
                    
                    previewFile($("#file-"+id));

					grid.init('drag-'+id);
				});
			break;
			case "textButton":
					if($("#div-textarea-"+id).length == 0){
	 					targetCell.innerHTML=('<div id="div-textarea-'+id+'" class="drag"><textarea id="textarea-'+id+'" class="div-textarea" rows="4" cols="50" placeholder="Ingrese un texto..."></textarea><div id="drag-textarea"></div></div> ');
						grid.init('drag-'+id);
					}else{
						$("#c1").remove();
						alert("Por ahora sólo un texto por contenido.");
					}
			break;
			case "questionButton":
					if($("#question-"+id).length == 0){
						questionBox(id, targetCell);
					}else{
						$("#c1").remove();
						alert("Por ahora sólo una pregunta por contenido.");
					}
			break;
		}
	};
	// after element is deleted from the timetable, print message
	grid.event.deleted = function () {
		var empty = true;
		$("#t2 td").each(function(index){
			if($(this)[0].children.length !=0){
				empty = false;
				$("#dragtext").fadeOut("slow");
			}
		});
		if (empty == true){
			$("#dragtext").fadeIn("slow");
		}
	};
	
	// if any element is clicked, then make all subjects in timetable visible
	grid.event.clicked = function () {
		showAll();
	};
};


// save elements and their positions
save = function () {
	// scan timetable content
	var content = REDIPS.drag.saveContent('t2');
	// and save content
	window.location.href = 'db_save.php?' + content;
};


// function shows subject occurring in timetable
report = function (subject) {
		// define day and time labels
	var day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
		time = ['08:00', '09:00', '10:00', '11:00', '12:00',
		        '13:00', '14:00', '15:00', '16:00'],
		div = [],	// define array
		cellIndex,	// cell index
		rowIndex,	// row index
		id,			// element id
		i,			// loop variable
		num = 0,	// number of found subject
		str = '';	// result string
	// show all elements
	showAll();
	// create array from node list (node list is global variable)
	for (i = 0; i < divNodeList.length; i++) {
		div[i] = divNodeList[i];
	}
	// sort div elements by the cellIndex (days in week) and rowIndex (hours)
	div.sort(function (a, b) {
		var a_ci = a.parentNode.cellIndex,				// a element cell index
			a_ri = a.parentNode.parentNode.rowIndex,	// a element row index
			b_ci = b.parentNode.cellIndex,				// b element cell index
			b_ri = b.parentNode.parentNode.rowIndex;	// b element row index
		return a_ci * 100 + a_ri - (b_ci * 100 + b_ri);
	});
	// loop goes through all collected elements
	for (i = 0; i < div.length; i++) {
		// define only first two letters of ID
		// (cloned elements have appended c1, c2, c3 ...)
		id = div[i].id.substr(0, 2);
		// if id is equal to the passed subject then we have a match
		if (id === subject) { 
			// define cell index
			cellIndex = div[i].parentNode.cellIndex;
			// table row is parent element of table cell 
			rowIndex = div[i].parentNode.parentNode.rowIndex;
			// add line with found element
			str += day[cellIndex - 1] + '\t\t' + time[rowIndex - 1] + '\n';
			// increase counter
			num++;
		}
		// other elements should be hidden
		else {
			div[i].style.visibility = 'hidden';
		}
	}
	// if "Show report" is checked then show message
	if (document.getElementById('report').checked === true) {
		alert('Number of found subjects: ' + num + '\n' + str);
	}
};


// show/hide report buttons
reportButton = function () {
	var	id,			// element id
		i,			// loop variable
		count,		// number of subjects in timetable
		style,		// hidden or visible
		// prepare subjects
		subject = {'en': 0, 'ph': 0, 'ma': 0, 'bi': 0, 'ch': 0, 'it': 0, 'ar': 0, 'hi': 0, 'et': 0};
	// loop goes through all collected elements
	for (i = 0; i < divNodeList.length; i++) {
		// define only first two letters of ID
		// (cloned elements have appended c1, c2, c3 ...)
		id = divNodeList[i].id.substr(0, 2);
		// increase subject occurring
		subject[id]++;
	}
	// loop through subjects
	for (i in subject) {
		// using the hasOwnProperty method to distinguish the true members of the object
		if (subject.hasOwnProperty(i)) {
			// prepare id of the report button
			id = 'b_' + i;
			// subject count on the timetable
			count = subject[i];
			if (count === 0) {
				style = 'hidden';
			}
			else {
				style = 'visible';
			}
			// hide or show report button
			//document.getElementById(id).style.visibility = style;
		}
	}
};


// print message
printMessage = function (message) {
	//document.getElementById('message').innerHTML = message;
};


// function show all subjects in timetable
showAll = function () {
	var	i; // loop variable
	for (i = 0; i < divNodeList.length; i++) {
		divNodeList[i].style.visibility = 'visible';
	}
};

/*
// add onload event listener
if (window.addEventListener) {
	window.addEventListener('load', redipsInit, false);
}
else if (window.attachEvent) {
	window.attachEvent('onload', redipsInit);
}*/