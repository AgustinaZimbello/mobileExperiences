$(function() {
$('#saveTemplate').click(function() {
    var currentPOI= localStorage.getItem("currentPOI");
    console.log("Template for current "+currentPOI);
    var templateDefined = $("#template").html();
    var templateKey= currentPOI+"_template";
    localStorage.setItem(templateKey,templateDefined);
    console.log("save"+templateDefined);
});
});
