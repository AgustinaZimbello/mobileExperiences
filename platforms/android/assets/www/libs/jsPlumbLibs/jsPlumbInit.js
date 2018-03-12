
    // setup some defaults for jsPlumb. 
    window.jsPlumbInstance = {

        init :function() {

            jsPlumb.importDefaults({
                Endpoint: ["Dot", {
                    radius: 2
                }],
                EndpointStyle: {
                    fillStyle: "transparent"
                },
                HoverPaintStyle: {
                    strokeStyle: "red",
                    lineWidth: 4
                },
                ConnectionOverlays: [
                    ["Arrow", {
                        location: 1,
                        id: "arrow",
                        length: 30,
                        foldback: 0.8
                    }],
                    ["Label", {
                        label: "",
                        id: "label"
                    }]
                ]
            });

            var increment = 0; //This variable is used to differentiate the id of each copy.
            //Cursor styles
            $('.content').on("mouseover", function () {
                document.body.style.cursor = "move";
            });
            $('.content').on("mouseout", function () {
                document.body.style.cursor = "default";
            });
            var copyClass;
            var copy;

            //For each element in the left bar (audio, video, image)...
            $('.content').on("mousedown", function () {
                //copyId = 'content' + ++increment;
                //console.log(copyId);
                $('#createContent').defineContent();
            });

        }
    }

/*
 *  This file contains the JS that handles the first init of each jQuery demonstration, and also switching
 *  between render modes.
 */
jsPlumb.bind("ready", function() {

     // render mode
    var resetRenderMode = function(desiredMode) {
        var newMode = jsPlumb.setRenderMode(desiredMode);
        $(".rmode").removeClass("selected");
        $(".rmode[mode='" + newMode + "']").addClass("selected");       

        $(".rmode[mode='canvas']").attr("disabled", !jsPlumb.isCanvasAvailable());
        $(".rmode[mode='svg']").attr("disabled", !jsPlumb.isSVGAvailable());
        $(".rmode[mode='vml']").attr("disabled", !jsPlumb.isVMLAvailable());

        jsPlumbInstance.init();
    };
     
    $(".rmode").bind("click", function() {
        var desiredMode = $(this).attr("mode");
        if (jsPlumbInstance.reset) jsPlumbInstance.reset();
        jsPlumb.reset();
        resetRenderMode(desiredMode);                   
    }); 

    resetRenderMode(jsPlumb.SVG);
       
});