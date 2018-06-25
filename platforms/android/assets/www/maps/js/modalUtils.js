
$(document).on("click", "#saveConnection", function(event){
    arrowMeter ++;
    var arrowMeterId = arrowMeter+"_arrow";
    var id = $('.active').attr('id');
    console.log(id);
    var currentPOI= localStorage.getItem("currentPOI");
    console.log(currentPOI);
    var target = localStorage.getItem("content_" +id);
    var source = localStorage.getItem(currentPOI);

    var targetParse = JSON.parse(target);
    var sourceParse = JSON.parse(source);
    alert(targetParse);
    alert(sourceParse);
    console.log(JSON.stringify(targetParse["lat"]));
    console.log(targetParse["long"]);

    var pointA = new L.LatLng(sourceParse.lat, sourceParse.long);
    var pointB = new L.LatLng(targetParse.lat ,targetParse.long);
    var pointList = [pointA, pointB];

    var color = colourmap[currentPOI];
    customPolyline = L.Polyline.extend({
        options: {
            speed: '25',
            bearing: '140'
        }
    });

    var arrow = new customPolyline(pointList,{
        color: color,
        speed: '143',
        bearing: '80',
        weight: '5'
    });

    arrow.on('click', function() {
        showArrowOptions();
    });

    arrow.addTo(map);

    addArrow(pointList, arrowMeterId);
    addConnectedTo(pointB);

   // var arrow = L.polyline(pointList, { color: color}).addTo(map);
    var arrowHead = L.polylineDecorator(arrow, {
         patterns: [
             {offset: '97%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 15, polygon: false, pathOptions: {stroke: true,color:color, weight: 4}})}
         ]
     }).addTo(map);


    //
   // $("#pois").empty();

    $('#connect').modal('hide');
});

//
// var curColourIndex = 1,
//     maxColourIndex = 24,
//     nextColour = function () {
//         var R, G, B;
//         R = parseInt(128 + Math.sin((curColourIndex * 3 + 0) * 1.3) * 128);
//         G = parseInt(128 + Math.sin((curColourIndex * 3 + 1) * 1.3) * 128);
//         B = parseInt(128 + Math.sin((curColourIndex * 3 + 2) * 1.3) * 128);
//         curColourIndex = curColourIndex + 1;
//         if (curColourIndex > maxColourIndex) curColourIndex = 1;
//         return "rgb(" + R + "," + G + "," + B + ")";
//     };

