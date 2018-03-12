/*
 * Functions to add creation boxes.
 */
function addContentBox(id) {
    $.ajaxPrefilter(function(options) {
        options.crossDomain = true;
    });
    $.ajax({
        url: 'ContentBox.html',
        type: 'get',
        dataType: 'HTML',
        success: function(response) {
            $("#menu-10").append(response);
            if (typeof id == 'undefined') {
                id = 'content' + 'BUILDING';
            }
        

            //Initializing grid
            redipsInit(id);

            //Save button action
            $('#saveDefinition-' + id).on("click", function() {
                if ($("#" + id).length == 0) { //The content created is a new one
                    /*
                     * Set proper IDs...
                     */
                     increment++;

                    tmp = $("[id$='contentBUILDING']");
                    tmp.each(function(index) {
                        //console.log($("[id$='contentBUILDING']")[index].id);
                        console.log(tmp[index].id);
                        tmp[index].id = tmp[index].id.replace('contentBUILDING', 'content' + increment);
                    });

                    id = 'content' + increment;

                    var copyId;
                    if (GetURLParameter("option") == "onlyContents") { //Only contents
                        copyId = createContent(id);
                    } else {
                        copyId = createContentWithMarker(id);
                    }
                    
                    $('#' + copyId).on('dblclick', function() {
                        //classie.add( $("#st-container"), 'st-menu-open' );
                        redipsInit(copyId);
                        $("#i-nav").click();
                        $("#st-container").removeClass("st-effect-9");
                        $("#st-container").addClass("st-effect-10");
                        $("#st-container").addClass("st-menu-open");
                        $("#popbox-" + copyId).show();
                    });
                }

                //Saving GRID content in array...
                var components = grid.saveContent("grid-" + id, "string").split("&");
                var contentType = components[0].split("-")[1];
                var addType = false;
                if (components.length > 1){
                    addType = true;
                }
                for (i in components) {
                    var comp = components[i].split("-")[1];
                    components[i] = [];
                    switch(comp){
                        case "textarea":
                            if (addType) components[i]['contentType'] = "textarea";
                            components[i]['text'] = $("#textarea-"+id).get(0).value;
                        break;

                        case "question":
                            if (addType) components[i]['contentType'] = "question";
                            components[i]['question'] = [];
                            components[i]['question']['contextText'] = $("#question-"+id+" .title").val();
                            components[i]['question']['correctAnswers'] = [];
                            $("#question-"+id+" .correct-li input").each(function(){
                                components[i]['question']['correctAnswers'].push(this.value);
                            });
                            components[i]['question']['incorrectAnswers'] = [];
                            $("#question-"+id+" .incorrect-li input").each(function(){
                                components[i]['question']['incorrectAnswers'].push(this.value);
                            });
                        break;

                        case "image":
                            if (addType) components[i]['contentType'] = "image";
                            components[i]["image"] = thumb;
                        break;

                        case "video":
                            if (addType) components[i]['contentType'] = "video";
                            //TODO --> save a video into... an XML, server??
                        break;

                        case "audio":
                            if (addType) components[i]['contentType'] = "audio";
                            //TODO --> save a audo into... an XML, server??
                        break;
                    }
                }

                if (components.length > 1){
                    components["contentType"] = "combined";
                    contentIs = "combined";
                }else{
                    components["contentType"] = contentType;
                    if (components.length == 0) {
                        contentIs = 'empty';
                    }else{
                        contentIs = contentType;
                    }
                }

                components['id'] = id;
                
                //If the content created is a new one, create a new position in array. If not, update the one that is being modified
                if ($("#" + id).length == 0) {
                    contents[contents.length] = components;
                }else{
                    contents[id.split("content")[1] - 1] = components;
                }

                $('#' + id).css("background-image", "url(../img/content-" + contentIs + ".png)");
                console.log($('#' + id));

                //if I am in defineContentToSpace it means that a position marker must be transformed to a content one
                if (typeof transform != 'undefined') {
                    console.log(id);
                    $("#" + id).addClass('imported-content');
                    $("#" + id + "ep").css({
                        "visibility": "visible"
                    });
                }

                // $("#st-container").removeClass("st-menu-open");  
                //classie.remove( $("#st-container"), 'st-menu-open' ); 
   
                //Redefining QR code
                $("#qr-"+id).empty();
                var qrcode = new QRCode("qr-"+id, {
                   text: id,
                   width: 255,
                   height: 255,
                   colorDark : "#000000",
                   colorLight : "#ffffff",
                   correctLevel : QRCode.CorrectLevel.H
                });
                $("body").click();

                //Setting element order
                contents[increment-1]["order"] = $("#order-"+contents[increment-1]["id"]+" input[type='radio'][name='order-element']:checked").val();

                //Setting QR activation
                if ($("#mecanismo-"+id).hasClass("qr")){
                    contents[increment-1]["qr"] = [];
                    contents[increment-1]["qr"]["active"] = "true";
                    contents[increment-1]["qr"]["name"] = $("#qr-"+id)[0].title;
                    contents[increment-1]["qr"]["data"] = $("#qr-"+id)[0].lastChild.currentSrc;
                }  
            });

            $(document).on('keydown', function(e) {
                if (e.keyCode === 27) { // ESC
                    $("#popbox-" + id).fadeOut("slow", function() {
                        //this.remove();
                    }); //$("#popbox-"+id).remove();
                    $("#st-container").removeClass("st-menu-open");
                    $("#popbox-contentBUILDING").remove(); //If regret of creating, remove the popbox created
                }
            });


            $('#textButton').on("click", function() {
                $("#drag").fadeOut("slow");
                ($("#definition table tbody tr")[0].children[0]).innerHTML = ('<div id="div-textarea-' + id + '" class="drag"><textarea id="textarea' + id + '" class="div-textarea" rows="4" cols="50" placeholder="Ingrese un texto..."></textarea><div id="drag-textarea"></div></div> ');
                //$("#textarea"+id).hide();
                //Reinitialize grid
                grid.init('definition');
            });
        },
        error: function(response) {
            console.log("ERROR");
        },
    });


    return id;
}

function addGEOBox(id) {
    $.ajaxPrefilter(function(options) {
        options.crossDomain = true;
    });
    $.ajax({
        url: 'GEOBox.html',
        type: 'get',
        dataType: 'HTML',
        success: function(response) {
            $("#menu-10").append(response);
            if (typeof id == 'undefined') {
                id = 'content' + 'BUILDING';
            }            
        },
        error: function(response) {
            console.log("ERROR");
        },
    });

    return id;
}

function add2DBox(id) {
    $.ajaxPrefilter(function(options) {
        options.crossDomain = true;
    });
    $.ajax({
        url: '2DBox.html',
        type: 'get',
        dataType: 'HTML',
        success: function(response) {
            $("#menu-10").append(response);
            if (typeof id == 'undefined') {
                id = 'content' + 'BUILDING';
            }            
        },
        error: function(response) {
            console.log("ERROR");
        },
    });

    return id;
}

/*
 * Functions to create a position.
 */

function createPosition(id,latlng) {
    /*
     * Returns a random lat and long between min and max
     */
    function getRandomInRange(from, to, fixed) {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
        // .toFixed() returns string, so ' * 1' is a trick to convert to number
    }
    
    var copyClass;
    var copy;
        
    var id = "position-"+increment;
    
    if (userPosition == null){
        
        /*
         * ALTERNATIVE 1: Random mark placement: Here I use getRandomInRange() to get a random lat lng where to place the marker...
         * This alternative is used whenever there is no sensing mechanism to detect the user position
         */
        //Here I use getRandomInRange() to get a random lat lng where to place the marker...
        var margin = 0.00150;
        var lat = getRandomInRange(map.getBounds()._southWest.lat+margin, map.getBounds()._northEast.lat-margin,14);
        var lng = getRandomInRange(map.getBounds()._southWest.lng+margin, map.getBounds()._northEast.lng-margin,14);
        var latlng = new L.LatLng(lat,lng);
        console.log(latlng.lat, latlng.lng);

    }else{

        /*
         * ALTERNATIVE 2: Mark placement in current position;
         */
         var lat = userPosition.latlng.lat;
         var lng = userPosition.latlng.lng;
         latlng = userPosition.latlng; 
    }

    var mark = L.marker(latlng, { draggable:true, bounceOnAdd: true, bounceOnAddOptions: {duration: 500, height: 100}}).addTo(map);              
    increment++;
    //Storing marker in MARKERS array
    addMarkerToList(id,lat,lng); 
    setTimeout(function(){$("body").click()},50);
}


/*
 * Functions to create the content.
 * createContent(): creates the content without a position
 * craeteContentWithMarker(): creates the content inside a map (has a position)
 */
function createCcontentWithMarker(id) {
    //Creating the content...
    var idAux = id;
    var copyId;
    var original = document.getElementById(idAux);
    copy = document.createElement('div');
    var ep = document.createElement('div');
    copy.id = 'content' + increment;
    copyId = copy.id;
    ep.id = copy.id + "ep";
    idEp = copy.id + "ep";

    /* PlumbIcon is a class that defines an icon to the marker. This icon has the 
     * ability to throw arrows and attach them to other PlumbIcon instances*/

    var marker = L.PlumbIcon = L.Icon.extend({
        options: {
            iconSize: [12, 12], // also can be set through CSS
            /*
            iconAnchor: (Point)
            popupAnchor: (Point)
            html: (String)
            bgPos: (Point)
            */
            className: 'leaflet-div-icon',
            html: false
        },

        createIcon: function() {  
            
            var div = copy,
            options = this.options;
            console.log(options);
            if (options.html !== false) {
                div.innerHTML = options.html;
            } else {
                div.innerHTML = '';
            }

            if (options.bgPos) {
                div.style.backgroundPosition =
                        (-options.bgPos.x) + 'px ' + (-options.bgPos.y) + 'px';
            }

            copy.appendChild(ep);
            ep.setAttribute('class', 'content-ep');

            this._setIconStyles(div, 'icon');

            jsPlumb.makeSource($(copy), {
                filter: ".content-ep",
                anchor: "Continuous",
                connector: ["StateMachine", {
                    curviness: 20
                }],
                connectorStyle: {
                    strokeStyle: nextColour(),
                    lineWidth: 4
                },
                maxConnections: 5,
                onMaxConnections: function(info, e) {
                    alert("Maximum connections (" + info.maxConnections + ") reached");
                }
            });

            jsPlumb.makeTarget($(copy), {
                dropOptions: {
                    hoverClass: "dragHover"
                },
                anchor: "Continuous"
            });
            jsPlumb.bind("click", function(c) {
                //var r=confirm("Esta; seguro que desea borrar la conexion?");
                //if (r){
                jsPlumb.detach(c);
                //}
            });

            $('#mapa').bind("dblclick", function(c) {
                map.doubleClickZoom.enable();
            });
            $('#' + copy.id).on("dblclick", function(c) {
                map.doubleClickZoom.disable();
            });

            return div;
        },

        createShadow: function() {
            return null;
        }
    });
    L.plumbIcon = function(options) {
        return new L.PlumbIcon(options);
    };

    var myIcon = L.plumbIcon({
        // Specify a class name we can refer to in CSS.
        className: 'leaflet-div-icon _jsPlumb_endpoint_anchor_ draggable-content window',
        // Set a markers width and height.
        iconSize: [20, 50]
    });

    if (userPosition == null){
        
        /*
         * ALTERNATIVE 1: Random mark placement: Here I use getRandomInRange() to get a random lat lng where to place the marker...
         * This alternative is used whenever there is no sensing mechanism to detect the user position
         */
        //Here I use getRandomInRange() to get a random lat lng where to place the marker...
        var margin = 0.00150;
        var lat = getRandomInRange(map.getBounds()._southWest.lat+margin, map.getBounds()._northEast.lat-margin,14);
        var lng = getRandomInRange(map.getBounds()._southWest.lng+margin, map.getBounds()._northEast.lng-margin,14);
        var latlng = new L.LatLng(lat,lng);
        console.log(latlng.lat, latlng.lng);

    }else{

        /*
         * ALTERNATIVE 2: Mark placement in current position;
         */
         var lat = userPosition.latlng.lat;
         var lng = userPosition.latlng.lng;
         latlng = userPosition.latlng; 
    }

    var mark = L.marker(latlng, {
        icon: myIcon,
        draggable: true,
        className: copyId,
        zIndexOffset: 1000
    }).addTo(map);
    mark._icon.className = mark._icon.className+' _jsPlumb_endpoint_anchor_ draggable-content window';
    mark._icon.children[0].id = id + "ep";

    //Adding marker to 'markers' array (this does not include the content)
    //addMarkerToList(copyId, copyClass, lat, lng, idEp);

    $('#' + copyId).on("mouseover", function(c) {
        map.dragging.disable();
        console.log(mark.getLatLng().lat);
        console.log(mark.getLatLng().lng);
    });
    $('#' + copyId).on("mouseout", function(c) {
        map.dragging.enable();
        mark.dragging.enable();
    });
    $('.content-ep').on("mousedown", function(c) {
        map.dragging.disable();
        mark.dragging.disable();
    });
    $('.content-ep').on("mouseup", function(c) {
        map.dragging.enable();
        mark.dragging.enable();
    });

    return copyId;
}
function createContentWithMarker(id,latlng) {
    //Creating the content...
    var idAux = id;
    var original = document.getElementById(idAux);
    copy = document.createElement('div');
    var ep = document.createElement('div');
    copy.id = id
    ep.id = id + "-ep";

    /* PlumbIcon is a class that defines an icon to the marker. This icon has the 
     * ability to throw arrows and attach them to other PlumbIcon instances*/

    var marker = L.PlumbIcon = L.Icon.extend({
        options: {
            iconSize: [12, 12], // also can be set through CSS
            /*
            iconAnchor: (Point)
            popupAnchor: (Point)
            html: (String)
            bgPos: (Point)
            */
            className: 'leaflet-div-icon',
            html: false
        },

        createIcon: function() {  
            
            var div = copy,
            options = this.options;
            console.log(options);
            if (options.html !== false) {
                div.innerHTML = options.html;
            } else {
                div.innerHTML = '';
            }

            if (options.bgPos) {
                div.style.backgroundPosition =
                        (-options.bgPos.x) + 'px ' + (-options.bgPos.y) + 'px';
            }

            copy.appendChild(ep);
            ep.setAttribute('class', 'content-ep');

            this._setIconStyles(div, 'icon');

            jsPlumb.makeSource($(copy), {
                filter: ".content-ep",
                anchor: "Continuous",
                connector: ["StateMachine", {
                    curviness: 20
                }],
                connectorStyle: {
                    strokeStyle: nextColour(),
                    lineWidth: 4
                },
                maxConnections: 5,
                onMaxConnections: function(info, e) {
                    alert("Maximum connections (" + info.maxConnections + ") reached");
                }
            });

            jsPlumb.makeTarget($(copy), {
                dropOptions: {
                    hoverClass: "dragHover"
                },
                anchor: "Continuous"
            });
            jsPlumb.bind("click", function(c) {
                //var r=confirm("Esta; seguro que desea borrar la conexion?");
                //if (r){
                jsPlumb.detach(c);
                //}
            });

            $('#mapa').bind("dblclick", function(c) {
                map.doubleClickZoom.enable();
            });
            $('#' + copy.id).on("dblclick", function(c) {
                map.doubleClickZoom.disable();
            });

            return div;
        },

        createShadow: function() {
            return null;
        }
    });
    L.plumbIcon = function(options) {
        return new L.PlumbIcon(options);
    };

    var myIcon = L.plumbIcon({
        // Specify a class name we can refer to in CSS.
        className: 'leaflet-div-icon _jsPlumb_endpoint_anchor_ draggable-content window',
        // Set a markers width and height.
        iconSize: [20, 50]
    });

    if (userPosition == null){
        
        /*
         * ALTERNATIVE 1: Random mark placement: Here I use getRandomInRange() to get a random lat lng where to place the marker...
         * This alternative is used whenever there is no sensing mechanism to detect the user position
         */
        //Here I use getRandomInRange() to get a random lat lng where to place the marker...
        var margin = 0.00150;
        var lat = getRandomInRange(map.getBounds()._southWest.lat+margin, map.getBounds()._northEast.lat-margin,14);
        var lng = getRandomInRange(map.getBounds()._southWest.lng+margin, map.getBounds()._northEast.lng-margin,14);
        var latlng = new L.LatLng(lat,lng);
        console.log(latlng.lat, latlng.lng);
    }else{

        /*
         * ALTERNATIVE 2: Mark placement in current position;
         */
         var lat = userPosition.latlng.lat;
         var lng = userPosition.latlng.lng;
         latlng = userPosition.latlng; 
    }

    var mark = L.marker(latlng, {
        icon: myIcon,
        draggable: true,
        className: id,
        zIndexOffset: 1000
    }).addTo(map);    


    //Adding marker to 'markers' array (this does not include the content)
    addMarkerToList(id, lat, lng);
    $('#' + id).on("mouseover", function(c) {
        map.dragging.disable();
        console.log(mark.getLatLng().lat);
        console.log(mark.getLatLng().lng);
    });
    $('#' + id).on("mouseout", function(c) {
        map.dragging.enable();
        mark.dragging.enable();
        markers[id].lat = mark.getLatLng().lat;
        markers[id].lng = mark.getLatLng().lng;
    });
    $('.content-ep').on("mousedown", function(c) {
        map.dragging.disable();
        mark.dragging.disable();
    });
    $('.content-ep').on("mouseup", function(c) {
        map.dragging.enable();
        mark.dragging.enable();
    });

    return id;
}


function createContent(id) {
    copy = document.createElement('div');
    var ep = document.createElement('div');
    copy.id = id;
    ep.id = id + "-ep";
    copy.appendChild(ep);
    copy.className = 'window draggable-content';
    ep.setAttribute('class', 'content-ep');

    /*PlumbIcon is a class that defines an icon to the marker. This icon has the ability to throw arrows and attach them to
    other PlumbIcon instances*/

    jsPlumb.makeSource($(copy), {
        filter: ".content-ep",
        anchor: "Continuous",
        connector: ["StateMachine", {
            curviness: 20
        }],
        connectorStyle: {
            strokeStyle: nextColour(),
            lineWidth: 4
        },
        maxConnections: 5,
        onMaxConnections: function(info, e) {
            alert("Maximum connections (" + info.maxConnections + ") reached");
        }
    });
    jsPlumb.makeTarget($(copy), {
        dropOptions: {
            hoverClass: "dragHover"
        },
        anchor: "Continuous"
    });
    jsPlumb.bind("click", function(c) {
        //var r=confirm("Esta; seguro que desea borrar la conexion?");
        //if (r){
        jsPlumb.detach(c);
        //}
    });
    jsPlumb.draggable(copy, {
        containment: $("#main")
    });

    var mainWidth = $("#main").width();
    var mainHeight = $("#main").height();

    //Content is NOT a marker...
    $("#main").append(copy);  

    copy.style.left = getRandomInt(10, mainWidth)+"px";
    copy.style.top = getRandomInt(150, mainHeight)+"px";

    return id;
}

/*
 * Other Functions
 *
 */

//Adds a content, position or element to markers array (so as to be able to export).
function addMarkerToList(id,lat,lng){
    mark = new Object();
    mark.id = id;
    mark.lat = lat;
    mark.lng = lng;
    markers[mark.id] = mark;
    markers.length++;
};


//Returns a random lat and long between min and max
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

/*
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Helper method to generate a color from a cycle of colors.
var curColourIndex = 1,
    maxColourIndex = 24,
    nextColour = function() {
        var R, G, B;
        R = parseInt(128 + Math.sin((curColourIndex * 3 + 0) * 1.3) * 128);
        G = parseInt(128 + Math.sin((curColourIndex * 3 + 1) * 1.3) * 128);
        B = parseInt(128 + Math.sin((curColourIndex * 3 + 2) * 1.3) * 128);
        curColourIndex = curColourIndex + 1;
        if (curColourIndex > maxColourIndex) curColourIndex = 1;
        return "rgb(" + R + "," + G + "," + B + ")";
    };