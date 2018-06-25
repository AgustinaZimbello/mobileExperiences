function showPOIOptions() {
    var currentPOI= localStorage.getItem("currentPOI");
    var color= colourmap[currentPOI];

    $("#demo_box").empty();
    $("#demo_box").append(' <span class="pop_ctrl"><i class="fa fa-cog"></i></span>  <ul id="demo_ul_2"><li id="qr" class="demo_li"><div><i id="qr" class="fa fa-qrcode"></i></div><div>QR</div></li><li id="arrow" class="demo_li"><div><i id="arrow" class="fa fa-exchange"></i></div><div>Conectar</div></li><li id="arrow" class="demo_li"><div><i id="arrow" class="fa fa-trash"></i></div><div>Borrar</div></li><li id="template" class="demo_li"><a href="#"><div><i class="fa fa-mobile"></i></div><div>Template</div></a></li> </ul>');
    $("#demo_box").css({'z-index': 9999, position: "fixed", top: event.pageY, left: event.pageX, opacity: 0.8});
    $("#demo_box").popmenu({  'width': '200px','background': color, 'focusColor': color, 'borderRadius': '0','iconSize': '100px'});
    $('#demo_box').css('color', color);

}
function showArrowOptions() {
    var currentPOI= localStorage.getItem("currentPOI");
    var color= colourmap[currentPOI];
    $("#arrow_menu").empty();
    $("#arrow_menu").append(' <span class="pop_ctrl"><i class="fa fa-cog"></i></span>  <ul id="demo_ul_2"><li id="template" class="demo_li"><a href="#"><div><i class="fa fa-mobile"></i></div><div>Template</div></a></li><li id="qr" class="demo_li"><div><i id="qr" class="fa fa-qrcode"></i></div><div>QR</div></li><li id="arrow" class="demo_li"><div><div><i id="arrow" class="fa fa-trash"></i></div><div>Borrar</div></li> </ul>');
    $("#arrow_menu").css({'z-index': 9999, position: "fixed", top: event.pageY, left: event.pageX, opacity: 0.8});
    $("#arrow_menu").popmenu({
        'width': '300px',
        'background': color,
        'focusColor': color,
        'borderRadius': '0',
        'iconSize': '100px'
    });
    $('#demo_box').css('color', color);
}

function showPOIPosOptions() {
    var currentPOI= localStorage.getItem("currentPOI");
    var color= colourmap[currentPOI];
    $("#pos_demo_box").empty();
    $("#pos_demo_box").append(' <span class="pop_ctrl"><i class="fa fa-cog"></i></span>  <ul id="demo_ul_2"><li id="qr" class="demo_li"><div><i id="qr" class="fa fa-qrcode"></i></div><div>QR</div></li><li id="arrow" class="demo_li"><div><i id="arrow" class="fa fa-exchange"></i></div><div>Conectar</div></li><li id="arrow" class="demo_li"><div><i id="arrow" class="fa fa-trash"></i></div><div>Borrar</div></li> </ul>');
    $("#pos_demo_box").css({'z-index': 9999, position: "fixed", top: event.pageY, left: event.pageX, opacity: 0.8});
    $("#pos_demo_box").popmenu({  'width': '300px','background': color, 'focusColor': color, 'borderRadius': '0','iconSize': '100px'});
    $('#pos_demo_box').css('color', color);

}
