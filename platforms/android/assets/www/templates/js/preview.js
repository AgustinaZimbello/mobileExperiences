var ready;

function phonegapReady() {
    ready = true;

}

$(function() {
    $('#previewWelcomeTemplate').click(function() {
        if (ready) {
            var wt_inputTitle = $('#wt_inputTitle').val();
            var wt_inputParagraph = $('#wt_inputParagraph').val();
            var wt_button = $('#wt_button').val();
            if (!$.trim(wt_inputTitle) == '') {
                localStorage.setItem("wt_inputTitle", wt_inputTitle);
            } else {
                localStorage.setItem("wt_inputTitle", "Bienvenidos al Juego");
            }
            if (!$.trim(wt_inputParagraph) == '') {
                localStorage.setItem("wt_inputParagraph", wt_inputParagraph);
            } else {
                localStorage.setItem("wt_inputParagraph", "Bienvenidos al Juego");
            }
            if (!$.trim(wt_button) == '') {
                localStorage.setItem("wt_button", wt_button);
            } else {
                localStorage.setItem("wt_button", "A Jugar");
            }
            window.open('previewWelcomeTemplate.html', '_blank', 'location=yes');
        }
    });

    $('#previewTaskCollectTemplate').click(function() {
        if (ready) {
        var tct_inputParagraph = $('#tct_inputParagraph').val();
        var tct_button1 = $('#tct_button1').val();
        var tct_button2 = $('#tct_button2').val();
        if (!$.trim(tct_inputParagraph) == '') {
            localStorage.setItem("tct_inputParagraph", tct_inputParagraph);
        } else {
            localStorage.setItem("tct_inputParagraph", "Deberá recolectar todos los elementos que se puedan usar para hacer..");
        }
        if (!$.trim(tct_button1) == '') {
            localStorage.setItem("tct_button1", tct_button1);
        } else {
            localStorage.setItem("tct_button1", "Recolectar Elemento");
        }
        if (!$.trim(tct_button2) == '') {
            localStorage.setItem("tct_button2", tct_button2);
        } else {
            localStorage.setItem("tct_button2", "Terminar Tarea");
        }

        window.open('previewTaskCollectTemplate.html', '_blank', 'location=yes');   }
    });


    $('#previewIndicationMapTemplate').click(function() {

        var imt_inputTitle = $('#imt_inputTitle').val();
        var imt_inputParagraph = $('#imt_inputParagraph').val();
        var imt_button_read = $('#imt_button_read').val();
        if (!$.trim(imt_inputTitle) == '') {
            localStorage.setItem("imt_inputTitle", imt_inputTitle);
        } else {
            localStorage.setItem("imt_inputTitle", "En el mapa se muestra el lugar donde debera ir para continuar el juego");
        }
        if (!$.trim(imt_inputParagraph) == '') {
            localStorage.setItem("imt_inputParagraph", imt_inputParagraph);
        } else {
            localStorage.setItem("imt_inputParagraph", "Una vez que llegue al lugar indicado debera leer el codigo");
        }
        if (!$.trim(imt_button_read) == '') {
            localStorage.setItem("imt_button_read", imt_button_read);
        } else {
            localStorage.setItem("imt_button_read", "Terminar Tarea");
        }
        window.open('previewIndicationMapTemplate.html', '_blank', 'location=yes');
    });

    $('#previewCollectAvailableTasksTemplate').click(function() {
    if (ready) {
        var ect_inputTitle = $('#ect_inputTitle').val();
        var ect_inputParagraph = $('#ect_inputParagraph').val();
        var ect_inputQuestion = $('#ect_inputQuestion').val();
        var ect_button1 = $('#ect_button1').val();
        var ect_button2 = $('#ect_button2').val();
        if (!$.trim(ect_inputTitle) == '') {
            localStorage.setItem("ect_inputTitle", ect_inputTitle);
        } else {
            localStorage.setItem("ect_inputTitle", "¡Ha finalizado la tarea!");
        }
        if (!$.trim(ect_inputParagraph) == '') {
            localStorage.setItem("ect_inputParagraph", ect_inputParagraph);
        } else {
            localStorage.setItem("ect_inputParagraph", "Ahora debera elegir entre ir a depositar los elementos recolectados o ir a la siguiente tarea");
        }
        if (!$.trim(ect_inputQuestion) == '') {
            localStorage.setItem("ect_inputQuestion", ect_inputQuestion);
        } else {
            localStorage.setItem("ect_inputQuestion", "¿Que Eligen?");
        }
        if (!$.trim(ect_button1) == '') {
            localStorage.setItem("ect_button1", ect_button1);
        } else {
            localStorage.setItem("ect_button1", "Ir a Depositar");
        }
        if (!$.trim(ect_button2) == '') {
            localStorage.setItem("ect_button2", ect_button2);
        } else {
            localStorage.setItem("ect_button2", "Ir a la siguiente tarea");
        }
        window.open('previewEndCollectAvailableTasksTemplate.html', '_blank', 'location=yes');}

    });
$('#previewEndCollectNotAvailableTaskTemplate').click(function() {
    if (ready) {
        var ecnt_inputTitle = $('#ecnt_inputTitle').val();
        var ecnt_inputParagraph = $('#ecnt_inputParagraph').val();
        var ecnt_inputQuestion = $('#ecnt_inputQuestion').val();
        var ecnt_button1 = $('#ecnt_button1').val();
        var ecnt_button2 = $('#ecnt_button2').val();
        if (!$.trim(ecnt_inputTitle) == '') {
            localStorage.setItem("ecnt_inputTitle", ecnt_inputTitle);
        } else {
            localStorage.setItem("ecnt_inputTitle", "¡Ha finalizado todas las tareas propuestas!");
        }
        if (!$.trim(ecnt_inputParagraph) == '') {
            localStorage.setItem("ecnt_inputParagraph", ecnt_inputParagraph);
        } else {
            localStorage.setItem("ecnt_inputParagraph", "Ahora debera elegir entre ir a depositar los elementos recolectados o terminar el juego");
        }
        if (!$.trim(ecnt_inputQuestion) == '') {
            localStorage.setItem("ecnt_inputQuestion", ecnt_inputQuestion);
        } else {
            localStorage.setItem("ecnt_inputQuestion", "¿Que Eligen?");
        }
        if (!$.trim(ecnt_button1) == '') {
            localStorage.setItem("ecnt_button1", ecnt_button1);
        } else {
            localStorage.setItem("ecnt_button1", "Ir a depositar");
        }
        if (!$.trim(ecnt_button2) == '') {
            localStorage.setItem("ecnt_button2", ecnt_button2);
        } else {
            localStorage.setItem("ecnt_button2", "Finalizar el Juego");
        }
        window.open('previewEndCollectNotAvailableTaskTemplate.html', '_blank', 'location=yes');
    }
});
$('#previewEndTemplate').click(function() {
if (ready) {
    var et_inputTitle = $('#et_inputTitle').val();
    var et_inputParagraph = $('#et_inputParagraph').val();
    var et_inputQuestion = $('#et_inputQuestion').val();
    var et_button1 = $('#et_button1').val();
    var et_button2 = $('#et_button2').val();

    if (!$.trim(et_inputTitle) == '') {
        localStorage.setItem("et_inputTitle", et_inputTitle);
    } else {
        localStorage.setItem("et_inputTitle", "¡Felicitaciones! Han finalizado el juego");
    }
    if (!$.trim(et_inputParagraph) == '') {
        localStorage.setItem("et_inputParagraph", et_inputParagraph);
    } else {
        localStorage.setItem("et_inputParagraph", "Ahora debera elegir entre ver su desempeño en el juego o salir del mismo");
    }
    if (!$.trim(et_inputQuestion) == '') {
        localStorage.setItem("et_inputQuestion", et_inputQuestion);
    } else {
        localStorage.setItem("et_inputQuestion", "¿Que Eligen?");
    }
    if (!$.trim(et_button1) == '') {
        localStorage.setItem("et_button1", et_button1);
    } else {
        localStorage.setItem("et_button1", "Ver Desempe&ntilde;o");
    }
    if (!$.trim(et_button2) == '') {
        localStorage.setItem("et_button2", et_button2);
    } else {
        localStorage.setItem("et_button2", "Finalizar Juego");
    }

    window.open('previewEndTemplate.html', '_blank', 'location=yes');
}
});


});