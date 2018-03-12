var id = increment;
        increment ++;
        copy = document.createElement('div');
        var ep = document.createElement('div');
        copy.id = id
        ep.id = id + "-ep";
        copy.appendChild(ep);
            copy.className = 'window draggable-content';
            ep.setAttribute('class', 'content-ep');

        /* PlumbIcon is a class that defines an icon to the marker. This icon has the
         * ability to throw arrows and attach them to other PlumbIcon instances*/

        var marker = L.PlumbIcon = L.Icon.extend({
            options: {
                iconSize: [12, 12],
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
                 jsPlumb.draggable(copy, {
                        containment: $("#main")
                    });

                $('#map').bind("dblclick", function(c) {
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
            iconSize: [40, 50]
        });

        var latlng;
        if (userPosition == null){
                /*
                 * ALTERNATIVE 1: Random mark placement: Here I use getRandomInRange() to get a random lat lng where to place the marker...
                 * This alternative is used whenever there is no sensing mechanism to detect the user position
                 */
                //Here I use getRandomInRange() to get a random lat lng where to place the marker...
                var margin = 0.00150;
                var lat = getRandomInRange(map.getBounds()._southWest.lat+margin, map.getBounds()._northEast.lat-margin,14);
                var lng = getRandomInRange(map.getBounds()._southWest.lng+margin, map.getBounds()._northEast.lng-margin,14);
                latlng = new L.LatLng(lat,lng);
            }else{
                latlng = userPosition.latlng;
        }

        var mark = L.marker(latlng, {
            icon: myIcon,
            draggable: true,
            className: id,
            zIndexOffset: 1000
        }).addTo(map);

        $('#' + id).on("mouseover", function(c) {
            map.dragging.disable();
        });
        $('#' + id).on("mouseout", function(c) {
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