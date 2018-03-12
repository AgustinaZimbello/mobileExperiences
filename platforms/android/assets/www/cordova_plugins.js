cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "com.sharerevolution.cordova.screenshot.screenshot",
        "file": "plugins/com.sharerevolution.cordova.screenshot/www/Screenshot.js",
        "pluginId": "com.sharerevolution.cordova.screenshot",
        "merges": [
            "navigator.screenshot"
        ]
    },
    {
        "id": "cordova-plugin-imagepicker.ImagePicker",
        "file": "plugins/cordova-plugin-imagepicker/www/imagepicker.js",
        "pluginId": "cordova-plugin-imagepicker",
        "clobbers": [
            "plugins.imagePicker"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.3",
    "com.sharerevolution.cordova.screenshot": "0.1.6",
    "cordova-plugin-imagepicker": "1.1.0"
};
// BOTTOM OF METADATA
});