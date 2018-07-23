cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-imagepicker.ImagePicker",
        "file": "plugins/cordova-plugin-imagepicker/www/imagepicker.js",
        "pluginId": "cordova-plugin-imagepicker",
        "clobbers": [
            "plugins.imagePicker"
        ]
    },
    {
        "id": "org.devgeeks.Canvas2ImagePlugin.Canvas2ImagePlugin",
        "file": "plugins/org.devgeeks.Canvas2ImagePlugin/www/Canvas2ImagePlugin.js",
        "pluginId": "org.devgeeks.Canvas2ImagePlugin",
        "clobbers": [
            "window.canvas2ImagePlugin"
        ]
    },
    {
        "id": "com.darktalker.cordova.screenshot.screenshot",
        "file": "plugins/com.darktalker.cordova.screenshot/www/Screenshot.js",
        "pluginId": "com.darktalker.cordova.screenshot",
        "merges": [
            "navigator.screenshot"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-plugin-imagepicker": "1.1.0",
    "org.devgeeks.Canvas2ImagePlugin": "0.6.0",
    "com.darktalker.cordova.screenshot": "0.1.5"
};
// BOTTOM OF METADATA
});