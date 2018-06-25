var ready;
var options;
var crd;
var increment = 0;
var alphabet = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n","o");
var definedPoints = [];

function phonegapReady() {
    // Necesario para conocer si las app de PhoneGap ya escuentran
    // disponibles(cargadas)
    ready = true;
    loadMap();
}

function hideMenuWhenOptionsPoiIsShowed() {
    var menu = $('#menu');
    // check if element is Visible
    var isVisible = menu.is(':visible');
    if (isVisible === true) {
        $('#map').css("height", "100%");
        menu.hide();
    } else {
        $('#map').css("height", "60%");
        menu.show();
    }
}


function loadMap() {
    localStorage.clear();
    localStorage.setItem("typeMap", "geoMap");
    map = L.map('map').fitWorld();
    tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
    var searchControl = new L.esri.Controls.Geosearch().addTo(map);
    $('.geocoder-control-input, .leaflet-bar').parent();
    //map.setView(new L.LatLng(-34.6,-58.383), 17).addLayer(tileLayer);
    //L.marker([-34.6,-58.383],{draggable: true}).addTo(map);
    map.on("locationfound", function (location) {
        if (typeof marker == "undefined")
            marker = L.userMarker(location.latlng, {pulsing: true, accuracy: 1, smallIcon: true}).addTo(map);
        userPosition = location;
        marker.setLatLng(location.latlng);
        marker.setAccuracy(location.accuracy);
    });
    map.locate({
        watch: false,
        locate: true,
        setView: true,
        enableHighAccuracy: true
    });
    //var searcher = new L.esri.Controls.Geosearch().addTo(map);
    //$('.geocoder-control-input, .leaflet-bar').parent();
    return map;
}

$(function () {

    $('#export').click(function () {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);


        function gotFS(fileSystem) {
            fileSystem.root.getDirectory("data", {create: true}, gotDir);
        }

        function gotDir(dirEntry) {
            dirEntry.getFile("test.txt", {create: true, exclusive: true}, gotFile);
        }

        function gotFile(fileEntry) {
            // Do s

    }});

    $('#selectMapFromGallery').click(function () {
        var options = {
            maximumImagesCount: 1,
            width: 800,
            height: 800,
            quality: 80
        };
        plugins.imagePicker.getPictures(function (results) {
            var imageUrl = results[0];
            var affineOverlay;
            var image = new Image();
            image.onload = function () {
                L.affineImage().params({image: image, boundingScale: 0.5}).addTo(map);
            };
            image.src = imageUrl;
        }, function (error) {
            console.log('Error: ' + error);
        }, options);
    });


    $('#newContentPositioned').click(function () {
        increment++;
        id = 'content' + increment;
        var idAux = id;
        var copyId;
        var original = document.getElementById(idAux);
        definedPoints[increment - 1] = alphabet[increment - 1];
        copy = document.createElement('div');
        var ep = document.createElement('div');
        copy.id = 'content_' + alphabet[increment - 1];
        copyId = copy.id;
        ep.id = copy.id + "ep";
        idEp = copy.id + "ep";
        copy.appendChild(ep);
        copy.className = 'window draggable-content ' + alphabet[increment - 1];
        ep.setAttribute('class', 'content-ep');

        /* PlumbIcon is a class that defines an icon to the marker. This icon has the
         * ability to throw arrows and attach them to other PlumbIcon instances*/
        $('#' + copyId).draggable();

        var marker = L.PlumbIcon = L.Icon.extend({
            options: {
                iconSize: [12, 12], // also can be set through CSS
                className: 'leaflet-div-icon',
                html: false
            },

            createIcon: function () {

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
                        lineWidth: 0
                    },
                    maxConnections: 0,
                    onMaxConnections: function (info, e) {
                        alert("Maximum connections (" + info.maxConnections + ") reached");
                    }
                });

                jsPlumb.makeTarget($(copy), {
                    dropOptions: {
                        hoverClass: "dragHover"

                    },
                    anchor: "Continuous"
                });
                jsPlumb.bind("click", function (c) {
                    //var r=confirm("Esta; seguro que desea borrar la conexion?");
                    //if (r){
                    jsPlumb.detach(c);
                    //}
                });

                $('#map').bind("dblclick", function (c) {
                    map.doubleClickZoom.enable();
                });
                $('#' + copy.id).on("dblclick", function (c) {
                    map.doubleClickZoom.disable();
                });

                return div;
            },

            createShadow: function () {
                return null;
            }
        });
        L.plumbIcon = function (options) {
            return new L.PlumbIcon(options);
        };

        var myIcon = L.plumbIcon({
            // Specify a class name we can refer to in CSS.
            className: 'leaflet-div-icon _jsPlumb_endpoint_anchor_ draggable-content window ' + alphabet[increment - 1],
            // Set a markers width and height.
            iconSize: [30, 50]

        });


        if (userPosition == null) {
            var margin = 0.00150;
            var lat = getRandomInRange(map.getBounds()._southWest.lat + margin, map.getBounds()._northEast.lat - margin, 14);
            var lng = getRandomInRange(map.getBounds()._southWest.lng + margin, map.getBounds()._northEast.lng - margin, 14);
            var latlng = new L.LatLng(lat, lng);
            console.log(latlng.lat, latlng.lng);

        } else {
            var lat = userPosition.latlng.lat;
            var lng = userPosition.latlng.lng;
            latlng = userPosition.latlng;
        }

        var mark = L.marker(latlng, {
            icon: myIcon,
            draggable: false,
            className: copyId,
            zIndexOffset: 1000
        }).addTo(map);
        mark._icon.className = mark._icon.className + ' _jsPlumb_endpoint_anchor_ draggable-content window ' + alphabet[increment - 1];
        mark._icon.children[0].id = id + "ep";


        localStorage.setItem(copyId, jsonLatLong(mark.getLatLng().lat, mark.getLatLng().lng));
        //Adding marker to 'markers' array (this does not include the content)
        //addMarkerToList(copyId, copyClass, lat, lng, idEp);

        $('#' + copyId).on("mouseover", function (c) {
            map.dragging.enable();
            console.log("movi" + mark.getLatLng().lat);
            console.log(mark.getLatLng().lng);
            console.log("mouseover");
        });
        $('#' + copyId).on("mouseup", function (event) {
            localStorage.setItem("currentPOI", copyId);
            showPOIOptions();

        });
        $('#' + copyId).on("mouseout", function (c) {
            map.dragging.enable();
            mark.dragging.enable();
            //update the value is the marker was moved
            localStorage.setItem(copyId, jsonLatLong(mark.getLatLng().lat, mark.getLatLng().lng));
        });
        $('.content-ep').on("mousedown", function (c) {
            map.dragging.disable();
            mark.dragging.disable();
            console.log("mousedown")
        });
        $('.content-ep').on("mouseup", function (c) {
            map.dragging.enable();
            mark.dragging.enable();
            console.log("mouseup");
        });

    });



    /***************** POP MENU ********************************/

    $('#demo_box').on('click', '#arrow', function () {
        var currentPOI = localStorage.getItem("currentPOI");
        var currentPOIKey = currentPOI + '_qrcode';
        $("#qrcode").empty();
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            text: currentPOIKey,
            width: 100,
            height: 100,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        addQRToJson(qrcode);
        $('#QRModal').modal('show');

    });

    $('#demo_box').on('click', '#qr', function () {
        var definedPointsNotFirst = definedPoints.slice(1, definedPoints.length);
        console.log(definedPointsNotFirst);
        definedPointsNotFirst.forEach(function (element) {
            var elementAlph = document.createElement('div');
            var url = '../images/abccontents/content_';

            elementAlph.id = element;
            //elementAlph.className='item col-md-4 col-sm-4 col-xs-6 col-sm-4';
            var elemImage = document.createElement("img");
            elemImage.setAttribute("src", url + element + ".png");
            elemImage.setAttribute("height", "30");
            elemImage.setAttribute("width", "30");
            elementAlph.className = 'item';
            elementAlph.appendChild(elemImage);

            $("#pois").append(elementAlph);

        });
        var firstElement = definedPoints[0];
        var firstDiv = document.getElementById(firstElement);
        firstDiv.className = 'item active';
        $('#connect').modal('show');
    });

    $('#demo_box').on('click', '#template', function () {
        window.open('../templates/associateTemplates.html', '_blank', 'location=yes');
    });


    /****************END POI MENU********************/


    function hideComponents() {
        $('#menu').hide();
        $('#title').hide();
        $('#map').css("height", "100%");
        setTimeout(10000);
    }

    $('#screenshot').click(function () {
        hideComponents();
        screenshot++;
        var nameCapture = 'mapCapture' + screenshot.toString();
        navigator.screenshot.save(function (error, res) {
                if (error) {
                    console.error(error);
                } else {
                    console.log('ok', res.filePath); //should be path/to/myScreenshot.jpg
                }
            },
            'jpg', 50, 'pepe');
    });

    $('#volverIndex').click(function () {
        if (ready) {
            window.open('index.html', '_top', 'location=yes');
        }
    });
});

var curColourIndex = 1,
    maxColourIndex = 24,
    nextColour = function () {
        var R, G, B;
        R = parseInt(128 + Math.sin((curColourIndex * 3 + 0) * 1.3) * 128);
        G = parseInt(128 + Math.sin((curColourIndex * 3 + 1) * 1.3) * 128);
        B = parseInt(128 + Math.sin((curColourIndex * 3 + 2) * 1.3) * 128);
        curColourIndex = curColourIndex + 1;
        if (curColourIndex > maxColourIndex) curColourIndex = 1;
        return "rgb(" + R + "," + G + "," + B + ")";
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


