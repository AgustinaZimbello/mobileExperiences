function phonegapReady() {
    // Necesario para conocer si las app de PhoneGap ya escuentran
    // disponibles(cargadas)
    ready = true;
    var f= localStorage.getItem("currentScreenshot");
    var file= "file://" + f;
    console.log("agustina"+ file);
    var imageContainer=$('#imageScreenshot');
    imageContainer.append('<img style="width:100%;" id="target" src="'+file+'"/>');
    //imageContainer.append('<img style="width:100%;" id="target" src="test.png"+"/>');
    $('#target').Jcrop({
        onChange : updatePreview,
        onSelect : updatePreview,
        aspectRatio : 1
    });



    function updatePreview(c) {
        if(parseInt(c.w) > 0) {
            // Show image preview
            var imageObj = $("#target")[0];
            canvas = $("#preview")[0];
            var context = canvas.getContext("2d");
            context.drawImage(imageObj, c.x, c.y, c.w, c.h, 0, 0, canvas.width, canvas.height);
        }
    }


$('#saveImage').click(function() {
    console.log("Save Image");
    window.canvas2ImagePlugin.saveImageDataToLibrary(
        function(msg){
            console.log("se guardo"+ msg);
        },
        function(err){
            console.log(err);
        },
        canvas
    );
});
}