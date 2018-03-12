var ready;
function phonegapReady() {
	ready = true;
	contentBox();

}

function contentBox() {
	if ($("#popbox-contentBUILDING").length == 0) {
		console.log("lenght the popboox igual 0");
		addContentBox(id);

	} else {
		console.log("lenght the popboox mayor a 0");
		$("#popbox-contentBUILDING").show();
	}
}