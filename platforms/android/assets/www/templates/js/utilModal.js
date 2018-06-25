$(function () {
    $('#blankTemplate').on('click', '#indicationMap', function () {
        $('#indicationMapModal').modal('show');
    })
    $('#blankTemplate').on('click', '#selectImage', function () {
        $('#imageModal').modal('show');
    })

    $('#selectExisting').click(function() {
        var options = {
            maximumImagesCount : 1,
            width : 300,
            height : 300,
            quality : 80
        };
        plugins.imagePicker.getPictures(function(results) {
            var imageUrl = results[0];
            var affineOverlay;
            var image = new Image();
            image.src = imageUrl;
            var imageContainer=$('#indicationMapImage');
            imageContainer.append('<img src="'+imageUrl +'"/>');
            localStorage.setItem("indicationMapImage", imageUrl);
        }, function(error) {
            console.log('Error: ' + error);
        }, options);
    });
});