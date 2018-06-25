var ready;
function phonegapReady() {
    ready = true;
    $('#menu').hide();
}

$(function() {

    $('#existingTemplates').click(function (){
        if (ready) {
            window.open('menuTemplates.html','_blank', 'location=yes');
        }
    });

    $('#existingWhiteTemplate').click(function() {
        if (ready) {
            window.open('whiteTemplate.html','_blank', 'location=yes');
        }
    });
});