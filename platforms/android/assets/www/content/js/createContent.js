function phonegapReady() {
    // Necesario para conocer si las app de PhoneGap ya escuentran
    // disponibles(cargadas)
    ready = true;
}

$(function() {

    $('#selectImage').click(function (){
        $('#imageModal').modal('show');
    });

    $('#selectExisting').click(function() {
        if (ready) {
            $('#selectFromGallery').hide();
            $('#selectExisting').hide();
            $('#carousel-example-generic').show();

        }
    });
    $('#question').click(function () {
        $("#blankContent").empty();
        $("#blankContent").append('<div class="row uniform"><div class="12u alignCenter"><input type="text" id="wt_inputTitle" placeholder="Contenido Pregunta"/></div></div>');
    });
    $('#image').click(function () {
        var imageContainer=$('#imageIndicationMapPreview');
        var options = {
            maximumImagesCount: 1,
            width: 150,
            height: 150,
            quality: 80
        };
        plugins.imagePicker.getPictures(function (results) {
            var imageUrl = results[0];
            var affineOverlay;
            imageContainer.append('<img src="'+imageUrl+'"/>');
            alert(imageUrl);
        }, function (error) {
            console.log('Error: ' + error);
        }, options);
    });
    $('#text').click(function () {
        $("#blankContent").empty();
        $("#blankContent").append(' <div class="12u"><textarea name="message" id="wt_inputTitle" placeholder="Contenido Texto"/></textarea></div></div>');
    });

    $('#cleanTemplate').click(function () {
        $("#blankContent").empty();
    });


});



