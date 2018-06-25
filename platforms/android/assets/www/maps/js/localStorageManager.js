function jsonLatLong (latR, longR){
    var json={};

    json.lat= latR;
    json.long= longR;
    var jsonString= JSON.stringify(json);
    return jsonString;
}

function addQRToJson(qrCode){
    currentPoi= localStorage.getItem("currentPOI");
    valueCurrentPoi= localStorage.getItem(currentPoi);
    if (valueCurrentPoi=== null) {
        var json = new Object();
        json.qr= qrCode;
        localStorage.setItem(currentPoi,json);
    }
    else {
        valueCurrentPoi.qr=qrCode;
        console.log(valueCurrentPoi.qr+"QR");
        localStorage.setItem(currentPoi,valueCurrentPoi);
    }
    var source = localStorage.getItem(currentPoi);
    console.log(source+"test");
}

function addQRToTemplate(template) {
    currentPoi = localStorage.getItem("currentPOI");
    valueCurrentPoi = JSON.parse(localStorage.getItem(currentPoi));
    if (valueCurrentPoi === null) {
        var json = new Object();
        json.template = template;
        localStorage.setItem(currentPoi, json);
    }
    else {
        valueCurrentPoi.template = template;
        console.log(valueCurrentPoi.template + "template");
        localStorage.setItem(currentPoi,JSON.stringify(valueCurrentPoi) );
    }
}

function addConnectedTo(endpoint) {
    currentPoi = localStorage.getItem("currentPOI");
    valueCurrentPoi = JSON.parse(localStorage.getItem(currentPoi));
    if (valueCurrentPoi === null) {
        var json =  {};
        var endpoints= new Array();
        endpoints.push(endpoint);
        json.connectTo=endpoints;
        localStorage.setItem(currentPoi,JSON.stringify(json));
    }
    else {
        if (valueCurrentPoi.connectTo == null) {
            var endpoints= new Array();
            endpoints.push(endpoint);
            valueCurrentPoi.connectTo=endpoints;}
        else {
            valueCurrentPoi.connectTo.add(endpoint);
        }

        console.log(valueCurrentPoi.connectTo + "endpoint");
        localStorage.setItem(currentPoi,JSON.stringify(valueCurrentPoi) );
    }
}


function addArrow (endPointList, id){
    var json =  {};
    json.endpointList= endPointList;
    var jsonString= JSON.stringify(json);
    localStorage.setItem(id,jsonString);
    console.log(localStorage.getItem(id));
}


function addWhiteTemplate (htmlTemplate, template){
    localStorage.setItem(template,htmlTemplate);
    console.log(localStorage.getItem(template));
}




