function phonegapReady() {
    // Necesario para conocer si las app de PhoneGap ya escuentran
    // disponibles(cargadas)
    ready = true;
}

$(function () {
    $('#addTitle').click(function () {
        $("#blankTemplate").append('<div class="row uniform"><div class="12u alignCenter"><input type="text" id="wt_inputTitle" placeholder="Bienvenidos al Juego"/></div></div>');
    });
    $('#addImage').click(function () {
        $("#blankTemplate").append('<ul id="selectImage" class="feature-icons" style="padding-top: 10%;"><li class="fa fa-file-image-o">Seleccionar Imagen Representativa</li> </ul>');
    });
    $('#addParagraph').click(function () {
        $("#blankTemplate").append('<div class="row uniform"><div class="12u"><textarea id="wt_inputParagraph" placeholder="Parrafo explicativo" rows="6"></textarea></div></div>');
    });

    $('#addDecisionQuestion').click(function () {
        $("#blankTemplate").append('<div class="row uniform"><div class="12u"><input type="text" name="subject" id="et_inputQuestion" placeholder="Que eligen?"></div></div>');
    });
    $('#addMap').click(function () {
        $("#blankTemplate").append('<ul id="indicationMap" class="feature-icons" style="padding-top: 10%;"><li class="fa fa-map-o">Seleccionar Mapa Indicativo</li></ul>');
    });

    $('#saveWhiteTemplate').click(function () {
        var templateName = localStorage.getItem('templateName');
        var htmlTemplate = $("#blankTemplate").html();
        addWhiteTemplate (htmlTemplate, templateName);
    });

    $('#cleanTemplate').click(function () {
        $("#blankTemplate").empty();
    });

});